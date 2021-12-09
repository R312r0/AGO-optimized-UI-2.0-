import React, { useState } from 'react';
import { TokenIcon } from '../../TokenIcon/token_icon';
import { ProvideLiquidity } from '../ProvideLiquidity/provide_liquidity';
import { Volume } from '../Volume/volume';
import { Liquidity } from '../Liquidity/liquidity';

const TABS = {
    PROVIDE_LIQUIDITY: "Provide liquidity",
    VOLUME: "Volume",
    LIQUIDITY: "Liquidity"
}

export const LiquidityPoolsItem = ({pool: {token0, token1, liqiuidityUSD, myLiquidity, volChart, liqChart }}) => {

    const { PROVIDE_LIQUIDITY, VOLUME, LIQUIDITY } = TABS;
    const [windowExpanded, setWindowExpanded] = useState(false);
    const [chosenWindow, setChosenWindow] = useState(PROVIDE_LIQUIDITY);

    const ExpandedTab = () => {
        switch (chosenWindow) {
            case PROVIDE_LIQUIDITY:
                return (<ProvideLiquidity token0={token0} token1={token1}/>)
            case VOLUME:
                return (<Volume data={volChart}/>)
            case LIQUIDITY:
                return (<Liquidity data={liqChart}/>)
            default:
                return (<ProvideLiquidity/>)
        };
    };

    return (
        <li className={`luqidity-pools-wrapper-list-item ${windowExpanded ? "liq-item-opened" : ""}`}>
            <div className='luqidity-pools-wrapper-list-item__header'>
                <div className='pair'>
                    <TokenIcon iconName={token0.symbol}/>
                    <TokenIcon iconName={token1.symbol}/>
                    <h3> {token0.symbol}-{token1.symbol} </h3>
                </div>
                <h3> {liqiuidityUSD}$ </h3>
                <h3>  {myLiquidity}$ </h3>
                <h3> 0% </h3>
                <button className='chart-expand'
                        onClick={() => setWindowExpanded(!windowExpanded)}> {windowExpanded ?
                    <i className="fas fa-times"/> : <i className="fas fa-chart-line"/>} </button>
            </div>
            {windowExpanded ?
                <div className='control-panel'>
                    <div className='control-panel__header'>
                        <button onClick={() => setChosenWindow(PROVIDE_LIQUIDITY)}
                                className={`${chosenWindow === PROVIDE_LIQUIDITY ? "active" : ""}`}> Provide
                            Liquidity
                        </button>
                        <button onClick={() => setChosenWindow(VOLUME)}
                                className={`${chosenWindow === VOLUME ? "active" : ""}`}> Volume
                        </button>
                        <button onClick={() => setChosenWindow(LIQUIDITY)}
                                className={`${chosenWindow === LIQUIDITY ? "active" : ""}`}> Liquidity
                        </button>
                    </div>
                    <div className="control-panel__content">
                        <ExpandedTab/>
                        {chosenWindow !== PROVIDE_LIQUIDITY ?

                            <div className='liq-info'>
                                <span> <h5>Liquidity </h5> <b> ${liqiuidityUSD} </b> </span>
                                <span> <h5>Volume (24H) </h5> <b> $ volume </b> </span>
                                <span> <h5>Earnings (24H) </h5> <b> $51,544 </b> </span>
                                <span> <h5>Total APY </h5> <b> 31.84% </b> </span>
                                <span> <h5>My Liquidity </h5> <b> ${myLiquidity} </b> </span>
                            </div>
                            :
                            null
                        }
                    </div>
                </div>
                :
                null
            }
        </li>
    )
}