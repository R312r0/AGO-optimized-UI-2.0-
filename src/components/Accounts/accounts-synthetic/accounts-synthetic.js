import React from 'react';
import { TokenIcon } from './../../TokenIcon/token_icon';

const AccountsSynthetic = () => {

    const mockUserStaked = [
        {name: "AGO", staked: 12, reward: 0.013},
        {name: "AGOUSD", staked: 12, reward: 0.013},
        {name: "AGOBTC", staked: 12, reward: 0.013},
        {name: "CNUSD", staked: 12, reward: 0.013},
        {name: "CNBTC", staked: 12, reward: 0.013},
    ]

    return (
        <div className='accounts-wrapper-use-staking-pools cosmetical-wrapper'> 
            <h1> Synthetic assets </h1>
            
            <div className='accounts-wrapper-use-staking-pools__list-header'> 
                <span> Pool </span>
                <span> Staked </span>
                <span> Volume </span>
            </div>

            <ul> 
                {mockUserStaked.map((item) => {
                    return (
                        <li key={item.name}>
                            <div>
                                <TokenIcon iconName={item.name}/>
                                <p> {item.name} </p>
                            </div>
                            <span> {item.staked} </span>
                            <span> {item.reward} </span>
                        </li>
                    )
                })}    
            </ul>

            <div className='accounts-wrapper-use-staking-pools__pagination'>
                <span className='active'>1</span>
                <span>2</span>
                <span>3</span>
            </div>
        </div>
    )
}

export default AccountsSynthetic;