import React, {useEffect, useState} from 'react';
import agologo from './../../../assets/icons/ago-logo.svg'
import {useWeb3React} from "@web3-react/core";
import {useSystemContext} from "../../../systemProvider";
import {formatFromDecimal} from "../../../utils/helpers";
import {LOADER_INDICATOR_LOCAL} from "../../../constants";
import {Spin} from "antd";
import {TokenIcon} from "../../TokenIcon/token_icon";

const AccountsStaking = ({tokensSub, lpTokens}) => {

    const {account} = useWeb3React();
    const {contracts, tokens} = useSystemContext();
    const [userStake, setUserStake] = useState(null);

    useEffect(() => {

        if (account && tokensSub && lpTokens) {
            getUserPools(tokensSub, lpTokens);
        }

    }, [account, tokensSub, lpTokens])


    const getUserPools = async (tokensSub, lpTokens) => {

        const poolLength = await contracts.MASTER_CHEF.methods.poolLength().call();
        let userPools = []
        for (let i = 0; i < poolLength - 1; i++) {

            let amountStaked = (await contracts.MASTER_CHEF.methods.userInfo(i, account).call()).amount;

            if (amountStaked > 0) {
                const poolLpTokenAddress = (await contracts.MASTER_CHEF.methods.poolInfo(i).call()).lpToken

                let tok = tokensSub.find(item => item.id === poolLpTokenAddress.toLowerCase());
                let poolName;
                let rewardSize = formatFromDecimal(await contracts.MASTER_CHEF.methods.pendingAgo(i, account).call(), tokens["AGO"].decimals)

                if (!tok) {
                    tok = lpTokens.find(item => item.id === poolLpTokenAddress.toLowerCase());
                    poolName = `${tok.token0.symbol}-${tok.token1.symbol}`
                    amountStaked = formatFromDecimal(amountStaked, 18);
                }
                else {
                    poolName = tok.symbol;
                    amountStaked = formatFromDecimal(amountStaked, tok.decimals)
                }

                userPools.push({poolName, amountStaked, rewardSize})
            }
        }

        setUserStake(userPools);

    }

    return (
        <div className='accounts-wrapper-use-staking-pools cosmetical-wrapper'> 
            <h1> Staking </h1>
            
            <div className='accounts-wrapper-use-staking-pools__list-header'> 
                <span> Symbol </span>
                <span> Size </span>
                <span> Reward </span>
            </div>

            <ul>
                {userStake ? userStake.map((item) => {
                    if (item.poolName.indexOf("-") !== -1) {
                        const symbols = item.poolName.split("-")
                        return (
                            <li>
                               <div>
                                   <TokenIcon iconName={symbols[0]}/>
                                   <TokenIcon iconName={symbols[1]}/>
                                   <p>{item.poolName}</p>
                               </div>
                                <span>{item.amountStaked} LP</span>
                                <span>{item.rewardSize}</span>
                            </li>
                        )
                    }


                    return (
                        <li>
                            <div>
                                <TokenIcon iconName={item.poolName} />
                                <p>{item.poolName}</p>
                            </div>
                            <span>{item.amountStaked} {item.poolName}</span>
                            <span>{item.rewardSize}</span>
                        </li>
                    )
                })
                :
                    <Spin indicator={LOADER_INDICATOR_LOCAL}/>
                }

            </ul>

            <div className='accounts-wrapper-use-staking-pools__pagination'>
                <span className='active'>1</span>
            </div>
            
            <div className='accounts-wrapper-use-staking-pools__buttons'>
                <button className='active'>Add</button>
                <button>Withdraw</button>
            </div>
        </div>
    )
}

export default AccountsStaking;