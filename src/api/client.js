import {
    ApolloClient,
    InMemoryCache,
    gql
} from "@apollo/client";
import {FACTORY_ADDRESS} from "../constants";

export const client = new ApolloClient({
    uri: "http://127.0.0.1:8000/subgraphs/name/R312R0/ganache",
    cache: new InMemoryCache()
});

export const DASHBOARD_QUERY = gql(`
    query dashboard {
        uniswapFactory(id: "0x5fc8d32690cc91d4c39d9d3abcbd16989f875707") {
          totalValueLocked(orderBy: timestamp, orderDirection: asc) {
            value
            timestamp
          }
          totalVolume(orderBy: timestamp, orderDirection: asc) {
            value
            timestamp
          }
        }
        transactions(orderBy: timestamp, orderDirection: desc) {
            name
            from
            token0
            token1
            amount0
            amount1
            amountTotalUSD
            timestamp
        }
    }
`)

export const MAIN_TOKENS_DATA_QUERY = gql(`
    query mainTokens {
        tokens(where: {isProtocolMain: true}) {
            id
            name
            priceUSD
            totalSupply
            lineChartUSD(orderBy: timestamp, orderDirection: asc) {
             valueUSD
             timestamp
           }
        }
    }
`)

export const TOKENS_FOR_USER_BALANCES = gql(`

    query userBalanceTokens {
        tokens(where: {isProtocolMain: true}) {
            id
            name
            priceUSD
        }
    }

`)

export const LIQUIDITY_POOLS = gql(`
    query liqPools {
        pairs(first: 10) {
          id
          reserveETH
          reserveUSD
          volumeUSD
          liquidityChart(orderBy: timestamp, orderDirection: asc) {
            valueUSD
            timestamp
          }
          volumeChart {
            valueUSD
            timestamp
          }
          token0 {
            id
            symbol
            priceUSD
          }
          token1 {
            id
            symbol
            priceUSD
          }
          reserve0
          reserve1
        }
    }
`)
