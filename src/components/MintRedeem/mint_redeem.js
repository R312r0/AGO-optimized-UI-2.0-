import "./mint_redeem.scss";

import { CONTRACT_ADRESESS, LOADER_INDICATOR_LOCAL } from "../../constants";
import {
  ContactLinkContainer,
  Dot,
  ExchangeContainer,
  HeadingText,
  MintRedeemInfoContainer,
  MintRedeemSwitcher,
  MintingRedeemingContainer,
  NoWalletWarnWindowContainer,
  SwithButton,
  Text,
} from "./styled";
import { Layout, useThemeContext } from "../Layout/layout";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { formatFromDecimal, formattedNum } from "../../utils/helpers";

import { CurrencySwitchModal } from "./CurrencySwitchModal/currency-switch-modal";
import Mint from "./Mint/mint";
import { Redeem } from "./Redeem/redeem";
import { Spin } from "antd";
import { TokenIcon } from "../TokenIcon/token_icon";
import { useSystemContext } from "../../systemProvider";
import { useWeb3React } from "@web3-react/core";

export const MintRedeem = () => {
  const [activeTab, setActiveTab] = useState("Mint");
  const [mintRedeemInfo, setMintRedeemInfo] = useState(null);
  const { account, library } = useWeb3React();
  const { contracts, setIsWalletModal, balances } = useSystemContext();
  const { theme } = useThemeContext();
  // const [connectWalletThumb, setConnectWalletThumb] = useState()
  const [mintRedeemCurrencyModal, setMintRedeemCurrencyModal] = useState(false);
  const [mintRedeemCurrency, setMintRedeemCurrency] = useState("AGOUSD");
  const [mintRedeemSlipage, setMintRedeemSlipage] = useState(0.3);

  useEffect(() => {
    if (account && contracts && balances) {
      getMintRedeemInfo(mintRedeemCurrency);
    } else {
    }
  }, [mintRedeemCurrency, account, contracts, balances]);

  const getMintRedeemInfo = useCallback(
    async (currency) => {
      let info;
      let poolBalance;
      let collateralPrice;

      if (currency === "AGOUSD") {
        info = await contracts.TREASURY_AGOUSD.methods.info(account).call();
        collateralPrice = await contracts.POOL_AGOUSD.methods
          .getCollateralPrice()
          .call();
        poolBalance = formatFromDecimal(
          await contracts.POOL_AGOUSD.methods.collateralDollarBalance().call(),
          18
        );
      } else {
        info = await contracts.TREASURY_AGOBTC.methods.info(account).call();
        collateralPrice = await contracts.POOL_AGOBTC.methods
          .getCollateralPrice()
          .call();
        poolBalance = formatFromDecimal(
          await contracts.POOL_AGOBTC.methods.collateralDollarBalance().call(),
          18
        );
      }

      setMintRedeemInfo({
        stablePrice: formatFromDecimal(info["0"], 6),
        sharePrice: formatFromDecimal(info["1"], 6),
        collateralPrice: formatFromDecimal(collateralPrice, 6),
        globalCollateralValue: info["4"],
        targetCollateralRatio: formatFromDecimal(info["2"], 6) * 100,
        effectiveCollateralRatio: formatFromDecimal(info["3"], 6) * 100,
        mintFee: formatFromDecimal(info["5"], 6) * 100,
        redeemFee: formatFromDecimal(info["6"], 6) * 100,
        poolBalance,
      });
    },
    [account, contracts]
  );

  return (
    <>
      {!account ? (
        <NoWalletWarnWindowContainer>
          <HeadingText>Please connect wallet to view this page!</HeadingText>
          <button onClick={() => setIsWalletModal(true)}>Connect Wallet</button>
        </NoWalletWarnWindowContainer>
      ) : (
        <>
          {mintRedeemInfo ? (
            <>
              <MintingRedeemingContainer>
                <HeadingText>Minting/Redeeming</HeadingText>
                <MintRedeemInfoContainer>
                  <Text>
                    {activeTab === "Mint" ? "Minting" : "Redeem"} fee: &nbsp;
                    <b>
                      {activeTab === "Mint"
                        ? mintRedeemInfo.mintFee
                        : mintRedeemInfo.redeemFee}
                      %
                    </b>
                  </Text>
                  <Dot />
                  <Text>
                    Pool balance: &nbsp;
                    <b>${formattedNum(mintRedeemInfo.poolBalance)}</b>
                  </Text>
                  <Dot />
                  <Text>
                    Slippage: &nbsp;
                    <b>{mintRedeemSlipage}%</b>
                  </Text>
                  <Dot />
                  <Text>
                    Rates: &nbsp;
                    <b>1 &nbsp;</b>
                    <Text color="#40ba93">{mintRedeemCurrency}</Text>
                    <b>
                      &nbsp; = &nbsp;
                      {mintRedeemCurrency === "AGOUSD"
                        ? mintRedeemInfo.stablePrice
                        : mintRedeemInfo.stablePrice /
                          mintRedeemInfo.collateralPrice}{" "}
                      &nbsp;
                    </b>
                    <Text color="#40ba93">
                      {mintRedeemCurrency === "AGOUSD" ? "USDT" : "WBTC"}
                    </Text>
                  </Text>
                  <ContactLinkContainer>
                    <a href="https://polygonscan.com/">
                      View contracts on PolygonScan
                    </a>
                    <i className="fas fa-external-link-alt"></i>
                  </ContactLinkContainer>
                </MintRedeemInfoContainer>
                <MintRedeemSwitcher>
                  <SwithButton
                    onClick={() => setActiveTab("Mint")}
                    isActive={activeTab === "Mint"}
                  >
                    Mint
                  </SwithButton>
                  <SwithButton
                    onClick={() => setActiveTab("Redeem")}
                    isActive={activeTab === "Redeem"}
                  >
                    Redeem
                  </SwithButton>
                </MintRedeemSwitcher>
                <ExchangeContainer>
                  {activeTab === "Mint" ? (
                    <Mint
                      info={mintRedeemInfo}
                      mintRedeemCurrency={mintRedeemCurrency}
                      setMintRedeemCurrencyModal={setMintRedeemCurrencyModal}
                    />
                  ) : (
                    <Redeem
                      info={mintRedeemInfo}
                      mintRedeemCurrency={mintRedeemCurrency}
                      setMintRedeemCurrencyModal={setMintRedeemCurrencyModal}
                    />
                  )}
                </ExchangeContainer>
              </MintingRedeemingContainer>
            </>
          ) : (
            <Spin indicator={LOADER_INDICATOR_LOCAL} />
          )}
        </>
      )}
      <CurrencySwitchModal
        mintRedeemCurrency={mintRedeemCurrency}
        setMintRedeemCurrency={setMintRedeemCurrency}
        mintRedeemSlipage={mintRedeemSlipage}
        setMintRedeemSlipage={setMintRedeemSlipage}
        mintRedeemCurrencyModal={mintRedeemCurrencyModal}
        setMintRedeemCurrencyModal={setMintRedeemCurrencyModal}
      />
    </>
  );
};

export default MintRedeem;
