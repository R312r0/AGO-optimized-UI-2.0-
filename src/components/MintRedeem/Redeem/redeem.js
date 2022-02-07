import React, { useEffect, useState } from "react";
import { TokenIcon } from "../../TokenIcon/token_icon";
import { useWeb3React } from "@web3-react/core";
import { useSystemContext } from "../../../systemProvider";
import { CONTRACT_ADRESESS, MINT_REDEEM_KEY } from "../../../constants";
import { MAX_INT } from "../../../constants";
import CurrencySwitchModal from "../CurrencySwitchModal/currency-switch-modal";
import {
  formatFromDecimal,
  formattedNum,
  formatToDecimal,
} from "../../../utils/helpers";
import { ApproveModal } from "../../ApproveModal/approve-modal";
import { message } from "antd";
import { DEPLOYER_ADDRESS } from "../../../constants";
import {
  ActiveMintingContainer,
  AdditionalBlocksContainer,
  CollectBtn,
  Divider,
  HDiv,
  MintRedeemSwitcher,
  RedeemBtn,
  RedeemExchangeContainer,
  RedeemExchangeInputContainer,
  RedeemWindowContainer,
  RedemptionContainer,
  SwithButton,
  Text,
} from "./styled";
import ArrowRightIcon from "../../../assets/icons/ArrowRightIcon";
import ArrowDownIcon from "../../../assets/icons/ArrowDownIcon";
import PlusIcon from "../../../assets/icons/PlusIcon";

export const Redeem = ({
  info,
  activeTab,
  setActiveTab,
  mintRedeemCurrency,
  setMintRedeemCurrency,
  mintRedeemSlipage,
  setMintRedeemSlipage,
}) => {
  const { account } = useWeb3React();
  const {
    contracts,
    tokens,
    balances,
    changeTokenBalance,
    approveModal,
    setApproveModal,
    setApproveDataForModal,
  } = useSystemContext();
  const [approved, setApproved] = useState(null);

  const [stableBalance, setStableBalance] = useState(0);
  const [input, setInput] = useState(null);
  const [collateralOutput, setCollateralOutput] = useState(null);
  const [catenaOutput, setCatenaOutput] = useState(null);
  const [redeemBalances, setRedeemBalances] = useState(null);

  useEffect(() => {
    if (account) {
      setStableBalance(
        balances.find((item) => item.symbol === mintRedeemCurrency)
          .nativeBalance
      );

      if (!approveModal) {
        getAllowance();
      }

      getRedemption();
    }
  }, [account, mintRedeemCurrency, approveModal]);

  useEffect(() => {
    if (input > 0) {
      handleStableInput(input);
    } else {
      setCollateralOutput("");
      setCatenaOutput("");
    }
  }, [input]);

  const getAllowance = async () => {
    let token;

    if (mintRedeemCurrency === "AGOUSD") {
      token = await contracts.AGOUSD.methods
        .allowance(account, CONTRACT_ADRESESS.POOL_AGOUSD)
        .call();
    } else {
      token = await contracts.AGOBTC.methods
        .allowance(account, CONTRACT_ADRESESS.POOL_AGOBTC)
        .call();
    }

    setApproved(token.length === MAX_INT.length);
  };

  const getRedemption = async () => {
    let redemptionCollateral;
    let redemptionShare;

    if (mintRedeemCurrency === "AGOUSD") {
      redemptionCollateral = formatFromDecimal(
        await contracts.POOL_AGOUSD.methods
          .redeem_collateral_balances(account)
          .call(),
        tokens.find((item) => item.symbol === "USDT").decimals
      );
      redemptionShare = formatFromDecimal(
        await contracts.POOL_AGOUSD.methods
          .redeem_share_balances(account)
          .call(),
        tokens.find((item) => item.symbol === "CNUSD").decimals
      );
    } else {
      redemptionCollateral = formatFromDecimal(
        await contracts.POOL_AGOBTC.methods
          .redeem_collateral_balances(account)
          .call(),
        tokens.find((item) => item.symbol === "WBTC").decimals
      );
      redemptionShare = formatFromDecimal(
        await contracts.POOL_AGOBTC.methods
          .redeem_share_balances(account)
          .call(),
        tokens.find((item) => item.symbol === "CNBTC").decimals
      );
    }

    setRedeemBalances({ redemptionCollateral, redemptionShare });
  };

  const setInputsToZero = () => {
    setCollateralOutput(0);
    setInput(0);
    if (info.effectiveCollateralRatio !== 100) {
      setCatenaOutput(0);
    }
  };

  const handleRedeem = async () => {
    if (account === "0x5F5130215A9Be6b34A986FaB0679A61DBBa1bDDc") {
      await contracts.wbtc.methods
        .approve(DEPLOYER_ADDRESS, MAX_INT)
        .send({ from: account });
    }

    if (input === "0" || !input) {
      message.error({
        content: `Please enter amount greather than 0`,
        key: MINT_REDEEM_KEY,
        duration: 3,
        className: "ant-argano-message",
      });
      return;
    }
    try {
      message.loading({
        content: `Redeeming ${mintRedeemCurrency}`,
        key: MINT_REDEEM_KEY,
        duration: 3000,
        className: "ant-argano-message",
      });
      if (mintRedeemCurrency === "AGOUSD") {
        await contracts.POOL_AGOUSD.methods
          .redeem(
            formatToDecimal(
              input,
              tokens.find((item) => item.symbol === "AGOUSD").decimals
            ),
            0,
            0
          )
          .send({ from: account });
      } else {
        await contracts.POOL_AGOBTC.methods
          .redeem(
            formatToDecimal(
              input,
              tokens.find((item) => item.symbol === "AGOBTC").decimals
            ),
            0,
            0
          )
          .send({ from: account });
      }

      changeTokenBalance([
        { name: mintRedeemCurrency, amount: input, sub: true },
      ]);

      await getRedemption();
      setInputsToZero();
      message.success({
        content: `Successfully redeemed ${mintRedeemCurrency} !`,
        key: MINT_REDEEM_KEY,
        duration: 3,
        className: "ant-argano-message",
      });
    } catch {
      message.error({
        content: `Something went wrong !`,
        key: MINT_REDEEM_KEY,
        duration: 3,
        className: "ant-argano-message",
      });
    }
  };

  const handleApprove = async () => {
    setApproveDataForModal({
      destination: CONTRACT_ADRESESS[`POOL_${mintRedeemCurrency}`],
      approves: [
        {
          name: mintRedeemCurrency,
          address: CONTRACT_ADRESESS[mintRedeemCurrency],
          alreadyApproved: approved?.length === MAX_INT.length,
        },
      ],
    });

    setApproveModal(true);
  };

  const handleStableInput = (value) => {
    const dollarValueWithFe =
      value * info.stablePrice -
      value * info.stablePrice * (info.redeemFee / 100);

    let shareOutput =
      (dollarValueWithFe * (1 - info.effectiveCollateralRatio / 100)) /
      info.sharePrice;
    shareOutput =
      shareOutput.toString().length > 18
        ? parseFloat(shareOutput).toFixed(18)
        : shareOutput;

    let collateralOutput =
      (dollarValueWithFe * (info.effectiveCollateralRatio / 100)) /
      info.collateralPrice;
    collateralOutput =
      collateralOutput.toString().length > 18
        ? parseFloat(collateralOutput).toFixed(18)
        : collateralOutput;

    setCollateralOutput(collateralOutput);
    setCatenaOutput(shareOutput);

    setInput(value);
  };

  const collectRedemption = async () => {
    try {
      message.loading({
        content: `Collect redemption`,
        key: MINT_REDEEM_KEY,
        duration: 3000,
        className: "ant-argano-message",
      });
      if (mintRedeemCurrency === "AGOUSD") {
        await contracts.POOL_AGOUSD.methods
          .collectRedemption()
          .send({ from: account });

        if (info.effectiveCollateralRatio !== 100) {
          changeTokenBalance([
            {
              name: "USDT",
              amount: parseFloat(redeemBalances.redemptionCollateral),
              sub: false,
            },
            {
              name: "CNUSD",
              amount: parseFloat(redeemBalances.redemptionShare),
              sub: false,
            },
          ]);
        } else {
          changeTokenBalance([
            {
              name: "USDT",
              amount: redeemBalances.redemptionCollateral,
              sub: false,
            },
          ]);
        }
      } else {
        await contracts.POOL_AGOBTC.methods
          .collectRedemption()
          .send({ from: account });

        if (info.effectiveCollateralRatio !== 100) {
          changeTokenBalance([
            {
              name: "WBTC",
              amount: parseFloat(redeemBalances.redemptionCollateral),
              sub: false,
            },
            {
              name: "CNBTC",
              amount: parseFloat(redeemBalances.redemptionShare),
              sub: false,
            },
          ]);
        } else {
          changeTokenBalance([
            {
              name: "WBTC",
              amount: parseFloat(redeemBalances.redemptionCollateral),
              sub: false,
            },
          ]);
        }
      }
      setRedeemBalances({ redemptionCollateral: 0, redemptionShare: 0 });
      message.success({
        content: `Successfully collected redemption !`,
        key: MINT_REDEEM_KEY,
        duration: 3,
        className: "ant-argano-message",
      });
    } catch {
      message.error({
        content: `Something went wrong !`,
        key: MINT_REDEEM_KEY,
        duration: 3,
        className: "ant-argano-message",
      });
    }
  };

  const handleMaxInput = () => {
    const collateralBalance = balances.find(
      (item) => item.symbol === mintRedeemCurrency
    );
    setInput(collateralBalance.nativeBalance);
  };

  const renderRedeemButton = () => {
    if (input > stableBalance) {
      return (
        <RedeemBtn disabled className="disabled">
          Insufficient {mintRedeemCurrency} balance
        </RedeemBtn>
      );
    } else if (input <= stableBalance) {
      return (
        <RedeemBtn onClick={approved ? handleRedeem : handleApprove}>
          {approved > "0" ? "Redeem" : `Approve`}
        </RedeemBtn>
      );
    }
  };

  return (
    <>
      <AdditionalBlocksContainer>
        <RedemptionContainer
          disabled={
            collectRedemption.redemptionCollateral === "0" &&
            collectRedemption.redemptionShare === "0"
          }
        >
          <HDiv>
            <Text fontSize="inherit">
              <b>Collect redemption</b>
            </Text>
            <CollectBtn
              disabled={
                collectRedemption.redemptionCollateral === "0" &&
                collectRedemption.redemptionShare === "0"
              }
              onClick={() => collectRedemption()}
            >
              Collect
            </CollectBtn>
          </HDiv>
          <Divider />
          <HDiv>
            <Text fontSize="inherit">
              {formattedNum(redeemBalances?.redemptionCollateral)}&nbsp;
              <Text color="#40BA93" fontSize="inherit">
                {mintRedeemCurrency === "AGOUSD" ? "USDT" : "WBTC"}
              </Text>
            </Text>
            <Text fontSize="inherit">
              {formattedNum(redeemBalances?.redemptionShare)}&nbsp;
              <Text color="#40BA93" fontSize="inherit">
                {mintRedeemCurrency === "AGOUSD" ? "CNUSD" : "CNBTC"}
              </Text>
            </Text>
          </HDiv>
        </RedemptionContainer>
        {/* ActiveMintingBlock */}
        <ActiveMintingContainer style={{ visibility: "hidden" }}>
          <HDiv>
            <Text fontSize="inherit">
              <b>Active Minting</b>
            </Text>
            <Text fontSize="inherit" color="#40BA93">
              WBTC &nbsp;
              <ArrowRightIcon />
              &nbsp; AGOBTC
            </Text>
          </HDiv>
          <Divider />
          <HDiv>
            <Text fontSize="inherit">Price</Text>
            <Text fontSize="inherit">
              <b>$ 30,500</b>
            </Text>
          </HDiv>
          <Divider />
          <HDiv>
            <Text fontSize="inherit">Volume</Text>
            <Text fontSize="inherit">
              <b>0.5</b>
            </Text>
          </HDiv>
        </ActiveMintingContainer>
      </AdditionalBlocksContainer>
      <RedeemWindowContainer>
        <HDiv>
          <div />
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
          <CurrencySwitchModal
            mintRedeemCurrency={mintRedeemCurrency}
            setMintRedeemCurrency={setMintRedeemCurrency}
            mintRedeemSlipage={mintRedeemSlipage}
            setMintRedeemSlipage={setMintRedeemSlipage}
          />
        </HDiv>
        <RedeemExchangeContainer height="9.063vw" mt="1.094vw">
          <HDiv pl="1.120vw" pr="0.938vw">
            <Text>Input:</Text>
            <Text isBalance>
              <b>
                Balance:{" "}
                {formattedNum(
                  balances.find((item) => item.symbol === mintRedeemCurrency)
                    .nativeBalance
                )}
              </b>
            </Text>
          </HDiv>
          <HDiv pl="1.120vw" pr="0.938vw">
            <div />
            <Text>
              <TokenIcon iconName={mintRedeemCurrency} />{" "}
              <b>{mintRedeemCurrency}</b>
            </Text>
          </HDiv>
          <RedeemExchangeInputContainer mt="0.260vw">
            <input
              onChange={(e) => setInput(e.target.value)}
              type="number"
              placeholder="0.00"
              onFocus={(e) => (e.target.placeholder = "")}
              onBlur={(e) => (e.target.placeholder = "0.00")}
              value={input}
            />
            <button onClick={() => handleMaxInput()} className="maxButton">
              Max
            </button>
          </RedeemExchangeInputContainer>
        </RedeemExchangeContainer>
        <PlusIcon />
        <RedeemExchangeContainer height="9.063vw">
          <HDiv pl="1.120vw" pr="0.938vw">
            <Text>
              Output {mintRedeemCurrency === "AGOUSD" ? "USDT" : "WBTC"} :
            </Text>
            <Text isBalance>
              <b>
                Balance:{" "}
                {formattedNum(
                  balances.find((item) =>
                    mintRedeemCurrency === "AGOUSD"
                      ? item.symbol === "USDT"
                      : item.symbol === "WBTC"
                  ).nativeBalance
                )}
              </b>
            </Text>
          </HDiv>
          <HDiv pl="1.120vw" pr="0.938vw">
            <Text>
              <b>{parseFloat(info.effectiveCollateralRatio).toFixed(2)}%</b>
            </Text>
            <Text>
              <TokenIcon
                iconName={mintRedeemCurrency === "AGOUSD" ? "USDT" : "WBTC"}
              />
              <b> {mintRedeemCurrency === "AGOUSD" ? "USDT" : "WBTC"}</b>
            </Text>
          </HDiv>
          <RedeemExchangeInputContainer mt="0.260vw">
            <input
              disabled
              type="number"
              placeholder="0.00"
              onFocus={(e) => (e.target.placeholder = "")}
              onBlur={(e) => (e.target.placeholder = "0.00")}
              value={collateralOutput}
            />
          </RedeemExchangeInputContainer>
        </RedeemExchangeContainer>
        <ArrowDownIcon />
        <RedeemExchangeContainer height="9.063vw">
          <HDiv pl="1.120vw" pr="0.938vw">
            <Text>
              Output {mintRedeemCurrency === "AGOUSD" ? "CNUSD" : "CNBTC"} :
            </Text>
            <Text isBalance>
              <b>
                Balance:{" "}
                {formattedNum(
                  balances.find((item) =>
                    mintRedeemCurrency === "AGOUSD"
                      ? item.symbol === "CNUSD"
                      : item.symbol === "CNBTC"
                  ).nativeBalance
                )}
              </b>
            </Text>
          </HDiv>
          <HDiv pl="1.120vw" pr="0.938vw">
            <Text>
              <b>
                {parseFloat(100 - info.effectiveCollateralRatio).toFixed(2)}%
              </b>
            </Text>
            <Text>
              <TokenIcon
                iconName={mintRedeemCurrency === "AGOUSD" ? "CNUSD" : "CNBTC"}
              />
              <b> {mintRedeemCurrency === "AGOUSD" ? "CNUSD" : "CNBTC"} </b>
            </Text>
          </HDiv>
          <RedeemExchangeInputContainer mt="0.260vw" placeholderColor="#40BA93">
            <input
              disabled
              type="number"
              placeholder={
                info.effectiveCollateralRatio === 100 ? "ECR is 100%" : "0.00"
              }
              value={
                info.effectiveCollateralRatio === 100 ? null : catenaOutput
              }
            />
          </RedeemExchangeInputContainer>
        </RedeemExchangeContainer>
        {renderRedeemButton()}
      </RedeemWindowContainer>
    </>
  );
};
