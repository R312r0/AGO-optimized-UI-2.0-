import { useWeb3React } from '@web3-react/core';
import { message } from 'antd';
import React, { useEffect, useState } from 'react';
import { CONTRACT_ADRESESS, MAX_INT, MINT_REDEEM_KEY } from '../../../constants';
import setting_cog from '../../../assets/icons/setting-cog.svg'
import { useSystemContext } from '../../../systemProvider';
import { formatFromDecimal, formattedNum, formatToDecimal } from '../../../utils/helpers';
import { TokenIcon } from '../../TokenIcon/token_icon';
import { ApproveModal } from '../../ApproveModal/approve-modal';


export const Mint = ({info, mintRedeemCurrency, setMintRedeemCurrencyModal}) => {

    const {account} = useWeb3React();
    const { contracts, tokens, balances, changeTokenBalance, approveModal, setApproveModal, setApproveDataForModal } = useSystemContext();

    const [collateralInput, setCollateralInput] = useState(null);
    const [catenaInput, setCatenaInput] = useState(null);
    const [outputInput, setOutputInput] = useState(null);

    const [stableBalance, setStableBalance] = useState(0);
    const [collateralBalance, setCollateralBalance] = useState(0);
    const [shareBalance, setShareBalance] = useState(0);

    const [approved, setApproved] = useState({
        collateral: null,
        share: null,
    });


    const [mintButtonDisabled, setMintButtonDisabled] = useState(false);

    useEffect(() => {
        if (account) {
            if (!approveModal) {
                getAllowance()
            }
        }
    }, [account, mintRedeemCurrency, approveModal])


    useEffect(() => {

        if (account) {
            if (mintRedeemCurrency === "AGOUSD") {

                const agousd = balances.find(item => item.symbol === "AGOUSD").nativeBalance;
                const usdt = balances.find(item => item.symbol === "USDT").nativeBalance;
                const cnusd = balances.find(item => item.symbol === "CNUSD").nativeBalance;

                setStableBalance(agousd);
                setCollateralBalance(usdt);
                setShareBalance(cnusd);

                if (usdt.userNativeBalance === 0 && mintRedeemCurrency === "AGOUSD") {
                    setMintButtonDisabled(true);
                    message.warn({content: `You have 0 USDT to make mint go to Trading page and buy some`, key: MINT_REDEEM_KEY, className: "ant-argano-message", duration: 10})
                }
            }
            else if (mintRedeemCurrency === "AGOBTC") {

                const agobtc = balances.find(item => item.symbol === "AGOBTC").nativeBalance;
                const wbtc = balances.find(item => item.symbol === "WBTC").nativeBalance;
                const cnbtc = balances.find(item => item.symbol === "CNBTC").nativeBalance;

                setStableBalance(agobtc);
                setCollateralBalance(wbtc);
                setShareBalance(cnbtc);

                if (wbtc.userNativeBalance === 0 && mintRedeemCurrency === "AGOBTC") {
                    setMintButtonDisabled(true);
                    message.warn({content: `You have 0 WBTC to make mint go to Trading page and buy some`, key: MINT_REDEEM_KEY, className: "ant-argano-message", duration: 10})
                }
            }
        }
    }, [balances, mintRedeemCurrency])


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

        let shareOutput;
        let stableOutput;

        if (mintRedeemCurrency === "AGOUSD") {
            shareOutput = info.targetCollateralRatio < 100 ? (((parseFloat(value) * info.collateralPrice) * (1 - (info.targetCollateralRatio / 100)))
            / (parseFloat(info.sharePrice) * (info.targetCollateralRatio / 100))) : 0;
            stableOutput = (shareOutput * parseFloat(info.sharePrice)) + ((value * info.collateralPrice) * (info.targetCollateralRatio / 100))
        }

        else {
            shareOutput = info.targetCollateralRatio < 100 ? 
            (((parseFloat(value) * info.collateralPrice) * (1 - (info.targetCollateralRatio / 100))) / (parseFloat(info.sharePrice) * (info.targetCollateralRatio / 100)))
            : 0;
            stableOutput = info.stablePrice / ((shareOutput * parseFloat(info.sharePrice)) + (value * info.collateralPrice))
        }

        setCollateralInput(value)
        setOutputInput(stableOutput)
        setCatenaInput(shareOutput)
    }

    const handleCatenaInput = (value) => {
        setCatenaInput(value)
    }

    const handleApprove = () => {

        setApproveDataForModal({
            destination: CONTRACT_ADRESESS[`POOL_${mintRedeemCurrency}`],
            approves: [
                {name: mintRedeemCurrency === "AGOUSD" ? "USDT" : "WBTC",
                    address: mintRedeemCurrency === "AGOUSD" ? CONTRACT_ADRESESS.USDT : CONTRACT_ADRESESS.WBTC,
                    alreadyApproved: approved.collateral?.length === MAX_INT.length},
                {name: mintRedeemCurrency === "AGOUSD" ? "CNUSD" : "CNBTC",
                    address: mintRedeemCurrency === "AGOUSD" ? CONTRACT_ADRESESS.CNUSD : CONTRACT_ADRESESS.CNBTC,
                    alreadyApproved: approved.share?.length === MAX_INT.length}
            ]
        })

        setApproveModal(true);
    }

    const setInputsFiledToZero = () => {
        setCollateralInput(0);
        setOutputInput(0);

        if (info.targetCollateralRatio !== 100) {
            setCatenaInput(0);
        }

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

                    if (info.totalCollateralRatio !== 100) {
                        changeTokenBalance([
                            {name: "USDT", amount: collateralInput, sub: true},
                            {name: "CNUSD", amount: catenaInput, sub: true},
                            {name: "AGOUSD", amount: catenaInput, sub: false},
                        ])
                    }
                    else {
                        changeTokenBalance([
                            {name: "USDT", amount: collateralInput, sub: true},
                            {name: "AGOUSD", amount: catenaInput, sub: false},
                        ])
                    }

                    setInputsFiledToZero();
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

                        if (info.totalCollateralRatio !== 100) {
                            changeTokenBalance([
                                {name: "WBTC", amount: collateralInput, sub: true},
                                {name: "CNBTC", amount: catenaInput, sub: true},
                                {name: "AGOBTC", amount: catenaInput, sub: false},
                            ])
                        }
                        else {
                            changeTokenBalance([
                                {name: "WBTC", amount: collateralInput, sub: true},
                                {name: "AGOBTC", amount: catenaInput, sub: false},
                            ])
                        }
                        
                    setInputsFiledToZero();
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

        if (approved.collateral === "0" || approved.share === "0") {
            return <button disabled={mintButtonDisabled} className='mint-window-run-mint withoutBg' onClick={() => handleApprove("collateral")}> Approve </button>
        }

        else if (collateralBalance < +collateralInput) {
            return <button disabled={true} className='mint-window-run-mint withoutBg'> Insuficcient {mintRedeemCurrency === "AGOUSD" ? "USDT" : "WBTC"} balance </button>
        }

        else if (info.targetCollateralRatio !== 100) {
            if (shareBalance < +catenaInput) {
                return <button disabled={true} className='mint-window-run-mint withoutBg'> Insuficcient {mintRedeemCurrency === "AGOUSD" ? "CNUSD" : "CNBTC"} balance </button>
            }
            else {
                return <button disabled={mintButtonDisabled} className='mint-window-run-mint withoutBg' onClick={handleMint}> Mint </button>
            }
        }

        else {
            return <button disabled={mintButtonDisabled} className='mint-window-run-mint withoutBg' onClick={handleMint}> Mint </button>
        }

    }

    const handleRefreshCollateralRatio = async () => {
        if (mintRedeemCurrency === "AGOUSD") {
            await contracts.TREASURY_AGOUSD.methods.allocateSeigniorage().send({from: account});
            // calcCollateralBalance()

            // const exceedCollateralValue = await contracts.TREASURY_AGOUSD.methods.calcCollateralBalance().call();

            // console.log(exceedCollateralValue);

            // const data = await contracts.FOUNDRY_AGOUSD.methods.rewardPerShare().call();
            // const howMuchUSDT = await contracts.USDT.balanceOf()
            // console.log(data);

            // await contracts.TREASURY_AGOUSD.methods.refreshCollateralRatio().send({from: account});

        }
        else {
            await contracts.TREASURY_AGOBTC.methods.refreshCollateralRatio().send({from: account});
        }

    }

    return (
        <div className='general-wrapper'> 
            <div className='collect-redemption-wrapper active-minting'>
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
                    <span className='balance'>
                        <h3> Balance: {formattedNum(balances.find(item => mintRedeemCurrency === "AGOUSD" ? item.symbol === "USDT" : item.symbol === "WBTC" ).nativeBalance)}  </h3> 
                    </span>
                    <input type='number' placeholder="0.00" onChange={(e) => handleCollateralInput(e.target.value)} value={collateralInput}/>
                    <span className='currency'> <TokenIcon iconName={ mintRedeemCurrency === "AGOUSD" ? "USDT" : "WBTC"}/> {mintRedeemCurrency === "AGOUSD" ? "USDT" : "WBTC"} </span>
                </div>
                <div className='general-window-op-sign-row'> 
                    <i className="fas fa-plus"/>
                </div>
                <div className='general-window-input-row'> 
                    <span> 
                        <h3> Input: <b>{100 - info.targetCollateralRatio}% </b> </h3> 
                    </span>
                    <span className='balance'> 
                        <h3> Balance: {formattedNum(balances.find(item => mintRedeemCurrency === "AGOUSD" ? item.symbol === "CNUSD" : item.symbol === "CNBTC" ).nativeBalance)} </h3> 
                    </span>
                    <input type='number' disabled={info.targetCollateralRatio === 100} placeholder={info.targetCollateralRatio === 100 ? "TCR is 100%" : "0.00"} onChange={(e) => handleCatenaInput(e.target.value)} value={info.targetCollateralRatio === 100 ? "" : catenaInput}/>
                    <span className='currency'> <TokenIcon iconName={mintRedeemCurrency === "AGOUSD" ? "CNUSD" : "CNBTC"}/> {mintRedeemCurrency === "AGOUSD" ? "CNUSD" : "CNBTC"}</span>
                </div>
                <div className='general-window-op-sign-row'> 
                    <i className="fas fa-arrow-down"/>
                </div>
                <div className='general-window-input-row output'> 
                    <span> <h3> Output(estimated) </h3> </span>
                    <span className='balance'> 
                        <h3> Balance: {formattedNum(balances.find(item => item.symbol === mintRedeemCurrency).nativeBalance)} </h3> 
                    </span>
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