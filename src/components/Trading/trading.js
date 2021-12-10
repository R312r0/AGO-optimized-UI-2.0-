import React, { useEffect, useRef, useState } from 'react';

import './trading.scss';
import TradingWindow from './trading-window/trading-window';
import { useSystemContext } from '../../systemProvider';
import TradingMarket from './trading-market/trading-market';
import TradingFilters from './trading-filters/trading-filters';

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
            <TradingFilters />
            {/* TO DO: by clicking on the Simple Swap button from ContentHeader, should be displayed this window*/}
            {/* <TradingMarket /> */}
        </div>
    )
}