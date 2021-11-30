import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useSwipeable, UP, DOWN, SwipeEventData } from 'react-swipeable';
import { useDashboardContext } from '../../../providers/dashboard-provider';
import { SingleTokenPriceItem } from './SIngleTokenPriceItem/single-token-price-item';

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

    const [currency, setCurrency] = useState("AGOUSD");
    const {dashTokens, dashboardLoading} = useDashboardContext();

    const handlers = useSwipeable({
        onSwipedDown: () => setOpened(false),
        preventDefaultTouchmoveEvent: true,
    })

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
                    {dashboardLoading && !dashTokens ?
                        <h1> Loading... </h1>
                        :
                        <>
                            <SingleTokenPriceItem token={currency === "AGOUSD" ? dashTokens.find(item => item.name === "AGOUSD") : dashTokens.find(item => item.name === "AGOBTC")}/>
                            <SingleTokenPriceItem token={currency === "AGOUSD" ? dashTokens.find(item => item.name === "CNUSD") : dashTokens.find(item => item.name === "CNBTC")}/>
                        </> 
                    }
                </ChartsBlock>
            </div>
        </TokenPricesWrapper>
    )

}