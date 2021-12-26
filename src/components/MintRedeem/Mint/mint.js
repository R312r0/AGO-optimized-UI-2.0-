import { useWeb3React } from '@web3-react/core';
import { message } from 'antd';
import React, { useEffect, useState } from 'react';
import { CONTRACT_ADRESESS, MAX_INT, MINT_REDEEM_KEY } from '../../../constants';
import setting_cog from '../../../assets/icons/setting-cog.svg'
import { useSystemContext } from '../../../systemProvider';
import { formatFromDecimal, formatToDecimal } from '../../../utils/helpers';
import { TokenIcon } from '../../TokenIcon/token_icon';


export const Mint = ({info, mintRedeemCurrency}) => {

    const {account} = useWeb3React();
    const { setMintRedeemCurrencyModal, contracts, tokens, balances } = useSystemContext();

    const [collateralInput, setCollateralInput] = useState(null);
    const [catenaInput, setCatenaInput] = useState(null);
    const [outputInput, setOutputInput] = useState(null);

    const [approved, setApproved] = useState({
        collateral: null,
        share: null,
    });


    const [mintButtonDisabled, setMintButtonDisabled] = useState(false);

    useEffect(() => {
        if (account) {
            getAllowance()
        }
    }, [account, mintRedeemCurrency])


    useEffect(() => {

        if (account) {
            if (mintRedeemCurrency === "AGOUSD") {
                const usdt = balances.find(item => item.symbol === "USDT").nativeBalance;
                if (usdt.userNativeBalance === 0 && mintRedeemCurrency === "AGOUSD") {
                    setMintButtonDisabled(true);
                    message.warn({content: `You have 0 USDT to make mint go to Trading page and buy some`, key: MINT_REDEEM_KEY, className: "ant-argano-message", duration: 10})
                }
            }
            else if (mintRedeemCurrency === "AGOBTC") {
                const wbtc = balances.find(item => item.name === "AGOBTC").nativeBalance;
                if (wbtc.userNativeBalance === 0 && mintRedeemCurrency === "AGOBTC") {
                    setMintButtonDisabled(true);
                    message.warn({content: `You have 0 WBTC to make mint go to Trading page and buy some`, key: MINT_REDEEM_KEY, className: "ant-argano-message", duration: 10})
                }
            }
        }
    }, [balances])

    const getAllowance = async () => {

        let collateral;
        let share;

        if (mintRedeemCurrency === "AGOUSD") {
            collateral = await contracts.USDT.methods.allowance(account, CONTRACT_ADRESESS.POOL_AGOUSD).call();
            share = await contracts.CNUSD.methods.allowance(account, CONTRACT_ADRESESS.POOL_AGOUSD).call();
        }

        else {
            collateral = await contracts.WBTC.methods.allowance(account, CONTRACT_ADRESESS.POOL_AGOBTC).call();
            share = await contracts.CNBTC.methods.allowance(account, CONTRACT_ADRESESS.POOL_AGOBTC).call();
        }

        setApproved( prevState => ({
            ...prevState,
            collateral,
            share
        }))
    }

    const handleCollateralInput = (value) => {

        const shareOutput = ((value * info.sharePrice) - ((value * info.sharePrice) * (info.mintFee / 100))) * ((100 - info.targetCollateralRatio) / 100);
        const stableOutput = ((value * 1.0001) - ((value / 1.001) * (info.mintFee / 100))) * (info.targetCollateralRatio / 100);

        setCollateralInput(value)
        setOutputInput(stableOutput + shareOutput)
        setCatenaInput(shareOutput)
    }

    const handleCatenaInput = (value) => {
        setCatenaInput(value)
    }

    const handleApprove = async (tokenType) => {

        if (tokenType === "collateral") {
            if (mintRedeemCurrency === "AGOUSD") {
                await contracts.USDT.methods.approve(CONTRACT_ADRESESS.POOL_AGOUSD, MAX_INT).send({from: account})
            }
            else {
                await contracts.WBTC.methods.approve(CONTRACT_ADRESESS.POOL_AGOBTC, MAX_INT).send({from: account})
            }
        }
        else {
            if (mintRedeemCurrency === "AGOUSD") {
                await contracts.CNUSD.methods.approve(CONTRACT_ADRESESS.POOL_AGOUSD, MAX_INT).send({from: account})
            }
            else {
                await contracts.CNBTC.methods.approve(CONTRACT_ADRESESS.POOL_AGOBTC, MAX_INT).send({from: account})
            }
        }

       await getAllowance();
    }

    const handleMint = async () => {


        if (collateralInput > 0) {
            if (mintRedeemCurrency === "AGOUSD") {
                try {
                    message.loading({content: "Mint in process", className: "ant-argano-message", key: MINT_REDEEM_KEY, duration: 3000});
                    setMintButtonDisabled(true);
                    await contracts.POOL_AGOUSD.methods.mint(
                        formatToDecimal(collateralInput, tokens.find(item => item.symbol === "USDT").decimals),
                        formatToDecimal(catenaInput, tokens.find(item => item.symbol === "CNUSD").decimals), 0)
                        .send({from: account}); // TODO: AGOUSD amount - slippage in %
                    message.success({content: `Succsessfully minted ${mintRedeemCurrency}`, className: "ant-argano-message", key: MINT_REDEEM_KEY, duration: 5})
                    setMintButtonDisabled(false);
                }
                catch(e) {
                    message.error({content: `Some error occured: ${e.message}`, className: "ant-argano-message", key: MINT_REDEEM_KEY, duration: 5})
                    setMintButtonDisabled(false);
                }
            }
            else {
                try {
                    setMintButtonDisabled(true);
                    message.loading({content: "Mint in process", className: "ant-argano-message", key: MINT_REDEEM_KEY, duration: 3000});
                    await contracts.POOL_AGOBTC.methods.mint(
                        formatToDecimal(collateralInput, tokens.find(item => item.symbol === "WBTC").decimals),
                        formatToDecimal(catenaInput, tokens.find(item => item.symbol === "CNBTC").decimals), 0)
                        .send({from: account});
                    message.success({content: `Succsessfully minted ${mintRedeemCurrency}`, className: "ant-argano-message", key: MINT_REDEEM_KEY, duration: 5})
                    setMintButtonDisabled(false);
    
                }
                catch(e) {
                    message.error({content: `Some error occured: ${e.message}`, className: "ant-argano-message", key: MINT_REDEEM_KEY, duration: 5})
                    setMintButtonDisabled(false);
                }
            } 
        }
        else {
            message.error({content: "Please enter amount greather than 0", className: "ant-argano-message", key: MINT_REDEEM_KEY, duration: 5})
        }

    }

    const MintButton = () => {

        if (approved.collateral === "0") {
            return <button disabled={mintButtonDisabled} className='mint-window-run-mint withoutBg' onClick={() => handleApprove("collateral")}> Approve {mintRedeemCurrency === "AGOUSD" ? "USDT" : "WBTC"}</button>
        }

        if (approved.share === "0" & approved.collateral !== "0") {
            return <button disabled={mintButtonDisabled} className='mint-window-run-mint withoutBg' onClick={() => handleApprove("share")}> Approve {mintRedeemCurrency === "AGOUSD" ? "CNUSD" : "CNBTC"}</button>
        }

        else {
            return <button disabled={mintButtonDisabled} className='mint-window-run-mint withoutBg' onClick={handleMint}> Mint </button>
        }

    }

    const handleRefreshCollateralRatio = async () => {
        if (mintRedeemCurrency === "AGOUSD") {
            await contracts.TREASURY_AGOUSD.methods.refreshCollateralRatio().send({from: account});
        }
        else {
            await contracts.TREASURY_AGOBTC.methods.refreshCollateralRatio().send({from: account});
        }

    }

    return (
        <div className='general-wrapper'> 
            <div className='collect-redemption-wrapper'>
                <div className='collect-redemption'> 
                    <div>
                        <h3>Active minting</h3>
                        <span>
                            WBTC AGOBTC
                        </span>
                    </div>
                    <div className='collect-redemption-data'> 
                        <p>Price</p>
                        <p>$ 30,500</p>
                    </div>
                    <div className='collect-redemption-data'> 
                        <p>Volume</p>
                        <p>0.5</p>
                    </div>
                </div>
            </div>
            <div className='general-window'>
                <div className='general-window-header'> 
                    <h3> Mint </h3>
                    <button className='general-window-settings-btn' onClick={() => setMintRedeemCurrencyModal(true)}> <img src={setting_cog} alt="settings"/> </button>
                </div>
                <div className='general-window-input-row'>
                    <span> <h3> Input: <b> {info.targetCollateralRatio}% </b> </h3> </span>
                    <span className='balance'> <h3> Balance: {balances.find(item => mintRedeemCurrency === "AGOUSD" ? item.symbol === "USDT" : item.symbol === "WBTC" ).nativeBalance}  </h3> </span>
                    <input type='number' placeholder="0.00" onChange={(e) => handleCollateralInput(e.target.value)} value={collateralInput}/>
                    <span className='currency'> <TokenIcon iconName={ mintRedeemCurrency === "AGOUSD" ? "USDT" : "WBTC"}/> {mintRedeemCurrency === "AGOUSD" ? "USDT" : "WBTC"} </span>
                </div>
                <div className='general-window-op-sign-row'> 
                    <i className="fas fa-plus"/>
                </div>
                <div className='general-window-input-row'> 
                    <span> <h3> Input: <b>{info.targetCollateralRatio - 100}% </b> </h3> </span>
                    <span className='balance'> <h3> Balance: {balances.find(item => mintRedeemCurrency === "AGOUSD" ? item.symbol === "CNUSD" : item.symbol === "CNBTC" ).nativeBalance} </h3> </span>
                    <input type='number' disabled={info.targetCollateralRatio === 100} placeholder={info.targetCollateralRatio === 100 ? "TCR is 100%" : "0.00"} onChange={(e) => handleCatenaInput(e.target.value)} value={info.targetCollateralRatio === 100 ? "" : catenaInput}/>
                    <span className='currency'> <TokenIcon iconName={mintRedeemCurrency === "AGOUSD" ? "CNUSD" : "CNBTC"}/> {mintRedeemCurrency === "AGOUSD" ? "CNUSD" : "CNBTC"}</span>
                </div>
                <div className='general-window-op-sign-row'> 
                    <i className="fas fa-arrow-down"/>
                </div>
                <div className='general-window-input-row output'> 
                    <span> <h3> Output(estimated) </h3> </span>
                    <span className='balance'> <h3> Balance: {balances.find(item => item.symbol === mintRedeemCurrency).nativeBalance} </h3> </span>
                    <input disabled type='number' placeholder="0.00" value={outputInput}/>
                    <span className='currency'> <TokenIcon iconName={mintRedeemCurrency}/> {mintRedeemCurrency} </span>
                </div>
                <div className="general-btn-wrapper">
                    <button onClick={() => handleRefreshCollateralRatio()}> Refresh collateral ratio </button>
                    <MintButton/>
                </div>
            </div>
        </div>
    )
}

export default React.memo(Mint);