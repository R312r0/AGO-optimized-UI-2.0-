import React, { useContext, useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { TOKENS_PAIRS } from './api/client';
import { CONTRACT_ADRESESS } from './constants';

const DataContext = React.createContext();

export const useDataContext = () => useContext(DataContext);

export const DataProvider = ({ children }) => {


    const { data, loading, error } = useQuery(TOKENS_PAIRS);
    const [mainData, setMainData] = useState(null);

    useEffect(() => {

        if (data && !loading) {
            let dataArr = data.tokens.map((item) => {
                return {
                    address: item.id,
                    symbol: item.symbol,
                    decimals: item.decimals,
                    isProtocolMain: item.isProtocolMain,
                    priceUSD: parseFloat(item.priceUSD).toFixed(2)
                }
            })

            // FIXME: Beta AgoLiquidity
            dataArr.push({
                address: CONTRACT_ADRESESS.AGO_LIQUIDITY.toLowerCase(),
                symbol: "AGOy",
                decimals: 18,
                isProtocolMain: true,
                priceUSD: 0
            })

            setMainData(dataArr);
        }

    }, [data, loading])

    return (
        <DataContext.Provider value={{ tokens: mainData }}>
            {/* TODO: MAKE ERROR COMPONENT */}
            {error ? <h1> Server error please reload page </h1> : children}
        </DataContext.Provider>
    )
}