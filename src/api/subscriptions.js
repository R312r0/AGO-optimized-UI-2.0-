import gql from "graphql-tag"

export const TOKEN_PRICE_CHART = gql(`
    subscription tokenPrice($id: String!) {
        token(id: $id) {
            lineChartUSD(first: 1, orderBy: timestamp, orderDirection: desc) {
                valueUSD
                timestamp
            }
        }
    }
`)

export const TRADING_TOKEN_POOL_PRICE = gql(`

    subscription tokenPricePool($id: String!) {
        pair(id: $id) {
            token0 {
                priceUSD
            }  
            token1 {
                priceUSD
            }
            token0Price
            token1Price
        }
    }
`)
