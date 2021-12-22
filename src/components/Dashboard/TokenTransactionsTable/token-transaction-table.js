import React, { Fragment, useEffect, useState } from 'react';
import { useSystemContext } from '../../../systemProvider';
import styled from 'styled-components';
import { Spin } from "antd";
import { LOADER_INDICATOR } from "../../../constants";

const TokenTransactionTableWrapper = styled.div`
  width: 100%;
  height: 40vw;
  background: ${props => props.light ? "#fff" : "radial-gradient(34.28% 208.17% at 30.1% 58.42%, rgba(30, 91, 72, 0.2) 0%, rgba(9, 33, 25, 0.2) 100%), linear-gradient(97.95deg, #272727 -6.91%, #1C1C1C 101.49%)"};
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.25);
  border-radius: 2vw;
  box-sizing: border-box;
  padding: 2.5% 5.5% 2%;
  display: grid;
  grid-template-rows: 1fr 10fr 1fr;

  margin-bottom: 3vw;

  // Responsive || Width

  @media only screen and (max-width: 1024px){
    padding: 2% 2.5% 1%;
  }

  @media only screen and (max-width: 750px) {
    height: 49vh !important;
    width: 95%;
    grid-template-rows: 1fr 8fr 1fr;
  }

  // Responsive || Height

  @media only screen and (max-width: 1880px) {
    height 40vw;
  }

  @media only screen and (max-width: 900px) {
    height: 45vw;
  }

  .transanction-tabs-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;

    padding-bottom: 2vw;

    @media only screen and (max-width: 1024px) {
      padding-bottom: 1.3vw;
    }

    div {
      display: flex;
      align-items: center;
      justify-content: space-between;

      button {
        font-size: 0.9vw;
        font-weight: 300;

        padding: 0.3vw 1.5vw;

        background: transparent;
        border-radius: 1.302vw;
        color: ${props => props.light ? "#828282" : '#B0B0B0'};

        border: none;
        cursor: pointer;
        transition: all .3s;

        &:hover{
          color: ${props => props.light ? "#B0B0B0" : '#fff'};
        }
      }
    }

    .transanction-tabs-wrapper-active {
      color: white;
      background: #40BA93;
      font-weight: 700;
    }
  }

  .transactions-heading {
    font-size: 24px;
    line-height: 36px;
    color: ${props => props.light ? "#333" : '#fff'};
  }
`
const Table = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 0.5fr 15fr 0.1fr;
  row-gap: 1.1vw;
  color: ${props => props.light ? "#333" : '#fff'};

  .token-transaction-separator {
    width: 100%;
    height: 0.052vw;
    background-color: #333;
    border: 0.052vw solid #333;
    border-radius: 0.260vw;
  }
`
const TableHead = styled.div`
  display: grid;
  grid-template-columns: 20% 11.5% 13% 13% 27% 15%;

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
  display: grid;
  grid-template-columns: 20% 11.5% 13% 13% 27% 15%;

  & * {
    text-overflow: ellipsis;
    overflow: hidden; 
    white-space: nowrap;
    padding-right: 1vw;
  }

  div {
    font-style: normal;
    font-weight: 300;
    font-size: 0.8vw;
    color: ${props => props.light ? "#4F4F4F" : '#BDBDBD'};
    line-height: 1.2vw;
    
    @media only screen and (max-width: 1024px) {
      font-size: 1vw;
    }
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

const TablePagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  div {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    column-gap: 15px;

    span {
      color: ${props => props.light ? "#333" : '#fff'};
      font-size: 1vw;
    }

    button {
      background: transparent;
      font-size: 0.8vw;
      font-size: 14px;
      line-height: 21px;  
      color: ${props => props.light ? "#828282" : '#4F4F4F'};
      border: none;
      cursor: pointer;

      &:active {
        outline: none;
        border: none;
        box-shadow: none;
      }
    }
  }
`

export const TokenTransactionTable = ({ data }) => {

  const { theme } = useSystemContext();
  const [totalPages, setTotalPages] = useState(null);
  const [currentClickedNumber, setCurrentClickedNumber] = useState(1);
  const [dataPaginated, setDataPaginated] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    if (data.length > 0) {
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


  return (
    <TokenTransactionTableWrapper light={theme === "light"}>
      <div className="transanction-tabs-wrapper">
        <h2 className={'transactions-heading'}>Transactions</h2>
        <div>
          <button className="transanction-tabs-wrapper-active">All</button>
          <button>Swaps</button>
          <button>Adds</button>
          <button>Removes</button>
        </div>
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
        {loading
          ?
          <Spin size={"default"} indicator={LOADER_INDICATOR} />
          :
          <TableBody light={theme === "light"}>
            {dataPaginated && dataPaginated[`${currentClickedNumber}`].map((item, index) => {

              return (
                <Fragment key={`table_${index}`}>
                  <div className='operation'>{item.txName}</div>
                  <div>{item.totalValue}$</div>
                  <div>{item.token0Amount}</div>
                  <div>{item.token1Amount}</div>
                  <div className='acc'>{item.acc}</div>
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