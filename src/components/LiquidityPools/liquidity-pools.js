import React, {useContext, useState} from 'react';
import {Layout} from '../Layout/layout';
import {TokenIcon} from '../TokenIcon/token_icon';
import {ProvideLiquidity} from './ProvideLiquidity/provide_liquidity';
import {Liquidity} from './Liquidity/liquidity';
import {Volume} from './Volume/volume';
import {PieChart, Pie, Sector, Cell, ResponsiveContainer} from 'recharts';
import './liquidity-pools.scss';
import {useSystemContext} from '../../systemProvider';

export const LiquidityPools = () => {

    const [liquidityPools, setLiquidityPools] = useState([
        {firstToken: "AGO", secondToken: "MATIC", liquidity: "$400,335,212", myLiquidity: "-", apy: "30%"},
        {firstToken: "CNBTC", secondToken: "MATIC", liquidity: "$400,112,042", myLiquidity: "-", apy: "35%"},
        {firstToken: "AGOBTC", secondToken: "WBTC", liquidity: "$400,223,012", myLiquidity: "$19,225,116", apy: "33%"},
        {firstToken: "AGOUSD", secondToken: "USDT", liquidity: "$400,124,544", myLiquidity: "$19,225,116", apy: "45%"},
        {firstToken: "CNUSD", secondToken: "MATIC", liquidity: "$400,546,987", myLiquidity: "$19,225,116", apy: "31%"},
        {firstToken: "CNUSD", secondToken: "MATIC", liquidity: "$400,324,546", myLiquidity: "-", apy: "30%"},
    ]);
    const {theme} = useSystemContext();

    const [itemChoosenWindow, setItemChoosenWindow] = useState("Volume");


    const [openedWindows, setOpenedWindows] = useState([]);

    const handleLiquidityPoolsOpened = (name) => {

        const isName = openedWindows.findIndex((item) => item === name);

        if (isName === -1) {
            setOpenedWindows([...openedWindows, name]);
        } else {

            const tempArr = openedWindows;
            tempArr.splice(isName, 1);
            setOpenedWindows([...tempArr]);

        }
    }

    const ExpandedTab = (pool) => {

        switch (itemChoosenWindow) {
            case "Provide Liquidity":
                return (<ProvideLiquidity pool={pool}/>)
            case "Volume":
                return (<Volume/>)
            case "Liquidity":
                return (<Liquidity/>)
            default:
                return (<ProvideLiquidity/>)
        }
    }

    const ProvideLiquidityPieChart = ({token1, token2}) => {


        const data = [
            {name: token1, value: 400},
            {name: token2, value: 400},
        ];

        const RADIAN = Math.PI / 180;
        const renderCustomizedLabel = ({cx, cy, midAngle, innerRadius, outerRadius, percent, index}) => {
            const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
            const x = cx + radius * Math.cos(-midAngle * RADIAN);
            const y = cy + radius * Math.sin(-midAngle * RADIAN);

            return (
                <text x={x > cx ? x - 20 : x + 20} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'}
                      dominantBaseline="central">
                    {`${(percent * 100).toFixed(0)}%`}
                </text>
            );
        };

        return (
            <div className='chart-block'>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart width={200} height={200}>
                        <defs>
                            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0" stopColor="#40BA93"/>
                                <stop offset="1" stopColor="rgba(64, 186, 147, 0.25)"/>
                            </linearGradient>
                        </defs>
                        <defs>
                            <linearGradient id="colorUvSecond" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0" stopColor="#358269"/>
                                <stop offset="1" stopColor="rgba(53, 130, 105, 0.25)"/>
                            </linearGradient>
                        </defs>
                        <Pie
                            startAngle={90}
                            endAngle={450}
                            data={data}
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={100}
                            stroke="none"
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`}
                                      fill={index === 0 ? "url(#colorUv)" : "url(#colorUvSecond)"}/>
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </div>
        )
    }


    return (
        <div className={`luqidity-pools-wrapper ${theme === "light" ? " luqidity-pools-wrapper-light" : ""}`}>
            <h3 className='luqidity-pools-wrapper-heading'>Trading pools</h3>
            <div className='luqidity-pools-wrapper__list-header'>
                <h5> Pool </h5>
                <h5> 
                    Liquidity 
                    <svg width="51" height="22" viewBox="0 0 51 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.70711 0.292892C8.31658 -0.0976314 7.68342 -0.0976315 7.29289 0.292892L0.928933 6.65685C0.538408 7.04738 0.538408 7.68054 0.928933 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292892ZM9 21L9 1L7 1L7 21L9 21Z" fill="#40BA93"/>
                        <path d="M42.2929 21.7071C42.6834 22.0976 43.3166 22.0976 43.7071 21.7071L50.0711 15.3431C50.4616 14.9526 50.4616 14.3195 50.0711 13.9289C49.6805 13.5384 49.0474 13.5384 48.6569 13.9289L43 19.5858L37.3431 13.9289C36.9526 13.5384 36.3195 13.5384 35.9289 13.9289C35.5384 14.3195 35.5384 14.9526 35.9289 15.3431L42.2929 21.7071ZM42 1L42 21L44 21L44 1L42 1Z" fill="#333333"/>
                    </svg>
                </h5>
                <h5> 
                    My Liquidity
                    <svg width="51" height="22" viewBox="0 0 51 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.70711 0.292892C8.31658 -0.0976314 7.68342 -0.0976315 7.29289 0.292892L0.928933 6.65685C0.538408 7.04738 0.538408 7.68054 0.928933 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292892ZM9 21L9 1L7 1L7 21L9 21Z" fill="#333333"/>
                        <path d="M42.2929 21.7071C42.6834 22.0976 43.3166 22.0976 43.7071 21.7071L50.0711 15.3431C50.4616 14.9526 50.4616 14.3195 50.0711 13.9289C49.6805 13.5384 49.0474 13.5384 48.6569 13.9289L43 19.5858L37.3431 13.9289C36.9526 13.5384 36.3195 13.5384 35.9289 13.9289C35.5384 14.3195 35.5384 14.9526 35.9289 15.3431L42.2929 21.7071ZM42 1L42 21L44 21L44 1L42 1Z" fill="#EF3725"/>
                    </svg>
                </h5>
                <h5> 
                    APY
                    <svg width="51" height="22" viewBox="0 0 51 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.70711 0.292892C8.31658 -0.0976314 7.68342 -0.0976315 7.29289 0.292892L0.928933 6.65685C0.538408 7.04738 0.538408 7.68054 0.928933 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292892ZM9 21L9 1L7 1L7 21L9 21Z" fill="#40BA93"/>
                        <path d="M42.2929 21.7071C42.6834 22.0976 43.3166 22.0976 43.7071 21.7071L50.0711 15.3431C50.4616 14.9526 50.4616 14.3195 50.0711 13.9289C49.6805 13.5384 49.0474 13.5384 48.6569 13.9289L43 19.5858L37.3431 13.9289C36.9526 13.5384 36.3195 13.5384 35.9289 13.9289C35.5384 14.3195 35.5384 14.9526 35.9289 15.3431L42.2929 21.7071ZM42 1L42 21L44 21L44 1L42 1Z" fill="#333333"/>
                    </svg>
                </h5>
            </div>
            <ul className='luqidity-pools-wrapper-list'>
                {liquidityPools.map((item) => {

                    const windowExpanded = openedWindows.findIndex((name) => name === item.firstToken + item.secondToken) !== -1;

                    return (
                        <li className={`luqidity-pools-wrapper-list-item ${windowExpanded ? "liq-item-opened" : ""}`}>
                            <div className='luqidity-pools-wrapper-list-item__header'>
                                <div className='pair'>
                                    <TokenIcon iconName={item.firstToken}/>
                                    <TokenIcon iconName={item.secondToken}/>
                                    <h3> {item.firstToken}-{item.secondToken} </h3>
                                </div>
                                <h3> {item.liquidity} </h3>
                                <h3> {item.myLiquidity} </h3>
                                <h3> {item.apy} </h3>
                                <button 
                                className='chart-expand' 
                                onClick={() => handleLiquidityPoolsOpened(item.firstToken + item.secondToken)}
                                >
                                    {windowExpanded ?
                                    <i class="fas fa-times"></i> : <i class="fas fa-chart-line"></i>
                                    } 
                                </button>
                            </div>
                            {windowExpanded ?
                                <div className='control-panel'>
                                    <div className='control-panel__header'>
                                        <button onClick={() => setItemChoosenWindow("Provide Liquidity")}
                                                className={`${itemChoosenWindow === "Provide Liquidity" ? "active" : ""}`}> Provide
                                            Liquidity
                                        </button>
                                        <button onClick={() => setItemChoosenWindow("Volume")}
                                                className={`${itemChoosenWindow === "Volume" ? "active" : ""}`}> Volume
                                        </button>
                                        <button onClick={() => setItemChoosenWindow("Liquidity")}
                                                className={`${itemChoosenWindow === "Liquidity" ? "active" : ""}`}> Liquidity
                                        </button>
                                    </div>
                                    <div className="control-panel__content">
                                        {/* TODO: Make this stuff work just for choosen item */}
                                        <ExpandedTab pool={item}/>
                                        {itemChoosenWindow === "Provide Liquidity" ?
                                            <div className='provide-liq-wrapper'>
                                                <ProvideLiquidityPieChart token1={item.firstToken}
                                                                          token2={item.secondToken}/>
                                                <button> Porvide</button>
                                            </div>
                                            :
                                            <div className='liq-info'>
                                                <span> <h5>Liquidity </h5> <b> $685,105,818 </b> </span>
                                                <span> <h5>Volume (24H) </h5> <b> $11,552,984 </b> </span>
                                                <span> <h5>Earnings (24H) </h5> <b> $51,544 </b> </span>
                                                <span> <h5>Total APY </h5> <b> 31.84% </b> </span>
                                                <span> <h5>My Liquidity </h5> <b> $0 </b> </span>
                                            </div>
                                        }

                                    </div>
                                </div>
                                :
                                ""
                            }
                        </li>
                    )
                })}
            </ul>
        </div>

    )

}

export default LiquidityPools;
