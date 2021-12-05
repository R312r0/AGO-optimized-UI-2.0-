import React, {useState, useEffect} from 'react';
import {TokenIcon} from '../TokenIcon/token_icon';
import {ProvideLiquidity} from './ProvideLiquidity/provide_liquidity';
import {Liquidity} from './Liquidity/liquidity';
import {Volume} from './Volume/volume';
import {PieChart, Pie, Sector, Cell, ResponsiveContainer} from 'recharts';
import './liquidity-pools.scss';
import {useSystemContext} from '../../systemProvider';
import {useQuery} from "@apollo/client";
import {LIQUIDITY_POOLS} from "../../api/client";
import {formatFromDecimal, formattedNum, formatToDecimal} from "../../utils/helpers";
import {useWeb3React} from "@web3-react/core";
import ERC20_ABI from '../../abi/ERC20.json';

export const LiquidityPools = () => {

    const {account, library} = useWeb3React();
    const {theme, contracts} = useSystemContext();
    const {data, loading} = useQuery(LIQUIDITY_POOLS);
    const [pools, setPools] = useState([]);
    const [poolsPreparing, setPoolsPreparing] = useState(true);
    const [itemChoosenWindow, setItemChoosenWindow] = useState("Volume");

    const [openedWindows, setOpenedWindows] = useState([]);

    useEffect(() => {

        if (!loading && data.pairs) {

            console.log(data);
            prepareData(data.pairs).then(res => setPoolsPreparing(false));
        }

    }, [data, loading])


    const prepareData = async (pools) => {

        const res = pools.map(async (item) => {
            const lp = new library.eth.Contract(ERC20_ABI, item.id);
            const lpTotalSupply = formatFromDecimal(await lp.methods.totalSupply().call(), 18);
            const lpUserBalance = formatFromDecimal(await lp.methods.balanceOf(account).call(), 18);  // FIXME: change "0x.." to account!

            const token0 = {symbol: item.token0.symbol, address: item.token0.id, price: formattedNum(item.token0.priceUSD)}
            const token1 = {symbol: item.token1.symbol, address: item.token1.id, price: formattedNum(item.token1.priceUSD)}
            const liquidityUSD = item.reserveUSD;
            const myLiquidity = (liquidityUSD / lpTotalSupply) * lpUserBalance;

            const liqChart = item.liquidityChart.map((item) => {
               const date = new Date(item.timestamp * 1000);
               const time = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();

               return {value: (+item.valueUSD).toFixed(2), time};
            });

            const volChart = item.volumeChart.map((item) => {
                const date = new Date(item.timestamp * 1000);
                const time = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();

                return {value: (+item.valueUSD).toFixed(2), time}
            });

            return {token0,token1, liqiuidityUSD: formattedNum(liquidityUSD), myLiquidity: formattedNum(myLiquidity), liqChart, volChart}

        })


        setPools(await Promise.all(res));
    }

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

    const ExpandedTab = ({pool}) => {

        console.log(pool);

        switch (itemChoosenWindow) {
            case "Provide Liquidity":
                return (<ProvideLiquidity pool={pool}/>)
            case "Volume":
                return (<Volume data={pool.volChart}/>)
            case "Liquidity":
                return (<Liquidity data={pool.liqChart}/>)
            default:
                return (<ProvideLiquidity/>)
        }
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

                {!poolsPreparing && pools.map((item) => {

                    console.log(pools);
                    const windowExpanded = openedWindows.findIndex((name) => name === item.token0.symbol + item.token1.symbol) !== -1;

                    return (
                        <li className={`luqidity-pools-wrapper-list-item ${windowExpanded ? "liq-item-opened" : ""}`}>
                            <div className='luqidity-pools-wrapper-list-item__header'>
                                <div className='pair'>
                                    <TokenIcon iconName={item.token0.symbol}/>
                                    <TokenIcon iconName={item.token1.symbol}/>
                                    <h3> {item.token0.symbol}-{item.token1.symbol} </h3>
                                </div>
                                <h3> {item.liqiuidityUSD}$ </h3>
                                <h3>  {item.myLiquidity}$ </h3>
                                <h3> 0% </h3>
                                <button className='chart-expand'
                                        onClick={() => handleLiquidityPoolsOpened(item.token0.symbol + item.token1.symbol)}> {windowExpanded ?
                                    <i className="fas fa-times"></i> : <i className="fas fa-chart-line"></i>} </button>
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
                                        {itemChoosenWindow !== "Provide Liquidity" ?

                                            <div className='liq-info'>
                                                <span> <h5>Liquidity </h5> <b> ${item.liqiuidityUSD} </b> </span>
                                                <span> <h5>Volume (24H) </h5> <b> $ volume </b> </span>
                                                <span> <h5>Earnings (24H) </h5> <b> $51,544 </b> </span>
                                                <span> <h5>Total APY </h5> <b> 31.84% </b> </span>
                                                <span> <h5>My Liquidity </h5> <b> ${item.myLiquidity} </b> </span>
                                            </div>
                                            :
                                            null
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
