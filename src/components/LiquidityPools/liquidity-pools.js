import React, { useState } from 'react';
import './liquidity-pools.scss';
import { LiquidityPoolsItem } from './Liquidity-pools-item/liquidity-pools-item';
import {useSystemContext} from '../../systemProvider';

export const LiquidityPools = () => {

    const {theme} = useSystemContext();

    const [liquidityPools, setLiquidityPools] = useState([
        {firstToken: "USDT", secondToken: "WMATIC", liquidity: "$400,000,000", myLiquidity: "-", apy: "30%", isPoolWmatic: true},
    ]);

    return (
        <div className={`luqidity-pools-wrapper ${theme === "light" ? " luqidity-pools-wrapper-light" : ""}`}>
            <div className='luqidity-pools-wrapper__list-header'>
                <h5> Pool </h5>
                <h5> Liquidity </h5>
                <h5> My Liquidity </h5>
                <h5> APY </h5>
            </div>
            <ul className='luqidity-pools-wrapper-list'>
                {liquidityPools.map((item) => (
                    <LiquidityPoolsItem pool={item}/>
                ))}
            </ul>
        </div>

    )

}

export default LiquidityPools;
