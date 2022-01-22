import React, { useEffect, useState } from 'react';
import agologo from './../../../assets/icons/ago-logo.svg'
import { useWeb3React } from "@web3-react/core";
import { useSystemContext } from "../../../systemProvider";
import { formatFromDecimal, formattedNum } from "../../../utils/helpers";
import { LOADER_INDICATOR_LOCAL, LP_STAKING_POOL } from "../../../constants";
import { Spin } from "antd";
import { TokenIcon } from "../../TokenIcon/token_icon";
import SINGLE_STAKING_ABI from '../../../abi/SIngleChef.json';
import { SINGLE_STAKING_POOL } from '../../../constants';
import { useHistory } from 'react-router-dom';

const AccountsStaking = () => {

    const { account, library } = useWeb3React();
    const { contracts, tokens } = useSystemContext();
    const [pools, setPools] = useState(null);
    const [totalPages, setTotalPages] = useState(0);
    const [dataPaginated, setDataPaginated] = useState(0);
    const [currentClickedNumber, setCurrentClickedNumber] = useState(1);
    const history = useHistory();

    useEffect(() => {

        if (account) {
            getUserPools();
        }

    }, [account])


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

        // const poolLength = await contracts.MASTER_CHEF.methods.poolLength().call();


        const singlePools = await Promise.all(SINGLE_STAKING_POOL.map(async (item) => {

            const contract = new library.eth.Contract(SINGLE_STAKING_ABI, item.address);

            const lpToken = await contract.methods.rewardToken().call();
            const userInfo = await contract.methods.userInfo(account).call();

            const rewardToken = tokens.find((tok) => tok.address === lpToken.toLowerCase())
            const staked = parseFloat(formatFromDecimal(userInfo[0], tokens.find((tok) => tok.symbol === item.name).decimals))

            const userReward = formatFromDecimal(await contract.methods.pendingReward(account).call(), rewardToken.decimals)
            const userUSDReward = parseFloat(userReward) * parseFloat(rewardToken.priceUSD)

            return {
                stakeTokenName: item.name,
                rewardTokenName: rewardToken.symbol,
                staked,
                userReward,
                userUSDReward
            }

        }))

        const lpPools = await Promise.all(LP_STAKING_POOL.map(async (item) => {

            const contract = new library.eth.Contract(SINGLE_STAKING_ABI, item.address);

            const lpToken = await contract.methods.rewardToken().call();
            const userInfo = await contract.methods.userInfo(account).call();

            const rewardToken = tokens.find((tok) => tok.address === lpToken.toLowerCase())
            const staked = parseFloat(formatFromDecimal(userInfo[0], 18));

            const userReward = formatFromDecimal(await contract.methods.pendingReward(account).call(), rewardToken.decimals)
            const userUSDReward = parseFloat(userReward) * parseFloat(rewardToken.priceUSD)

            return {
                stakeTokenName: item.name,
                rewardTokenName: rewardToken.symbol,
                staked,
                userReward,
                userUSDReward
            }

        }))

        const unitedArr = [...singlePools, ...lpPools].filter((item) => item.staked !== 0)

        determineNumberOfPages(unitedArr);
        setPools(unitedArr);
    }


    return (
        <div className='accounts-wrapper-use-staking-pools cosmetical-wrapper'>
            <h1> Staking </h1>

            <div className='accounts-wrapper-use-staking-pools__list-header'>
                <span> Symbol </span>
                <span> Size </span>
                <span> Reward </span>
            </div>

            <ul style={{ position: "relative" }}>
                {dataPaginated && dataPaginated[`${currentClickedNumber}`] ? dataPaginated[`${currentClickedNumber}`].map((item) => {
                    if (item.stakeTokenName.indexOf("-") !== -1) {
                        const symbols = item.stakeTokenName.split("-")

                        console.log(item)

                        return (
                            <li>
                                <div>
                                    <TokenIcon iconName={symbols[0]} />
                                    <TokenIcon iconName={symbols[1]} />
                                    <p>{item.stakeTokenName}</p>
                                </div>
                                <span> {formattedNum(item.staked)} {item.stakeTokenName} </span>
                                <span style={{ color: "#40BA93" }}> + {formattedNum(item.userReward)} {item.rewardTokenName} / {formattedNum(item.userUSDReward)}$ </span>
                            </li>
                        )
                    }

                    return (
                        <li>
                            <div>
                                <TokenIcon iconName={item.stakeTokenName} />
                                <p>{item.stakeTokenName}</p>
                            </div>
                            <span>{item.staked} {item.stakeTokenName}</span>
                            <span style={{ color: "#40BA93" }}> + {formattedNum(item.userReward)} {item.rewardTokenName} / {formattedNum(item.userUSDReward)}$ </span>
                        </li>
                    )
                })
                    :
                    <>
                        {pools?.length === 0 ?
                            <h1>No staking pools</h1>
                            :
                            <Spin indicator={LOADER_INDICATOR_LOCAL} />
                        }
                    </>

                }

            </ul>

            <div className='accounts-wrapper-use-staking-pools__pagination'>
                {dataPaginated && Object.entries(dataPaginated).map((item) => {
                    return <span onClick={() => setCurrentClickedNumber(item[0])} className={item[0] === currentClickedNumber ? "active" : ""}>{item[0]}</span>
                })}
            </div>

            <div className='accounts-wrapper-use-staking-pools__buttons'>
                <button onClick={() => history.push("/staking")} className='active'>Manage</button>
            </div>
        </div>
    )
}

export default AccountsStaking;