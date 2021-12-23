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
    const [totalPages, setTotalPages] = useState(0);
    const [dataPaginated, setDataPaginated] = useState(0);
    const [currentClickedNumber, setCurrentClickedNumber] = useState(1);

    useEffect(() => {

        if (account && tokensSub && lpTokens) {
            getUserPools(tokensSub, lpTokens);
        }

    }, [account, tokensSub, lpTokens])


    const determineNumberOfPages = (arr) => {
        const itemsPerPage = 3;

        let paginatedDataObject = {};

        let index = 0;
        let dataLength = arr.length;
        let chunkArray = [];

        for (index = 0; index < dataLength; index += itemsPerPage) {
            let newChunk = arr.slice(index, index + itemsPerPage);
            chunkArray.push(newChunk);
        }

        chunkArray.forEach((chunk, i) => {
            paginatedDataObject[i + 1] = chunk;
        });

        setTotalPages(chunkArray.length);
        setDataPaginated(paginatedDataObject);
    };

    const getUserPools = async (tokensSub, lpTokens) => {

        const poolLength = await contracts.MASTER_CHEF.methods.poolLength().call();
        let userPools = []
        for (let i = 0; i < poolLength - 1; i++) {

            let amountStaked = (await contracts.MASTER_CHEF.methods.userInfo(i, account).call()).amount;

            if (amountStaked > 0) {
                const poolLpTokenAddress = (await contracts.MASTER_CHEF.methods.poolInfo(i).call()).lpToken

                console.log(await contracts.MASTER_CHEF.methods.poolInfo(i).call());

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

        determineNumberOfPages(userPools)
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

            <ul style={{position: "relative"}}>
                {dataPaginated && dataPaginated[`${currentClickedNumber}`] ? dataPaginated[`${currentClickedNumber}`].map((item) => {
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
                {dataPaginated && Object.entries(dataPaginated).map((item) => {
                    return <span onClick={() => setCurrentClickedNumber(item[0])} className={item[0] === currentClickedNumber ? "active" : ""}>{item[0]}</span>
                })}
            </div>
            
            <div className='accounts-wrapper-use-staking-pools__buttons'>
                <button className='active'>Add</button>
                <button>Withdraw</button>
            </div>
        </div>
    )
}

export default AccountsStaking;