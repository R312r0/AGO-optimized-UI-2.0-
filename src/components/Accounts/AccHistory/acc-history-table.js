import React, {useEffect, useState} from 'react';

// icons
import agoLogo from '../../../assets/icons/ago-logo.svg';

import lockIcon from '../../../assets/icons/lock-history.svg';
import lateralArrowsIcon from '../../../assets/icons/lateral-arrows-history.svg';
import downArrowIcon from '../../../assets/icons/down-arrow-history.svg';
import upArrowIcon from '../../../assets/icons/down-arrow-history.svg';
import downloadIcon from '../../../assets/icons/download-history.svg';
import documentIcon from '../../../assets/icons/document-history.svg';
import {useQuery} from "@apollo/client";
import {USER_TXS_HISTORY} from "../../../api/client";
import {useWeb3React} from "@web3-react/core";
import {formatAMPM, formatDate, formatDateUnixTxs} from "../../../utils/helpers";
import {TokenIcon} from "../../TokenIcon/token_icon";
import {TXS_NAME} from "../../../constants";

export const AccHistoryTable = ({searchPattern}) => {

    const {account} = useWeb3React();
    const {data, loading} = useQuery(USER_TXS_HISTORY, {
        variables: {id: account}
    })
    const [txsFormatted, setTxsFormatted] = useState(null);
    const [txsFiltered, setTxsFiltered] = useState(null);

    useEffect(() => {

        if (data && !loading) {
            formatData(data.transactions)
        }

    }, [data, loading])

    useEffect(() => {

        if (txsFiltered && txsFormatted) {
            if (searchPattern?.length > 0) {
                const newTxs = txsFormatted.map((item) =>  {
                    const txs = item.txs.filter(item_0 => item_0.name.startsWith(searchPattern))
                    return {date: item.date, txs}
                })

                const newTxsFilter = newTxs.filter(item => item.txs.length > 0);

                setTxsFiltered(newTxsFilter)
            }
            else {
                setTxsFiltered(txsFormatted);
            }

        }

    }, [searchPattern, txsFiltered, txsFormatted])

    const formatData = (txs) => {
        let txsByDate = [];
        txs.forEach((item, _ind) => {

            const date = formatDateUnixTxs(item.timestamp)

            if (_ind === 0) {
                txsByDate.push({date: date, txs: [item]})
            }

            const dateIndex = txsByDate.findIndex((txsDate) => txsDate.date === date)

            if (dateIndex === -1) {
                txsByDate.push({date: date, txs: [item]})
            }
            else {
                txsByDate[dateIndex].txs.push(item)
            }

        })

        setTxsFormatted(txsByDate);
        setTxsFiltered(txsByDate);
    }

    return (
        <ul>
            {txsFiltered ? txsFiltered.map((item, _ind) => {
                return (
                    <>
                        <data className={_ind === 0 ? 'dark' : "light"}>{item.date}</data>
                        {item.txs.map((itemTX) => {
                            return (
                            <li>
                                <div className='action-container'>
                                <span className='action-img'>
                                    <img src={lockIcon} />
                                </span>
                                    <div className='text'>
                                        <p>{itemTX.name}</p>
                                        <b>{formatAMPM(new Date(itemTX.timestamp  * 1000))}</b>
                                    </div>
                                </div>

                                <div className='action-currency'>
                                    <TokenIcon iconName={itemTX.token0}/>
                                    <div className={'text'}>
                                        <p>{itemTX.token0}</p>
                                    </div>
                                    <svg className='arrow'
                                         viewBox="0 0 13 21"
                                         fill="none">
                                        <path d="M0 18.515L8.03509 10.5L0 2.4675L2.47368 0L13 10.5L2.47368 21L0 18.515Z" fill="white"/>
                                    </svg>
                                    {itemTX.name !== TXS_NAME.COLLECT_REDEMPTION ?
                                        <>
                                            <TokenIcon iconName={itemTX.token1}/>
                                            <div className={'text'}>
                                                <p>{itemTX.token1}</p>
                                            </div>
                                        </>
                                        :
                                        null
                                    }
                                    {+itemTX.amountShare > 0 ?
                                        <>
                                            <TokenIcon iconName={itemTX.tokenShare}/>
                                            <div className={'text'}>
                                                <p>{itemTX.tokenShare}</p>
                                            </div>
                                        </>
                                        : null
                                    }
                                </div>

                                <div className='action-transaction-data'>
                                    <p>Aplication</p>
                                    <div className='account-key'>
                                        <span></span>
                                        <b>0x007a...f248</b>
                                    </div>
                                </div>
                            </li>
                            )
                        })}

                    </>
                )

            }) : null}
        </ul>
    )
}