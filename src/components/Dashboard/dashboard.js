import React, { useEffect, useState } from 'react';
import { TokenPricesCharts } from './TokenPricesCharts/token-prices-charts';
import { TVLChart } from './TVLChart/TVLChart';
import { Volume24h } from './Volume24h/volume24h';
import { TokenTransactionTable } from './TokenTransactionsTable/token-transaction-table';
import styled from 'styled-components';
import { useMediaQuery } from 'react-responsive';
import { DashboardMobile } from './dashboard-mobile';
import { useQuery } from "@apollo/client";
import { calculateTimeDifference, formatAddress, formattedNum } from "../../utils/helpers";
import { DEX_ADDRESESS, TXS_NAME } from "../../constants";
import { useThemeContext } from '../Layout/layout';
import { DashboardWrapper, Heading } from './styles';
import { TVL_VOLUME_QUERY } from '../../api/queries';

export const Dashboard = () => {

    const { theme } = useThemeContext();
    const isMobileScreen = useMediaQuery({ query: '(max-width: 750px)' })
    const { data, loading, error } = useQuery(TVL_VOLUME_QUERY, {
        variables: {id: DEX_ADDRESESS.FACTORY.toLowerCase()}
    });

    const [projCharts, setProjCharts] = useState({ tvl: [], volume: [] });
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {

        if (!loading && data) {

            const tvlChart = convertProjChartData(data.uniswapFactory.totalValueLocked);
            const volumeChart = convertProjChartData(data.uniswapFactory.totalVolume);
            setProjCharts({
                tvl: tvlChart,
                volume: volumeChart
            })
        }

    }, [data, loading])


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
                    <TokenTransactionTable/>
                </DashboardWrapper>
            }
        </>
    )
}
export default Dashboard