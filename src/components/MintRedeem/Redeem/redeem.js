import React, { useEffect, useState } from 'react';
import { TokenIcon } from '../../TokenIcon/token_icon';
import setting_cog from '../../../assets/icons/setting-cog.svg';
import { useWeb3React } from '@web3-react/core';
import { useSystemContext } from '../../../systemProvider';
import { CONTRACT_ADRESESS, MINT_REDEEM_KEY } from '../../../constants';
import { MAX_INT } from '../../../constants';
import { formatFromDecimal, formattedNum, formatToDecimal } from '../../../utils/helpers';
import { ApproveModal } from '../../ApproveModal/approve-modal';
import { message } from 'antd';

export const Redeem = ({info, mintRedeemCurrency, setMintRedeemCurrencyModal}) => {


    const { account } = useWeb3React();
    const { contracts, tokens, balances, changeTokenBalance, approveModal, setApproveModal, setApproveDataForModal } = useSystemContext();
    const [approved, setApproved] = useState(null);


    const [stableBalance, setStableBalance] = useState(0);
    const [input, setInput] = useState(null);
    const [collateralOutput, setCollateralOutput] = useState(null);
    const [catenaOutput, setCatenaOutput] = useState(null);
    const [redeemBalances, setRedeemBalances] = useState(null)

    useEffect(() => {

        if (account) {

            setStableBalance(balances.find((item) => item.symbol === mintRedeemCurrency).nativeBalance);

            if (!approveModal) {
                getAllowance()                
            }

            getRedemption()

        }


    }, [account, mintRedeemCurrency, approveModal])

    const getAllowance = async () => {

        let token;

        if (mintRedeemCurrency === "AGOUSD") {
            token = await contracts.AGOUSD.methods.allowance(account, CONTRACT_ADRESESS.POOL_AGOUSD).call();
        }
        else {
            token = await contracts.AGOBTC.methods.allowance(account, CONTRACT_ADRESESS.POOL_AGOBTC).call();
        }


        setApproved(token.length === MAX_INT.length)

    }

    const getRedemption = async () => {

        let redemptionCollateral;
        let redemptionShare;

        if (mintRedeemCurrency === "AGOUSD") {
            redemptionCollateral = formatFromDecimal(await contracts.POOL_AGOUSD.methods.redeem_collateral_balances(account).call(), tokens.find(item => item.symbol === "USDT").decimals);
            redemptionShare = formatFromDecimal(await contracts.POOL_AGOUSD.methods.redeem_share_balances(account).call(), tokens.find(item => item.symbol === "CNUSD").decimals);
        }

        else {
            redemptionCollateral = formatFromDecimal(await contracts.POOL_AGOBTC.methods.redeem_collateral_balances(account).call(), tokens.find(item => item.symbol === "WBTC").decimals);
            redemptionShare = formatFromDecimal(await contracts.POOL_AGOBTC.methods.redeem_share_balances(account).call(), tokens.find(item => item.symbol === "CNBTC").decimals); 
        }

        setRedeemBalances({redemptionCollateral, redemptionShare})

    }

    const setInputsToZero = () => {
        setCollateralOutput(0);
        setInput(0);
        if (info.effectiveCollateralRatio !== 100) {
            setCatenaOutput(0)
        }        
    }

    const handleRedeem = async () => {
        if (input === "0" || !input) {
            message.error({content: `Please enter amount greather than 0`, key: MINT_REDEEM_KEY, duration: 3, className: "ant-argano-message"})
            return
        }
        try {
            message.loading({content: `Redeeming ${mintRedeemCurrency}`, key: MINT_REDEEM_KEY, duration: 3000, className: "ant-argano-message"})
            if (mintRedeemCurrency === "AGOUSD") {
                await contracts.POOL_AGOUSD.methods.redeem(formatToDecimal(input, tokens.find((item) => item.symbol === "AGOUSD").decimals), 0, 0).send({from: account});
            }
            else {
                await contracts.POOL_AGOBTC.methods.redeem(formatToDecimal(input, tokens.find((item) => item.symbol === "AGOBTC").decimals), 0, 0).send({from: account})
            }

            changeTokenBalance([
                {name: mintRedeemCurrency, amount: input, sub: true},
            ])

            await getRedemption();
            setInputsToZero();
            message.success({content: `Successfully redeemed ${mintRedeemCurrency} !`, key: MINT_REDEEM_KEY, duration: 3, className: "ant-argano-message"})
        }
        catch {
            message.error({content: `Something went wrong !`, key: MINT_REDEEM_KEY, duration: 3, className: "ant-argano-message"})
        }

    }

    const handleApprove = async () => {

        setApproveDataForModal({
            destination: CONTRACT_ADRESESS[`POOL_${mintRedeemCurrency}`],
            approves: [
                {name: mintRedeemCurrency,
                    address: CONTRACT_ADRESESS[mintRedeemCurrency],
                    alreadyApproved: approved?.length === MAX_INT.length},
            ]
        })

        setApproveModal(true);
    }

    const handleStableInput = (value) => {

        const collateralOutput = ((parseFloat(value) * (info.effectiveCollateralRatio / 100)) / info.collateralPrice)
        const shareOutput = ((parseFloat(value) * (1 - (info.effectiveCollateralRatio / 100))) / info.sharePrice)

        setCollateralOutput(collateralOutput);
        setCatenaOutput(shareOutput);
        
        setInput(value);
    }

    const collectRedemption = async () => {

        try {
            message.loading({content: `Collect redemption`, key: MINT_REDEEM_KEY, duration: 3000, className: "ant-argano-message"})
            if (mintRedeemCurrency === "AGOUSD") {
                await contracts.POOL_AGOUSD.methods.collectRedemption().send({from: account});

                if (info.effectiveCollateralRatio !== 100) {
                    changeTokenBalance([
                        {name: "USDT", amount: parseFloat(redeemBalances.redemptionCollateral), sub: false},
                        {name: "CNUSD", amount: parseFloat(redeemBalances.redemptionShare), sub: false}
                    ]);
                }
                else {
                    changeTokenBalance([
                        {name: "USDT", amount: redeemBalances.redemptionCollateral, sub: false},
                    ]);
                }
            }
    
            else {
                await contracts.POOL_AGOBTC.methods.collectRedemption().send({from: account}); 

                if (info.effectiveCollateralRatio !== 100) {
                    changeTokenBalance([
                        {name: "WBTC", amount: parseFloat(redeemBalances.redemptionCollateral), sub: false},
                        {name: "CNBTC", amount: parseFloat(redeemBalances.redemptionShare), sub: false}
                    ]);
                }
                else {
                    changeTokenBalance([
                        {name: "WBTC", amount: parseFloat(redeemBalances.redemptionCollateral), sub: false},
                    ]);
                }
            }
            setRedeemBalances({redemptionCollateral: 0, redemptionShare: 0});
            message.success({content: `Successfully collected redemption !`, key: MINT_REDEEM_KEY, duration: 3, className: "ant-argano-message"})

        }
        catch {
            message.error({content: `Something went wrong !`, key: MINT_REDEEM_KEY, duration: 3, className: "ant-argano-message"})
        }

    }

    return (
        <div className='general-wrapper'>
            <div className='collect-redemption-wrapper '>
                <div className='collect-redemption'> 
                    <div>
                        <h3> Collect redemption </h3>
                        <button disabled={collectRedemption.redemptionCollateral === "0" && collectRedemption.redemptionShare === "0"} onClick={() => collectRedemption()}> Collect </button>
                    </div>
                    <div> 
                        <h3> {formattedNum(redeemBalances?.redemptionCollateral)} <b>{mintRedeemCurrency === "AGOUSD" ? "USDT" : "WBTC"}</b> </h3>
                        <h3> {formattedNum(redeemBalances?.redemptionShare)} <b>{mintRedeemCurrency === "AGOUSD" ? "CNUSD" : "CNBTC"}</b> </h3>
                    </div>
                </div>
                <div className='collect-redemption active-minting'> 
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
                <h3> Redeem </h3>
                <button className='general-window-settings-btn' onClick={() => setMintRedeemCurrencyModal(true)}> <img src={setting_cog} alt={"settings"}/> </button>
            </div>
            <div className='general-window-input-row'> 
                <span> <h3> Input </h3> </span>
                <span className='balance'>
                    <h3> Balance: {formattedNum(balances.find(item => item.symbol === mintRedeemCurrency).nativeBalance)} </h3> 
                </span>
                <input onChange={(e) => handleStableInput(e.target.value)} className='inpunt-redeem' type='number' placeholder="0.00" value={input}/>
                <span className='currency'> <TokenIcon iconName={mintRedeemCurrency}/> {mintRedeemCurrency} </span>
            </div>
            <div className='general-window-op-sign-row'> 
                <i className="fas fa-arrow-down"/>
            </div>
            <div className='general-window-input-row'> 
                <span> <h3> Output {mintRedeemCurrency === "AGOUSD" ? "USDT" : "WBTC"} : <b> {info.effectiveCollateralRatio}% </b> </h3> </span>
                <span className='balance'> 
                    <h3> Balance: {formattedNum(balances.find(item => mintRedeemCurrency === "AGOUSD" ? item.symbol === "USDT" : item.symbol === "WBTC").nativeBalance)} </h3> 
                </span>
                <input disabled type='number' placeholder="0.00" value={collateralOutput}/>
                <span className='currency'> <TokenIcon iconName={mintRedeemCurrency === "AGOUSD" ? "USDT" : "WBTC"}/> {mintRedeemCurrency === "AGOUSD" ? "USDT" : "WBTC"} </span>
            </div>
            <div className='general-window-op-sign-row'> 
                <i className="fas fa-plus"/>
            </div>
            <div className='general-window-input-row output'> 
                <span> <h3> Output {mintRedeemCurrency === "AGOUSD" ? "CNUSD" : "CNBTC"} : <b> {100 - info.effectiveCollateralRatio}% </b> </h3> </span>
                <span className='balance'> 
                    <h3> Balance: {formattedNum(balances.find((item) => mintRedeemCurrency === "AGOUSD" ? item.symbol === "CNUSD" : item.symbol === "CNBTC").nativeBalance)} </h3> 
                </span>
                <input disabled type='number' placeholder={info.effectiveCollateralRatio === 100 ? "ECR is 100%" : "0.00"} value={info.effectiveCollateralRatio === 100 ? null : catenaOutput}/>
                <span className='currency'> <TokenIcon iconName={mintRedeemCurrency === "AGOUSD" ? "CNUSD" : "CNBTC"}/> {mintRedeemCurrency === "AGOUSD" ? "CNUSD" : "CNBTC"} </span>
            </div>
            <div className='general-btn-wrapper'>
                {input > stableBalance ? 
                    <button className='mint-window-run-mint' disabled={true}> Insufficient {mintRedeemCurrency} balance </button>
                    :
                    <button className='mint-window-run-mint' onClick={approved ? handleRedeem : handleApprove}> {approved > "0" ? "Redeem" : `Approve`}</button>
                }
            </div>
        </div>
    </div>
    )
}