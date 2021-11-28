import { useWeb3React } from '@web3-react/core';
import React, { useEffect, useState } from 'react';
import { useSystemContext } from '../../../systemProvider';
import { formatFromDecimal, formattedNum, formatToDecimal } from '../../../utils/helpers';
import { TokenIcon } from '../../TokenIcon/token_icon';
import { ProvideLiquidityPieChart } from '../ProvideLiqPieChart/provide-liquidity-pie-chart';
import { CONTRACT_ADRESESS, MAX_INT } from '../../../constants';

export const ProvideLiquidity = ({ pool }) => {

    const { firstToken, secondToken, isPoolWmatic } = pool;

    const { contracts, tokens } = useSystemContext();

    const { account } = useWeb3React();

    const [token0Amount, setToken0Amount] = useState(0);

    const [token1Amount, setToken1Amount] = useState(0);

    const [allowance, setAllowance] = useState(null);

    useEffect(() => {

        async function checkRouterAllowance() {

            const token0Allowance =  await tokens[firstToken].instance.methods.allowance(account, CONTRACT_ADRESESS.DEX_ROUTER).call();
            const token1Allowance = await tokens[secondToken]?.instance.methods.allowance(account, CONTRACT_ADRESESS.DEX_ROUTER).call();
            setAllowance(token0Allowance === MAX_INT && token1Allowance === MAX_INT);

        }

        checkRouterAllowance();

    }, []);

    console.log(allowance)
    
    const handleToken0Input = (value) => {

        console.log(value);
        setToken0Amount(value);

    }

    const handleToken1Input = (value) => {

        console.log(value);
        setToken1Amount(value);

    }

    const handleProvideLiquidity = async () => {

        const deadline = +new Date() + 1500;

        if (isPoolWmatic) {

            const pairTokenAddress = firstToken === "WMATIC" ? CONTRACT_ADRESESS[secondToken] : CONTRACT_ADRESESS[firstToken];

            contracts.DEX_ROUTER.methods.addLiquidityETH(pairTokenAddress, formatToDecimal(token0Amount, 6), 0, 0, account, deadline).send({from: account, value: token1Amount});
        }
        else {
            contracts.DEX_ROUTER.methods.addLiquidity(firstToken.address, secondToken.address, token0Amount, token1Amount, 0, 0, account, deadline).send({from: account});
        }
    }

    const approveTokens = async () => {

        if (isPoolWmatic) {
            const pairTokenAddress = firstToken === "WMATIC" ? CONTRACT_ADRESESS[secondToken] : CONTRACT_ADRESESS[firstToken];
            
            // TODO: from subgraph take a address of tokens, create instances and make approve
        }
    }

    return(
        <>
        <div className='provide-liquidity-block'> 
            <div className='provide-liquidity-block__input-row'> 
                <span> <p>{firstToken} </p> <p>=$47,654.36</p>  </span>
                <div> 
                    <p><TokenIcon iconName={firstToken}/> <h5>{firstToken}</h5> </p>
                    <input type="number" placeholder={`Enter ${firstToken} amout`} value={token0Amount} onChange={(e) => handleToken0Input(e.target.value)}/>
                </div>
            </div>
            <div className='provide-liquidity-block__input-row'> 
                <span> <p>{secondToken} </p> <p>=$6,654.36</p>  </span>
                <div> 
                    <p><TokenIcon iconName={secondToken}/> <h5>{secondToken}</h5> </p>
                    <input type="number" placeholder={`Enter ${secondToken} amout`} value={token1Amount} onChange={(e) => handleToken1Input(e.target.value)}/>
                </div>
            </div>
            <div className='provide-liquidity-block__add-info-row'> 
                <span> <p> USD value </p> <p>Max: = -$140.26</p>  </span>
                <input type="text" disabled value={`${formattedNum(1000000)}$`}/>
            </div>
        </div>
        <div className='provide-liq-wrapper'>
            <ProvideLiquidityPieChart token1={firstToken} token2={secondToken}/>
            <button onClick={() => handleProvideLiquidity()}> Porvide</button>
        </div>
        </>
    )

}