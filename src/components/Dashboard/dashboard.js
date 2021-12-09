import React, {useEffect, useState} from 'react';
import {TokenPricesCharts} from './TokenPricesCharts/token-prices-charts';
import {TVLChart} from './TVLChart/TVLChart';
import {Volume24h} from './Volume24h/volume24h';
import {TokenTransactionTable} from './TokenTransactionsTable/token-transaction-table';
import {useSystemContext} from '../../systemProvider';
import styled from 'styled-components';
import {useMediaQuery} from 'react-responsive';
import {DashboardMobile} from './dashboard-mobile';
import {useQuery} from "@apollo/client";
import {DASHBOARD_QUERY} from "../../api/client";
import {calculateTimeDifference, formatAddress, formattedNum} from "../../utils/helpers";

const DashboardWrapper = styled.div`
  display: grid;
  width: 100%;
  position: relative;
  grid-template-rows: repeat(3, auto);
  grid-column-gap: 20px;
  grid-row-gap: 5%;
  justify-items: center;
  padding: 1.5%;

  &::-webkit-scrollbar {
    display: none;
  }

  @media only screen and (max-width: 1024px){
    grid-row-gap: 2%;
  }

  .tvl-volume {
    display: grid;
    width: 100%;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 5%;
    
    @media only screen and (max-width: 1024px){
      grid-column-gap: 2%;
    }

    @media only screen and(max-width: 750px) {
      grid-column-gap: 2%;
      width: 95%;
      margin-bottom: 15px;
    }
  }
`

const TXS_NAME = {
    SWAP: "Swap",
    ADD: "Add liquidity",
    BURN: "Remove liquidity"
}

export const Dashboard = () => {

    const {theme} = useSystemContext();
    const isMobileScreen = useMediaQuery({query: '(max-width: 750px)'})
    const {data, loading, error} = useQuery(DASHBOARD_QUERY);

    const [projCharts, setProjCharts] = useState({tvl: [], volume: []});
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {

        if (!loading && data) {

            const tvlChart = convertProjChartData(data.uniswapFactory.totalValueLocked);
            const volumeChart = convertProjChartData(data.uniswapFactory.totalVolume);
            const txs = convertTransactionsData(data.transactions)
            setProjCharts({
                tvl: tvlChart,
                volume:volumeChart
            })
            setTransactions(txs);
        }

    }, [loading])


    const convertProjChartData = (data) => {
        const res = data.map((item, _ind) => {
            const dateFromItem = new Date(item.timestamp * 1000);
            const time = `${dateFromItem.getHours()}:${dateFromItem.getMinutes()}:${dateFromItem.getSeconds()}`
            const date = dateFromItem.toDateString();
            const uv = +item.value > 0 ? +item.value : 0;
            return {time, uv, date};
        })

        return res;
    }

    const convertTransactionsData = (data) => {
        const {SWAP, ADD, BURN} = TXS_NAME;

        const res = data.map(item => {
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
            return {txName, totalValue, token0Amount, token1Amount, acc, time}
        })
        return res;
    }


    return (
        <>
            {isMobileScreen ?
                <DashboardMobile tvl={projCharts.tvl} volume={projCharts.volume} txs={transactions}/>
                :
                <DashboardWrapper>
                    <TokenPricesCharts/>
                    <div className='tvl-volume'>
                        <TVLChart data={projCharts.tvl}/>
                        <Volume24h data={projCharts.volume}/>
                    </div>
                    <TokenTransactionTable data={transactions}/>
                </DashboardWrapper>
            }
        </>
    )
}
export default Dashboard