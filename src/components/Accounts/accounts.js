import './accounts.scss';
import React, { useContext, useEffect, useState } from 'react';
import history_accounts from '../../assets/icons/history-accounts.svg';
import roundChart from './../../assets/charts/round-chart.svg'
import agologo from './../../assets/icons/ago-logo.svg'
import { TokenIcon } from '../TokenIcon/token_icon';
import { ResponsiveContainer, Pie, PieChart, Cell, Tooltip } from 'recharts';
import { PortfolioPerfomance } from './PortfolioPerfomance/portfolio_perfomance';
import { AccHistory } from './AccHistory/acc-history';
import { useSystemContext } from '../../systemProvider';
import { useWeb3React } from '@web3-react/core';
import { formattedNum } from '../../utils/helpers';
import Slider from '@mui/material/Slider';
import AccountsSynthetic from './accounts-synthetic/accounts-synthetic';
import AccountsTrading from './accounts-trading/accounts-trading';
import AccountsStaking from './accounts-staking/accounts-staking';
import AccountsPools from './accounts-pools/accounts-pools';
import {useQuery} from "@apollo/client";
import {TOKENS_FOR_USER_BALANCES} from "../../api/client";
import AccountPieChart from './AccountPieChart';
import { useThemeContext } from '../Layout/layout';
import { Spin } from 'antd';
import { LOADER_INDICATOR } from '../../constants';
import { useDataContext } from '../../dataProvider';
import { LIQ_POOLS_ACCOUNTS } from '../../api/client';

const tokenColors = ["#40BA93", "#DB1BB1", "#EAD200", "#DB1B60", "#9018EE", "#1BB8DB", "#EA8C00"]


export const Accounts = () => {
    const { tokens } = useDataContext();
    const { balances, setIsWalletModal} = useSystemContext();
    const { data } = useQuery(LIQ_POOLS_ACCOUNTS);
    const [sumUserBalances, setSumUserBalances] = useState(0.00);
    const [syntheticAssets, setSyntheticAssets] = useState(null);
    const [userPortfolio, setUserPortfolio] = useState(null);
    const {account} = useWeb3React();

    const {theme} = useThemeContext();

    useEffect(() => {

        if (account && balances && tokens) {
            const res = balances.map((item) => {
                const name = item.symbol;
                const nativeBalance = item.nativeBalance;
                const usdBalance = tokens.find(tok => tok.symbol === name).priceUSD;

                return {name, nativeBalance, usdBalance: usdBalance * nativeBalance}
            });
            
            setUserPortfolio(res);
            setSyntheticAssets(res.filter(item => item.name === "AGOUSD" || item.name === "CNUSD" || item.name === "AGOBTC" || item.name === "CNBTC"))
            setSumUserBalances(res.reduce((a, {usdBalance}) => a + usdBalance, 0))
        }
    
    }, [account, balances, tokens])
 
    const [historyOpened, setHistoryOpened] = useState(false);

    const CustomToolTip = ({active, payload, label}) => {

        if (active) {
            return (
                <div className='pie-account-custom'> 
                    <TokenIcon iconName={payload[0].name}/>
                    <span> {payload[0].name} </span>
                    <span> {formattedNum(payload[0].value)}$ </span>
                </div>
            )
        }

        return null;
    }
    
    return (
        <>
        {
            !account ? 
            <div className='connect-wallet-to-view-page'>
                <h3>Please connect wallet to view this page!</h3>
                <button onClick={()=>setIsWalletModal(true)}>Connect Wallet</button>
            </div> 
            :
            <>
                {balances ? 
                    <div className={`accounts-wrapper ${theme === "light" ? " accounts-wrapper-light" : ""}`}> 
                    <AccHistory isOpened={historyOpened} setIsOpened={setHistoryOpened}/>
            
                    <div className='accounts-container'>
                        <div className='accounts-container-duo'>
                            <PortfolioPerfomance/>
                            <div className="accounts-wrapper-portoflio-assets cosmetical-wrapper"> 
                                <div className='accounts-wrapper-portoflio-assets__assets-chart-info'> 
                                    
                                    <div className='accounts-wrapper-portoflio-assets__assets-chart-info__assets-list'>
                                        <AccountPieChart userBalanceData={balances}/>
                                        <ul> 
                                            {userPortfolio && userPortfolio.map((item, _ind) => {
                                                return <li key={item.name}>
                                                    <span><TokenIcon iconName={item.name}/> {item.name} </span>
                                                    <b> {formattedNum(item.nativeBalance)} </b>
                                                </li> 
                                            })}
                                        </ul>
                                    </div>
    
                                    <div className='accounts-wrapper-portoflio-assets__assets-chart-info__bars'>
                                        <ul>
                                            {userPortfolio && userPortfolio.filter(data => data.nativeBalance > 0).map((item, _ind) => {
    
                                                const percentDiff = item.usdBalance !== 0 ? ((item.usdBalance / sumUserBalances) * 100) : 0;
                                                
                                                return (
                                                    <li key={`li_${_ind}`}>
                                                        <p>{percentDiff.toFixed(2)}%</p>
                                                        <span style={{ height: `${(percentDiff * 0.1) + 1}vh`, backgroundColor: tokenColors[_ind] }}/>
                                                        <p>{item.name}</p>
                                                    </li>
                                                )
                                            })}
                                        </ul>
    
                                        <button onClick={() => setHistoryOpened(true)}>
                                            <img src={history_accounts} alt={"history"}/> 
                                            History 
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
    
                        <div className='accounts-container-duo'>
                            <AccountsSynthetic sytheticAssets={syntheticAssets}/>
                            <AccountsTrading />
                        </div>
    
                        <div className='accounts-container-duo'>
                            {/* <AccountsStaking/> */}
                            <AccountsPools data={data}/>
                        </div>
                    </div>
                    
                </div>
                :
                    <Spin indicator={LOADER_INDICATOR}/>
                }
            </>
        }       
        </>
    )
}