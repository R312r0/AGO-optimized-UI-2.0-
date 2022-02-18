import {
  AprValueWrapper,
  Divider,
  ExpandedDataWrapper,
  HDiv,
  IconWrapper,
  LiquidityInfoContainer,
  LiquidityPoolsItemContainer,
  Tab,
  TabContentWrapper,
  TabPanel,
  Tabs,
  TabsList,
  Text,
  ToggleExpandBtn,
} from "./styled";
import React, { useEffect, useState } from "react";
import { formatFromDecimal, formattedNum } from "../../../utils/helpers";

import ChartLineIcon from "./ChartLineIcon";
import CloseIcon from "./CloseIcon";
import { LP_STAKING_POOL } from "../../../constants";
import { Liquidity } from "../Liquidity/liquidity";
import { ProvideLiquidity } from "../ProvideLiquidity/provide_liquidity";
import STAKING_ABI from "../../../abi/SIngleChef.json";
import { StakeLp } from "../StakeLp/stake-lp";
import { ThemeProvider } from "styled-components";
import { TokenIcon } from "../../TokenIcon/token_icon";
import { Transactions } from "../Transactions/transactions";
import { Volume } from "../Volume/volume";
import { relativeLength } from "highcharts";
import { useThemeContext } from "../../Layout/layout";
import { useWeb3React } from "@web3-react/core";

export const LiquidityPoolsItem = ({
  pool: {
    apr,
    address,
    token0,
    token1,
    liqiuidityUSD,
    isEarnAgo,
    myLiquidity,
    volChart,
    liqChart,
    lpTokenContract,
    lpUserBalance,
  },
  earnGovToken,
  clr,
}) => {
  const { library } = useWeb3React();
  const [windowExpanded, setWindowExpanded] = useState(false);
  const [rewardPerBlockAgo, setRewardPerBlockAgo] = useState(0);
  const { theme } = useThemeContext();
  const tabColor = {
    color: clr,
  };

  useEffect(() => {
    if (isEarnAgo && earnGovToken) {
      const poolAddress = LP_STAKING_POOL.find(
        (item) => item.name === `${token0.symbol}-${token1.symbol}`
      ).address;
      const poolContract = new library.eth.Contract(STAKING_ABI, poolAddress);
      poolContract.methods
        .rewardPerBlock()
        .call()
        .then((res) => setRewardPerBlockAgo(formatFromDecimal(res, 18)));
    }
  }, []);

  const renderLiquidityInfo = (ml) => (
    <ThemeProvider theme={tabColor}>
      <LiquidityInfoContainer ml={ml}>
        <HDiv justifyContent="space-between" alignItems="center">
          <Text>Liquidity</Text>
          <Text>
            <b>${liqiuidityUSD}</b>
          </Text>
        </HDiv>
        <Divider />
        <HDiv justifyContent="space-between" alignItems="center">
          <Text>Volume (24H)</Text>
          <Text>
            <b>$volume</b>
          </Text>
        </HDiv>
        <Divider />
        <HDiv justifyContent="space-between" alignItems="center">
          <Text>Earnings (24H)</Text>
          <Text>
            <b>$51,544</b>
          </Text>
        </HDiv>
        <Divider />
        <HDiv justifyContent="space-between" alignItems="center">
          <Text>Total APR </Text>
          <Text>
            <b>{apr.toFixed(2)}%</b>
          </Text>
        </HDiv>
        <Divider />
        <HDiv justifyContent="space-between" alignItems="center">
          <Text>Liquidity</Text>
          <Text>
            <b>${myLiquidity}</b>
          </Text>
        </HDiv>
      </LiquidityInfoContainer>
    </ThemeProvider>
  );

  return (
    <>
      <ThemeProvider theme={tabColor}>
        <LiquidityPoolsItemContainer
          id={`item_${address}`}
          isExpanded={windowExpanded}
          onClick={(e) =>
            e.target.id.includes("item_0x")
              ? setWindowExpanded(!windowExpanded)
              : null
          }
        >
          <div style={{ position: "relative" }}>
            <HDiv
              alignItems="center"
              onClick={() => setWindowExpanded(!windowExpanded)}
              style={{cursor: "pointer"}}
            >
              <IconWrapper mr="0.417vw">
                <TokenIcon iconName={token0.symbol} />
              </IconWrapper>
              <IconWrapper mr="0.990vw">
                <TokenIcon iconName={token1.symbol} />
              </IconWrapper>
              <Text minW="19.917vw">
                <b>
                  {token0.symbol}-{token1.symbol}
                </b>
              </Text>
              <Text minW="16.917vw">
                <b>{liqiuidityUSD}$ </b>
              </Text>
              <Text minW="12.6vw">
                <b>{myLiquidity === 0 ? `0$` : `${myLiquidity}$`} </b>
              </Text>
              <AprValueWrapper>
                {earnGovToken
                  ? formattedNum(rewardPerBlockAgo) + " AGOy"
                  : apr.toFixed(2) + "%"}
              </AprValueWrapper>
              <div style={{ width: "2.552vw" }}>
                {isEarnAgo ? (
                  earnGovToken ? (
                    <IconWrapper
                      left="2.8vw"
                      w="3.3vw"
                      h="3.3vw"
                      withoutWrapper
                    >
                      <TokenIcon iconName={"AGOyX2"} />
                    </IconWrapper>
                  ) : token1.symbol === "CNBTC" ? (
                    <IconWrapper left="2.8vw">
                      <TokenIcon iconName={"CNBTC"} />
                    </IconWrapper>
                  ) : (
                    <IconWrapper left="2.8vw">
                      <TokenIcon iconName={"CNUSD"} />
                    </IconWrapper>
                  )
                ) : null}
              </div>
              <ToggleExpandBtn
                onClick={() => setWindowExpanded(!windowExpanded)}
              >
                {windowExpanded ? <CloseIcon /> : <ChartLineIcon />}
              </ToggleExpandBtn>
            </HDiv>
            {windowExpanded ? (
              <ExpandedDataWrapper onclick="event.stopPropagation()">
                <Tabs defaultValue={0}>
                  <TabsList
                    style={{
                      color: clr
                        ? "#fff"
                        : theme === "light"
                        ? "#333"
                        : "#fff",
                    }}
                  >
                    <Tab>Provide Liquidity</Tab>
                    <Tab>Volume</Tab>
                    <Tab>Liquidity</Tab>
                    <Tab>Transactions</Tab>
                    {clr ? <Tab>Stake Lp</Tab> : null}
                  </TabsList>
                  <TabPanel value={0}>
                    <ProvideLiquidity
                      token0={token0}
                      token1={token1}
                      poolAddress={address}
                      lpTokenContract={lpTokenContract}
                      lpUserBalance={lpUserBalance}
                      lpTokenAddress={address}
                    />
                  </TabPanel>
                  <TabPanel value={1}>
                    <TabContentWrapper>
                      <Volume data={volChart} color={clr}/>
                      {renderLiquidityInfo("8.021vw")}
                    </TabContentWrapper>
                  </TabPanel>
                  <TabPanel value={2}>
                    <TabContentWrapper>
                      <Liquidity data={liqChart} />
                      {renderLiquidityInfo("17.813vw")}
                    </TabContentWrapper>
                  </TabPanel>
                  <TabPanel value={3}>
                    <Transactions token0={token0} token1={token1} />
                  </TabPanel>
                  <TabPanel value={4}>
                    <TabContentWrapper>
                      <StakeLp
                        token0={token0}
                        token1={token1}
                        lpTokenContract={lpTokenContract}
                        lpUserBalance={lpUserBalance}
                        lpTokenAddress={address}
                      />
                      {renderLiquidityInfo("1.823vw")}
                    </TabContentWrapper>
                  </TabPanel>
                </Tabs>
              </ExpandedDataWrapper>
            ) : null}
          </div>
        </LiquidityPoolsItemContainer>
      </ThemeProvider>
    </>
  );
};
