import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {useSystemContext} from '../../../systemProvider';
import axios from 'axios';
import {formatFromDecimal, calculateTimeDifference} from '../../../utils/helpers';
import {CONTRACT_ADRESESS, TX_OPERATIONS} from '../../../constants';
import {Loader} from "../../Loader/loader";

const Table = styled.div`
  width: 100%;
  height: 18.229vw;

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 0.5fr 15fr 0.1fr;
  row-gap: 0.6vw;

  background: linear-gradient(90.99deg, #1D1D1D 2.18%, #232323 104.4%);
  color: white;

  padding: 0.625vw 1.823vw 1.458vw 2.344vw;
  border-radius: 2.083vw;

  .token-transaction-separator {
    width: 100%;
    height: 0.052vw;

    background-color: #333;
    border-radius: 0.260vw;
  }
`
const TableHead = styled.div`
  display: grid;
  grid-template-columns: 20% 11.5% 13% 13% 27% 14%;

  position: relative !important;

  span {
    font-style: normal;
    font-weight: 500;
    font-size: 0.8vw;

    &:last-child {
      justify-self: flex-end;
      padding-right: 2.344vw;
    }

    @media only screen and (max-width: 1024px) {
      font-size: 0.9vw;
    }
  }
`

const TableBody = styled.div`
  height: 100%;

  display: grid;
  grid-template-columns: 20% 11.5% 13% 13% 27% 15%;
  row-gap: 0.938vw;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 0.208vw;

    background: #4F4F4F;
    border-radius: 0.260vw;
  }

  &::-webkit-scrollbar-thumb {
    background: #333333;
    border-radius: 0.260vw;
  }

  div {
    font-style: normal;
    font-weight: 300;
    font-size: 0.8vw;
    color: #BDBDBD;
    line-height: 1.2vw;
  }

  .operation {
    color: #40BA93;
  }

  .acc {
    color: #40BA93;
  }

  .time {
    justify-self: flex-end;
  }
`

export const Transactions = () => {
    
    const {theme, tokens} = useSystemContext();

    const [data, setData] = useState(null);

    const [totalPages, setTotalPages] = useState(null);
    const [currentClickedNumber, setCurrentClickedNumber] = useState(1);
    const [dataPaginated, setDataPaginated] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTxs = async () => {
            const {data} = await axios.get("https://argano-rest-api-sever.herokuapp.com/api/transactionsOverall");
            setData(data);
        }

        fetchTxs();
    }, []);


    useEffect(() => {

        if (data) {
            setLoading(false);
            determineNumberOfPages();
        }

    }, [data])

    const determineNumberOfPages = () => {
        const itemsPerPage = 10;

        let paginatedDataObject = {};

        let index = 0;
        let dataLength = data.length;
        let chunkArray = [];

        for (index = 0; index < dataLength; index += itemsPerPage) {
            let newChunk = data.slice(index, index + itemsPerPage);
            chunkArray.push(newChunk);
        }

        chunkArray.forEach((chunk, i) => {
            paginatedDataObject[i + 1] = chunk;
        });

        setTotalPages(chunkArray.length);
        setDataPaginated(paginatedDataObject);
    };

    return(
        <div className="transactions-wrapper">
            <div className="transactions-wrapper__switch-buttons">
                <button className="transanction-tabs-wrapper-active">All</button>
                <button>Swaps</button>
                <button>Adds</button>
                <button>Removes</button>
            </div>
            <Table>
                <TableHead>
                    <span></span>
                    <span>Total Value</span>
                    <span>Token Amount</span>
                    <span>Token Amount</span>
                    <span>Account</span>
                    <span>Time</span>
                </TableHead>
                <div className="token-transaction-separator"></div>
                {loading
                    ?
                    <Loader />
                    :
                    <TableBody>
                        {dataPaginated && dataPaginated[`${currentClickedNumber}`].map((item) => {

                            const token1 = Object.entries(CONTRACT_ADRESESS).find(item_loc => item_loc[1].toLocaleLowerCase() === item.token_flow[0].token.toLowerCase())
                            const token2 = Object.entries(CONTRACT_ADRESESS).find(item_loc => item_loc[1].toLocaleLowerCase() === item.token_flow[1]?.token.toLowerCase())

                            const token1Spent = formatFromDecimal(item.token_flow[0].amount.$numberDecimal, tokens[token1[0]].decimals);
                            const token2Spent = item.token_flow[1] ? formatFromDecimal(item.token_flow[1]?.amount.$numberDecimal, tokens[token2[0]].decimals) : "-";

                            return (
                                <>
                                    <div className='operation'>{TX_OPERATIONS[item.method]}</div>
                                    {/* TODO: Need to calculate sum depends on USD price of each token (Use our/coingecko current token-price) */}
                                    <div> {token2 ? (parseFloat(token1Spent) + parseFloat(token2Spent)).toFixed(2) : parseFloat(token1Spent).toFixed(2)}</div>
                                    <div>{parseFloat(token1Spent).toFixed(2)} {token1[0]}</div>
                                    <div>{token2 ? parseFloat(token2Spent).toFixed(2) : "-"} {token2 ? token2[0] : ""}</div>
                                    <div
                                        className='acc'>{`${item.account.slice(0, 6)}...${item.account.slice(-4)}`}</div>
                                    <div
                                        className='time'>{item.block_timestamp ? calculateTimeDifference(item.block_timestamp) : "A long time ago"}</div>
                                </>
                            );
                        })}
                    </TableBody>
                }
            </Table>
        </div>
    );
}