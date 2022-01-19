import React, {useState, useEffect} from 'react';
import {TokenIcon} from "../../TokenIcon/token_icon";
import {useSystemContext} from "../../../systemProvider";
import {useWeb3React} from "@web3-react/core";
import {CONTRACT_ADRESESS, MAX_INT, MINT_REDEEM_KEY} from "../../../constants";
import {formatFromDecimal, formattedNum, formatToDecimal} from "../../../utils/helpers";
import { message } from 'antd';


const FoundryActions = () => {

    const {contracts, tokens, changeTokenBalance, approveModal, setApproveModal, setApproveDataForModal} = useSystemContext();
    const {account} = useWeb3React();

    const [wbtcApproved, setWbtcApproved] = useState(false);

    const [allowance, setAllowance] = useState({
        cnusd: false,
        cnbtc: false
    });

    const [info, setInfo] = useState({
        cnusd: {
            allowance: null,
            collateralEarned: 0,
            isWithdrawAvailable: false
        },
        cnbtc: {
            staked: 0,
            collateralEarned: 0,
            isWithdrawAvailable: false
        }

    })



    const [cnusdStakeInput, setCnusdStakeInput] = useState(0);
    const [cnbtcStakeInput, setCnbtcStakeInput] = useState(0);

    const [cnusdWithdrawInput, setCnusdWithdrawInput] = useState(0);
    const [cnbtcWithdrawInput, setCnbtcWithdrawInput] = useState(0);


    useEffect(() => {

        if (account && contracts && tokens) {
            if (!approveModal) {
                getAllowance();
            }
            getInfo();
        }

    }, [account, contracts, tokens, approveModal])


    const getInfo = async () => {

        const balCnusd = await contracts.FOUNDRY_AGOUSD.methods.balanceOf(account).call();
        const balCnbtc = await contracts.FOUNDRY_AGOBTC.methods.balanceOf(account).call();

        const rewardUSD = formatFromDecimal(await contracts.FOUNDRY_AGOUSD.methods.earned(account).call(), tokens.find(item => item.symbol === "USDT").decimals);
        const rewardWBTC = formatFromDecimal(await contracts.FOUNDRY_AGOBTC.methods.earned(account).call(), tokens.find(item => item.symbol === "WBTC").decimals);


        // console.log(await contracts.FOUNDRY_AGOBTC.methods.blacksmiths("0xf8d40f5257324f2f4fbd531f342c97ef7d011c16").call());

        const canWithdrawUSD = await contracts.FOUNDRY_AGOUSD.methods.canWithdraw(account).call();
        const canWithdrawBTC = await contracts.FOUNDRY_AGOBTC.methods.canWithdraw(account).call();

        setInfo({
            cnusd: {
                staked: formatFromDecimal(balCnusd, tokens.find(item => item.symbol === "CNUSD").decimals),
                isWithdrawAvailable: canWithdrawUSD,
                collateralEarned: 0,
            }, 
            cnbtc: {
                staked: formatFromDecimal(balCnbtc, tokens.find(item => item.symbol === "CNBTC").decimals),
                isWithdrawAvailable: canWithdrawBTC,
                collateralEarned: 0
            }
        })
    }


    const handleApprove = async (currency) => {

        setApproveDataForModal({
            destination: CONTRACT_ADRESESS[`FOUNDRY_${currency === "USD" ? "AGOUSD" : "AGOBTC"}`],
            approves: [
                {name: currency === "USD" ? "CNUSD" : "CNBTC",
                    address: CONTRACT_ADRESESS[currency === "USD" ? "CNUSD" : "CNBTC"],
                    alreadyApproved: allowance[currency === "USD" ? "CNUSD".toLowerCase() : "CNBTC".toLowerCase()]},
            ]
        })

        setApproveModal(true);

    }

    const getAllowance = async () => {

        const cnusdAllow = await contracts.CNUSD.methods.allowance(account, CONTRACT_ADRESESS.FOUNDRY_AGOUSD).call()
        const cnbtcAllow = await contracts.CNBTC.methods.allowance(account, CONTRACT_ADRESESS.FOUNDRY_AGOBTC).call()

        setAllowance({
            cnusd: cnusdAllow.length === MAX_INT.length,
            cnbtc: cnbtcAllow.length === MAX_INT.length
        })

    }

    const handleStake = async (currency) => {

        try {

            message.loading({content: "Foundry stake in process", className: "ant-argano-message", key: MINT_REDEEM_KEY, duration: 3000});

            if (currency === "USD") {
                const dec = tokens.find((item) => item.symbol === "CNUSD").decimals
                await contracts.FOUNDRY_AGOUSD.methods.stake(formatToDecimal(cnusdStakeInput, dec)).send({from: account})
                changeTokenBalance([{name: "CNUSD", amount: cnusdStakeInput, sub: true}])
            }

            else {
                const dec = tokens.find((item) => item.symbol === "CNBTC").decimals
                await contracts.FOUNDRY_AGOBTC.methods.stake(formatToDecimal(cnbtcStakeInput, dec)).send({from: account})
                changeTokenBalance([{name: "CNBTC", amount: cnbtcStakeInput, sub: true}])
    
            }

            await getInfo();

            message.success({content: "Foundry stake is done!", className: "ant-argano-message", key: MINT_REDEEM_KEY, duration: 5});

        }
        catch(e) {
            message.error({content: `Some error occured: ${e.message}`, className: "ant-argano-message", key: MINT_REDEEM_KEY, duration: 5});
        }


    }

    const handleWithdraw = async (currency) => {

        try {

            message.loading({content: "Foundry unstake in process", className: "ant-argano-message", key: MINT_REDEEM_KEY, duration: 3000});


            if (currency === "USD") {
                const dec = tokens.find((item) => item.symbol === "CNUSD").decimals
                await contracts.FOUNDRY_AGOUSD.methods.withdraw(formatToDecimal(cnusdWithdrawInput, dec)).send({from: account})
                changeTokenBalance([{name: "CNUSD", amount: cnusdWithdrawInput, sub: false}])
    
            }
            else {
                const dec = tokens.find((item) => item.symbol === "CNBTC").decimals
                await contracts.FOUNDRY_AGOBTC.methods.withdraw(formatToDecimal(cnbtcWithdrawInput, dec)).send({from: account})
                changeTokenBalance([{name: "CNBTC", amount: cnbtcWithdrawInput, sub: false}])
    
            }
            await getInfo();

            message.success({content: "Foundry unstake is done", className: "ant-argano-message", key: MINT_REDEEM_KEY, duration: 5});

        }

        catch(e) {
            message.error({content: `Some error occured: ${e.message}`, className: "ant-argano-message", key: MINT_REDEEM_KEY, duration: 5});
        }



    }

    const handleCollectReward = async (currency) => {

        try {

            message.loading({content: "Foundry claim reward in process", className: "ant-argano-message", key: MINT_REDEEM_KEY, duration: 3000});

            if (currency === "USD") {
                await contracts.FOUNDRY_AGOUSD.methods.claimReward().send({from: account})
                changeTokenBalance([{name: "USDT", amount: info.cnusd.collateralEarned, sub: false}])
            }
            else {
                await contracts.FOUNDRY_AGOBTC.methods.claimReward().send({from: account})
            }
            await getInfo();

            message.success({content: "Foundry claim reward is done", className: "ant-argano-message", key: MINT_REDEEM_KEY, duration: 5});


        }

        catch(e) {
            message.error({content: `Some error occured: ${e.message}`, className: "ant-argano-message", key: MINT_REDEEM_KEY, duration: 5});
        }


    }

    return (
        <div className='foundry__actions'> 
        
            <div className='foundry__actions-item'>
                <span className='foundry__actions-item__status'>Staked</span>
                <div className='foundry__actions-item__token'>
                    <TokenIcon iconName={"CNUSD"}/>
                    <p>CNUSD</p>
                </div>

                <p className='amount'>Staked: {info.cnusd.staked}</p>
                <input type="number" placeholder={"Stake your CNUSD"} onChange={(e) => setCnusdStakeInput(e.target.value)} />
                <button disabled={allowance.cnusd && cnusdStakeInput <= 0} onClick={() => allowance.cnusd ? handleStake("USD") : handleApprove("USD")}> {allowance.cnusd ? "Stake" : "Approve"} </button>

                <input type="number" placeholder={"Withdraw your CNUSD"} onChange={(e) => setCnusdStakeInput(e.target.value)} />
                <button disabled={!info.cnbtc.isWithdrawAvailable || cnusdWithdrawInput <= 0} onClick={() => handleWithdraw("USD")}> {!info.cnbtc.isWithdrawAvailable ? "Blocked" : "Withdraw"} </button>
            </div>

            <div className='foundry__actions-item reward'>
                <span className='foundry__actions-item__status'>Earned</span>
                <div className='foundry__actions-item__token'>
                    <TokenIcon iconName={"USDT"}/>
                    <p>USDT</p>
                </div>
                
                <p className='amount'>{formattedNum(info.cnusd.collateralEarned)}</p>
                <button disabled={+info.cnusd.collateralEarned === 0} onClick={() => handleCollectReward("USD")}>  {info.cnusd.collateralEarned === 0 ? "No rewards" : "Collect reward"} </button>
            </div>

            <div className='foundry__actions-item'>
                <span className='foundry__actions-item__status'>Staked</span>
                <div className='foundry__actions-item__token'>
                    <TokenIcon iconName={"CNBTC"}/>
                    <p>CNBTC</p>
                </div>
                
                <p className='amount'>Staked: {formattedNum(info.cnbtc.staked)}</p>
                <input type="number" placeholder={"Stake/Withdraw your CNBTC"} onChange={(e) => setCnbtcStakeInput(e.target.value)}/>
                <button disabled={allowance.cnusd && cnbtcStakeInput <= 0} onClick={() => allowance.cnbtc ? handleStake("BTC") : handleApprove("BTC")}> {allowance.cnbtc ? "Stake" : "Approve"}  </button>

                <input type="number" placeholder={"Withdraw your CNUSD"} onChange={(e) => setCnusdStakeInput(e.target.value)} />
                <button disabled={!info.cnbtc.isWithdrawAvailable || cnusdWithdrawInput <= 0 } onClick={() => handleWithdraw("USD")}> {!info.cnbtc.isWithdrawAvailable ? "Blocked" : "Withdraw"} </button>
            </div>

            <div className='foundry__actions-item reward'>
                <span className='foundry__actions-item__status'>Earned</span>
                <div className='foundry__actions-item__token'>
                    <TokenIcon iconName={"WBTC"}/>
                    <p>WBTC</p>
                </div>
                <p className='amount'> {formattedNum(info.cnbtc.collateralEarned)} </p>
                <button disabled={+info.cnbtc.collateralEarned === 0} onClick={() => handleCollectReward("WBTC")}> {+info.cnbtc.collateralEarned === 0 ? "No rewards" : "Collect reward"} </button>
            </div>
        </div>
    )
}

export default FoundryActions;