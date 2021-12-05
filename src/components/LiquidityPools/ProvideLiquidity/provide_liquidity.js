import React from 'react';
import { TokenIcon } from '../../TokenIcon/token_icon';


export const ProvideLiquidity = ({pool}) => {

    const {pool: {firstToken, secondToken}} = pool;


    return(
        <div className='provide-liquidity-block'> 


            <div className='provide-liquidity-block__item'>
                <div className='provide-liquidity-block__item__input-wrapper'> 
                    <p>{firstToken}</p>
                    <div className='provide-liquidity-block__item__input-wrapper__token'>
                        <TokenIcon iconName={firstToken}/>
                        <h5>{firstToken}</h5>
                        <input type="number" placeholder={`Enter ${firstToken} amout`}/>
                    </div>
                </div>

                <div className='provide-liquidity-block__item__data'>
                    <p>0.236956852637269</p>
                    <p>=$47,654.36</p>
                </div>
            </div>


            <div className='provide-liquidity-block__item'>
                <div className='provide-liquidity-block__item__input-wrapper'> 
                    <p>{secondToken}</p>
                    <div className='provide-liquidity-block__item__input-wrapper__token'>
                        <TokenIcon iconName={secondToken}/>
                        <h5>{secondToken}</h5>
                        <input type="number" placeholder={`Enter ${secondToken} amout`}/>
                    </div>
                </div>

                <div className='provide-liquidity-block__item__data'>
                    <p>0.236956852637269</p>
                    <p>=$47,654.36</p>
                </div>
            </div>


            <div className='provide-liquidity-block__item'>
                <div className='provide-liquidity-block__item__input-wrapper'> 
                    <p className='provide-liq-heading'>Enter LP token amount to mint</p>
                    <div className='provide-liquidity-block__item__input-wrapper__token'>
                        <input className="provide-liq-white" type="number" placeholder={`Enter ${secondToken} amout`}/>
                    </div>
                </div>

                <div className='provide-liquidity-block__item__data'> 
                    <p className='provide-liq-max__data'>Max: -0.23965842676254</p>
                </div>
            </div>


            <div className='provide-liquidity-block__item'>
                <div className='provide-liquidity-block__item__input-wrapper'> 
                    <p className='provide-liq-heading'>USD Value</p>
                    <div className='provide-liquidity-block__item__input-wrapper__token'>
                        <input className="provide-liq-white" type="number" placeholder={`Enter ${secondToken} amout`}/>
                    </div>
                </div>

                <div className='provide-liquidity-block__item__data'> 
                    <p className='provide-liq-max__data'>Max: = -$140.26</p>
                </div>
            </div>
        </div>
    )

}