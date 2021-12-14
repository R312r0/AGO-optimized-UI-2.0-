import React from 'react';
import FoundryActions from './foundry-actions/foundry-actions';
import FoundryData from './foundry-data/foundry-data';
import './foundry.scss'

export const Foundry = () => {

    return (
        <div className='foundry'> 
            <h1 className='foundry__heading'>Foundry</h1>

            <main className='foundry__wrapper'>
                <div className='foundry__details'>
                    <p>Stake your CNUSD and CNBTC</p>
                    <p>Earn profit from the protocol's performance</p>
                </div>

                <FoundryData />
                <FoundryActions />
            </main>
        </div>
    )
}