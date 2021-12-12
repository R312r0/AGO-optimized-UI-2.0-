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

export const Accounts = () => {
    const {theme, userProtfolio} = useSystemContext();
    const [sumUserBalances, setSumUserBalances] = useState(0.00);
    const {account} = useWeb3React();

    useEffect(() => {

        if (userProtfolio) {
            setSumUserBalances(formattedNum(userProtfolio.reduce((a, {userUsdBalance}) => a + userUsdBalance, 0)))
        }
    
    }, [userProtfolio])
 
    const [historyOpened, setHistoryOpened] = useState(false);

    const mockUserLiquidityPools = [
        {firstToken: "AGO", secondToken: "MATIC", provided: 110, reward: 10},
        {firstToken: "CNBTC", secondToken: "MATIC", provided: 110, reward: 10},
        {firstToken: "AGOBTC", secondToken: "WBTC", provided: 110, reward: 10},
        {firstToken: "AGOUSD", secondToken: "USDT", provided: 110, reward: 10},
        {firstToken: "CNUSD", secondToken: "MATIC", provided: 110, reward: 10},
    ]

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
            account ? 
            <div className={`accounts-wrapper ${theme === "light" ? " accounts-wrapper-light" : ""}`}> 
                {/* <AccHistory isOpened={historyOpened} setIsOpened={setHistoryOpened}/> */}
        
                <div className='accounts-container'>
                    <div className='accounts-container-duo'>
                        <PortfolioPerfomance/>
                        <div className="accounts-wrapper-portoflio-assets cosmetical-wrapper"> 
                            <div className='accounts-wrapper-portoflio-assets__assets-chart-info'> 
                                
                                <div className='accounts-wrapper-portoflio-assets__assets-chart-info__assets-list'>
                                    {/* <PortfolioPieChart assetsList={userProtfolio}/> */}
                                    <img className='round-chart-img' src={roundChart} />
                                    <ul> 
                                        {userProtfolio.map((item, _ind) => {
                                            return <li key={item.value}> 
                                                <span><TokenIcon iconName={item.name}/> {item.name} </span>
                                                <b className={_ind === 4 ? "negative-change" : ""}> {formattedNum(item.userNativeBalance)} </b>
                                            </li> 
                                        })}
                                    </ul>
                                </div>

                                <div className='accounts-wrapper-portoflio-assets__assets-chart-info__bars'>
                                    <ul>
                                        <li>
                                            <p>68%</p>
                                            <span style={{ height: '3.646vw', backgroundColor: '#40BA93' }}></span>
                                            <p>AGO</p>
                                        </li>
                                        <li>
                                            <p>5%</p>
                                            <span style={{ height: '2.604vw', backgroundColor: '#DB1BB1' }}></span>
                                            <p>AGOUSD</p>
                                        </li>
                                        <li>
                                            <p>4%</p>
                                            <span style={{ height: '2.135vw', backgroundColor: '#EAD200' }}></span>
                                            <p>AGOBTC</p>
                                        </li>
                                        <li>
                                            <p>4%</p>
                                            <span style={{ height: '2.135vw', backgroundColor: '#DB1B60' }}></span>
                                            <p>CNUSD</p>
                                        </li>
                                        <li>
                                            <p>3%</p>
                                            <span style={{ height: '2.135vw', backgroundColor: '#9018EE' }}></span>
                                            <p>CNUSD</p>
                                        </li>
                                        <li>
                                            <p>3%</p>
                                            <span style={{ height: '2.135vw', backgroundColor: '#1BB8DB' }}></span>
                                            <p>CNUSD</p>
                                        </li>
                                        <li>
                                            <p>2%</p>
                                            <span style={{ height: '1.615vw', backgroundColor: '#EA8C00' }}></span>
                                            <p>CNUSD</p>
                                        </li>
                                        <li>
                                            <p>0%</p>
                                            <span style={{ height: '1.146vw', backgroundColor: '#DB1B60' }}></span>
                                            <p>CNUSD</p>
                                        </li>
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
                        <AccountsSynthetic />
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