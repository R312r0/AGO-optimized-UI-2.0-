import React, {useState, useEffect} from 'react';
import './liquidity-pools.scss';
import {useSystemContext} from '../../systemProvider';
import {useQuery} from "@apollo/client";
import {LIQUIDITY_POOLS} from "../../api/client";
import {formatFromDecimal, formattedNum, formatToDecimal} from "../../utils/helpers";
import {useWeb3React} from "@web3-react/core";
import ERC20_ABI from '../../abi/ERC20.json';
import {LiquidityPoolsItem} from "./Liquidity-pools-item/liquidity-pools-item";
import {Spin} from "antd";
import {LOADER_INDICATOR} from "../../constants";

export const LiquidityPools = () => {

    const {account, library} = useWeb3React();
    const {theme} = useSystemContext();
    const {data, loading} = useQuery(LIQUIDITY_POOLS);
    const [pools, setPools] = useState([]);
    const [poolsPreparing, setPoolsPreparing] = useState(true);

    useEffect(() => {

        if (!loading && data.pairs) {
            prepareData(data.pairs).then(res => setPoolsPreparing(false));
        }

    }, [data, loading])


    const prepareData = async (pools) => {

        const res = pools.map(async (item) => {
            const lp = new library.eth.Contract(ERC20_ABI, item.id);
            const lpTotalSupply = formatFromDecimal(await lp.methods.totalSupply().call(), 18);
            const lpUserBalance = formatFromDecimal(await lp.methods.balanceOf(account).call(), 18);

            const token0 = {symbol: item.token0.symbol, address: item.token0.id, price: formattedNum(item.token0.priceUSD)}
            const token1 = {symbol: item.token1.symbol, address: item.token1.id, price: formattedNum(item.token1.priceUSD)}
            const liquidityUSD = item.reserveUSD;
            const myLiquidity = (liquidityUSD / lpTotalSupply) * lpUserBalance;

            const liqChart = item.liquidityChart.map((item) => {
               const date = new Date(item.timestamp * 1000);
               const time = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();

               return {value: +item.valueUSD, time};
            });

            const volChart = item.volumeChart.map((item) => {
                const date = new Date(item.timestamp * 1000);
                const time = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();

                return {value: +item.valueUSD, time}
            });

            return {token0,token1, liqiuidityUSD: formattedNum(liquidityUSD), myLiquidity: formattedNum(myLiquidity), liqChart, volChart}

        })

        setPools(await Promise.all(res));
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
                {poolsPreparing ? <Spin size="large" indicator={LOADER_INDICATOR}/> :
                    <>
                        {pools.map((item) => {
                            return (
                                <LiquidityPoolsItem pool={item}/>
                            )
                        })}
                    </>
                }
            </ul>
        </div>

    )

}

export default LiquidityPools;
