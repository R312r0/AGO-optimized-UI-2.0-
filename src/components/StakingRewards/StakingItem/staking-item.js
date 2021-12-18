import React, {useState} from 'react';
import {TokenIcon} from "../../TokenIcon/token_icon";
import claimRewardIcon from "../claim-reward.svg";


export const StakingItem = ({pool}) => {


    const {symbol, name, roi, contract } = pool;

    const [windowExpanded, setWindowExpanded] = useState(false);

    return (
        <li onClick={() => setWindowExpanded(!windowExpanded)} className={`staking-list__item staking-list__item${windowExpanded  ? "__opened" : ""}`}>
            <div className='head-wrapper'>
                <div className='token'>
                    <div className='token-main'>
                        <TokenIcon iconName={symbol}/>
                        <b> {name} </b>
                    </div>
                    <span> {symbol} </span>
                </div>
                <div className='roi'>
                    <span> {roi} </span>
                </div>
                <div className='contract'>
                    <span>{contract}</span>
                </div>
                <button className='hide-btn'>{windowExpanded ? 'Hide' : 'Deploy'}</button>
            </div>
            <div className={`body-wrapper`}>
                {windowExpanded ?
                    <>
                        <div className='claim-reward'>
                            <h5> Governance Vault (V2) </h5>
                            <button> <img src={claimRewardIcon} width="20" height="20"/> </button>
                        </div>
                        <div className='info-control-panel'>
                            <div className='info'>
                                <div className='info__row'>
                                    <h5> Earned </h5>
                                    <h5> Balance not farmed yet </h5>
                                    <h5> Currently Staked </h5>
                                </div>
                                <div className='info__row'>
                                    <h5> 0 Value </h5>
                                    <h5> 0 Value </h5>
                                    <h5> 0 Value </h5>
                                </div>
                            </div>
                            <div className='control-stake'>
                                <button> Stake </button>
                                <button> Unstake </button>
                            </div>
                        </div>
                    </> : ""
                }
            </div>
        </li>
    )

}