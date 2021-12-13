import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

import './trading.scss';
import TradingWindow from './trading-window/trading-window';
import { useSystemContext } from '../../systemProvider';
import TradingMarket from './trading-market/trading-market';
import TradingFilters from './trading-filters/trading-filters';
import styled from "styled-components";

const ContentHeader = styled.div`
  display: flex;
  align-items: center;

  padding: 0 2.5vw;

  h1 {
    font-weight: 500;
    font-size: 1.8vw;
    color: white;
    
    @media screen only and (max-width: 750px) {
      padding-left: 6%;
      font-size: 2.4vw;
    }
  }
`

const TradingBar = styled.div`
  display: flex;
  color: white;
  margin-left: 4.583vw;
  
  .buttons {
    display: flex;
    align-items: center;

    margin-left: 24vw;

    button {
      padding: 0.417vw 1.875vw;
      font-size: 0.729vw;
      cursor: pointer;

      border: none;
      background: transparent;
    }

    .active {
      background: #40BA93;
      border-radius: 1.052vw;
    }
  }

  main {
    display: flex;
    align-items: center;
    padding: 0.417vw 1.25vw;

    border: 0.052vw solid #4F4F4F;
    border-radius: 1.302vw;
    background: linear-gradient(94.62deg, rgba(150, 17, 255, 0.4) 0%, rgba(61, 27, 87, 0.4) 116.74%);

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
      margin: 0 0.625vw;
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
      margin-right: 0.417vw;
    }

    b {
      font-size: 0.938vw;
      font-weight: 500;
      margin-right: 1.25vw;
    }
  }
`

export const Trading = () => {

    function valuetext(value) {
        return `-${value}%`;
      }

    const chartBlockRef = useRef(null)
    const [chartDimensions, setChartDimensions] = useState(null);

    const {theme} = useSystemContext();
    
    useEffect(() => {
        setChartDimensions()
    },[chartBlockRef])

    return (
        <div className={`trading-wrapper ${theme === "light" ? " trading-wrapper-light" : ""}`}>
                <ContentHeader>
                  <h1>Trading</h1>
                  <TradingBar>
                    <main>
                      <img src="static/media/WBTC.3d49d464.svg" />
                      <img src="static/media/USDT.6dc09781.svg" />
                      <p>WBTC-USDT</p>
                      <svg width="1" height="27" viewBox="0 0 1 27"><line x1="0.5" y1="2.1857e-08" x2="0.499999" y2="27" stroke="white"/></svg>
                      <span>Liquidity:</span>
                      <b>$400,335,212</b>
                      <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 0.901211L5 6L0 0.901211L0.88375 0L5 4.19758L9.11625 0" fill="white"/>
                      </svg>
                    </main>

                    <div className="buttons">
                      <button>Simple Swap</button>
                      <button className='active'>Trading</button>
                    </div>
                  </TradingBar>
                </ContentHeader>
            <div className='trading-container'>
                <TradingWindow/>
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
            {/*<TradingFilters />*/}
            {/* TO DO: by clicking on the Simple Swap button from ContentHeader, should be displayed this window*/}
             <TradingMarket />
        </div>
    )
}