import React, { useContext, useState } from 'react';
import { useSystemContext } from '../../systemProvider';
import { TokenIcon } from '../TokenIcon/token_icon';
import line from '../../assets/icons/line.svg';
import vector from '../../assets/icons/vector.svg';
import claimRewardIcon from './claim-reward.svg';
import './staking-rewards.scss';
import { StakingItem } from "./StakingItem/staking-item";
import { CONTRACT_ADRESESS, SINGLE_STAKING_POOL } from "../../constants";
import { useThemeContext } from '../Layout/layout';

export const StakingRewards = () => {

    const { theme } = useThemeContext();

    return (
        <div className={`staking-wrapper ${theme === "light" ? " staking-wrapper-light" : ""}`}>

            <h1 className='main__heading__page'>Staking Rewards</h1>

            <div className='staking-reward-header'>
                <h3> Select to stake </h3>
            </div>
            <div className='staking-list'>

                <div className='staking-list__header'>
                    <span> Pool </span>
                    <span> Estimated Allocation </span>
                    <span> Contract </span>
                </div>

                <ul>
                    {SINGLE_STAKING_POOL.map((item, _ind) => <StakingItem pool={item} key={`staking_item_${_ind}`} />)}
                </ul>
            </div>
        </div>
    )
}