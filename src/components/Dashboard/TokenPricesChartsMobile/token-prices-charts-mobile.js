import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useSwipeable, UP, DOWN, SwipeEventData } from 'react-swipeable';
import { useDashboardContext } from '../../../providers/dashboard-provider';
import { SingleTokenPriceItem } from './SIngleTokenPriceItem/single-token-price-item';
import {useQuery} from "@apollo/client";
import {MAIN_TOKENS_DATA_QUERY} from "../../../api/client";
import arrowDown from "../TokenPricesCharts/arrow-down.svg";
import arrowUp from "../TokenPricesCharts/arrow-up.svg";
import {formatFromDecimal, formattedNum} from "../../../utils/helpers";
import {useSystemContext} from "../../../systemProvider";

const TokenPricesWrapper = styled.div`
    position: fixed;
    transition: 0.3s all;
    bottom: 0;
    height: 70vh;
    width: 100%;
    background: white;
    padding: 0px 22px 42px 22px;
    transform: ${props => props.opened ? "translateY(0)" : "translateY(100%)"};
    border-radius: 40px 40px 0px 0px;
    display: grid;
    grid-template-rows: 0.5fr 0.5fr 0.5fr 6fr;

    h1 {
        font-size: 4vw;
        place-self: center;

        @media only screen and (max-width: 400px) {
            font-size: 5vw;
        }
    }

    .token-charts-wrapper {
        overflow-y: auto;
    }

    @media only screen and (min-height: 700px) {
        height: 48vh;
        transform: ${props => props.opened ? "translateY(0)" : "translateY(48vh)"};
    }

`

const SwipeDownCloseStripe = styled.div`
    place-self: center;
    width: 15%;
    height: 100%;
    display: flex;
    padding: 7% 0 4%;

    div {
        width: 100%; 
        height: 5px;

        background: #BDBDBD;
        border-radius: 10px;
    }
`

const TokenSwitcher = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    box-sizing: border-box;

    padding: 2% 0 5%;
    
    button {
        height: 100%;
        border-radius: 15px;
        border: 0;

        font-size: 3.5vw;
        padding: 0.8vw 0.8vw;
        margin: 0 5px;

        &:first-child {
            font-weight: ${props => props.currency === "AGOUSD" ? "600" : "500"};
            color: ${props => props.currency === "AGOUSD" ? "white" : "#B0B0B0"};
            background: ${props => props.currency === "AGOUSD" ? "#40BA93" : "transparent"}
        }
        &:last-child {
            font-weight: ${props => props.currency === "AGOBTC" ? "600" : "500"};
            color: ${props => props.currency === "AGOBTC" ? "white" : "#B0B0B0"};
            background: ${props => props.currency === "AGOBTC" ? "#40BA93" : "transparent"}
        }
    }
`

const ChartsBlock = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    border: 1px solid #E0E0E0;
    padding: 4vw 0;
    border-radius: 20px;
    box-sizing: border-box;
`

export const TokenPricesChartsMobile = ({opened, setOpened}) => {

    const {data, loading, error} = useQuery(MAIN_TOKENS_DATA_QUERY);
    const {tokens} = useSystemContext();
    const [tokenDataLoading, setTokeDataLoading] = useState(true);
    const [convertedData, setConvertedData] = useState(null);
    const [currency, setCurrency] = useState("AGOUSD");

    const handlers = useSwipeable({
        onSwipedDown: () => setOpened(false),
        preventDefaultTouchmoveEvent: true,
    })

    useEffect(() => {

        if (!loading && data) {
            convertDataForTokens(data)
        }

    }, [loading, data]);

    useEffect(() => {

        if (convertedData) {
            setTokeDataLoading(false)
        }

    }, [convertedData])


    const convertDataForTokens = (data) => {

        const res = data.tokens.map((item) => {

            const name = item.symbol;
            const currentPrice = (+item.priceUSD).toFixed(2);
            const currentDate = new Date().getTime();
            const reverseLineChartArr = [...item.lineChartUSD].reverse();
            const latestRecordChange = reverseLineChartArr.find((item) => item.timestamp * 1000 <= currentDate - (86400 * 1000));

            let change24h = !latestRecordChange || +latestRecordChange.valueUSD === 0 ? 0 : ((item.priceUSD - latestRecordChange.valueUSD) / latestRecordChange.valueUSD * 100).toFixed(2)

            const priceLineChart = item.lineChartUSD.map(item => {
                const date = new Date(item.timestamp * 1000);
                const time = `${date.getHours()}:${date.getMinutes()}`

                return ({
                    value: item.valueUSD,
                    time
                })
            })

            const supply = formattedNum(formatFromDecimal(tokens[item.symbol].totalSupply, tokens[item.symbol].decimals));
            const marketCap = formattedNum(formatFromDecimal(tokens[item.symbol].totalSupply, tokens[item.symbol].decimals) * item.priceUSD);

            return {name, currentPrice, change24h, priceLineChart, supply, marketCap}
        })

        const filterRes = res.filter(item => {
            if (item.symbol === "USDC" || item.symbol === "DAI" || item.symbol === "CNUSD") {
                return false;
            }
            else {
                return true;
            }
        })

        setConvertedData(filterRes);
    }

    return (
        <TokenPricesWrapper opened={opened}> 
            <SwipeDownCloseStripe {...handlers}>
                <div></div>
            </SwipeDownCloseStripe>
            <h1>Informations</h1>
            <TokenSwitcher currency={currency}> 
                <button onClick={() => setCurrency("AGOUSD")}> AGOUSD/CNUSD </button>
                <button onClick={() => setCurrency("AGOBTC")}> AGOBTC/CNBTC </button>
            </TokenSwitcher>
            <div className="token-charts-wrapper">
                <ChartsBlock>
                    {tokenDataLoading && !convertedData ?
                        <h1> Loading... </h1>
                        :
                        <>
                            {/*FIXME: Change tokens for AGOUSD/CNUSD AGOBTC/CNBTC when it would be available in subgraph*/}
                            <SingleTokenPriceItem token={currency === "AGOUSD" ? convertedData.find(item => item.name === "AGOUSD") : convertedData.find(item => item.name === "USDT")}/>
                            <SingleTokenPriceItem token={currency === "AGOUSD" ? convertedData.find(item => item.name === "AGO") : convertedData.find(item => item.name === "WMATIC")}/>
                        </> 
                    }
                </ChartsBlock>
            </div>
        </TokenPricesWrapper>
    )
}