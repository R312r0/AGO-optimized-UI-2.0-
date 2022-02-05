import React, { Fragment, useEffect, useState } from 'react';
import { useSystemContext } from '../../../systemProvider';
import styled from 'styled-components';
import { Spin } from "antd";
import { LOADER_INDICATOR, LOADER_INDICATOR_LOCAL } from "../../../constants";
import { useThemeContext } from '../../Layout/layout';
import { useQuery } from '@apollo/client';
import { DASHBOAR_TXS } from '../../../api/queries';
import { TokenTransactionTableWrapper, Table, TableHead, TableBody, TablePagination } from './styles';
import { formattedNum, formatAddress, calculateTimeDifference } from '../../../utils/helpers';
import { TXS_NAME } from '../../../constants';

export const TokenTransactionTable = () => {

  const { theme } = useThemeContext();
  const { data, loading, error } = useQuery(DASHBOAR_TXS);
  const [totalPages, setTotalPages] = useState(null);
  const [convertedTxs, setConvertedTxs] = useState(null);
  const [currentClickedNumber, setCurrentClickedNumber] = useState(1);
  const [dataPaginated, setDataPaginated] = useState(null);

  useEffect(() => {
    if (data && !loading) {
      setConvertedTxs(convertTransactionsData(data.transactions));
    }

  }, [data, loading])

  useEffect(() => {

    if (convertedTxs) {
      determineNumberOfPages(convertedTxs);
    }

  }, [convertedTxs])


  const convertTransactionsData = (data) => {
    const { SWAP, ADD, BURN, MINT, REDEEM, COLLECT_REDEMPTION, STAKE, UNSTAKE } = TXS_NAME;

    const res = data.map(item => {
      let txName;
      let totalValue = formattedNum((+item.amountTotalUSD).toFixed(2));
      let token0Amount = `${(+item.amount0).toFixed(2)} ${item.token0}`
      let token1Amount = `${(+item.amount1).toFixed(2)} ${item.token1}`
	  let txId = item.id;
	  let addr = item.from;
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
        case MINT:
          txName = `${item.name} ${item.token0} for ${item.token1} ${+item.amountShare > 0 ? item.tokenShare : ""}`
          break;
        case REDEEM:
          txName = `${item.name} ${item.token0} for ${item.token1} ${+item.amountShare > 0 ? item.tokenShare : ""}`
          break;
        case COLLECT_REDEMPTION:
          txName = `${item.name} ${item.token0} ${+item.amountShare > 0 ? item.tokenShare + " and" : ""}`
          break;
        case STAKE:
          txName = `${item.name} ${item.token0}`
          break;
        case UNSTAKE:
          txName = `${item.name} ${item.token0}`
          break;
        default:
          txName = "Transaction";
          break;
      }
      return { txName, totalValue, txId, token0Amount, token1Amount, acc, addr, time }
    })
    return res;
  }

  const determineNumberOfPages = (arr) => {
    const itemsPerPage = 10;

    let paginatedDataObject = {};

    let index = 0;
    let dataLength = arr.length;
    let chunkArray = [];

    for (index = 0; index < dataLength; index += itemsPerPage) {
      let newChunk = arr.slice(index, index + itemsPerPage);
      chunkArray.push(newChunk);
    }

    chunkArray.forEach((chunk, i) => {
      paginatedDataObject[i + 1] = chunk;
    });

    setTotalPages(chunkArray.length);
    setDataPaginated(paginatedDataObject);
  };


  return (
    <TokenTransactionTableWrapper light={theme === "light"}>
      <div className="transanction-tabs-wrapper">
        <h2 className={'transactions-heading'}>Transactions</h2>
        {/* <div>
          <button className="transanction-tabs-wrapper-active">All</button>
          <button>Swaps</button>
          <button>Adds</button>
          <button>Removes</button>
        </div> */}
      </div>
      <Table light={theme === "light"}>
        <TableHead light={theme === "light"}>
          <span></span>
          <span>Total Value</span>
          <span>Token Amount</span>
          <span>Token Amount</span>
          <span>Account</span>
          <span>Time</span>
        </TableHead>
        <div className="token-transaction-separator"></div>
        {!dataPaginated
          ?
          <Spin indicator={LOADER_INDICATOR_LOCAL} />
          :
          <TableBody light={theme === "light"}>
            {dataPaginated && dataPaginated[`${currentClickedNumber}`].map((item, index) => {

              return (
                <Fragment key={`table_${index}`}>
                  <a target={"_blank"}  href={`https://polygonscan.com/tx/${item.txId}`} className='operation' rel="noreferrer">{item.txName}</a>
                  <div>{item.totalValue}$</div>
                  <div>{item.token0Amount}</div>
                  <div>{item.token1Amount}</div>
                  <a target={"_blank"}  href={`https://polygonscan.com/address/${item.addr}`} className='acc' rel="noreferrer">{item.acc}</a>
                  <div className='time'>{item.time}</div>
                </Fragment>
              );
            })}
          </TableBody>
        }
      </Table>
      <TablePagination light={theme === "light"}>
        <div>
          <button
            onClick={() => setCurrentClickedNumber(prevNum => prevNum !== 1 ? prevNum - 1 : prevNum)}>
            Prev
          </button>
          <span>Page {currentClickedNumber} of {totalPages} </span>
          <button
            onClick={() => setCurrentClickedNumber(prevNum => prevNum < totalPages ? prevNum + 1 : prevNum)}>
            Next
          </button>
        </div>
      </TablePagination>
    </TokenTransactionTableWrapper>
  )
}