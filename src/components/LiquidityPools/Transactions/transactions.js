import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSystemContext } from '../../../systemProvider';
import { formatFromDecimal, calculateTimeDifference, formattedNum, formatAddress } from '../../../utils/helpers';
import { CONTRACT_ADRESESS, LOADER_INDICATOR_LOCAL, TXS_NAME } from '../../../constants';
import { Spin } from "antd";
import { useQuery } from "@apollo/client";
import { GET_PAIR_TXS } from "../../../api/client";

const Table = styled.div`
  width: 100%;
  max-height: 353px;
  overflow: hidden;

  background: linear-gradient(90.99deg, #1D1D1D 2.18%, #232323 104.4%);
  color: white;

  padding: 0.625vw 1.823vw 1.458vw 2.344vw;
  border-radius: 2.083vw;

  .token-transaction-separator {
    width: 100%;
    height: 0.052vw;

    background-color: #333;
    border-radius: 0.260vw;
    margin-bottom: 20px;
  }
`
const TableHead = styled.div`
  display: grid;
  grid-template-columns: 20% 11.5% 13% 13% 27% 14%;

  position: relative !important;
  margin-bottom: 8px;

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

const TableBody = styled.ul`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 18px;
  height: 230px;
  overflow: auto;

  .item__row{
    display: grid;
    height: 27px;
    grid-template-columns: 20% 11.5% 13% 13% 27% 15%; 
    font-weight: 300;
    font-size: 0.8vw;
    color: #BDBDBD;
    line-height: 1.2vw;
  }

  & * {
    text-overflow: ellipsis;
    overflow: hidden; 
    white-space: nowrap;
    padding-right: 1vw;
  }

  &::-webkit-scrollbar {
    width: 0.208vw;

    background: #4F4F4F;
    border-radius: 0.260vw;
  }

  &::-webkit-scrollbar-thumb {
    background: #333333;
    border-radius: 0.260vw;
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

export const Transactions = ({ token0, token1 }) => {

  const { data, loading } = useQuery(GET_PAIR_TXS, {
    variables: { token0: token0.symbol, token1: token1.symbol }
  });

  const [convertedData, setConvertedData] = useState(null);
  const [loadingReadyData, setLoadingReadyData] = useState(true);


  useEffect(() => {

    if (data && !loading) {
      setConvertedData(convertTxsData(data));
    }

  }, [data])

  const convertTxsData = () => {
    const { SWAP, ADD, BURN } = TXS_NAME;

    const res = data.transactions.map(item => {
      let txName;
      let totalValue = formattedNum((+item.amountTotalUSD).toFixed(2));
      let token0Amount = `${(+item.amount0).toFixed(2)} ${item.token0}`
      let token1Amount = `${(+item.amount1).toFixed(2)} ${item.token1}`
      let acc = formatAddress(item.from);
      let time = calculateTimeDifference(item.timestamp);
      switch (item.name) {
        case SWAP:
          txName = `${item.name} ${item.token0} for ${item.token1}`
          break;
        case ADD:
          txName = `${item.name} ${item.token0} and ${item.token1}`
          break;
        case BURN:
          txName = `${item.name} ${item.token0} and ${item.token1}`
          break;
      }
      return { txName, totalValue, token0Amount, token1Amount, acc, time }
    })
    return res;
  }

  return (
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
        <TableBody>
          {!convertedData ? <Spin indicator={LOADER_INDICATOR_LOCAL} /> : null}
          {convertedData && convertedData.map((item) => {

            return (
              <li className='item__row'>
                <div className='operation'>{item.txName}</div>
                <div>{item.totalValue}</div>
                <div>{item.token0Amount}</div>
                <div>{item.token1Amount}</div>
                <div className='acc'>{item.acc}</div>
                <div className='time'>{item.time}</div>
              </li>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
