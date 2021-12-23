import React, { useEffect, useState } from 'react';
import { TokenPricesCharts } from './TokenPricesCharts/token-prices-charts';
import { TVLChart } from './TVLChart/TVLChart';
import { Volume24h } from './Volume24h/volume24h';
import { TokenTransactionTable } from './TokenTransactionsTable/token-transaction-table';
import { useSystemContext } from '../../systemProvider';
import styled from 'styled-components';
import { useMediaQuery } from 'react-responsive';
import { DashboardMobile } from './dashboard-mobile';
import { useQuery } from "@apollo/client";
import { DASHBOARD_QUERY } from "../../api/client";
import { calculateTimeDifference, formatAddress, formattedNum } from "../../utils/helpers";
import { TXS_NAME } from "../../constants";

const DashboardWrapper = styled.div`
  display: grid;
  width: 100%;
  padding: 1vw 4vw 0 1.771vw;
  row-gap: 20px;

  position: relative;
  grid-template-rows: auto auto auto auto;
  justify-items: center;

  &::-webkit-scrollbar {
    display: none;
  }

  .tvl-volume {
    display: grid;
    width: 100%;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 4.167vw;

    /* margin-bottom: 3.646vw; */
    
    @media only screen and (max-width: 1024px){
      grid-column-gap: 2.5vw;
      margin-bottom: 2vw;
    }

    @media only screen and(max-width: 750px) {
      width: 95%;
      margin-bottom: 15px;
    }
  }
`

const Heading = styled.div`
  width: 100%;
  margin-left: 1.25vw;
`

export const Dashboard = () => {

    const { theme } = useSystemContext();
    const isMobileScreen = useMediaQuery({ query: '(max-width: 750px)' })
    const { data, loading, error } = useQuery(DASHBOARD_QUERY);

    const [projCharts, setProjCharts] = useState({ tvl: [], volume: [] });
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {

        if (!loading && data) {

            const tvlChart = convertProjChartData(data.uniswapFactory.totalValueLocked);
            const volumeChart = convertProjChartData(data.uniswapFactory.totalVolume);
            const txs = convertTransactionsData(data.transactions)
            setProjCharts({
                tvl: tvlChart,
                volume: volumeChart
            })
            setTransactions(txs);
        }

    }, [loading])


    const convertProjChartData = (data) => {
        const res = data.map((item, _ind) => {
            const dateFromItem = new Date(item.timestamp * 1000);
            const time = dateFromItem.getDate() < 10 ? "0"+dateFromItem.getDate() : dateFromItem.getDate()
            const date = dateFromItem.toDateString();
            const uv = +item.value > 0 ? +item.value : 0;
            return { time, uv, date };
        })

        return res;
    }

    const convertTransactionsData = (data) => {
        const { SWAP, ADD, BURN, MINT, REDEEM, COLLECT_REDEMPTION, STAKE, UNSTAKE } = TXS_NAME;

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
                case MINT:
                    txName = `${item.name} ${item.token0} for ${item.token1} ${+item.amountShare !== 0 ?  item.tokenShare : ""}`
                    break;
                case REDEEM:
                    txName = `${item.name} ${item.token0} for ${item.token1} ${+item.amountShare !== 0 ?  item.tokenShare : ""}`
                    break;
                case COLLECT_REDEMPTION:
                    txName = `${item.name} ${+item.amountShare !== 0 ?  item.tokenShare + " and" : ""} ${item.token1}`
                    token0Amount = `${+item.amountShare !== 0 ? item.amountShare: "0.00" + " " + item.tokenShare}`
                    break;
                case STAKE:
                    txName = `${item.name} ${item.token0}`
                    break;
                case UNSTAKE:
                    txName = `${item.name} ${item.token0}`
            }
            return { txName, totalValue, token0Amount, token1Amount, acc, time }
        })
        return res;
    }


    return (
        <>
            {isMobileScreen ?
                <DashboardMobile tvl={projCharts.tvl} volume={projCharts.volume} txs={transactions} />
                :
                <DashboardWrapper>
                    <Heading className='main__heading__page'>Dashboard</Heading>
                    <TokenPricesCharts />
                    <div className='tvl-volume'>
                        <TVLChart data={projCharts.tvl} />
                        <Volume24h data={projCharts.volume} />
                    </div>
                    <TokenTransactionTable data={transactions} />
                </DashboardWrapper>
            }
        </>
    )
}
export default Dashboard