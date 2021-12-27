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
import {LOADER_INDICATOR, LOADER_INDICATOR_LOCAL} from "../../constants";
import styled from "styled-components";
import {CreatePairModal} from "./CreatePairModal/create-pair-modal";
import { ReactComponent as CreatePairPlus } from '../../assets/icons/plus_create.svg';
import { useThemeContext } from '../Layout/layout';

const SearchBar = styled.div`
  width: 39.271vw;
  padding: 1.354vw 1.979vw;

  margin: 0 auto;
  
  display: flex;
  align-items: center;
  background: ${props => props.light ? "#F2F2F2" : "#1A1A1A"};
  border-radius: 2.083vw;
  
  & svg{
      & path{
        fill: ${props => props.light &&  "#BDBDBD"}
      }
  }
  input {
    width: 100%;
    font-size: 0.938vw;
    font-weight: 300;

    color:${props => props.light ? "#BDBDBD" : "#fff"} ;

    border: none;
    background: none;
    outline: none;


    &:focus {
      &::placeholder {
          opacity: 0;
      } 
    }
  }
`

export const LiquidityPools = () => {

    const {account, library} = useWeb3React();
    const {theme} = useThemeContext();
    const { setIsWalletModal } = useSystemContext();
    const {data, loading} = useQuery(LIQUIDITY_POOLS);
    const [pools, setPools] = useState(null);
    const [earnPools, setEarnPools] = useState(null);
    const [poolsFormatted, setPoolsFormatted] = useState([]);
    const [earnPoolsFormatted, setEarnPoolsFormatted] = useState([]);
    const [poolsPreparing, setPoolsPreparing] = useState(true);
    const [isCreatePairModal, setIsCreatePairModal] = useState(false);

    useEffect(() => {

        if (!loading && data.pairs && account) {
            prepareData(data.pairs).then(res => setPoolsPreparing(false));
        }

    }, [account, data, loading])


    useEffect(() => {

        if ( pools && earnPools ) {
            setPoolsFormatted(pools);
            setEarnPoolsFormatted(earnPools);
        }

    }, [pools, earnPools])

    const prepareData = async (pools) => {

        const res = pools.map(async (item) => {
            const lp = new library.eth.Contract(ERC20_ABI, item.id);
            const lpTotalSupply = formatFromDecimal(await lp.methods.totalSupply().call(), 18);
            const lpUserBalance = formatFromDecimal(await lp.methods.balanceOf(account).call(), 18);

            const token0 = {symbol: item.token0.symbol, address: item.token0.id, price: item.token0.priceUSD, priceInToken1: item.token1Price}
            const token1 = {symbol: item.token1.symbol, address: item.token1.id, price: item.token1.priceUSD, priceInToken0: item.token0Price}
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

            return {address: item.id, isEarnAgo: item.isRewardPool, lpTokenContract: lp, lpUserBalance, token0,token1, liqiuidityUSD: formattedNum(liquidityUSD), myLiquidity: formattedNum(myLiquidity), liqChart, volChart}

        })

        const trading = (await Promise.all(res)).filter((item) => !item.isEarnAgo);
        const earnAgo = (await Promise.all(res)).filter((item) => item.isEarnAgo);


        setPools(trading);
        setEarnPools(earnAgo);
    }

    const handleChangePool = (value) => {

        if (value.length === 0) {
            setPoolsFormatted(pools);
            return
        }


        const newPools = pools.filter(item => {

            const pairSearchPattern = `${item.token0.symbol}-${item.token1.symbol}`
            const pairSearchPatternReverse = `${item.token1.symbol}-${item.token0.symbol}`

            if (item.token0.symbol.startsWith(value.toUpperCase()) || item.token1.symbol.startsWith(value.toUpperCase())) {
                return item;
            }
            else if (pairSearchPattern.startsWith(value.toUpperCase())) {
                return item;
            }

            else if (pairSearchPatternReverse.startsWith(value.toUpperCase())) {
                return item;
            }

        })

        const newPoolsEarn = earnPools.filter(item => {

            const pairSearchPattern = `${item.token0.symbol}-${item.token1.symbol}`
            const pairSearchPatternReverse = `${item.token1.symbol}-${item.token0.symbol}`

            if (item.token0.symbol.startsWith(value.toUpperCase()) || item.token1.symbol.startsWith(value.toUpperCase())) {
                return item;
            }
            else if (pairSearchPattern.startsWith(value.toUpperCase())) {
                return item;
            }

            else if (pairSearchPatternReverse.startsWith(value.toUpperCase())) {
                return item;
            }
        })

        setPoolsFormatted(newPools);
        setEarnPoolsFormatted(newPoolsEarn);
    }

    return (
        <>
        {!account ? 
            <div className='connect-wallet-to-view-page'>
                <h3>Please connect wallet to view this page!</h3>
                <button onClick={()=> setIsWalletModal(true)}>Connect Wallet</button>
            </div>
            :
            <>
            <div className={`luqidity-pools-wrapper ${theme === "light" ? " luqidity-pools-wrapper-light" : ""}`}>
            <div className={'luqidity-pools-wrapper-page-header'}>
                <h1 className='main__heading__page'> Liquidity pools </h1>
                  <SearchBar light={theme === "light"}>
                    <input onChange={(e) => handleChangePool(e.target.value)} type="text" placeholder="Search pool" />
                    <svg width="23" height="23" viewBox="0 0 23 23">
                      <path d="M9.17198 18.344C4.09212 18.344 0 14.2519 0 9.17198C0 4.09212 4.09212 0 9.17198 0C14.2519 0 18.344 4.09212 18.344 9.17198C18.344 14.2519 14.2519 18.344 9.17198 18.344ZM9.17198 1.41107C4.86821 1.41107 1.41107 4.86821 1.41107 9.17198C1.41107 13.4758 4.86821 16.9329 9.17198 16.9329C13.4758 16.9329 16.9329 13.4758 16.9329 9.17198C16.9329 4.86821 13.4758 1.41107 9.17198 1.41107Z" fill="#333333"/>
                      <path d="M16.0027 15.0048L22.3384 21.3405L21.3408 22.3381L15.0051 16.0024L16.0027 15.0048Z" fill="#333333"/>
                    </svg>
                  </SearchBar>
                <button className='create-btn' onClick={() => setIsCreatePairModal(true)}> <CreatePairPlus /> Create Pair </button>
            </div>
            <h3 className='luqidity-pools-wrapper-heading'> Earn AGO </h3>
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
                    APR
                    <svg width="51" height="22" viewBox="0 0 51 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.70711 0.292892C8.31658 -0.0976314 7.68342 -0.0976315 7.29289 0.292892L0.928933 6.65685C0.538408 7.04738 0.538408 7.68054 0.928933 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292892ZM9 21L9 1L7 1L7 21L9 21Z" fill="#40BA93"/>
                        <path d="M42.2929 21.7071C42.6834 22.0976 43.3166 22.0976 43.7071 21.7071L50.0711 15.3431C50.4616 14.9526 50.4616 14.3195 50.0711 13.9289C49.6805 13.5384 49.0474 13.5384 48.6569 13.9289L43 19.5858L37.3431 13.9289C36.9526 13.5384 36.3195 13.5384 35.9289 13.9289C35.5384 14.3195 35.5384 14.9526 35.9289 15.3431L42.2929 21.7071ZM42 1L42 21L44 21L44 1L42 1Z" fill="#333333"/>
                    </svg>
                </h5>
            </div>
            <ul className='luqidity-pools-wrapper-list earn-ago'>
                {poolsPreparing ? <Spin size="large" indicator={LOADER_INDICATOR_LOCAL}/> :
                    <>
                        {earnPoolsFormatted.map((item) => {
                            return (
                                <LiquidityPoolsItem pool={item}/>
                            )
                        })}
                    </>
                }
            </ul>
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
                {poolsPreparing ? <Spin size="large" indicator={LOADER_INDICATOR_LOCAL}/> :
                    <>
                        {poolsFormatted.map((item) => {
                            return (
                                <LiquidityPoolsItem pool={item}/>
                            )
                        })}
                    </>
                }
            </ul>
        </div>
            {/* <CreatePairModal visible={isCreatePairModal} setVisible={setIsCreatePairModal} pools={pools}/> */}
        </>
        }
        </>
    )

}

export default LiquidityPools;
