import React from 'react';
import agologo from './../../../assets/icons/ago-logo.svg'

const AccountsPools = () => {

    return (
        <div className='accounts-wrapper-use-staking-pools cosmetical-wrapper'> 
            <h1> Pools </h1>
            
            <div className='accounts-wrapper-use-staking-pools__list-header'> 
                <span> Symbol </span>
                <span> Size </span>
                <span> Reward </span>
            </div>

            <ul> 
                <li>
                    <div>
                        <img src={agologo} />
                        <p>AGOBTC</p>
                    </div>
                    <span>0.053 (20%)</span>
                    <span>29 (+3%)</span>
                </li>
                <li>
                    <div>
                        <img src={agologo} />
                        <p>AGOBTC</p>
                    </div>
                    <span>0.053 (20%)</span>
                    <span>29 (+3%)</span>
                </li>
                <li>
                    <div>
                        <img src={agologo} />
                        <p>AGOBTC</p>
                    </div>
                    <span>0.053 (20%)</span>
                    <span>29 (+3%)</span>
                </li>
            </ul>

            <div className='accounts-wrapper-use-staking-pools__pagination'>
                <span className='active'>1</span>
                <span>2</span>
                <span>3</span>
            </div>

            <div className='accounts-wrapper-use-staking-pools__buttons'>
                <button className='active'>Add</button>
                <button>Withdraw</button>
            </div>
        </div>
    )
}

export default AccountsPools;