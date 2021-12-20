import React, {useEffect, useState} from 'react';

import { ResponsiveContainer, LineChart, Line, Tooltip, XAxis} from 'recharts';
import { useSystemContext } from '../../../systemProvider';
import {
    findNearestPorfolioTokenPrice,
    findNearestPortfolioTokenPrice,
    formatFromDecimal,
    formattedNum
} from '../../../utils/helpers';
import {useQuery} from "@apollo/client";
import {PORTFOLIO_PERFOMANCE} from "../../../api/client";
import {useWeb3React} from "@web3-react/core";
import {LOADER_INDICATOR_LOCAL} from "../../../constants";
import {Spin} from "antd";

export const PortfolioPerfomance = () => {

    const {account} = useWeb3React();
    const {userProtfolio} = useSystemContext();
    const {data, loading} = useQuery(PORTFOLIO_PERFOMANCE, {
        variables: {id: account.toLowerCase()}
    })
    const [formattedData, setFormattedData] = useState(null);
    const [portfolioPerfValue, setPortfolioPerfValue] = useState(0);
    const [readyDataLoading, setReadyDataLoading] = useState(true);

    console.log(data);

    useEffect(() => {

        if (data?.user && !loading) {
            formatUserPortfolioData(data.user.portfolioPerfomance, data.tokens)
        }
        else {
            setFormattedData([]);
        }


    }, [data, loading])


    useEffect(() => {

        if (formattedData) {
            setReadyDataLoading(false);
        }

    }, [formattedData])

    const formatUserPortfolioData = (arr, tokens) => {

        const newData = arr.map((item) => {

            const {value: {
                AGOBalance,
                AGOUSDBalance,
                AGOBTCBalance,
                CNUSDBalance,
                CNBTCBalance,
                WMATICBalance,
                USDTBalance,
                WBTCBalance
            }} = item;

            const AgoToDollar = parseFloat(formatFromDecimal(AGOBalance, 18)) * findNearestPortfolioTokenPrice(tokens, item.timestamp, "AGO");
            const AgoUsdToDollar =  parseFloat(formatFromDecimal(AGOUSDBalance, 18)) * findNearestPortfolioTokenPrice(tokens, item.timestamp, "AGOUSD")
            const AgoBtcToDollar =  parseFloat(formatFromDecimal(AGOBTCBalance, 18)) * findNearestPortfolioTokenPrice(tokens, item.timestamp, "AGOBTC")
            const CnUsdToDollar =  parseFloat(formatFromDecimal(CNUSDBalance, 18)) * findNearestPortfolioTokenPrice(tokens, item.timestamp, "CNUSD")
            const CnBtcToDollar =  parseFloat(formatFromDecimal(CNBTCBalance, 18)) * findNearestPortfolioTokenPrice(tokens, item.timestamp, "CNBTC")
            const WmaticToDollar =  parseFloat(formatFromDecimal(WMATICBalance, 18)) * findNearestPortfolioTokenPrice(tokens, item.timestamp, "WMATIC")
            const USDTToDollar = parseFloat(formatFromDecimal(USDTBalance, 18)) * findNearestPortfolioTokenPrice(tokens, item.timestamp, "USDT");
            const WBTCToDollar = parseFloat(formatFromDecimal(WBTCBalance, 18)) * findNearestPortfolioTokenPrice(tokens, item.timestamp, "WBTC");

            const newTime = new Date(item.timestamp * 1000).getMinutes();
            const sum = parseFloat((AgoToDollar + AgoUsdToDollar + AgoBtcToDollar + CnUsdToDollar + CnBtcToDollar + WmaticToDollar +  USDTToDollar +  WBTCToDollar).toFixed(2))

            return {value: sum, time: newTime}
        })

        const currentPortfolio = tokens.map(item => {
            const userBalance = userProtfolio.find((userBal) => userBal.name === item.symbol);
            return item.priceUSD * userBalance.userNativeBalance;
        })


        const newPortfolioValue = currentPortfolio.reduce((a, b) => a + b)
        newData.push({value: newPortfolioValue, time: new Date().getMinutes()});

        setFormattedData(newData);
        setPortfolioPerfValue(newData[newData.length - 1].value)

    }

    useEffect(() => {

        if (formattedData?.length > 0) {
            setPortfolioPerfValue(formattedData[formattedData.length - 1].value)
        }

    }, [formattedData])


    return (
        <div className="accounts-wrapper-portoflio-perf cosmetical-wrapper">
            {!readyDataLoading && formattedData?.length > 0  ?
                <>
                    <div className='accounts-wrapper-portoflio-perf__header-control-panel'>
                        <h1> Portfolio perfomance </h1>
                        <div className='accounts-wrapper-portoflio-perf__header-control-panel__time-frame-list'>
                            <button className='active-frame'> 1H </button>
                            <button> 1D </button>
                            <button> 1W </button>
                            <button> 1M </button>
                            <button> 1Y </button>
                        </div>
                    </div>
                    <div className='accounts-wrapper-portoflio-perf__price-change'>
                        <h1> ${formattedNum(portfolioPerfValue)} </h1>
                    </div>
                    <div className='accounts-wrapper-portoflio-perf__chart'>
                    <ResponsiveContainer width={"100%"} height={"90%"} style={{position: "relative"}}>
                    <LineChart margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 1,
                        }}
                        data={formattedData}>
                    <Line type="monotone"
                        dataKey="value"
                        stroke="#40BA93"
                        strokeWidth={"0.260vw"}
                        dot={false}
                        activeDot={true}/>
                    <Tooltip contentStyle={{ display: 'none' }}
                        formatter={(value, name, props) => {
                            if (portfolioPerfValue.value !== props.payload.value) {
                                setPortfolioPerfValue(props.payload.value)
                            }
                        }}/>
                    <XAxis dataKey="time"
                        axisLine={false}
                        tickLine={false}
                        tick={{ color: "white", fontSize: "1vw" }}/>
                    </LineChart>
                    </ResponsiveContainer>
                    </div>
                </>
                :
                <>
                    {
                        formattedData?.length <= 0 ? null : <Spin indicator={LOADER_INDICATOR_LOCAL}/>
                    }
                </>
            }
            {formattedData?.length <= 0 ?  <h1 style={{position: "absolute", top: "40%", left: "40%"}}> No Data </h1> : null}
        </div>
    )

}