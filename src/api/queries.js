import gql from "graphql-tag";

export const TOKEN_DASHBOARD_CHARTS = gql(`

    query token($id: String!) {
        token(id: $id) {
            lineChartUSD(orderBy: timestamp, orderDirection: asc) {
                valueUSD
                timestamp
            }
        }
    }

`)

export const TVL_VOLUME_QUERY = gql(`
    query dashboard($id: String!) {
        uniswapFactory(id: $id) {
          totalValueLocked(first: 1000, orderBy: timestamp, orderDirection: asc) {
            value
            timestamp
          }
          totalVolume(orderBy: timestamp, orderDirection: asc) {
            value
            timestamp
          }
        }
    }
`)

export const DASHBOAR_TXS = gql(`
    query pairTxs {
        transactions(first: 100, orderBy: timestamp, orderDirection: desc) {
			id
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

