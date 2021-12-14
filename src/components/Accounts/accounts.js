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

const tokenColors = ["#40BA93", "#DB1BB1", "#DB1BB1", "#EAD200", "#DB1B60", "#9018EE", "#1BB8DB", "#EA8C00", "#DB1B60"]


export const Accounts = () => {
    const {theme, userProtfolio} = useSystemContext();
    const {data, loading} = useQuery(TOKENS_FOR_USER_BALANCES);
    const [sumUserBalances, setSumUserBalances] = useState(0.00);
    const [balances, setBalances] = useState(null);
    const [syntheticAssets, setSyntheticAssets] = useState(null);
    const {account} = useWeb3React();

    useEffect(() => {

        if (userProtfolio && data && !loading) {
            const res = userProtfolio.map((item) => {
                const name = item.name;
                const nativeBalance = item.userNativeBalance;
                const usdBalance = data.tokens.find(tok => tok.symbol === name);

                return {name, nativeBalance, usdBalance: usdBalance.priceUSD * nativeBalance}
            });

            setBalances(res);
            setSyntheticAssets(res.filter(item => item.name === "AGOUSD" || item.name === "CNUSD" || item.name === "AGOBTC" || item.name === "CNBTC"))
            setSumUserBalances(res.reduce((a, {usdBalance}) => a + usdBalance, 0))
        }
    
    }, [userProtfolio])
 
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

    const PortfolioPieChart = ({assetsList}) => {

        return (
            <ResponsiveContainer>
                {/* <PieChart width={0} height={0}>
                    <Pie
                    startAngle={0} 
                    endAngle={360}
                    data={assetsList}
                    labelLine={false}
                    // label={renderCustomizedLabel}
                    stroke="none"
                    dataKey="userUsdBalance"
                    >
                    {assetsList.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                    </Pie>
                    <Tooltip
                    content={<CustomToolTip/>}
                    />
                </PieChart> */}
            </ResponsiveContainer>
        )
    }

    return (
        <>
        {
            account && userProtfolio && data ?
            <div className={`accounts-wrapper ${theme === "light" ? " accounts-wrapper-light" : ""}`}> 
                <AccHistory isOpened={historyOpened} setIsOpened={setHistoryOpened}/>
        
                <div className='accounts-container'>
                    <div className='accounts-container-duo'>
                        <PortfolioPerfomance/>
                        <div className="accounts-wrapper-portoflio-assets cosmetical-wrapper"> 
                            <div className='accounts-wrapper-portoflio-assets__assets-chart-info'> 
                                
                                <div className='accounts-wrapper-portoflio-assets__assets-chart-info__assets-list'>
                                    {/* <PortfolioPieChart assetsList={userProtfolio}/> */}
                                    <img className='round-chart-img' src={roundChart} />
                                    <ul> 
                                        {balances && balances.map((item, _ind) => {
                                            return <li key={item.name}>
                                                <span><TokenIcon iconName={item.name}/> {item.name} </span>
                                                <b className={_ind === 4 ? "negative-change" : ""}> {formattedNum(item.nativeBalance)} </b>
                                            </li> 
                                        })}
                                    </ul>
                                </div>

                                <div className='accounts-wrapper-portoflio-assets__assets-chart-info__bars'>
                                    <ul>
                                        {balances && balances.map((item, _ind) => {

                                            let percentDiff;
                                            if (item.usdBalance === 0) {
                                                percentDiff = 0;
                                            }
                                            else {
                                                percentDiff = ((item.usdBalance / sumUserBalances) * 100)
                                            }

                                            return (
                                                <li>
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
                        <AccountsStaking />
                        <AccountsPools />
                    </div>
                </div>
                
            </div>
            :
            <h1 className='connect-wallet-alert'> Please connect wallet to use Accounts page. </h1>
        }       
        </>
    )
}