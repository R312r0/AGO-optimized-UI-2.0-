import React, {useState, useEffect} from 'react';
import agoLogo from './../../../assets/icons/ago-logo.svg'
import {TokenIcon} from "../../TokenIcon/token_icon";
import {useSystemContext} from "../../../systemProvider";
import {useWeb3React} from "@web3-react/core";
import {CONTRACT_ADRESESS, MAX_INT} from "../../../constants";
import {formatFromDecimal, formatToDecimal} from "../../../utils/helpers";

const FoundryActions = () => {

    const {contracts, tokens} = useSystemContext();
    const {account} = useWeb3React();

    const [cnusdInput, setCnusdInput] = useState(0);
    const [cnbtcInput, setCnbtcInput] = useState(0);

    const [cnusdAllowance, setCnusdAllowance] = useState(false);
    const [cnbtcAllowance, setCnbtcAllowance] = useState(false);

    const [cnusdStaked, setCnusdStaked] = useState(0);
    const [cnbtcStaked, setCnbtcStaked] = useState(0);

    useEffect(() => {

        if (account && contracts) {
            getAllowance();
            getInfo();
        }

    }, [account])


    const getInfo = async () => {

        const balCnusd = await contracts.FOUNDRY_AGOUSD.methods.balanceOf(account).call();
        const balCnbtc = await contracts.FOUNDRY_AGOBTC.methods.balanceOf(account).call();

        setCnusdStaked(formatFromDecimal(balCnusd, tokens.find(item => item.symbol === "CNUSD").decimals));
        setCnbtcStaked(formatFromDecimal(balCnbtc, tokens.find(item => item.symbol === "CNBTC").decimals));

    }

    const handleApprove = async (currency) => {

        if (currency === "USD") {
            await contracts.CNUSD.methods.approve(CONTRACT_ADRESESS.FOUNDRY_AGOUSD, MAX_INT).send({from: account});
        }
        else {
            await tokens.CNBTC.methods.approve(CONTRACT_ADRESESS.FOUNDRY_AGOBTC, MAX_INT).send({from: account});
        }

        await getAllowance();

    }

    const getAllowance = async () => {

        const cnusdAllow = await contracts.CNUSD.methods.allowance(account, CONTRACT_ADRESESS.FOUNDRY_AGOUSD).call()
        const cnbtcAllow = await contracts.CNBTC.methods.allowance(account, CONTRACT_ADRESESS.FOUNDRY_AGOBTC).call()

        setCnusdAllowance(cnusdAllow.length === MAX_INT.length);
        setCnbtcAllowance(cnbtcAllow.length === MAX_INT.length);
    }

    const handleStake = async (currency) => {

        if (currency === "USD") {
            const dec = tokens.find((item) => item.symbol === "CNUSD").decimals
            await contracts.FOUNDRY_AGOUSD.methods.stake(formatToDecimal(cnusdInput, dec)).send({from: account})
        }
        else {
            const dec = tokens.find((item) => item.symbol === "CNBTC").decimals
            await contracts.FOUNDRY_AGOBTC.methods.stake(formatToDecimal(cnbtcInput, dec)).send({from: account})
        }
        await getInfo();
    }

    return (
        <div className='foundry__actions'> 
        
            <div className='foundry__actions-item'>
                <span className='foundry__actions-item__status'>Staked</span>
                <div className='foundry__actions-item__token'>
                    <TokenIcon iconName={"CNUSD"}/>
                    <p>CNUSD</p>
                </div>

                <p className='amount'>Staked: {cnusdStaked}</p>
                <input type="number" placeholder={"Put your CNUSD"} onChange={(e) => setCnusdInput(e.target.value)} />
                <button disabled={cnusdInput <= 0} onClick={() => cnusdAllowance ? handleStake("USD") : handleApprove("USD")}> {cnusdAllowance ? "Stake" : "Approve"} </button>
            </div>

            <div className='foundry__actions-item'>
                <span className='foundry__actions-item__status'>Earned</span>
                <div className='foundry__actions-item__token'>
                    <TokenIcon iconName={"USDT"}/>
                    <p>USDT</p>
                </div>
                
                <p className='amount'>0</p>
                <button> Collect reward </button>
            </div>

            <div className='foundry__actions-item'>
                <span className='foundry__actions-item__status'>Staked</span>
                <div className='foundry__actions-item__token'>
                    <TokenIcon iconName={"CNBTC"}/>
                    <p>CNBTC</p>
                </div>
                
                <p className='amount'>Staked: {cnbtcStaked}</p>
                <input type="number" placeholder={"Put your CNBTC"} onChange={(e) => setCnbtcInput(e.target.value)}/>
                <button disabled={cnbtcInput <= 0} onClick={() => cnbtcAllowance ? handleStake("BTC") : handleApprove("BTC")}> {cnbtcAllowance ? "Stake" : "Approve"}  </button>
            </div>

            <div className='foundry__actions-item'>
                <span className='foundry__actions-item__status'>Earned</span>
                <div className='foundry__actions-item__token'>
                    <TokenIcon iconName={"WBTC"}/>
                    <p>WBTC</p>
                </div>
                
                <p className='amount'>0</p>
                <button>Collect reward</button>
            </div>
        </div>
    )
}

export default FoundryActions;