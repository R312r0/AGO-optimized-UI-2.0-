import {
  HDiv,
  LiquidityPoolsContainer,
  LiquidityPoolsTable,
  NoWalletWarnWindowContainer,
  SearchBarWrapper,
  SortArrowsContainer,
  TableText,
  Text,
} from "./styled";
import {
  LOADER_INDICATOR_INNER,
  LP_STAKING_POOL,
} from "../../constants";
import React, { useEffect, useState } from "react";
import { formatFromDecimal, formattedNum } from "../../utils/helpers";

import ArrowDownIcon from "./ArrowDownIcon";
import ArrowUpIcon from "./ArrowUpIcon";
import { CreatePairModal } from "./CreatePairModal/create-pair-modal";
import ERC20_ABI from "../../abi/ERC20.json";
import { LIQUIDITY_POOLS } from "../../api/client";
import { LiquidityPoolsItem } from "./Liquidity-pools-item/liquidity-pools-item";
import SINGLE_STAKING_ABI from "../../abi/SIngleChef.json";
import { Spin } from "antd";
import { useQuery } from "@apollo/client";
import { useSystemContext } from "../../systemProvider";
import { useThemeContext } from "../Layout/layout";
import { useWeb3React } from "@web3-react/core";

export const LiquidityPools = () => {
  const { account, library } = useWeb3React();
  const { setIsWalletModal, tokens } = useSystemContext();
  const { data, loading } = useQuery(LIQUIDITY_POOLS);
  const { theme } = useThemeContext();

  const [pools, setPools] = useState(null);
  const [earnPools, setEarnPools] = useState(null);
  const [earnAgoPools, setEarnAgoPools] = useState(null);

  const [poolsFormatted, setPoolsFormatted] = useState([]);
  const [earnPoolsFormatted, setEarnPoolsFormatted] = useState([]);
  const [earnAgoPoolsFormatted, setEarnAgoPoolsFormatted] = useState([]);

  const [poolsPreparing, setPoolsPreparing] = useState(true);
  const [sort, setSort] = useState("ASC");

  useEffect(() => {
    if (!loading && data.pairs && account) {
      prepareData(data.pairs).then((res) => setPoolsPreparing(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, data, loading]);

  useEffect(() => {
    if (pools && earnPools && earnAgoPools) {
      setPoolsFormatted(pools);
      setEarnPoolsFormatted(earnPools);
      setEarnAgoPoolsFormatted(earnAgoPools);
    }
  }, [pools, earnPools, earnAgoPools]);

  const prepareData = async (pools) => {
    // const getPoolApr = (
    //     stakingTokenPrice,
    //     rewardTokenPrice,
    //     totalStaked,
    //     tokenPerBlock,
    // ) => {                                                                                              // unix-oneday * 30days * 12 month / 2blocks per sec
    //     const totalRewardPricePerYear = ethers.BigNumber.from(rewardTokenPrice).pow(tokenPerBlock).pow(86400 * 30 * 12 / 2)
    //     const totalStakingTokenInPool = ethers.BigNumber.from(stakingTokenPrice).pow(totalStaked)
    //     const apr = totalRewardPricePerYear.div(totalStakingTokenInPool).times(100)
    //     return apr.isNaN() || !apr.isFinite() ? null : apr.toNumber()
    // }

    const res = pools.map(async (item) => {
      const lp = new library.eth.Contract(ERC20_ABI, item.id);
      const lpTotalSupply = formatFromDecimal(
        await lp.methods.totalSupply().call(),
        18
      );
      const lpUserBalance = formatFromDecimal(
        await lp.methods.balanceOf(account).call(),
        18
      );

      const token0 = {
        symbol: item.token0.symbol,
        address: item.token0.id,
        price: item.token0.priceUSD,
        priceInToken1: item.token1Price,
      };
      const token1 = {
        symbol: item.token1.symbol,
        address: item.token1.id,
        price: item.token1.priceUSD,
        priceInToken0: item.token0Price,
      };
      const liquidityUSD = item.reserveUSD;
      const lpTokenPrice = liquidityUSD / lpTotalSupply;
      let myLiquidity = lpTokenPrice * lpUserBalance;

      const findedStakingPool = LP_STAKING_POOL.find((itemPool) => {
        let searchPattern = `${item.token0.symbol}-${item.token1.symbol}`;
        let revertSearchPattern = `${item.token1.symbol}-${item.token0.symbol}`;

        if (
          itemPool.name === searchPattern ||
          itemPool.name === revertSearchPattern
        ) {
          return item;
        }
      });
      const stakingContract = findedStakingPool
        ? new library.eth.Contract(
            SINGLE_STAKING_ABI,
            findedStakingPool.address
          )
        : null;

      let apr = 0;

      if (stakingContract) {
        const rewardTokenAddress = await stakingContract.methods
          .rewardToken()
          .call();
        const rewardToken = tokens.find(
          (tok) => tok.address === rewardTokenAddress.toLowerCase()
        );
        const tokenPerBlock = formatFromDecimal(
          await stakingContract.methods.rewardPerBlock().call(),
          rewardToken.decimals
        );
        const tokensStaked = formatFromDecimal(
          await stakingContract.methods.tokensStaked().call(),
          18
        );
        const userStaked = await stakingContract.methods
          .userInfo(account)
          .call();

        console.log(userStaked);

        console.log(`${token0.symbol}-${token1.symbol}`);
        console.log("Reward token price " + rewardToken.priceUSD);
        console.log("LP token price " + lpTokenPrice);

        const totalRewardPricePerYear =
          (parseFloat(rewardToken.priceUSD) * tokenPerBlock * 86400 * 30 * 12) /
          2;
        const totalStakingTokenInPool = parseFloat(lpTokenPrice) * tokensStaked;

        console.log(totalRewardPricePerYear);
        console.log(totalStakingTokenInPool);

        apr = (totalRewardPricePerYear / totalStakingTokenInPool) * 100;
        myLiquidity =
          myLiquidity +
          +formatFromDecimal(userStaked.amount, 18) * lpTokenPrice;
      }

      const liqChart = item.liquidityChart.map((item) => {
        const date = new Date(item.timestamp * 1000);
        const time =
          date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();

        return { value: +item.valueUSD, time };
      });

      const volChart = item.volumeChart.map((item) => {
        const date = new Date(item.timestamp * 1000);
        const time =
          date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();

        return { value: +item.valueUSD, time };
      });

      return {
        apr,
        address: item.id,
        isEarnAgo: item.isRewardPool,
        lpTokenContract: lp,
        lpUserBalance,
        token0,
        token1,
        liqiuidityUSD: formattedNum(liquidityUSD),
        myLiquidity: formattedNum(myLiquidity),
        liqChart,
        volChart,
      };
    });

    const trading = (await Promise.all(res)).filter((item) => !item.isEarnAgo);
    const earnAgo = (await Promise.all(res)).filter((item) => item.isEarnAgo);

    const agobtcWbtcPool = "0x206a734e79fdf5134ef6a0b14d10a170de196717";
    const agousdUsdtPool = "0xe4db1d34559bb115b954fad53fd9d4ed311ec03e";

    //FIXME: take this off when production release.
    setPools(
      trading.filter(
        (item) => item.address !== "0x7cbdc04ab8defbf88ccfa331e57398fb36bae595"
      )
    );
    setEarnPools(
      earnAgo.filter(
        (item) =>
          item.address !== "0x7cbdc04ab8defbf88ccfa331e57398fb36bae595" &&
          item.address !== agobtcWbtcPool &&
          item.address !== agousdUsdtPool
      )
    );
    setEarnAgoPools(
      earnAgo.filter(
        (item) =>
          item.address === agobtcWbtcPool || item.address === agousdUsdtPool
      )
    );
  };

  const handleChangePool = (value) => {
    if (value.length === 0) {
      setPoolsFormatted(pools);
      setEarnPoolsFormatted(earnPools);
      setEarnAgoPoolsFormatted(earnAgoPools);
      return;
    }

    const newPools = pools.filter((item) => {
      const pairSearchPattern = `${item.token0.symbol}-${item.token1.symbol}`;
      const pairSearchPatternReverse = `${item.token1.symbol}-${item.token0.symbol}`;

      if (
        item.token0.symbol.startsWith(value.toUpperCase()) ||
        item.token1.symbol.startsWith(value.toUpperCase())
      ) {
        return item;
      } else if (pairSearchPattern.startsWith(value.toUpperCase())) {
        return item;
      } else if (pairSearchPatternReverse.startsWith(value.toUpperCase())) {
        return item;
      }
    });

    const newPoolsEarn = earnPools.filter((item) => {
      const pairSearchPattern = `${item.token0.symbol}-${item.token1.symbol}`;
      const pairSearchPatternReverse = `${item.token1.symbol}-${item.token0.symbol}`;

      if (
        item.token0.symbol.startsWith(value.toUpperCase()) ||
        item.token1.symbol.startsWith(value.toUpperCase())
      ) {
        return item;
      } else if (pairSearchPattern.startsWith(value.toUpperCase())) {
        return item;
      } else if (pairSearchPatternReverse.startsWith(value.toUpperCase())) {
        return item;
      }
    });

    const newPoolsEarnAgo = earnAgoPools.filter((item) => {
      const pairSearchPattern = `${item.token0.symbol}-${item.token1.symbol}`;
      const pairSearchPatternReverse = `${item.token1.symbol}-${item.token0.symbol}`;

      if (
        item.token0.symbol.startsWith(value.toUpperCase()) ||
        item.token1.symbol.startsWith(value.toUpperCase())
      ) {
        return item;
      } else if (pairSearchPattern.startsWith(value.toUpperCase())) {
        return item;
      } else if (pairSearchPatternReverse.startsWith(value.toUpperCase())) {
        return item;
      }
    });

    setPoolsFormatted(newPools);
    setEarnPoolsFormatted(newPoolsEarn);
    setEarnAgoPoolsFormatted(newPoolsEarnAgo);
  };

  return (
    <>
      {!account ? (
        <NoWalletWarnWindowContainer>
          <h3>Please connect wallet to view this page!</h3>
          <button onClick={() => setIsWalletModal(true)}>Connect Wallet</button>
        </NoWalletWarnWindowContainer>
      ) : (
        <>
          <LiquidityPoolsContainer>
            <HDiv alignItems="center">
              <Text fontWeight="500">Liquidity pools</Text>
              <SearchBarWrapper>
                <input
                  onChange={(e) => handleChangePool(e.target.value)}
                  type="text"
                  placeholder="Search pool"
                />
                <svg width="23" height="23" viewBox="0 0 23 23">
                  <path
                    d="M9.17198 18.344C4.09212 18.344 0 14.2519 0 9.17198C0 4.09212 4.09212 0 9.17198 0C14.2519 0 18.344 4.09212 18.344 9.17198C18.344 14.2519 14.2519 18.344 9.17198 18.344ZM9.17198 1.41107C4.86821 1.41107 1.41107 4.86821 1.41107 9.17198C1.41107 13.4758 4.86821 16.9329 9.17198 16.9329C13.4758 16.9329 16.9329 13.4758 16.9329 9.17198C16.9329 4.86821 13.4758 1.41107 9.17198 1.41107Z"
                    fill="#333333"
                  />
                  <path
                    d="M16.0027 15.0048L22.3384 21.3405L21.3408 22.3381L15.0051 16.0024L16.0027 15.0048Z"
                    fill="#333333"
                  />
                </svg>
              </SearchBarWrapper>
              <CreatePairModal pools={pools} disabled={poolsPreparing} />
            </HDiv>
            <HDiv alignItems="center" mt="1.302vw" ml="1.7vw">
              <Text>Earning AGOy</Text>
            </HDiv>
            <HDiv alignItems="center" mt="1.042vw" ml="1.7vw">
              <TableText ml="2.3vw">Pool</TableText>
              <TableText ml="22.448vw">Liquidity</TableText>
              <SortArrowsContainer>
                <ArrowUpIcon
                  color={
                    sort === "ASC"
                      ? "#40BA93"
                      : theme === "light"
                      ? "#BDBDBD"
                      : "#333"
                  }
                  onClick={() => setSort("ASC")}
                />
                <ArrowDownIcon
                  color={
                    sort === "ASC"
                      ? theme === "light"
                        ? "#BDBDBD"
                        : "#333"
                      : "#EF3725"
                  }
                  onClick={() => setSort("DESC")}
                />
              </SortArrowsContainer>
              <TableText ml="10.052vw">My Liquidity</TableText>
              <SortArrowsContainer>
                <ArrowUpIcon
                  color={
                    sort === "ASC"
                      ? "#40BA93"
                      : theme === "light"
                      ? "#BDBDBD"
                      : "#333"
                  }
                  onClick={() => setSort("ASC")}
                />
                <ArrowDownIcon
                  color={
                    sort === "ASC"
                      ? theme === "light"
                        ? "#BDBDBD"
                        : "#333"
                      : "#EF3725"
                  }
                  onClick={() => setSort("DESC")}
                />
              </SortArrowsContainer>
              <TableText ml="4.688vw">APR</TableText>
              <SortArrowsContainer>
                <ArrowUpIcon
                  color={
                    sort === "ASC"
                      ? "#40BA93"
                      : theme === "light"
                      ? "#BDBDBD"
                      : "#333"
                  }
                  onClick={() => setSort("ASC")}
                />
                <ArrowDownIcon
                  color={
                    sort === "ASC"
                      ? theme === "light"
                        ? "#BDBDBD"
                        : "#333"
                      : "#EF3725"
                  }
                  onClick={() => setSort("DESC")}
                />
              </SortArrowsContainer>
              <TableText ml="2.917vw">Reward token</TableText>
            </HDiv>
            <LiquidityPoolsTable>
              {poolsPreparing ? (
                <Spin size="large" indicator={LOADER_INDICATOR_INNER} />
              ) : (
                <>
                  {earnAgoPoolsFormatted.map((item) => (
                    <LiquidityPoolsItem
                      earnGovToken={true}
                      pool={item}
                      clr={"green"}
                    />
                  ))}
                </>
              )}
            </LiquidityPoolsTable>

            <HDiv alignItems="center" mt="3.125vw" ml="1.7vw">
              <Text>Earning CNUSD/CNBTC</Text>
            </HDiv>
            <HDiv alignItems="center" mt="1.042vw" ml="1.7vw">
              <TableText ml="2.3vw">Pool</TableText>
              <TableText ml="22.448vw">Liquidity</TableText>
              <SortArrowsContainer>
                <ArrowUpIcon
                  color={
                    sort === "ASC"
                      ? "#40BA93"
                      : theme === "light"
                      ? "#BDBDBD"
                      : "#333"
                  }
                  onClick={() => setSort("ASC")}
                />
                <ArrowDownIcon
                  color={
                    sort === "ASC"
                      ? theme === "light"
                        ? "#BDBDBD"
                        : "#333"
                      : "#EF3725"
                  }
                  onClick={() => setSort("DESC")}
                />
              </SortArrowsContainer>
              <TableText ml="10.052vw">My Liquidity</TableText>
              <SortArrowsContainer>
                <ArrowUpIcon
                  color={
                    sort === "ASC"
                      ? "#40BA93"
                      : theme === "light"
                      ? "#BDBDBD"
                      : "#333"
                  }
                  onClick={() => setSort("ASC")}
                />
                <ArrowDownIcon
                  color={
                    sort === "ASC"
                      ? theme === "light"
                        ? "#BDBDBD"
                        : "#333"
                      : "#EF3725"
                  }
                  onClick={() => setSort("DESC")}
                />
              </SortArrowsContainer>
              <TableText ml="4.688vw">APR</TableText>
              <SortArrowsContainer>
                <ArrowUpIcon
                  color={
                    sort === "ASC"
                      ? "#40BA93"
                      : theme === "light"
                      ? "#BDBDBD"
                      : "#333"
                  }
                  onClick={() => setSort("ASC")}
                />
                <ArrowDownIcon
                  color={
                    sort === "ASC"
                      ? theme === "light"
                        ? "#BDBDBD"
                        : "#333"
                      : "#EF3725"
                  }
                  onClick={() => setSort("DESC")}
                />
              </SortArrowsContainer>
              <TableText ml="2.917vw">Reward token</TableText>
            </HDiv>
            <LiquidityPoolsTable>
              {poolsPreparing ? (
                <Spin size="large" indicator={LOADER_INDICATOR_INNER} />
              ) : (
                <>
                  {earnPoolsFormatted.map((item) => (
                    <LiquidityPoolsItem pool={item} clr={"violet"} />
                  ))}
                </>
              )}
            </LiquidityPoolsTable>

            <HDiv alignItems="center" mt="3.125vw" ml="1.7vw">
              <Text>Trading pools</Text>
            </HDiv>
            <HDiv alignItems="center" mt="1.042vw" ml="1.7vw">
              <TableText ml="2.3vw">Pool</TableText>
              <TableText ml="22.448vw">Liquidity</TableText>
              <SortArrowsContainer>
                <ArrowUpIcon
                  color={
                    sort === "ASC"
                      ? "#40BA93"
                      : theme === "light"
                      ? "#BDBDBD"
                      : "#333"
                  }
                  onClick={() => setSort("ASC")}
                />
                <ArrowDownIcon
                  color={
                    sort === "ASC"
                      ? theme === "light"
                        ? "#BDBDBD"
                        : "#333"
                      : "#EF3725"
                  }
                  onClick={() => setSort("DESC")}
                />
              </SortArrowsContainer>
              <TableText ml="10.052vw">My Liquidity</TableText>
              <SortArrowsContainer>
                <ArrowUpIcon
                  color={
                    sort === "ASC"
                      ? "#40BA93"
                      : theme === "light"
                      ? "#BDBDBD"
                      : "#333"
                  }
                  onClick={() => setSort("ASC")}
                />
                <ArrowDownIcon
                  color={
                    sort === "ASC"
                      ? theme === "light"
                        ? "#BDBDBD"
                        : "#333"
                      : "#EF3725"
                  }
                  onClick={() => setSort("DESC")}
                />
              </SortArrowsContainer>
              <TableText ml="4.688vw">APR</TableText>
              <SortArrowsContainer>
                <ArrowUpIcon
                  color={
                    sort === "ASC"
                      ? "#40BA93"
                      : theme === "light"
                      ? "#BDBDBD"
                      : "#333"
                  }
                  onClick={() => setSort("ASC")}
                />
                <ArrowDownIcon
                  color={
                    sort === "ASC"
                      ? theme === "light"
                        ? "#BDBDBD"
                        : "#333"
                      : "#EF3725"
                  }
                  onClick={() => setSort("DESC")}
                />
              </SortArrowsContainer>
              <TableText ml="2.917vw">Reward token</TableText>
            </HDiv>
            <LiquidityPoolsTable>
              {poolsPreparing ? (
                <Spin size="large" indicator={LOADER_INDICATOR_INNER} />
              ) : (
                <>
                  {poolsFormatted.map((item) => (
                    <LiquidityPoolsItem pool={item} />
                  ))}
                </>
              )}
            </LiquidityPoolsTable>
          </LiquidityPoolsContainer>
        </>
      )}
    </>
  );
};

export default LiquidityPools;
