import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

import './trading.scss';
import TradingWindow from './trading-window/trading-window';
import { useSystemContext } from '../../systemProvider';
import TradingMarket from './trading-market/trading-market';
import TradingFilters from './trading-filters/trading-filters';
import styled from "styled-components";
import { TokenIcon } from "../TokenIcon/token_icon";
import { useQuery } from "@apollo/client";
import { LIQ_POOLS_TRADING, quickswapClient } from "../../api/client";
import { formattedNum } from "../../utils/helpers";
import { useThemeContext } from '../Layout/layout';
import { CONTRACT_ADRESESS } from '../../constants';
import { SINGLE_PAIR_QUERY } from '../../api/quickswapQueries';

const ContentHeader = styled.div`
  width: 100%;

  display: flex;
  align-items: center;

  padding: 0 2.5vw;
  height: 46px;
`

const TradingBar = styled.div`
  width: 100%;

  position: relative;
  display: flex;
  color:${props => props.light ? "#333333" : "#fff"};
  margin-left: 4.583vw;
  height: 46px;

  .buttons {
    width: fit-content;
    display: flex;
    align-items: center;

    margin: 0 8.5vw 0 auto;
  }

  main {
    position: ${props => props.listExapned ? "absolute" : "relative"};
    padding: ${props => props.listExapned ? "0.8vw 1.25vw" : "0.417vw 1.25vw"};

    display: flex;
    align-items: center;
    z-index: 999;
    cursor: pointer;
    
    
    border: 0.052vw solid #4F4F4F;
    border-radius: 1.302vw;
    background: ${props => props.light ? "#fff" : "linear-gradient(94.62deg, rgba(150, 17, 255, 0.4) 0%, rgba(61, 27, 87, 0.4) 116.74%), #212121"};

    img {
      &:not(:first-child) {
        margin-left: 0.313vw;
      }

      width: 1.354vw;
      height: 1.354vw;
    }

    p {
      margin-left: 0.521vw;
      font-weight: 400;
      font-size: 0.938vw;
    }

    svg {
      margin: ${props => props.listExapned ? "0 auto" : "0 0.625vw"};
      width: 0.052vw;
      height: 100%;
      & path, & line{
        fill:${props => props.light ? "#333333" : "#fff"};
        stroke:${props => props.light ? "#333333" : "#fff"};
      }
      

      &:last-child {
        width: 0.521vw;
        height: 0.313vw;
      }
    }

    span {
      font-weight: 400;
      font-size: 0.938vw;
      color: ${props => props.light ? "#333333" : "#828282"};
    }

    b {
      margin-right: ${props => props.listExapned ? "0" : "1.25vw"};
      margin-left: 0.417vw;
      
      font-size: 0.938vw;
      font-weight: 500;

      color:${props => props.light ? "#333333" : "#fff"};
    }

    .expanded-liquidity-list {
      height: fit-content;
      margin-bottom: 0;
      overflow-y: scroll;

      &::-webkit-scrollbar {
        display: none;
      }

      li {
        display: grid;
        grid-template-columns: 1fr 3.125vw 1fr;
        padding: 0.5vw 1vw;
        margin-bottom: 5px;
        
        border-radius: 1vw;
        transition: 0.3s;

        .data-wrapper {
          display: flex;
        }

        &:hover {
          background: rgba(0, 0, 0, 0.3);
        }
      }

      .quick-swap-pool-item {
        grid-template-columns: 0.25fr 1fr 0.1fr 1fr;
        background-color: rgb(33, 114, 229);
        &:hover {
          background-color: rgb(22, 63, 121);;
        }
      }
    }
  }
`

const TradingTabButton = styled.button`
  padding: 0.417vw 1.875vw;
  font-size: 0.729vw;
  cursor: pointer;
  color: ${props => props.active && props.light && "#fff"};
  border: none;
  border-radius: 25px;
  background: ${props => props.active ? "#40BA93" : "transparent"};
  transition: 0.3s;

  &:first-child {
    margin-right: 0.4vw;
  }
`

const TRADING_TABS = {
  SIMPLE_SWAP: "Simple Swap",
  TRADING: "Trading"
}

export const Trading = () => {

  function valuetext(value) {
    return `-${value}%`;
  }

  const { SIMPLE_SWAP, TRADING } = TRADING_TABS;

  const { theme } = useThemeContext();
  const { data, loading } = useQuery(LIQ_POOLS_TRADING);

  const chartBlockRef = useRef(null);
  const pools = useRef(null);
  const [expandLiqPoolsList, setExpandLiqPoolsList] = useState(false);
  const [chartDimensions, setChartDimensions] = useState(null);
  const [tradingTab, setTradingTab] = useState(SIMPLE_SWAP)
  const [chosedPool, setChosedPool] = useState(null);
  const [quickswapPools, setQuickSwapPools] = useState(null);

  useEffect(() => {

    if (!loading && data) {
      setChosedPool(data.pairs.find(item => item.token1.symbol === "CNBTC"));
    }

  }, [data, loading]);

  const handleClickOutside = (event) => {
    if (pools.current && !pools.current.contains(event.target)) {
      setExpandLiqPoolsList(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  });

  useEffect(() => {
    setChartDimensions()
  }, [chartBlockRef])


  useEffect(() => {

    getQuickSwapPools()

  }, [])

  const getQuickSwapPools = async () => {

    const WMATIC_WBTC = (await quickswapClient.query({

      query: SINGLE_PAIR_QUERY,
      variables: { id: "0xf6b87181bf250af082272e3f448ec3238746ce3d" }

    })).data.pair

    const WMATIC_USDT = (await quickswapClient.query({

      query: SINGLE_PAIR_QUERY,
      variables: { id: "0x604229c960e5cacf2aaeac8be68ac07ba9df81c3" }

    })).data.pair

    setQuickSwapPools(await Promise.all([{ ...WMATIC_WBTC, isQuickSwapPool: true }, { ...WMATIC_USDT, isQuickSwapPool: true }]));

  }

  return (
    <>
      <ContentHeader light={theme === "light"}>
        <h1 className='main__heading__page'>Trading</h1>
        <TradingBar listExapned={expandLiqPoolsList} light={theme === "light"}>
          <main onClick={() => setExpandLiqPoolsList(!expandLiqPoolsList)} ref={pools}>
            {expandLiqPoolsList ?
              <ul className='expanded-liquidity-list'>
                {data?.pairs.filter(item => item.token0.symbol !== "AGO" && item.token1.symbol !== "AGO" && item.token1.symbol !== "AGOBTC" && item.token0.symbol !== "AGOUSD").map((item, _ind) => {
                  return (
                    <li onClick={() => setChosedPool(item)} key={_ind + "_pool" + item.id}>
                      <div className='data-wrapper'>
                        <TokenIcon iconName={item.token0.symbol} />
                        <TokenIcon iconName={item.token1.symbol} />
                        <p> {item.token0.symbol}-{item.token1.symbol}</p>
                      </div>
                      <svg width="1" height="27" viewBox="0 0 1 27"><line x1="0.5" y1="2.1857e-08" x2="0.499999" y2="27" stroke="white" /></svg>
                      <span>Liquidity: <b>${formattedNum(item.reserveUSD)}</b></span>
                    </li>
                  )
                })}
                {quickswapPools.map((item, _ind) => {
                  return (
                    <li onClick={() => setChosedPool(item)} key={_ind + "_pool" + item.id} className='quick-swap-pool-item'>
                      <TokenIcon iconName={"QUICK"} />
                      <div className='data-wrapper'>
                        <TokenIcon iconName={item.token0.symbol} />
                        <TokenIcon iconName={item.token1.symbol} />
                        <p> {item.token0.symbol}-{item.token1.symbol}</p>
                      </div>
                      <svg width="1" height="27" viewBox="0 0 1 27"><line x1="0.5" y1="2.1857e-08" x2="0.499999" y2="27" stroke="white" /></svg>
                      <span>Liquidity: <b>${formattedNum(item.reserveUSD)}</b></span>
                    </li>
                  )
                })}
              </ul>
              :
              <>
                <TokenIcon iconName={chosedPool?.token0.symbol} />
                <TokenIcon iconName={chosedPool?.token1.symbol} />
                <p> {chosedPool?.token0.symbol}-{chosedPool?.token1.symbol}</p>
                <svg width="1" height="27" viewBox="0 0 1 27"><line x1="0.5" y1="2.1857e-08" x2="0.499999" y2="27" stroke="white" /></svg>
                <span>Liquidity:</span>
                <b>${formattedNum(chosedPool?.reserveUSD)}</b>
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 0.901211L5 6L0 0.901211L0.88375 0L5 4.19758L9.11625 0" fill="white" />
                </svg>
              </>
            }
          </main>

          <div className="buttons">
            <TradingTabButton light={theme === "light"} onClick={() => setTradingTab(SIMPLE_SWAP)} active={tradingTab === SIMPLE_SWAP}>Simple Swap</TradingTabButton>
            <TradingTabButton light={theme === "light"} disabled onClick={() => setTradingTab(TRADING)} active={tradingTab === TRADING}>Trading </TradingTabButton>
          </div>
        </TradingBar>
      </ContentHeader>
      <div className={`trading-wrapper ${theme === "light" ? " trading-wrapper-light" : ""}`}>
        <div className='trading-container'>
          <TradingWindow light={theme === "light"} />
          <div className='trading-window-box trading-wrapper-txs'>
            <div className='trading-wrapper-txs__header'>
              <p>Pairs</p>
              <p>Date</p>
              <p>Price</p>
              <p>Status</p>
              <p>Profit</p>
              <p>Edit</p>
            </div>
          </div>
        </div>
        {tradingTab === SIMPLE_SWAP ? <TradingMarket pool={chosedPool} /> : <TradingFilters />}
      </div>
    </>
  )
}