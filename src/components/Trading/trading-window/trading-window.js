import React, {useEffect, useState} from 'react';
import line from '../../../assets/icons/chart-switcher/line.svg';
import candle from '../../../assets/icons/chart-switcher/candle.svg';
import line_active from '../../../assets/icons/chart-switcher/line-active.svg';
import candle_active from '../../../assets/icons/chart-switcher/candle-active.svg';
import {COINGECKO_IDS, LOADER_INDICATOR_LOCAL} from "../../../constants";
import { useSystemContext } from '../../../systemProvider';
import { TradingChart } from '../trading-chart/trading-chart';
import '../trading.scss';
import axios from 'axios';
import {useQuery} from "@apollo/client";
import {TOKENS_TRADING} from "../../../api/client";
import {Spin} from "antd";

const TradingWindow = () => {

    const {tokens} = useSystemContext();

    const {data, loading} = useQuery(TOKENS_TRADING);
    // const [chartType, setChartType] = useState("candle");

    // const [chartTimeStamp, setChartTimeStamp] = useState([
    //     {timeframe: "1", active: true, value: "1D"},
    //     {timeframe: "30", active: false, value: "1M"},
    //     {timeframe: "max", active: false, value: "All"},
    // ]);

    const [activeToken, setActiveToken] = useState(null);
    const [candleChart, setCandleChart] = useState(null);
    const [lineChart, setLineChart] = useState(null);


    useEffect(() => {

        if (data && !loading) {
            setActiveToken(data.tokens[0].symbol);
        }

    }, [data, loading])

    useEffect(() => {

        if (activeToken) {

            console.log(data.tokens.find(item => item.symbol === activeToken).lineChartUSD)

            setLineChart(data.tokens.find(item => item.symbol === activeToken).lineChartUSD);
        }

    }, [activeToken])

    // useEffect(() => {
    //
    //     if (tokens) {
    //         const tokensArr = Object.entries(tokens).map((item, _ind) => ({name: item[0], coindgeckoId: COINGECKO_IDS[item[0]], active: _ind === 0}));
    //         setTokensCoingecko(tokensArr);
    //     }
    //
    // }, [tokens])


    // useEffect(() => {
    //
    //     if (tokensCoinGecko && chartTimeStamp) {
    //         fetchChartTokenData(tokensCoinGecko.find(item => item.active).coindgeckoId, chartTimeStamp.find(item => item.active).timeframe);
    //     }
    //
    // }, [tokensCoinGecko, chartTimeStamp])

    // const fetchChartTokenData = async (token, timestamp) => {
    //
    //     try {
    //
    //         setLoading(true)
    //
    //         const candle = await axios.get(`https://api.coingecko.com/api/v3/coins/${token}/ohlc?vs_currency=usd&days=${timestamp}`)
    //         const line = await axios.get(`https://api.coingecko.com/api/v3/coins/${token}/market_chart?vs_currency=usd&days=max`)
    //         setCandleChart(candle.data);
    //         setLineChart(line.data.prices);
    //
    //         setLoading(false);
    //
    //     }
    //     catch (e) {
    //     }
    // }

    // TODO: When Trade Volume on proj is low we can't choose timeframe
    // const onChangeTimeStamp = (value) => {
    //     const newTime = chartTimeStamp.map(item => item.value === value ? {...item, active: true} : {...item, active: false})
    //     setChartTimeStamp(newTime);
    // }


    return <div className='trading-wrapper-chart trading-window-box'>
        {loading && !activeToken ?
            <Spin indicator={LOADER_INDICATOR_LOCAL}/>
            :
            <>
                <div className='trading-wrapper-chart__header'>
                    <h1> Chart </h1>
                    <div className='trading-wrapper-chart__control-panel'>
                        {/*{chartType === "line" ?*/}
                        {/*    null*/}
                        {/*    :*/}
                        {/*    <>*/}
                        {/*        {chartTimeStamp.map((item) => {*/}
                        {/*            return <button onClick={() => onChangeTimeStamp(item.value)} className={item.active ?  "active-time-frame" : null}> {item.value} </button>*/}
                        {/*        })}*/}
                        {/*    </>*/}
                        {/*}*/}

                        <select value={activeToken} onChange={(e) => setActiveToken(e.target.value)} >
                            {data.tokens.map((item) => {
                                return <option> {item.symbol} </option>
                            })}
                        </select>

                        <div className="chart-switcher">
                            {/*<button onClick={() => setChartType("candle")} className={chartType === "candle" ? "active-chart-type" : ""}> <img src={chartType === "candle" ? candle_active : candle} width={20} height={20} alt="candle"/> </button>*/}
                            <button onClick={() => console.log("lineChart")} className={"active-chart-type"}> <img src={line_active} width={20} height={20} alt="line"/> </button>
                        </div>
                    </div>
                </div>
                <div className='trading-wrapper-chart__chart-graph'>
                    {lineChart ? <TradingChart candleData={candleChart} lineData={lineChart} chartType={"line"}/> : null}
                </div>
            </>
        }
    </div>
}
export default TradingWindow;