/* eslint-disable no-unused-vars */
import React from "react";
import ExitIcon from "./ExitIcon";
import SwapIcon from "./SwapIcon";
import setting_cog from "../../../assets/icons/setting-cog.svg";
import {
  CurrencySwitchModalContainer,
  Divider,
  HDiv,
  ModalButton,
  Text,
  IOSSwitch,
} from "./styled";
import { CurrencySwitchModalContent } from "./styled";

const CurrencySwitchModal = ({
  mintRedeemCurrency,
  setMintRedeemCurrency,
  mintRedeemSlipage,
  setMintRedeemSlipage,
}) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // TODO: Should be slippage here.

  const handleSlippageChange = (value) => {
    if (value > 100) {
      setMintRedeemSlipage(100);
    } else if (value < 0) {
      setMintRedeemSlipage(0);
    } else if (value === "") {
      setMintRedeemSlipage(0);
    } else {
      setMintRedeemSlipage(parseInt(value));
    }
  };

  return (
    <div>
      <ModalButton onClick={handleOpen}>
        <img src={setting_cog} alt="settings" />
      </ModalButton>
      <CurrencySwitchModalContainer
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <CurrencySwitchModalContent>
          <ExitIcon
            onClick={handleClose}
            style={{
              cursor: "pointer",
              alignSelf: "flex-end",
              marginRight: "-1.302vw",
            }}
          />
          <Text fontSize="0.938vw" lineHeight="1.406vw" fontWeight={400}>
            Switch between
          </Text>
          <HDiv>
            <Text>AGOUSD</Text>
            <SwapIcon />
            <Text>AGOBTC</Text>
          </HDiv>
          <Divider />
          <IOSSwitch
            checked={mintRedeemCurrency === "AGOBTC" ? true : false}
            onChange={() =>
              setMintRedeemCurrency(
                mintRedeemCurrency === "AGOUSD" ? "AGOBTC" : "AGOUSD"
              )
            }
          />
          {/* <span> Set slippage: </span>
          <input
            type="number"
            min={0}
            max={100}
            onChange={(e) => handleSlippageChange(e.target.value)}
            value={mintRedeemSlipage}
          /> */}
        </CurrencySwitchModalContent>
      </CurrencySwitchModalContainer>
    </div>
  );
};

export default CurrencySwitchModal;
