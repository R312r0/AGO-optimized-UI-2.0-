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
        <div className={`acc-hisotry ${isOpened ? " acc-history-opened" : ""} ${theme === "light" ? " acc-history-light" : ""}`}>
            <main>
                <div className='acc-hisotry-header'>
                    <div className='acc-hisotry-heading'>
                        <a href="#" onClick={() => setIsOpened(false)}> <i className="fas fa-chevron-left"/> Account </a>
                        <h1> History </h1>
                    </div>
                    <div className='search__input'>
                        <input type="text" placeholder="Filter by Address, Protocol, Asset, Type"/>
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M4.21136 11.867C3.06466 10.3886 2.52424 8.52895 2.70003 6.66627C2.87582 4.80359 3.75462 3.07785 5.15765 1.84012C6.56069 0.602389 8.38255 -0.0543441 10.2526 0.00352345C12.1227 0.061391 13.9004 0.829512 15.2243 2.15162C16.5492 3.47465 17.3199 5.25311 17.3791 7.12459C17.4384 8.99607 16.7818 10.8197 15.5432 12.2239C14.3045 13.6281 12.5771 14.5071 10.7128 14.6819C8.84858 14.8567 6.98785 14.314 5.50981 13.1645L5.47027 13.2059L1.56941 17.1077C1.48397 17.1931 1.38254 17.2609 1.27091 17.3071C1.15928 17.3534 1.03963 17.3772 0.918804 17.3772C0.797976 17.3772 0.678329 17.3534 0.5667 17.3071C0.455069 17.2609 0.353638 17.1931 0.2682 17.1077C0.18276 17.0223 0.114988 16.9208 0.0687504 16.8092C0.0225105 16.6976 -0.00128937 16.5779 -0.00128937 16.4571C-0.00128937 16.3363 0.0225105 16.2166 0.0687504 16.105C0.114988 15.9934 0.18276 15.8919 0.2682 15.8065L4.16998 11.9056C4.18342 11.8924 4.19722 11.8795 4.21136 11.867ZM6.12041 3.45283C5.60122 3.96364 5.1883 4.57219 4.90546 5.24338C4.62263 5.91457 4.47549 6.63512 4.47252 7.36346C4.46956 8.0918 4.61083 8.81352 4.88818 9.48699C5.16554 10.1605 5.57349 10.7724 6.08851 11.2874C6.60353 11.8024 7.21543 12.2103 7.8889 12.4877C8.56237 12.7651 9.28409 12.9063 10.0124 12.9034C10.7408 12.9004 11.4613 12.7533 12.1325 12.4704C12.8037 12.1876 13.4123 11.7747 13.9231 11.2555C14.9439 10.2179 15.5133 8.81899 15.5074 7.36346C15.5015 5.90793 14.9206 4.5137 13.8914 3.48447C12.8622 2.45525 11.468 1.87441 10.0124 1.86848C8.5569 1.86256 7.15799 2.43202 6.12041 3.45283Z" fill="#40524C"/>
                        </svg>
                    </div>
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