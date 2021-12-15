import React from 'react';
import { TokenIcon } from './../../TokenIcon/token_icon';

const AccountsSynthetic = ({sytheticAssets}) => {

    return (
        <div className='accounts-wrapper-use-staking-pools cosmetical-wrapper'> 
            <h1> Synthetic assets </h1>
            
            <div className='accounts-wrapper-use-staking-pools__list-header'> 
                <span> Asset </span>
                <span> Balance </span>
                <span> USD </span>
            </div>

            <ul> 
                {sytheticAssets && sytheticAssets.map((item) => {
                    return (
                        <li key={item.name}>
                            <div>
                                <TokenIcon iconName={item.name}/>
                                <p> {item.name} </p>
                            </div>
                            <span> {item.nativeBalance} </span>
                            <span> {item.usdBalance} </span>
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