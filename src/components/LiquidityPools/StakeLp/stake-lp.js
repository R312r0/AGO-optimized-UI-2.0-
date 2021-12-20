import React, {useEffect, useState} from 'react';
import {isPunctuatorTokenKind} from "graphql/language/lexer";
import {useWeb3React} from "@web3-react/core";
import {CONTRACT_ADRESESS, MAX_INT} from "../../../constants";
import {useSystemContext} from "../../../systemProvider";
import {formatFromDecimal, formatToDecimal} from "../../../utils/helpers";


const LP_POOLS_PIDS = {
    AGO_WMATIC: 3,
    AGOUSD_USDT: 4,
    AGOBTC_WBTC: 5,
    CNUSD_WMATIC: 6,
    CNBTC_WMATIC: 7
}

export const StakeLp = ({token0, token1, lpTokenContract, lpUserBalance}) => {

    const {account} = useWeb3React();
    const {contracts, tokens} = useSystemContext();
    const [pid, setPid] = useState(null);
    const [depositWithdrawInput, setDepositWithdrawInput] = useState(0);
    const [allowance, setAllowance] = useState(false);
    const [staked, setStaked] = useState(0);
    const [earned, setEarned] = useState(0);

    console.log(token0)
    console.log(token1)

    useEffect(() => {
        const searchString = `${token0.symbol}_${token1.symbol}`
        setPid(LP_POOLS_PIDS[searchString])

    }, [])


    useEffect(() => {

        if (account && pid) {
            getAllowance();
            getStakeInfo();
        }

    }, [account, pid])

    const getStakeInfo = async () => {
        const rewardTokenDecimals = tokens["AGO"].decimals
        const tokenDecimals = await lpTokenContract.methods.decimals().call()

        const earned = await contracts.MASTER_CHEF.methods.pendingAgo(pid, account).call();
        const staked = await contracts.MASTER_CHEF.methods.userInfo(pid, account).call();
        setEarned(formatFromDecimal(earned, rewardTokenDecimals));
        setStaked(formatFromDecimal(staked.amount, tokenDecimals));
    }

    const getAllowance = async () => {

        const allowance = await lpTokenContract.methods.allowance(account, CONTRACT_ADRESESS.MASTER_CHEF).call();

        setAllowance(allowance.length === MAX_INT.length);

    }

    const handleApprove = async () => {

        await lpTokenContract.methods.approve(CONTRACT_ADRESESS.MASTER_CHEF, MAX_INT).send({from: account});

        await getAllowance()
    }

    const handleStake = async () => {
        const lpDec = await lpTokenContract.methods.decimals().call()
        console.log(lpDec);

        await contracts.MASTER_CHEF.methods.deposit(pid, formatToDecimal(depositWithdrawInput, lpDec)).send({from: account});
        await getStakeInfo()
    }

    const handleUnstake = async () => {
        const lpDec = await lpTokenContract.methods.decimals().call()

        console.log(lpDec);

        await contracts.MASTER_CHEF.methods.withdraw(pid, formatToDecimal(depositWithdrawInput, lpDec)).send({from: account});
        await getStakeInfo()

    }

    const handleClaimReward = async () => {
        await contracts.MASTER_CHEF.methods.withdraw(pid, 0).send({from: account});
        await getStakeInfo()
    }

    return (
        <>
            <h5> Deposit/Withdraw </h5>
            <input type="number" onChange={(e) => setDepositWithdrawInput(e.target.value)} placeholder={"Input LP to deposit"}/>
            <button onClick={() => allowance ? handleStake() : handleApprove()}> {allowance ? "Stake" : "Approve"} </button>
            <button onClick={() => handleUnstake()}> Unstake </button>
            <button onClick={() => handleClaimReward()}> Claim reward </button>
            <h5> Earned AGO: {earned} AGO</h5>
            <h5> STAKED {token0.symbol}-{token1.symbol}: {staked} LP</h5>
            <p>User Lp balance: {lpUserBalance}</p>
        </>
    )

}