import React, { useContext, useState, useEffect } from 'react';
import calculate_txs from '../../../assets/icons/calculate-txs.svg';
import downloadCsv from '../../../assets/icons/download-csv.svg';
import { useSystemContext } from '../../../systemProvider';
import { useWeb3React } from '@web3-react/core';
import axios from 'axios';
import { CONTRACT_ADRESESS } from '../../../constants';
import { TokenIcon } from '../../TokenIcon/token_icon';
import { formatFromDecimal } from '../../../utils/helpers';

// icons
import agoLogo from '../../../assets/icons/ago-logo.svg';

import lockIcon from '../../../assets/icons/lock-history.svg';
import lateralArrowsIcon from '../../../assets/icons/lateral-arrows-history.svg';
import downArrowIcon from '../../../assets/icons/down-arrow-history.svg';
import upArrowIcon from '../../../assets/icons/down-arrow-history.svg';
import downloadIcon from '../../../assets/icons/download-history.svg';
import documentIcon from '../../../assets/icons/document-history.svg';
import { AccHistoryTable } from './acc-history-table';

export const AccHistory = ({isOpened, setIsOpened}) => {
    const {account} = useWeb3React();
    const {theme, tokens} = useSystemContext()

    const [history, setHistory] = useState(null);
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const {data} = await axios.get(`https://argano-rest-api-sever.herokuapp.com/api/userActions/?address=${account}`)
            setData(data)
        }

        fetchData();
    }, [])

    console.log(data);

    return (
        // TO DO: For blocking scrolling when History page is active, the component Content from layout.js should take a style overflow: hidden;

        <div className={`acc-hisotry ${isOpened ? " acc-history-opened" : ""} ${theme === "light" ? " acc-history-light" : ""}`}>
            <main>
                <div className='acc-hisotry-header'>
                    <div className='acc-hisotry-heading'>
                        <a href="#" onClick={() => setIsOpened(false)}> <i className="fas fa-chevron-left"/> Account </a>
                        <h1> History </h1>
                    </div>
                    <input type="text" placeholder="Filter by Address, Protocol, Asset, Type"/>
                    <div className='acc-hisotry-buttons'>
                        <button> <img src={downloadCsv} /> Download CSV </button>
                        <button> <img src={calculate_txs} /> Calculate Taxes </button>
                    </div>
                </div>
                <div className='acc-hisotry-body'>
                    <AccHistoryTable />
                </div>
            </main>
        </div>
    )
}

{/* <ul>
    {data && data.map((item, _ind) => {

        const tokenSpent = Object.entries(CONTRACT_ADRESESS).find(item_loc => item_loc[1].toLocaleLowerCase() === item.token_flow[0].token.toLowerCase());
        const tokenSpentCount = formatFromDecimal(item.token_flow[0].amount.$numberDecimal, tokens[tokenSpent[0]].decimals);

        let tokenReceived;
        let tokenReceivedCount;

        if (item.token_flow.length > 1) {
            tokenReceived = Object.entries(CONTRACT_ADRESESS).find(item_loc => item_loc[1].toLocaleLowerCase() === item.token_flow[1].token.toLowerCase());
            tokenReceivedCount = formatFromDecimal(item.token_flow[1].amount.$numberDecimal, tokens[tokenReceived[0]].decimals);
        }

        else {
            tokenReceived = "0"
            tokenReceivedCount = "0"
        }

        return (
            <li key={_ind}>
                <h5> fgdsa </h5>
                <span> <TokenIcon iconName={tokenSpent[0]}/> <p> fgdsa </p> </span>
                <h5> for </h5>
                {item.token_flow.length > 1 ?
                    <span> <TokenIcon iconName={tokenReceived[0]}/> <p> {tokenReceived[0]} : {tokenReceivedCount} </p> </span>
                    :
                    null
                }
            </li>
        )
    })}
</ul> */}