import React, { useContext, useState } from 'react';
import { useSystemContext } from '../../systemProvider';
import { TokenIcon } from '../TokenIcon/token_icon';
import line from '../../assets/icons/line.svg';
import vector from '../../assets/icons/vector.svg';
import claimRewardIcon from './claim-reward.svg';
import './staking-rewards.scss';

export const StakingRewards = () => {

    const {theme} = useSystemContext();

    const stakingPools = [
        {name: "Argano", symbol: "AGO", roi: "30%", contract: "0x213fsar124f12f1r31fsdfg34t9"},
        {name: "Argano", symbol: "AGOUSD", roi: "20%", contract: "0x213fsar124f12f1r31fsdfg34t9"},
        {name: "Argano", symbol: "AGO", roi: "30%", contract: "0x213fsar124f12f1r31fsdfg34t9"},
        {name: "Argano", symbol: "AGO", roi: "40%", contract: "0x213fsar124f12f1r31fsdfg34t9"},
    ]

    const [openedWindows, setOpenedWindows] = useState([]);
 
    const handleStakingOpening = (name) => {

        const isName = openedWindows.findIndex((item) => item === name);

        if (isName === -1) {
            setOpenedWindows([...openedWindows, name]);
        }
        else {
            const tempArr = openedWindows;
            tempArr.splice(isName, 1);
            setOpenedWindows([...tempArr]);
        }
    }


    return (
            <div className={`staking-wrapper ${theme === "light" ? " staking-wrapper-light" : ""}`}> 
                <div className='staking-reward-header'>
                    <h3> Select to stake </h3>
                </div>
                <div className='staking-list'> 

                    <div className='staking-list__header'>
                        <span> Pool </span>
                        <span> Yearly ROI</span>
                        <span> Contract </span>
                    </div>

                    <ul>
                        {stakingPools.map((item, _ind) => {

                            const windowExpanded = openedWindows.findIndex((name) => name === item.name) !== -1;

                            return (
                                <li onClick={() => handleStakingOpening(item.name)} className={`staking-list__item staking-list__item${windowExpanded  ? "__opened" : ""}`}>
                                    <div className='head-wrapper'>
                                        <div className='token'>
                                            <div className='token-main'>
                                                <TokenIcon iconName={item.symbol}/>
                                                <b> {item.name} </b>
                                            </div>
                                            <span> {item.symbol} </span>
                                        </div>
                                        <div className='roi'>
                                            <span> {item.roi} </span>
                                        </div>
                                        <div className='contract'>
                                            <span>{item.contract}</span>
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
                        })}
                    </ul>
                </div>
            </div>
    )
}