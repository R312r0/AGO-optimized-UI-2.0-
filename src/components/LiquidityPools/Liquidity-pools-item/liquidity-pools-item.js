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

export const LiquidityPoolsItem = ({pool}) => {

    const { firstToken, secondToken, liquidity, myLiquidity, apy } = pool;

    const { PROVIDE_LIQUIDITY, VOLUME, LIQUIDITY } = TABS;

    const [windowExpanded, setWindowExpanded] = useState(false); 

    const [choosenWindow, setChoosenWindow] = useState(PROVIDE_LIQUIDITY);

    const ExpandedTab = () => {
        switch (choosenWindow) {
            case PROVIDE_LIQUIDITY:
                return (<ProvideLiquidity pool={pool}/>)
            case VOLUME:
                return (<Volume/>)
            case LIQUIDITY:
                return (<Liquidity/>)
            default:
                return (<ProvideLiquidity/>)
        };
    };

    return (
        <li className={`${windowExpanded ? "luqidity-pools-wrapper-list-item liq-item-opened" : "luqidity-pools-wrapper-list-item"}`}>
            <div className='pair'>
                <TokenIcon iconName={firstToken}/>
                <TokenIcon iconName={secondToken}/>
                <h3> {firstToken}-{secondToken} </h3>
            </div>
            <h3> {liquidity} </h3>
            <h3> {myLiquidity} </h3>
            <h3> {apy} </h3>
            <button className='chart-expand'
                    onClick={() => setWindowExpanded(!windowExpanded)}> {windowExpanded ?
                <i class="fas fa-times"></i> : <i class="fas fa-chart-line"></i>} </button>
            {windowExpanded ?
                <div className='control-panel'>
                    <div className='control-panel__header'>
                        <button onClick={() => setChoosenWindow(PROVIDE_LIQUIDITY)}
                                className={`${choosenWindow === PROVIDE_LIQUIDITY ? "active" : ""}`}> Provide
                            Liquidity
                        </button>
                        <button onClick={() => setChoosenWindow(VOLUME)}
                                className={`${choosenWindow === VOLUME ? "active" : ""}`}> Volume
                        </button>
                        <button onClick={() => setChoosenWindow(LIQUIDITY)}
                                className={`${choosenWindow === LIQUIDITY ? "active" : ""}`}> Liquidity
                        </button>
                    </div>
                    <div className="control-panel__content">
                        <ExpandedTab/>
                        {choosenWindow !== PROVIDE_LIQUIDITY ?
                            <div className='liq-info'>
                                <span> <h5>Liquidity </h5> <b> $685,105,818 </b> </span>
                                <span> <h5>Volume (24H) </h5> <b> $11,552,984 </b> </span>
                                <span> <h5>Earnings (24H) </h5> <b> $51,544 </b> </span>
                                <span> <h5>Total APY </h5> <b> 31.84% </b> </span>
                                <span> <h5>My Liquidity </h5> <b> $0 </b> </span>
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