import React, {useEffect, useState} from 'react';
import {TokenIcon} from "../../TokenIcon/token_icon";
import claimRewardIcon from "../claim-reward.svg";
import {useSystemContext} from "../../../systemProvider";
import {useWeb3React} from "@web3-react/core";
import {formatFromDecimal, formatToDecimal} from "../../../utils/helpers";
import {CONTRACT_ADRESESS, MAX_INT} from "../../../constants";


export const StakingItem = ({pool}) => {


    const {symbol, name, roi, contract, pid } = pool;
    const { account } = useWeb3React();
    const { contracts, tokens } = useSystemContext();
    const [windowExpanded, setWindowExpanded] = useState(false);
    const [depositInput, setDepositInput] = useState(0);
    const [allowance, setAllowance] = useState(false);
    const [earned, setEarned] = useState(0);
    const [staked, setStaked] = useState(0);

    useEffect(() => {

        if (account && contracts) {
            getAllowance()
            getStakignData()
        }


    }, [account])


    const getStakignData = async () => {
        const rewardTokenDecimals = tokens.find(item => item.symbol === "AGO").decimals
        const tokenDecimals = tokens.find(item => item.symbol === symbol).decimals

        const earned = await contracts.MASTER_CHEF.methods.pendingAgo(pid, account).call();
        const staked = await contracts.MASTER_CHEF.methods.userInfo(pid, account).call();
        setEarned(formatFromDecimal(earned, rewardTokenDecimals));
        setStaked(formatFromDecimal(staked.amount, tokenDecimals));

    }

    const handleDeposit = async () => {

        const tokenDecimals = tokens[symbol].decimals;
        await contracts.MASTER_CHEF.methods.deposit(pid, formatToDecimal(depositInput, tokenDecimals)).send({from: account});
        await getStakignData();

    }

    const handleUnstake = async () => {

        const tokenDecimals = tokens[symbol].decimals
        await contracts.MASTER_CHEF.methods.withdraw(pid, formatToDecimal(depositInput, tokenDecimals)).send({from:account})
        await getStakignData()

    }

    const handleClaimReward = async () => {
        await contracts.MASTER_CHEF.methods.withdraw(pid, 0).send({from: account})
        await getStakignData()
    }

    const handleApprove = async () => {
        const tok = contracts[symbol];
        await tok.methods.approve(CONTRACT_ADRESESS.MASTER_CHEF, MAX_INT).send({from: account});

        await getAllowance();

    }

    const getAllowance = async () => {
        const tok = contracts[symbol];
        const allowance = await tok.methods.allowance(account, CONTRACT_ADRESESS.MASTER_CHEF).call()

        setAllowance(allowance.length === MAX_INT.length)
    }

    return (
        // FIXME: onClick={() => setWindowExpanded(!windowExpanded)} ${windowExpanded  ? "__opened" : ""}`}
        // FIXME: Return this but fix it first.
        <li className={`staking-list__item staking-list__item${windowExpanded  ? "__opened" : ""}`}>
            <div className='head-wrapper'>
                <div className='token'>
                    <div className='token-main'>
                        <TokenIcon iconName={symbol}/>
                        <b> {name} </b>
                    </div>
                    <span> {symbol} </span>
                </div>
                <div className='roi'>
                    <span> {roi} </span>
                </div>
                <div className='contract'>
                    <span>{contract}</span>
                </div>
                <button onClick={() => setWindowExpanded(!windowExpanded)} className='hide-btn'>{windowExpanded ? 'Hide' : 'Deploy'}</button>
            </div>
            <div className={`body-wrapper`}>
                {windowExpanded ?
                    <>
                        <div className='claim-reward'>
                            <h5> Governance Vault (V2) </h5>
                            <button onClick={() => handleClaimReward()}> <img src={claimRewardIcon} width="20" height="20"/> </button>
                        </div>
                        <div className='info-control-panel'>
                            <div className='info'>
                                <div className='info__row'>
                                    <h5> Earned </h5>
                                    <h5> Deposit/Withdraw </h5>
                                    <h5> Currently Staked </h5>
                                </div>
                                <div className='info__row'>
                                    <h5> {earned} AGO </h5>
                                    <input type="number" placeholder={`Put ${symbol} token amount`} onChange={(e) => setDepositInput(e.target.value)}/>
                                    <h5> {staked} {symbol} </h5>
                                </div>
                            </div>
                            <div className='control-stake'>
                                <button onClick={() => !allowance ? handleApprove() : handleDeposit()}>  {!allowance ? "Approve" : "Stake"}  </button>
                                <button onClick={() => handleUnstake()}> Unstake </button>
                            </div>
                        </div>
                    </> : ""
                }
            </div>
        </li>
    )

}