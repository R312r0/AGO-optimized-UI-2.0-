import React, {useEffect, useState} from 'react';
import {TokenIcon} from "../../TokenIcon/token_icon";
import claimRewardIcon from "../claim-reward.svg";
import {useSystemContext} from "../../../systemProvider";
import {useWeb3React} from "@web3-react/core";
import {formatFromDecimal, formatToDecimal, formattedNum} from "../../../utils/helpers";
import { MAX_INT} from "../../../constants";
import SINGLE_CHEF_ABI from '../../../abi/SIngleChef.json';
import { ApproveModal } from '../../ApproveModal/approve-modal';
import { useDataContext } from '../../../dataProvider';


export const StakingItem = ({pool}) => {

    const { name, address } = pool;
    const { account, library } = useWeb3React();
    const { tokens, contracts, approveModal, setApproveModal, setApproveDataForModal, changeTokenBalance } = useSystemContext();

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

        if (account && poolContract && tokens && contracts) {
            getPoolInfo(name, poolContract);

            if (!approveModal) {
                getAllowance();
            }
        }

    }, [account, poolContract, tokens, contracts, approveModal])


    const getPoolInfo = async (name, contract) => {

        const lpToken = await contract.methods.rewardToken().call();
        const userInfo = await contract.methods.userInfo(account).call();

        const rewardTokenName = tokens.find((tok) => tok.address === lpToken.toLowerCase()).symbol

        const stakeToken = tokens.find((tok) => tok.symbol === name);

        const staked = formatFromDecimal(userInfo[0], stakeToken.decimals) 

        const userReward = formatFromDecimal(await contract.methods.pendingReward(account).call(), tokens.find((tok) => tok.symbol === rewardTokenName).decimals) 

        const stakedGlobal = await contract.methods.tokensStaked().call();

        const estimatedAllocation = stakeToken.symbol === "AGOy" ? 
            formatFromDecimal(await contracts.AGOy.methods.balanceOf(address).call(), 18) - formatFromDecimal(stakedGlobal, stakeToken.decimals)
            :
            formatFromDecimal(await contracts.AGOy.methods.balanceOf(address).call(), 18);

        const depositFee = (await contract.methods.depositFee().call() / await contract.methods.FEE_DIVIDER().call()) * 100

        console.log(contract.methods)
    
        setStakingInfo({
            rewardTokenName,
            staked,
            userReward,
            estimatedAllocation,
            depositFee,
        })

    }

    const handleDeposit = async () => {

        const tokenDecimals = tokens.find((item) => item.symbol === name).decimals;
        await poolContract.methods.deposit(formatToDecimal(depositInput, tokenDecimals)).send({from: account});
        changeTokenBalance([
            {name: name, amount: depositInput, sub: true},
        ])
        await getPoolInfo(name, poolContract);


    }

    const handleUnstake = async () => {

        const tokenDecimals = tokens.find((item) => item.symbol === name).decimals
        await poolContract.methods.withdraw(formatToDecimal(depositInput, tokenDecimals)).send({from:account})
        changeTokenBalance([
            {name, amount: depositInput, sub: false},
            {name: stakingInfo.rewardTokenName, amount: depositInput, sub: false}
        ])
        await getPoolInfo(name, poolContract)


    }

    const handleClaimReward = async () => {
        await poolContract.methods.withdraw(0).send({from: account})
        changeTokenBalance([
            {name: stakingInfo.rewardTokenName, amount: stakingInfo.userReward, sub: false},
        ])
        await getPoolInfo(name, poolContract)

    }

    const handleApprove = async () => {
 
        setApproveDataForModal({
            destination: address,
            approves: [
                {name: name, address: tokens?.find(item => item.symbol === name).address, alreadyApproved: allowance},
            ]
        })

        setApproveModal(true);

    }

    const getAllowance = async () => {
        const tok = contracts[name];
        const allowance = await tok.methods.allowance(account, address).call()

        setAllowance(allowance.length === MAX_INT.length)
    }


    return (
        <>
        <li className={`staking-list__item staking-list__item${windowExpanded  ? "__opened" : ""}`}>
            <div onClick={() => setWindowExpanded(!windowExpanded)}  className='head-wrapper'>
                <div className='token'>
                    <div className='token-main'>
                        <TokenIcon iconName={name}/>
                        <b> {name} </b>
                    </div>
                    <span> {name} </span>
                </div>
                <div className='roi'>
                    <span> { formattedNum(stakingInfo.estimatedAllocation)} AGOy </span>
                </div>
                <div className='contract'>
                    <a href={`https://polygonscan.com/address/${address}`} without rel="noreferrer" target={'_blank'}>{address}</a>
                </div>
                <button onClick={() => setWindowExpanded(!windowExpanded)} className='hide-btn'>{windowExpanded ? 'Hide' : 'Deploy'}</button>
            </div>
            <div className={`body-wrapper`}>
                {windowExpanded ?
                    <>
                        <div className='claim-reward'>
                            <h5> Governance Vault </h5>
                            <h5> Deposit fee - {stakingInfo.depositFee}% </h5>
                            <h5> Deposit lockup - 7d </h5>
                            <button onClick={() => handleClaimReward()}> Harvest <img src={claimRewardIcon} width="20" height="20"/> </button>
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
        </>
    )

}