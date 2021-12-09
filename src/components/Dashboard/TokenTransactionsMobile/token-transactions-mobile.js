import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import { useSwipeable } from 'react-swipeable';
import { useSystemContext } from '../../../systemProvider';
import {calculateTimeDifference, formatAddress} from "../../../utils/helpers";

const TransactionsWrapper = styled.div`
    position: fixed;
    display: grid;
    grid-template-rows: 1fr 0.5fr 1fr 5fr;
    transition: 0.3s all;
    bottom: 0;
    height: 70vh;
    transform: ${props => props.opened ? "translateY(0)" : "translateY(100%)"};
    width: 100%;
    background: white;
    border-radius: 40px 40px 0px 0px;
    padding: 0px 22px 0px 22px;
    box-sizing: border-box;

    h1 {
        font-size: 4vw;
        place-self: center;

        @media only screen and (max-width: 400px) {
            font-size: 5vw;
        }
    }

    .transanction-tabs-mobile-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;

        padding: 4vw 0 6vw;

        button {
            font-size: 3.5vw;
            font-weight: 300;

            padding: 0.7vw 4vw;

            background: transparent;
            border-radius: 30px;
            color: #B0B0B0;

            border: none;
            cursor: pointer;
        }

        .transanction-tabs-mobile-wrapper-active {
            color: white;
            background: #40BA93;
            font-weight: 600;
        }
    }

    @media only screen and (max-width: 550px) {
        height: 55vh;
        transform: ${props => props.opened ? "translateY(0)" : "translateY(55vh)"};
    }

    @media only screen and (max-height: 600px) {
        height: 90vh;
        transform: ${props => props.opened ? "translateY(0)" : "translateY(90vh)"};
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

const TableBody = styled.div`
    height: 80%;
    overflow-y: auto;
`

const TableItem = styled.div`
    margin-bottom: 4vw;
    &:last-child {
        margin-bottom: 0;
    }
    .table-wrapper-title {
        display: flex;
        align-items: center;
        justify-content: space-between;

        span {
            color: #40BA93;
            font-weight: 500;
            font-size: 4.5vw;
        }

        svg {
            width: 3.3vw;
            height: 2.5vw;
        }
    }
    .table-wrapper {
        background: #EAECEF;
        border-radius: 2.604vw;
        height: 54vw;
        display: grid;
        grid-template-rows: 1.4fr 1fr 1fr 1fr 1fr 1fr;
        box-sizing: border-box;
        padding: 2vw 4vw 5vw;
        align-items: center;

        .table-wrapper-data {
            display: grid;
            grid-template-columns: 1fr 1fr;
            h5 {
                &:first-child {
                    color: #838995;
                }
                &:last-child {
                    text-align: right;
                }
            }
        }

        @media only screen and (max-height: 500px) {
            height: 45vh;
        }

        @media only screen and (max-height: 400px) {
            height: 55vh;
        }
    }

`

export const TokenTransactionsMobile = ({opened, setOpened, data}) => {

    const handlers = useSwipeable({
        onSwipedDown: () => setOpened(false),
        preventDefaultTouchmoveEvent: true,
    })

    return (
        <TransactionsWrapper opened={opened}>
            <SwipeDownCloseStripe {...handlers}> 
                <div> </div>
            </SwipeDownCloseStripe>
            <h1>Transactions</h1>
                <div className="transanction-tabs-mobile-wrapper">
                    <button className="transanction-tabs-mobile-wrapper-active">All</button>
                    <button>Swaps</button>
                    <button>Adds</button>
                    <button>Removes</button>
                </div>
            <TableBody> 
                {data && data.map(item => {

                    return (
                        <TableItem>
                            <div className="table-wrapper">
                                <div className="table-wrapper-title">
                                    <span>{item.txName}</span>
                                    <svg width="10" height="7" viewBox="0 0 10 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.825 7L5 2.66981L1.175 7L8.36561e-07 5.66038L5 -5.1656e-07L10 5.66038L8.825 7Z" fill="#828282"/>
                                    </svg>
                                </div>
                                <span className="table-wrapper-data"> <h5> Total Value </h5> <h5> {item.totalValue} </h5> </span>
                                <span className="table-wrapper-data"> <h5> Token Amount </h5> <h5> {item.token0Amount} </h5> </span>
                                <span className="table-wrapper-data"> <h5> Token Amount </h5> <h5> {item.token1Amount} </h5> </span>
                                <span className="table-wrapper-data"> <h5> Account </h5> <h5 style={{color: "#40BA93"}}> {item.acc} </h5> </span>
                                <span className="table-wrapper-data"> <h5> Time </h5> <h5> {item.time} </h5> </span>
                            </div>
                        </TableItem>
                    )
                })}
            </TableBody>
        </TransactionsWrapper>
    )

}