import React, {useEffect, useState} from 'react';
import {isPunctuatorTokenKind} from "graphql/language/lexer";
import {useWeb3React} from "@web3-react/core";
import {CONTRACT_ADRESESS, MAX_INT} from "../../../constants";
import {useSystemContext} from "../../../systemProvider";
import {formatFromDecimal, formatToDecimal} from "../../../utils/helpers";
import { LP_STAKING_POOL } from '../../../constants';
import STAKING_POOL_ABI from '../../../abi/SIngleChef.json';
import { TokenIcon } from '../../TokenIcon/token_icon';
import stake_icon_white from '../../../assets/icons/nav-links/active/staking-active.svg';

export const StakeLp = ({token0, token1, lpTokenContract, lpUserBalance, lpTokenAddress}) => {

    const {account, library} = useWeb3React();
    const {contracts, tokens, approveModal, setApproveModal, setApproveDataForModal} = useSystemContext();
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
                {name: [token0.symbol, token1.symbol], address: lpTokenAddress, alreadyApproved: allowance, lpToken: true},
            ]
        })

        setApproveModal(true)

        // await lpTokenContract.methods.approve(poolContract.address, MAX_INT).send({from: account});

        // await getAllowance()
    }

    const handleStake = async () => {
        const lpDec = await lpTokenContract.methods.decimals().call()

        await poolContract.contract.methods.deposit(formatToDecimal(depositWithdrawInput, lpDec)).send({from: account});
        await getStakeInfo()
    }

    const handleUnstake = async () => {
        const lpDec = await lpTokenContract.methods.decimals().call()

        await poolContract.contract.methods.withdraw(formatToDecimal(depositWithdrawInput, lpDec)).send({from: account});
        await getStakeInfo()

    }

    const handleClaimReward = async () => {
        await poolContract.contract.methods.withdraw(0).send({from: account});
        await getStakeInfo()
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
                    <span> <TokenIcon iconName={rewardTokenSymbol}/> <h5>{rewardTokenSymbol}</h5> </span>
                    <h3> CNUSD-WMATIC </h3>
                    <h3> Balance </h3>
                </div>
                <div>
                    <input type={"number"} onChange={(e) => setDepositWithdrawInput(e.target.value)} value={0}/>
                    <h3> {token0.symbol}-{token1.symbol} </h3>
                    <h3> {staked} Lp </h3>
                    <h3> {lpUserBalance} </h3>
                </div>
            </div>
            <div className='stake-lp-wrapper__buttons'>
                <button className='stake-lp-wrapper__buttons__claim-reward' onClick={() => handleClaimReward()}> <img src={stake_icon_white}/> Claim reward </button>
                <button className='stake-lp-wrapper__buttons__stake' onClick={() => allowance ? handleStake() : handleApprove()}> {allowance ? "Stake" : "Approve"} </button>
                <button className='stake-lp-wrapper__buttons__unstake' onClick={() => handleUnstake()} > Unstake </button>
            </div>
            {/* <h5> Deposit/Withdraw </h5>
            <input type="number" onChange={(e) => setDepositWithdrawInput(e.target.value)} placeholder={"Input LP to deposit"}/>
            <button onClick={() => allowance ? handleStake() : handleApprove()}> {allowance ? "Stake" : "Approve"} </button>
            <button onClick={() => handleUnstake()}> Unstake </button>
            <button onClick={() => handleClaimReward()}> Claim reward </button>
            <h5> Earned {rewardTokenSymbol}: {earned} {rewardTokenSymbol}</h5>
            <h5> STAKED {token0.symbol}-{token1.symbol}: {staked} LP</h5>
            <p>User Lp balance: {lpUserBalance}</p> */}
        </div>
    )

}