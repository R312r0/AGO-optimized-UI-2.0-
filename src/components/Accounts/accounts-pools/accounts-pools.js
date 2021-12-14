import React, {useEffect, useState} from 'react';
import agologo from './../../../assets/icons/ago-logo.svg'
import {useQuery} from "@apollo/client";
import {LIQ_POOLS_ACCOUNTS} from "../../../api/client";
import ERC20_ABI from '../../../abi/ERC20.json';
import {useWeb3React} from "@web3-react/core";
import {formatFromDecimal} from "../../../utils/helpers";

const AccountsPools = () => {

    const { account, library } = useWeb3React();
    const {data, loading} = useQuery(LIQ_POOLS_ACCOUNTS);


    useEffect(() => {

        if (data && !loading) {
            getUserPools()
        }

    }, [data, loading])


    const getUserPools = async () => {

        const userPools = data.pairs.map(async (item) => {

            const lp = new library.eth.Contract(ERC20_ABI, item.id);
            const userLpBalance = await lp.methods.balanceOf(account).call()
            const lpTotalSupply = await lp.methods.totalSupply().call();
            // const myLiquidity = (liquidityUSD / lpTotalSupply) * lpUserBalance;

            const userLpUsdBalance = (item.reserveUSD / lpTotalSupply) * userLpBalance
            return {id: item.id, name: `${item.token0.symbol}-{item.token1.symbol}`, userLpBalance, userLpUsdBalance  }

        })

        const userPoolsFiltered = (await Promise.all(userPools)).filter(item => item.userLpBalance > 0);

        console.log(userPoolsFiltered);

    }

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