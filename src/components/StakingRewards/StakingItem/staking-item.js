import React, {useEffect, useState} from 'react';
import {TokenIcon} from "../../TokenIcon/token_icon";
import claimRewardIcon from "../claim-reward.svg";
import {useSystemContext} from "../../../systemProvider";
import {useWeb3React} from "@web3-react/core";
import {formatFromDecimal, formatToDecimal} from "../../../utils/helpers";
import {CONTRACT_ADRESESS, MAX_INT} from "../../../constants";
import SINGLE_CHEF_ABI from '../../../abi/SIngleChef.json';
import { useDataContext } from '../../../dataProvider';


export const StakingItem = ({pool}) => {


    console.log(pool);

    const { name, address } = pool;
    const { account, library } = useWeb3React();
    const { tokens, contracts } = useSystemContext();

    const [poolContract, setPoolContract] = useState(null);
    const [stakingInfo, setStakingInfo] = useState({
        rewardTokenName: "",
        staked: 0,
        userReward: 0
    });
    const [windowExpanded, setWindowExpanded] = useState(false);
    const [depositInput, setDepositInput] = useState(0);
    const [allowance, setAllowance] = useState(false);

    useEffect(() => {

        if (library && !poolContract) {

            setPoolContract(new library.eth.Contract(SINGLE_CHEF_ABI, address));

        }

    }, [library])


    useEffect(() => {

        if (account && poolContract && tokens) {
            getPoolInfo(name, poolContract);
        }

    }, [account, poolContract, tokens])


    const getPoolInfo = async (name, contract) => {

        console.log(contract);

        const lpToken = await contract.methods.rewardToken().call();
        const userInfo = await contract.methods.userInfo(account).call();

        const rewardTokenName = tokens.find((tok) => tok.address === lpToken.toLowerCase()).symbol
        const staked = formatFromDecimal(userInfo[0], tokens.find((tok) => tok.symbol === name).decimals) 
        const userReward = formatFromDecimal(userInfo[1], tokens.find((tok) => tok.symbol === rewardTokenName).decimals) 

        setStakingInfo({
            rewardTokenName,
            staked,
            userReward
        })

    }

    const handleDeposit = async () => {

        const tokenDecimals = tokens.find((item) => item.symbol === name).decimals;
        await poolContract.methods.deposit(formatToDecimal(depositInput, tokenDecimals)).send({from: account});
        await getPoolInfo();

    }

    const handleUnstake = async () => {

        const tokenDecimals = tokens.find((item) => item.symbol === name).decimals
        await poolContract.methods.withdraw(formatToDecimal(depositInput, tokenDecimals)).send({from:account})
        await getPoolInfo()

    }

    const handleClaimReward = async () => {
        await poolContract.methods.withdraw(0).send({from: account})
        await getPoolInfo()
    }

    const handleApprove = async () => {
        const tok = contracts[name];
        await tok.methods.approve(address, MAX_INT).send({from: account});

        await getAllowance();

    }

    const getAllowance = async () => {
        const tok = contracts[name];
        const allowance = await tok.methods.allowance(account, address).call()

        setAllowance(allowance.length === MAX_INT.length)
    }


    return (
        // FIXME: onClick={() => setWindowExpanded(!windowExpanded)} ${windowExpanded  ? "__opened" : ""}`}
        // FIXME: Return this but fix it first.
        <li className={`staking-list__item staking-list__item${windowExpanded  ? "__opened" : ""}`}>
            <div className='head-wrapper'>
                <div className='token'>
                    <div className='token-main'>
                        <TokenIcon iconName={name}/>
                        <b> {name} </b>
                    </div>
                    <span> {name} </span>
                </div>
                <div className='roi'>
                    <span> 6.66% </span>
                </div>
                <div className='contract'>
                    <span>{address}</span>
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
                                    <h5> {stakingInfo.userReward} {stakingInfo.rewardTokenName} </h5>
                                    <input type="number" placeholder={`Put ${name} token amount`} onChange={(e) => setDepositInput(e.target.value)}/>
                                    <h5> {stakingInfo.staked} {name} </h5>
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