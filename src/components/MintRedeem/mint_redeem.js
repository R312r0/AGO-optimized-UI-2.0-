import React, {useCallback, useContext, useEffect, useState} from 'react'
import {Layout, useThemeContext} from "../Layout/layout"
import './mint_redeem.scss'
import {TokenIcon} from "../TokenIcon/token_icon"
import Mint from './Mint/mint';
import { Redeem } from './Redeem/redeem'
import { useSystemContext } from '../../systemProvider';
import { formattedNum, formatFromDecimal } from '../../utils/helpers';
import { useWeb3React } from '@web3-react/core';
import { Spin } from 'antd';
import { LOADER_INDICATOR_LOCAL } from '../../constants';
import { CurrencySwitchModal } from './CurrencySwitchModal/currency-switch-modal';

export const MintRedeem = () => {

    const [activeTab, setActiveTab] = useState("Mint");
    const [mintRedeemInfo, setMintRedeemInfo] = useState(null);
    const { account } = useWeb3React();
    const { contracts, setIsWalletModal, balances } = useSystemContext();
    const { theme } = useThemeContext();
    // const [connectWalletThumb, setConnectWalletThumb] = useState()
    const [mintRedeemCurrencyModal, setMintRedeemCurrencyModal] = useState(false);
    const [mintRedeemCurrency, setMintRedeemCurrency] = useState("AGOUSD");
    const [mintRedeemSlipage, setMintRedeemSlipage] = useState(0.3);

    useEffect(() => {

        if (account && contracts && balances) {
            getMintRedeemInfo(mintRedeemCurrency);
        }
        else {

        }
    }, [mintRedeemCurrency, account, contracts, balances]);

    const getMintRedeemInfo = useCallback(async (currency) => {

        let info;
        let poolBalance;
        let collateralPrice;

        if (currency === "AGOUSD") {
            info = await contracts.TREASURY_AGOUSD.methods.info(account).call();
            collateralPrice = await contracts.POOL_AGOUSD.methods.getCollateralPrice().call();
            poolBalance = formatFromDecimal(await contracts.POOL_AGOUSD.methods.collateralDollarBalance().call(), 18);
        }
        else {
            info = await contracts.TREASURY_AGOBTC.methods.info(account).call();
            collateralPrice = await contracts.POOL_AGOBTC.methods.getCollateralPrice().call();
            poolBalance = formatFromDecimal(await contracts.POOL_AGOBTC.methods.collateralDollarBalance().call(), 18);
        }


        console.log(collateralPrice);

        setMintRedeemInfo({
            stablePrice: formatFromDecimal(info["0"], 6),
            sharePrice: formatFromDecimal(info["1"], 6),
            collateralPrice: formatFromDecimal(collateralPrice, 6),
            targetCollateralRatio: formatFromDecimal(info["2"], 6) * 100,
            effectiveCollateralRatio: parseFloat(formatFromDecimal(info["3"], 6)) * 100,
            mintFee: formatFromDecimal(info["5"], 6) * 100,
            redeemFee: formatFromDecimal(info["6"], 6) * 100,
            poolBalance,
        })

    }, [account, contracts]);


    return (
        <>
        {!account ?
            <div className='connect-wallet-to-view-page'>
                <h3>Please connect wallet to view this page!</h3>
                <button onClick={()=>setIsWalletModal(true)}>Connect Wallet</button>
            </div>
            :
            <>
                {
                    mintRedeemInfo ?
                        <div className={`mint-redeem-wrapper ${theme === "light" ? " mint-redeem-wrapper-light" : ""}`}>
                            <h1 className='main__heading__page'>Minting/Redeeming</h1>
                            <div className='mint-redeem-tx-info'>
                                <div>
                                    <span> {activeTab === "Mint" ? "Minting" : "Redeem"} fee: <b>{activeTab === "Mint" ?  mintRedeemInfo.mintFee : mintRedeemInfo.redeemFee}%</b></span>
                                    <i className="fas fa-circle"></i>
                                    <span> Pool balance: <b>${formattedNum(mintRedeemInfo.poolBalance)}</b></span>
                                    <i className="fas fa-circle"></i>
                                    <span> Slippage: <b>{mintRedeemSlipage}%</b></span>
                                    <i className="fas fa-circle"></i>
                                    <span> Rates: <span> 1 <b>{mintRedeemCurrency}</b> = {mintRedeemInfo.stablePrice} <b> {mintRedeemCurrency === "AGOUSD" ? "USDT" : "WBTC"}</b> </span> </span>

                                    <span className='contract__link-polygon'> <a href="https://polygonscan.com/"> View contracts on PolygonScan </a> <i className="fas fa-external-link-alt"></i> </span>
                                </div>
                            </div>
                            <div className='mint-redeem-switcher'>
                                <div>
                                    <button className={activeTab === "Mint" ? "active-switcher-button" : ""} onClick={() => setActiveTab("Mint")}> Mint </button>
                                    <button className={activeTab === "Redeem" ? "active-switcher-button" : ""} onClick={() => setActiveTab("Redeem")}> Redeem </button>
                                </div>
                            </div>
                            {activeTab === "Mint" ?
                            <Mint info={mintRedeemInfo} mintRedeemCurrency={mintRedeemCurrency} setMintRedeemCurrencyModal={setMintRedeemCurrencyModal}/>
                            : <Redeem info={mintRedeemInfo} mintRedeemCurrency={mintRedeemCurrency} setMintRedeemCurrencyModal={setMintRedeemCurrencyModal}/>}
                        </div>
                    : <Spin indicator={LOADER_INDICATOR_LOCAL}/>
                }
            </>
        }
        <CurrencySwitchModal 
            mintRedeemCurrency={mintRedeemCurrency}
            setMintRedeemCurrency={setMintRedeemCurrency}
            mintRedeemSlipage={mintRedeemSlipage}
            setMintRedeemSlipage={setMintRedeemSlipage}
            mintRedeemCurrencyModal={mintRedeemCurrencyModal}
            setMintRedeemCurrencyModal={setMintRedeemCurrencyModal}
            />
        </>
    )
}

export default MintRedeem;