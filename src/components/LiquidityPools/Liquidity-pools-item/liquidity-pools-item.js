import React, { useEffect, useState } from 'react';
import { TokenIcon } from '../../TokenIcon/token_icon';
import { ProvideLiquidity } from '../ProvideLiquidity/provide_liquidity';
import { Volume } from '../Volume/volume';
import { Liquidity } from '../Liquidity/liquidity';
import { RemoveLiquidityModal } from "../RemoveLiquidityModal/remove-liquidity-modal";
import { useSystemContext } from "../../../systemProvider";
import { useWeb3React } from "@web3-react/core";
import { DEX_ADDRESESS, MAX_INT, CONTRACT_ADRESESS } from "../../../constants";
import { Transactions } from "../Transactions/transactions";
import { StakeLp } from "../StakeLp/stake-lp";

const TABS = {
    PROVIDE_LIQUIDITY: "Provide liquidity",
    VOLUME: "Volume",
    LIQUIDITY: "Liquidity",
    TRANSACTIONS: "Transactions",
    STAKE_LP: "Stake LP"
}

export const LiquidityPoolsItem = ({ pool: { apr, address, token0, token1, liqiuidityUSD, isEarnAgo, myLiquidity, volChart, liqChart, lpTokenContract, lpUserBalance }, earnGovToken }) => {

    const { PROVIDE_LIQUIDITY, VOLUME, LIQUIDITY, TRANSACTIONS, STAKE_LP } = TABS;
    const [windowExpanded, setWindowExpanded] = useState(false);
    const [chosenWindow, setChosenWindow] = useState(PROVIDE_LIQUIDITY);
    const [removeLiquidityModal, setRemoveLiquidityModal] = useState(false);

    const ExpandedTab = () => {
        switch (chosenWindow) {
            case PROVIDE_LIQUIDITY:
                return (<ProvideLiquidity token0={token0} token1={token1} setRemoveLiqModal={setRemoveLiquidityModal} />)
            case VOLUME:
                return (<Volume data={volChart} />)
            case LIQUIDITY:
                return (<Liquidity data={liqChart} />)
            case TRANSACTIONS:
                return (<Transactions token0={token0} token1={token1} />)
            case STAKE_LP:
                return (<StakeLp token0={token0} token1={token1} lpTokenContract={lpTokenContract} lpUserBalance={lpUserBalance} lpTokenAddress={address} />)
            default:
                return (<ProvideLiquidity />)
        };
    };

    const openItem = () => {
        setWindowExpanded(!windowExpanded)
    }
    return (
        <>
            <li className={`luqidity-pools-wrapper-list-item ${windowExpanded ? "liq-item-opened" : ""}`} id={`item_${address}`}>
                <div className='luqidity-pools-wrapper-list-item__header' onClick={openItem}>
                    <div className='pair'>
                        <TokenIcon iconName={token0.symbol} />
                        <TokenIcon iconName={token1.symbol} />
                        <h3> {token0.symbol}-{token1.symbol} </h3>
                    </div>
                    <h3> {liqiuidityUSD}$ </h3>
                    <h3>  {myLiquidity}$ </h3>
                    <div className={`apr ${!isEarnAgo ? "not-reward" : ""}`}>
                        <h3> {apr.toFixed(2)}% </h3>
                    </div>
                    <div>
                        {isEarnAgo ? earnGovToken ? <TokenIcon iconName={"AGOy"} /> : token1.symbol === "CNBTC" ? <TokenIcon iconName={"CNBTC"} /> : <TokenIcon iconName={"CNUSD"} /> : null}
                    </div>
                    <button className='chart-expand'
                        onClick={() => setWindowExpanded(!windowExpanded)}> {windowExpanded ?
                            <i className="fas fa-times" /> : <i className="fas fa-chart-line" />} </button>
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
                            <button onClick={() => setChosenWindow(TRANSACTIONS)}
                                className={`${chosenWindow === TRANSACTIONS ? "active" : ""}`}> Transactions
                            </button>
                            {isEarnAgo ?
                                <button onClick={() => setChosenWindow(STAKE_LP)}
                                    className={`${chosenWindow === STAKE_LP ? "active" : ""}`}> Stake Lp
                                </button>
                                :
                                null
                            }
                        </div>
                        <div className="control-panel__content">
                            <ExpandedTab />
                            {chosenWindow !== TRANSACTIONS && chosenWindow !== PROVIDE_LIQUIDITY ?

                                <div className='liq-info'>
                                    <span> <h5>Liquidity </h5> <b> ${liqiuidityUSD} </b> </span>
                                    <span> <h5>Volume (24H) </h5> <b> $ volume </b> </span>
                                    <span> <h5>Earnings (24H) </h5> <b> $51,544 </b> </span>
                                    <span> <h5>Total APR </h5> <b> {apr.toFixed(2)}% </b> </span>
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
            <RemoveLiquidityModal visible={removeLiquidityModal}
                setVisible={setRemoveLiquidityModal}
                poolAddress={address}
                token0={token0}
                token1={token1}
                lpTokenContract={lpTokenContract}
                lpUserBalance={lpUserBalance}
                lpTokenAddress={address}
            />
        </>
    )
}