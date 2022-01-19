import gql from "graphql-tag";

export const SINGLE_PAIR_QUERY = gql`
    query tradingPair($id: String!) {
        pair(id: $id) {
            id
            reserveUSD
            token0 {
                id
                decimals
                name
                symbol
                priceUSD: derivedETH
            }
            token1 {
                id
                decimals
                name
                symbol
                priceUSD: derivedETH
            }
            token0Price
            token1Price
        }   
    }
`