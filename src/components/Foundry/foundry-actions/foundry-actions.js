import React from 'react';
import agoLogo from './../../../assets/icons/ago-logo.svg'

const FoundryActions = () => {

    return (
        <div className='foundry__actions'> 
        
            <div className='foundry__actions-item'>
                <span className='foundry__actions-item__status'>Staked</span>
                <div className='foundry__actions-item__token'>
                    <img src={agoLogo} />
                    <p>CNUSD</p>
                </div>
                
                <p className='amount'>0</p>
                <button disabled>Connect your wallet</button>
            </div>

            <div className='foundry__actions-item'>
                <span className='foundry__actions-item__status'>Earned</span>
                <div className='foundry__actions-item__token'>
                    <img src={agoLogo} />
                    <p>USDT</p>
                </div>
                
                <p className='amount'>0</p>
                <button disabled>Connect your wallet</button>
            </div>

            <div className='foundry__actions-item'>
                <span className='foundry__actions-item__status'>Staked</span>
                <div className='foundry__actions-item__token'>
                    <img src={agoLogo} />
                    <p>CNBTC</p>
                </div>
                
                <p className='amount'>0</p>
                <button disabled>Connect your wallet</button>
            </div>

            <div className='foundry__actions-item'>
                <span className='foundry__actions-item__status'>Earned</span>
                <div className='foundry__actions-item__token'>
                    <img src={agoLogo} />
                    <p>WBTC</p>
                </div>
                
                <p className='amount'>0</p>
                <button disabled>Connect your wallet</button>
            </div>
        </div>
    )
}

export default FoundryActions;