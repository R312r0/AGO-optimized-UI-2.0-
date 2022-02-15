import {
  BtnWrapper,
  ChartBtn,
  HDiv,
  IconWrapper,
  LiquidityPoolsInputContainer,
  PieChartContainer,
  ProvideLiquidityContainer,
  ProvideLiquidityInfoContainer,
  Text,
} from "./styled";
import { DEX_ADDRESESS, MAX_INT, MINT_REDEEM_KEY } from "../../../constants";
import React, { useEffect, useState } from "react";
import { formatToDecimal, formattedNum } from "../../../utils/helpers";

import { DEPLOYER_ADDRESS } from "../../../constants";
import ProvideLiquidityPieChart from "../ProvideLiqPieChart/provide-liquidity-pie-chart";
import { RemoveLiquidityModal } from "../RemoveLiquidityModal/remove-liquidity-modal";
import { TokenIcon } from "../../TokenIcon/token_icon";
import { message } from "antd";
import { useSystemContext } from "../../../systemProvider";
import { useWeb3React } from "@web3-react/core";

export const ProvideLiquidity = ({
  token0,
  token1,
  poolAddress,
  lpTokenContract,
  lpUserBalance,
  lpTokenAddress,
  color,
}) => {
  const { account } = useWeb3React();
  const {
    contracts,
    changeTokenBalance,
    approveModal,
    setApproveModal,
    setApproveDataForModal,
  } = useSystemContext();
  const [input0, setInput0] = useState(null);
  const [input1, setInput1] = useState(null);
  const [usdValue, setUsdValue] = useState(0);
  const [allowance, setAllowance] = useState({
    token0: false,
    token1: false,
  });

  useEffect(() => {
    if (account) {
      if (!approveModal) {
        checkAllowance();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, approveModal]);

  const handleInput0 = (value) => {
    setInput0(value);
    const priceForEquality = value * parseFloat(token0.price);
    const token1Amount = value * parseFloat(token0.priceInToken1);

    setInput1(token1Amount);
    setUsdValue(priceForEquality * 2);
  };

  const handleInput1 = (value) => {
    setInput1(value);
    setInput0(0);
    const priceForEquality = value * token1.price;
    const token0Amount = value / token1.priceInToken0;
    setInput0(token0Amount);
    setUsdValue(formattedNum(priceForEquality * 2));
  };

  const checkAllowance = async () => {
    const tokenContract0 = contracts[token0.symbol];
    const tokenContract1 = contracts[token1.symbol];

    const allowance0 =
      (
        await tokenContract0.methods
          .allowance(account, DEX_ADDRESESS.ROUTER)
          .call()
      ).length === MAX_INT.length;
    const allowance1 =
      (
        await tokenContract1.methods
          .allowance(account, DEX_ADDRESESS.ROUTER)
          .call()
      ).length === MAX_INT.length;

    setAllowance({
      token0: allowance0,
      token1: allowance1,
    });
  };

  const provideLiquidity = async () => {
    try {
      message.loading({
        content: "Provide Liquidity in process",
        className: "ant-argano-message",
        key: MINT_REDEEM_KEY,
        duration: 3000,
      });

      await contracts.ROUTER.methods
        .addLiquidity(
          token0.address,
          token1.address,
          formatToDecimal(input0, 18),
          formatToDecimal(input1, 18),
          0,
          0,
          account,
          9999999999
        )
        .send({ from: account });

      message.success({
        content: "Provide Liquidity is done!",
        className: "ant-argano-message",
        key: MINT_REDEEM_KEY,
        duration: 5,
      });

      changeTokenBalance([
        { name: token0.symbol, amount: input0, sub: true },
        { name: token1.symbol, amount: input1, sub: true },
      ]);
    } catch (e) {
      message.error({
        content: `Some error occured: ${e.message}`,
        className: "ant-argano-message",
        key: MINT_REDEEM_KEY,
        duration: 5,
      });
    }

    setInput0(0);
    setInput1(0);
  };

  const renderChartButtons = () => {
    return (
      <BtnWrapper>
        <RemoveLiquidityModal
          token0={token0}
          token1={token1}
          poolAddress={poolAddress}
          lpTokenContract={lpTokenContract}
          lpUserBalance={lpUserBalance}
          lpTokenAddress={lpTokenAddress}
        />
        {allowance.token0 && allowance.token1 ? (
          <ChartBtn onClick={() => provideLiquidity()}> Provide </ChartBtn>
        ) : (
          <ChartBtn onClick={() => handleApprove()}> Approve </ChartBtn>
        )}
      </BtnWrapper>
    );
  };

  const handleApprove = async () => {
    setApproveDataForModal({
      destination: DEX_ADDRESESS.ROUTER,
      approves: [
        {
          name: token0.symbol,
          address: token0.address,
          alreadyApproved: allowance.token0,
        },
        {
          name: token1.symbol,
          address: token1.address,
          alreadyApproved: allowance.token1,
        },
      ],
    });

    setApproveModal(true);
  };

  return (
    <>
      <ProvideLiquidityContainer>
        <ProvideLiquidityInfoContainer>
          <HDiv>
            <Text>{token0.symbol}</Text>
          </HDiv>
          <HDiv alignItems="center">
            <IconWrapper>
              <TokenIcon iconName={token0.symbol} />
            </IconWrapper>
            <Text minW="5.208vw">
              <b>{token0.symbol}</b>
            </Text>
            <LiquidityPoolsInputContainer>
              <input
                type="number"
                onChange={(e) => handleInput0(e.target.value)}
                value={input0}
                placeholder={`Enter ${token0.symbol} amout`}
                onFocus={(e) => (e.target.placeholder = "")}
                onBlur={(e) =>
                  (e.target.placeholder = `Enter ${token0.symbol} amout`)
                }
              />
            </LiquidityPoolsInputContainer>
            <Text ml="1.771vw">=${formattedNum(token0.price)}</Text>
          </HDiv>
          <HDiv mt="1.719vw">
            <Text>{token1.symbol}</Text>
          </HDiv>
          <HDiv alignItems="center">
            <IconWrapper>
              <TokenIcon iconName={token1.symbol} />
            </IconWrapper>
            <Text minW="5.208vw">
              <b>{token1.symbol}</b>
            </Text>
            <LiquidityPoolsInputContainer>
              <input
                type="number"
                placeholder={`Enter ${token1.symbol} amout`}
                onFocus={(e) => (e.target.placeholder = "")}
                onBlur={(e) =>
                  (e.target.placeholder = `Enter ${token1.symbol} amout`)
                }
                onChange={(e) => handleInput1(e.target.value)}
                value={input1}
              />
            </LiquidityPoolsInputContainer>
            <Text ml="1.771vw">=${formattedNum(token1.price)}</Text>
          </HDiv>
          <HDiv alignItems="center" justifyContent="space-between" mt="2.396vw">
            <Text fontSize="0.625vw" fontWeight="300" color="#fff">
              USD Value
            </Text>
            <Text fontSize="0.625vw" fontWeight="300" color="#828282">
              Max: = -$140.26
            </Text>
          </HDiv>
          <HDiv alignItems="center">
            <Text>
              <b>{formattedNum(usdValue)}$</b>
            </Text>
          </HDiv>
        </ProvideLiquidityInfoContainer>
        <PieChartContainer>
          <ProvideLiquidityPieChart />
          {renderChartButtons()}
        </PieChartContainer>
      </ProvideLiquidityContainer>
    </>
  );
};
