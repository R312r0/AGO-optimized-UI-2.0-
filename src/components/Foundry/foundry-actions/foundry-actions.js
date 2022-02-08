import {
  CONTRACT_ADRESESS,
  MAX_INT,
  MINT_REDEEM_KEY,
} from "../../../constants";
import {
  Divider,
  FoundryActionsBtnWrapper,
  FoundryActionsContainer,
  FoundryActionsInputContainer,
  FoundryActionsItem,
  FoundryActionsItemLabel,
  HDiv,
  Text,
} from "./styled";
import React, { useEffect, useState } from "react";
import {
  formatFromDecimal,
  formatToDecimal,
  formattedNum,
} from "../../../utils/helpers";

import { TokenIcon } from "../../TokenIcon/token_icon";
import { message } from "antd";
import { useSystemContext } from "../../../systemProvider";
import { useWeb3React } from "@web3-react/core";

const FoundryActions = () => {
  const {
    contracts,
    tokens,
    balances,
    changeTokenBalance,
    approveModal,
    setApproveModal,
    setApproveDataForModal,
  } = useSystemContext();
  const { account } = useWeb3React();

  const [wbtcApproved, setWbtcApproved] = useState(false);

  const [allowance, setAllowance] = useState({
    cnusd: false,
    cnbtc: false,
  });

  const [info, setInfo] = useState({
    cnusd: {
      allowance: null,
      collateralEarned: 0,
      isWithdrawAvailable: false,
    },
    cnbtc: {
      staked: 0,
      collateralEarned: 0,
      isWithdrawAvailable: false,
    },
  });

  const [cnusdStakeInput, setCnusdStakeInput] = useState("");
  const [cnbtcStakeInput, setCnbtcStakeInput] = useState("");

  const [cnusdWithdrawInput, setCnusdWithdrawInput] = useState("");
  const [cnbtcWithdrawInput, setCnbtcWithdrawInput] = useState("");

  useEffect(() => {
    if (account && contracts && tokens) {
      if (!approveModal) {
        getAllowance();
      }
      getInfo();
    }
  }, [account, contracts, tokens, approveModal]);

  const getInfo = async () => {
    const balCnusd = await contracts.FOUNDRY_AGOUSD.methods
      .balanceOf(account)
      .call();
    const balCnbtc = await contracts.FOUNDRY_AGOBTC.methods
      .balanceOf(account)
      .call();

    const rewardUSD = formatFromDecimal(
      await contracts.FOUNDRY_AGOUSD.methods.earned(account).call(),
      tokens.find((item) => item.symbol === "USDT").decimals
    );
    const rewardWBTC = formatFromDecimal(
      await contracts.FOUNDRY_AGOBTC.methods.earned(account).call(),
      tokens.find((item) => item.symbol === "WBTC").decimals
    );

    const canWithdrawUSD = await contracts.FOUNDRY_AGOUSD.methods
      .canWithdraw(account)
      .call();
    const canWithdrawBTC = await contracts.FOUNDRY_AGOBTC.methods
      .canWithdraw(account)
      .call();

    setInfo({
      cnusd: {
        staked: formatFromDecimal(
          balCnusd,
          tokens.find((item) => item.symbol === "CNUSD").decimals
        ),
        isWithdrawAvailable: canWithdrawUSD,
        collateralEarned: 0,
      },
      cnbtc: {
        staked: formatFromDecimal(
          balCnbtc,
          tokens.find((item) => item.symbol === "CNBTC").decimals
        ),
        isWithdrawAvailable: canWithdrawBTC,
        collateralEarned: 0,
      },
    });
  };

  const handleApprove = async (currency) => {
    setApproveDataForModal({
      destination:
        CONTRACT_ADRESESS[
          `FOUNDRY_${currency === "USD" ? "AGOUSD" : "AGOBTC"}`
        ],
      approves: [
        {
          name: currency === "USD" ? "CNUSD" : "CNBTC",
          address: CONTRACT_ADRESESS[currency === "USD" ? "CNUSD" : "CNBTC"],
          alreadyApproved:
            allowance[
              currency === "USD" ? "CNUSD".toLowerCase() : "CNBTC".toLowerCase()
            ],
        },
      ],
    });

    setApproveModal(true);
  };

  const getAllowance = async () => {
    const cnusdAllow = await contracts.CNUSD.methods
      .allowance(account, CONTRACT_ADRESESS.FOUNDRY_AGOUSD)
      .call();
    const cnbtcAllow = await contracts.CNBTC.methods
      .allowance(account, CONTRACT_ADRESESS.FOUNDRY_AGOBTC)
      .call();

    setAllowance({
      cnusd: cnusdAllow.length === MAX_INT.length,
      cnbtc: cnbtcAllow.length === MAX_INT.length,
    });
  };

  const handleStake = async (currency) => {
    try {
      message.loading({
        content: "Foundry stake in process",
        className: "ant-argano-message",
        key: MINT_REDEEM_KEY,
        duration: 3000,
      });

      if (currency === "USD") {
        const dec = tokens.find((item) => item.symbol === "CNUSD").decimals;
        await contracts.FOUNDRY_AGOUSD.methods
          .stake(formatToDecimal(cnusdStakeInput, dec))
          .send({ from: account });
        changeTokenBalance([
          { name: "CNUSD", amount: cnusdStakeInput, sub: true },
        ]);
      } else {
        const dec = tokens.find((item) => item.symbol === "CNBTC").decimals;
        await contracts.FOUNDRY_AGOBTC.methods
          .stake(formatToDecimal(cnbtcStakeInput, dec))
          .send({ from: account });
        changeTokenBalance([
          { name: "CNBTC", amount: cnbtcStakeInput, sub: true },
        ]);
      }

      await getInfo();

      message.success({
        content: "Foundry stake is done!",
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

  const handleWithdraw = async (currency) => {
    try {
      message.loading({
        content: "Foundry unstake in process",
        className: "ant-argano-message",
        key: MINT_REDEEM_KEY,
        duration: 3000,
      });

      if (currency === "USD") {
        const dec = tokens.find((item) => item.symbol === "CNUSD").decimals;
        await contracts.FOUNDRY_AGOUSD.methods
          .withdraw(formatToDecimal(cnusdWithdrawInput, dec))
          .send({ from: account });
        changeTokenBalance([
          { name: "CNUSD", amount: cnusdWithdrawInput, sub: false },
        ]);
      } else {
        const dec = tokens.find((item) => item.symbol === "CNBTC").decimals;
        await contracts.FOUNDRY_AGOBTC.methods
          .withdraw(formatToDecimal(cnbtcWithdrawInput, dec))
          .send({ from: account });
        changeTokenBalance([
          { name: "CNBTC", amount: cnbtcWithdrawInput, sub: false },
        ]);
      }
      await getInfo();

      message.success({
        content: "Foundry unstake is done",
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

  const handleCollectReward = async (currency) => {
    try {
      message.loading({
        content: "Foundry claim reward in process",
        className: "ant-argano-message",
        key: MINT_REDEEM_KEY,
        duration: 3000,
      });

      if (currency === "USD") {
        await contracts.FOUNDRY_AGOUSD.methods
          .claimReward()
          .send({ from: account });
        changeTokenBalance([
          { name: "USDT", amount: info.cnusd.collateralEarned, sub: false },
        ]);
      } else {
        await contracts.FOUNDRY_AGOBTC.methods
          .claimReward()
          .send({ from: account });
      }
      await getInfo();

      message.success({
        content: "Foundry claim reward is done",
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

  const handleMaxButton = async (token, action) => {
    if (token === "CNUSD") {
      if (action === "STAKE") {
        const bal = balances.find((item) => item.symbol === "CNUSD");
        setCnusdStakeInput(bal.nativeBalance - bal.nativeBalance * 0.0005);
      } else {
        const withdrawAmount = info.cnusd.isWithdrawAvailable
          ? formatFromDecimal(
              await contracts.FOUNDRY_AGOUSD.methods.balances(account).call(),
              18
            )
          : 0;
        setCnusdWithdrawInput(withdrawAmount);
      }
    } else {
      if (action === "STAKE") {
        const bal = balances.find((item) => item.symbol === "CNBTC");
        setCnbtcStakeInput(bal.nativeBalance - bal.nativeBalance * 0.0005);
      } else {
        const withdrawAmount = info.cnbtc.isWithdrawAvailable
          ? formatFromDecimal(
              await contracts.FOUNDRY_AGOBTC.methods.balanceOf(account).call(),
              18
            )
          : 0;
        setCnbtcWithdrawInput(withdrawAmount);
      }
    }
  };

  return (
    <>
      <FoundryActionsContainer>
        <FoundryActionsItem>
          <FoundryActionsItemLabel>Staked</FoundryActionsItemLabel>
          <HDiv mt="1.875vw" ml="0.625vw" mr="1.146vw">
            <div>
              <TokenIcon iconName={"CNUSD"} />
              <Text>CNUSD</Text>
            </div>
            <Text>Staked: {info.cnusd.staked}</Text>
          </HDiv>
          <Text mt="0.521vw" ml="0.885vw">
            0
          </Text>
          <HDiv>
            <FoundryActionsInputContainer>
              <input
                type="number"
                placeholder="Stake your CNUSD"
                onFocus={(e) => (e.target.placeholder = "")}
                onBlur={(e) => (e.target.placeholder = "Stake your CNUSD")}
                onChange={(e) => setCnusdStakeInput(e.target.value)}
                value={cnusdStakeInput}
              />
              <button onClick={() => handleMaxButton("CNUSD", "STAKE")}>
                Max
              </button>
            </FoundryActionsInputContainer>
            <Divider />
            <FoundryActionsBtnWrapper withGradient>
              <button
                disabled={allowance.cnusd && cnusdStakeInput <= 0}
                onClick={() =>
                  allowance.cnusd ? handleStake("USD") : handleApprove("USD")
                }
              >
                <span> {allowance.cnusd ? "Stake" : "Approve"}</span>
              </button>
            </FoundryActionsBtnWrapper>
          </HDiv>
          <HDiv mt="0.781vw">
            <FoundryActionsInputContainer>
              <input
                type="number"
                placeholder="Withdraw your CNUSD"
                onFocus={(e) => (e.target.placeholder = "")}
                onBlur={(e) => (e.target.placeholder = "Withdraw your CNUSD")}
                onChange={(e) => setCnusdWithdrawInput(e.target.value)}
                value={cnusdWithdrawInput}
              />
              <button onClick={() => handleMaxButton("CNUSD", "UNSTAKE")}>
                Max
              </button>
            </FoundryActionsInputContainer>
            <Divider />
            <FoundryActionsBtnWrapper>
              <button
                disabled={
                  !info.cnbtc.isWithdrawAvailable || cnusdWithdrawInput <= 0
                }
                onClick={() => handleWithdraw("USD")}
              >
                <span>
                  {!info.cnbtc.isWithdrawAvailable ? "Blocked" : "Withdraw"}
                </span>
              </button>
            </FoundryActionsBtnWrapper>
          </HDiv>
        </FoundryActionsItem>
        <FoundryActionsItem>
          <FoundryActionsItemLabel>Earned</FoundryActionsItemLabel>
          <HDiv mt="1.875vw">
            <div>
              <TokenIcon iconName={"USDT"} />
              <Text>USDT</Text>
            </div>
          </HDiv>
          <Text mt="0.781vw" ml="2.813vw">
            {formattedNum(info.cnusd.collateralEarned)}
          </Text>
          <FoundryActionsBtnWrapper w="10.313vw" mt="3vw">
            <button
              disabled={+info.cnusd.collateralEarned === 0}
              onClick={() => handleCollectReward("USD")}
            >
              {info.cnusd.collateralEarned === 0
                ? "No rewards"
                : "Collect reward"}
            </button>
          </FoundryActionsBtnWrapper>
        </FoundryActionsItem>
        <FoundryActionsItem>
          <FoundryActionsItemLabel>Staked</FoundryActionsItemLabel>
          <HDiv mt="1.875vw" ml="0.625vw" mr="1.146vw">
            <div>
              <TokenIcon iconName={"CNBTC"} />
              <Text>CNBTC</Text>
            </div>
            <Text>Staked: {formattedNum(info.cnbtc.staked)}</Text>
          </HDiv>
          <Text mt="0.521vw" ml="0.885vw">
            0
          </Text>
          <HDiv>
            <FoundryActionsInputContainer>
              <input
                type="number"
                placeholder="Stake/Withdraw your CNBTC"
                onFocus={(e) => (e.target.placeholder = "")}
                onBlur={(e) =>
                  (e.target.placeholder = "Stake/Withdraw your CNBTC")
                }
                onChange={(e) => setCnbtcStakeInput(e.target.value)}
                value={cnbtcStakeInput}
              />
              <button onClick={() => handleMaxButton("CNBTC", "STAKE")}>
                Max
              </button>
            </FoundryActionsInputContainer>
            <Divider />
            <FoundryActionsBtnWrapper withGradient>
              <button
                disabled={allowance.cnusd && cnbtcStakeInput <= 0}
                onClick={() =>
                  allowance.cnbtc ? handleStake("BTC") : handleApprove("BTC")
                }
              >
                <span>{allowance.cnbtc ? "Stake" : "Approve"}</span>
              </button>
            </FoundryActionsBtnWrapper>
          </HDiv>
          <HDiv mt="0.781vw">
            <FoundryActionsInputContainer>
              <input
                type="number"
                placeholder="Withdraw your CNUSD"
                onFocus={(e) => (e.target.placeholder = "")}
                onBlur={(e) => (e.target.placeholder = "Withdraw your CNUSD")}
                onChange={(e) => setCnusdWithdrawInput(e.target.value)}
                value={cnusdWithdrawInput}
              />
              <button onClick={() => handleMaxButton("CNUSD", "UNSTAKE")}>
                Max
              </button>
            </FoundryActionsInputContainer>
            <Divider />
            <FoundryActionsBtnWrapper>
              <button
                disabled={
                  !info.cnbtc.isWithdrawAvailable || cnusdWithdrawInput <= 0
                }
                onClick={() => handleWithdraw("USD")}
              >
                <span>
                  {!info.cnbtc.isWithdrawAvailable ? "Blocked" : "Withdraw"}
                </span>
              </button>
            </FoundryActionsBtnWrapper>
          </HDiv>
        </FoundryActionsItem>
        <FoundryActionsItem>
          <FoundryActionsItemLabel>Earned</FoundryActionsItemLabel>
          <HDiv mt="1.875vw">
            <div>
              <TokenIcon iconName={"WBTC"} />
              <Text>WBTC</Text>
            </div>
          </HDiv>
          <Text mt="0.521vw" ml="2.813vw">
            {formattedNum(info.cnbtc.collateralEarned)}
          </Text>
          <FoundryActionsBtnWrapper w="10.313vw" mt="3vw">
            <button
              disabled={+info.cnbtc.collateralEarned === 0}
              onClick={() => handleCollectReward("USD")}
            >
              {+info.cnbtc.collateralEarned === 0
                ? "No rewards"
                : "Collect reward"}
            </button>
          </FoundryActionsBtnWrapper>
        </FoundryActionsItem>
      </FoundryActionsContainer>
    </>
  );
};

export default FoundryActions;
