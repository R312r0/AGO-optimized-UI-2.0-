import React, {useEffect, useState} from 'react';
import agologo from './../../../assets/icons/ago-logo.svg'
import {useQuery} from "@apollo/client";
import {LIQ_POOLS_ACCOUNTS} from "../../../api/client";
import ERC20_ABI from '../../../abi/ERC20.json';
import {useWeb3React} from "@web3-react/core";
import {formatFromDecimal, formattedNum} from "../../../utils/helpers";
import {TokenIcon} from "../../TokenIcon/token_icon";

const AccountsPools = () => {

    const { account, library } = useWeb3React();
    const {data, loading} = useQuery(LIQ_POOLS_ACCOUNTS);
    const [totalPages, setTotalPages] = useState(null);
    const [currentClickedNumber, setCurrentClickedNumber] = useState(1);
    const [dataPaginated, setDataPaginated] = useState(null);

    useEffect(() => {

        if (account && data && !loading) {
            getUserPools()
        }

    }, [account, data, loading])

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

    const getUserPools = async () => {

        const userPools = data.pairs.map(async (item) => {

            const lp = new library.eth.Contract(ERC20_ABI, item.id);
            const userLpBalance = formatFromDecimal(await lp.methods.balanceOf(account).call(), 18) ;
            const lpTotalSupply = formatFromDecimal(await lp.methods.totalSupply().call(), 18);
            // const myLiquidity = (liquidityUSD / lpTotalSupply) * lpUserBalance;

            const percentPartInPool = ((userLpBalance / lpTotalSupply) * 100).toFixed(2);
            const userLpUsdBalance = (item.reserveUSD / lpTotalSupply) * userLpBalance

            return {
                id: item.id,
                token0: item.token0.symbol,
                token1: item.token1.symbol,
                userLpBalance,
                userLpUsdBalance,
                percentPartInPool
            }
        })

        const userPoolsFiltered = (await Promise.all(userPools)).filter(item => item.userLpBalance > 0);

        userPoolsFiltered.sort((a, b) => a.userLpUsdBalance - b.userLpUsdBalance).reverse()

        determineNumberOfPages(userPoolsFiltered);

    }


    return (
        <div className='accounts-wrapper-use-staking-pools cosmetical-wrapper'> 
            <h1> Pools </h1>
            <div className='accounts-wrapper-use-staking-pools__list-header'> 
                <span> Pair </span>
                <span> My Liquidity </span>
                <span> USD Balance </span>
            </div>

            <ul>
                {dataPaginated && dataPaginated[`${currentClickedNumber}`] ? dataPaginated[`${currentClickedNumber}`].map((item) => {
                    return (
                        <li>
                            <div>
                                <TokenIcon iconName={item.token0}/>
                                <TokenIcon iconName={item.token1}/>
                                <p>{item.token0}-{item.token1}</p>
                            </div>
                            <span>{formattedNum(parseFloat(item.userLpBalance).toFixed(2))} ({item.percentPartInPool}%) </span>
                            <span>${formattedNum(parseFloat(item.userLpUsdBalance).toFixed(2))}</span>
                        </li>
                    )
                }) : <h1> No Pools </h1>}
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

export default AccountsPools;