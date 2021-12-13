import {
    ApolloClient,
    InMemoryCache,
    gql
} from "@apollo/client";
import {FACTORY_ADDRESS} from "../constants";

export const client = new ApolloClient({
    uri: "https://api.thegraph.com/subgraphs/name/r312r0/vlad-ago-subgraph",
    cache: new InMemoryCache()
});

export const DASHBOARD_QUERY = gql(`
    query dashboard {
        uniswapFactory(id: "0xcaf4fa9103ef5f4832dfcac40a0d66c4202de377") {
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
        tokens(first: 100, orderBy: symbol, orderDirection: asc) {
            id
            symbol
            priceUSD
            lineChartUSD(orderBy: timestamp, orderDirection: asc) {
             valueUSD
             timestamp
           }
        }
    }
`)

export const TOKENS_FOR_LIQUIDITY_POOLS = gql(`
    query liqTokens {
        tokens(first: 100, orderBy: symbol, orderDirection: asc) {
            id
            symbol
            decimals
        }
    }
`)

export const TOKENS_FOR_USER_BALANCES = gql(`

    query userBalanceTokens {
        tokens(first: 100, orderBy: symbol, orderDirection: asc) {
            id
            symbol
            priceUSD
        }
    }

`)

export const GET_PAIR_TXS = gql(`
    query pairTxs($token0: String!, $token1: String!) {
        transactions(first: 100, where: {token0: $token0, token1: $token1}, orderBy: timestamp, orderDirection: desc) {
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

export const LIQUIDITY_POOLS = gql(`
    query liqPools {
        pairs(first: 10) {
          id
          reserveETH
          reserveUSD
          volumeUSD
          isRewardPool
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
