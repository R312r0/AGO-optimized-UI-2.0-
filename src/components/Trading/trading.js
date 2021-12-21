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
import { LIQ_POOLS_TRADING } from "../../api/client";
import { formattedNum } from "../../utils/helpers";

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
  color: white;
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
    background: linear-gradient(94.62deg, rgba(150, 17, 255, 0.4) 0%, rgba(61, 27, 87, 0.4) 116.74%), #212121;

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

      &:last-child {
        width: 0.521vw;
        height: 0.313vw;
      }
    }

    span {
      font-weight: 400;
      font-size: 0.938vw;
      color: #828282;
    }

    b {
      margin-right: ${props => props.listExapned ? "0" : "1.25vw"};
      margin-left: 0.417vw;
      
      font-size: 0.938vw;
      font-weight: 500;

      color: white;
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
        
        border-radius: 1vw;
        transition: 0.3s;

        .data-wrapper {
          display: flex;
        }

        &:hover {
          background: rgba(0, 0, 0, 0.3);
        }
      }
    }
  }
`

const TradingTabButton = styled.button`
  padding: 0.417vw 1.875vw;
  font-size: 0.729vw;
  cursor: pointer;

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

  const { theme } = useSystemContext();
  const { data, loading } = useQuery(LIQ_POOLS_TRADING);

  const chartBlockRef = useRef(null);
  const pools = useRef(null);
  const [expandLiqPoolsList, setExpandLiqPoolsList] = useState(false);
  const [chartDimensions, setChartDimensions] = useState(null);
  const [tradingTab, setTradingTab] = useState(SIMPLE_SWAP)
  const [chosedPool, setChosedPool] = useState(null);

  useEffect(() => {

    if (!loading && data) {
      setChosedPool(data.pairs[0]);
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

  return (
    <>
      <ContentHeader>
        <h1 className='main__heading__page'>Trading</h1>
        <TradingBar listExapned={expandLiqPoolsList}>
          <main onClick={() => setExpandLiqPoolsList(!expandLiqPoolsList)} ref={pools}>
            {expandLiqPoolsList ?
              <ul className='expanded-liquidity-list'>
                {data?.pairs.map((item, _ind) => {
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
            <TradingTabButton onClick={() => setTradingTab(SIMPLE_SWAP)} active={tradingTab === SIMPLE_SWAP}>Simple Swap</TradingTabButton>
            <TradingTabButton onClick={() => setTradingTab(TRADING)} active={tradingTab === TRADING}>Trading</TradingTabButton>
          </div>
        </TradingBar>
      </ContentHeader>
      <div className={`trading-wrapper ${theme === "light" ? " trading-wrapper-light" : ""}`}>
        <div className='trading-container'>
          <TradingWindow />
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