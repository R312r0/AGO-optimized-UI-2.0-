import React, { useContext, useState } from 'react';
import { useSystemContext } from '../../systemProvider';
import { TokenIcon } from '../TokenIcon/token_icon';
import line from '../../assets/icons/line.svg';
import vector from '../../assets/icons/vector.svg';
import claimRewardIcon from './claim-reward.svg';
import './staking-rewards.scss';
import {StakingItem} from "./StakingItem/staking-item";

export const StakingRewards = () => {

    const {theme} = useSystemContext();

    const stakingPools = [
        {name: "Argano", symbol: "AGO", roi: "30%", contract: "0x213fsar124f12f1r31fsdfg34t9"},
        {name: "Argano", symbol: "AGOUSD", roi: "20%", contract: "0x213fsar124f12f1r31fsdfg34t9"},
        {name: "Argano", symbol: "AGO", roi: "30%", contract: "0x213fsar124f12f1r31fsdfg34t9"},
        {name: "Argano", symbol: "AGO", roi: "40%", contract: "0x213fsar124f12f1r31fsdfg34t9"},
    ]

    return (
            <div className={`staking-wrapper ${theme === "light" ? " staking-wrapper-light" : ""}`}> 

                <h1 className='main__heading__page'>Staking Rewards</h1>

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

                            return <StakingItem pool={item} />

                        })}
                    </ul>
                </div>
            </div>
    )
}