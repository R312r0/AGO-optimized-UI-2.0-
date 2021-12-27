import React, { useContext, useEffect, useState } from 'react';
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core';
import { NoEthereumProviderError, UserRejectedRequestError } from '@web3-react/injected-connector';
import {DEX_ADDRESESS, metaMask, network} from './constants';
import ERC20_ABI from './abi/ERC20.json';
import ROUTER_ABI from './abi/Router.json';
import TREASURY_ABI from './abi/TREASURY.json';
import FOUNDRY_ABI from './abi/Foundry.json';
import STABLE_ABI from './abi/STABLE.json';
import SHARE_ABI from './abi/SHARE.json';
import STABLE_POOL_ABI from './abi/STABLE_POOL.json';
import MASTER_CHEF_ABI from './abi/MasterChef.json';
import TOKEN_ORACLE_ABI from './abi/TOKEN_ORACLE.json';
import { CONTRACT_ADRESESS } from './constants';
import { formatFromDecimal } from './utils/helpers';
import { message, Spin } from 'antd';
import { ethErrors } from 'eth-rpc-errors'
import { EthereumRpcError, EthereumProviderError } from 'eth-rpc-errors'
import {useQuery} from "@apollo/client";
import {TOKENS} from "./api/client";
import { useDataContext } from './dataProvider';
import { LOADER_INDICATOR_GLOBAL } from './constants';

const SystemContext = React.createContext();
export const useSystemContext = () => useContext(SystemContext);

export const SystemProvider = ({children}) => {

    const {account, activate, active, library, deactivate, error} = useWeb3React();

    const [contracts, setContracts] = useState(null);
    const [balances, setBalances] = useState(null);

    const [isWalletModal, setIsWalletModal] = useState(false);

    const {tokens} = useDataContext();

    const [mintRedeemCurrencyModal, setMintRedeemCurrencyModal] = useState(false);

    const [web3Loading, setWeb3Loading] = useState(true);

    // 1. Check if user are already connected trough MetaMask if yes then connect him again.
    useEffect(() => {
        metaMask.isAuthorized()
        .then((res) => {
            if (res) {
                try {
                    activate(metaMask);
                }
                catch(e) {
                    alert("Some error due activate")
                }
                
            }
            else {
                try {
                    activate(network);
                }

                catch(e) {
                    alert("Some error due activate")
                }
                
            }
        })
    }, [])


    useEffect(() => {
    
        if (error instanceof UnsupportedChainIdError ) {
            message.error({content: "You choose wrong network in your wallet please change it to Polygon Mainnet", key: "NETWORK", className: "ant-argano-message", duration: 3000})
        }
        else {
            message.success({content: "Success!", key: "NETWORK", className: "ant-argano-message", duration: 3})
        }
    
    
    }, [error])

    useEffect(() => {

        if (active) {
            setWeb3Loading(false);
        }

    }, [active])

    // 2. Inits contracts and tokens not-depend if user connected or not.
    useEffect(() => {
        if (active && tokens && !contracts) {
            try {
                // initTokens();
                initContracts();
            }

            catch(e) {
                alert("Some error due init tokens and contracts");
            }

        }
    }, [active, tokens])

    useEffect(() => {

        if (contracts && tokens && account) {
            getUserPortfolio();
        }

    }, [account, contracts, tokens])

    const initContracts = () => {

        const tokensContractsObj = Object.fromEntries(tokens.map((item) => {
            return [item.symbol, new library.eth.Contract(ERC20_ABI, item.address)];
        }))

        const POOL_AGOUSD = new library.eth.Contract(STABLE_POOL_ABI, CONTRACT_ADRESESS.POOL_AGOUSD);
        const TREASURY_AGOUSD = new library.eth.Contract(TREASURY_ABI, CONTRACT_ADRESESS.TREASURY_AGOUSD);
        const FOUNDRY_AGOUSD = new library.eth.Contract(FOUNDRY_ABI, CONTRACT_ADRESESS.FOUNDRY_AGOUSD);
        const POOL_AGOBTC = new library.eth.Contract(STABLE_POOL_ABI, CONTRACT_ADRESESS.POOL_AGOBTC);
        const TREASURY_AGOBTC = new library.eth.Contract(TREASURY_ABI, CONTRACT_ADRESESS.TREASURY_AGOBTC);
        const FOUNDRY_AGOBTC = new library.eth.Contract(FOUNDRY_ABI, CONTRACT_ADRESESS.FOUNDRY_AGOBTC);
        const ROUTER = new library.eth.Contract(ROUTER_ABI, DEX_ADDRESESS.ROUTER)
        const MASTER_CHEF = new library.eth.Contract(MASTER_CHEF_ABI, CONTRACT_ADRESESS.MASTER_CHEF);
        

        setContracts({ ...tokensContractsObj, ROUTER, POOL_AGOUSD, TREASURY_AGOUSD, POOL_AGOBTC, TREASURY_AGOBTC, MASTER_CHEF, FOUNDRY_AGOUSD, FOUNDRY_AGOBTC})
    }

    const getUserPortfolio = async () => {

        const filterTokens = tokens.filter(token => token.isProtocolMain);

        const balancesResult = filterTokens.map(async (item) => {

            const tokenContract = contracts[item.symbol];
            const nativeBalance = parseFloat(formatFromDecimal(await tokenContract.methods.balanceOf(account).call(), item.decimals));
            const usdBalance = nativeBalance * item.priceUSD;
            
            return {symbol: item.symbol, nativeBalance, usdBalance};

        })

        setBalances(await Promise.all(balancesResult))

    }

    const changeTokenBalance = (tokenName, amount, sub) => {

        let balancesArr = balances;
        let findedIndex = balancesArr.findIndex(item => item.symbol === tokenName);

        let item = balancesArr[findedIndex];

        if (sub) {
            item.nativeBalance -= parseFloat(amount)
        }
        else {
            item.nativeBalance += parseFloat(amount) 
        }
        
        item.usdBalance = item.nativeBalance * tokens.find((itemTok) => itemTok.symbol === tokenName);
        balancesArr[findedIndex] = item;
        setBalances(balancesArr);

    }

    const connectWallet = (wallet) => {

        switch (wallet) {
            case "MetaMask":
                activate(metaMask);
                localStorage.setItem('connected Wallet', wallet);
                break;
            default: 
                activate(network);
                localStorage.setItem('connected Wallet', wallet);
                break;
        }
        setIsWalletModal(false)

    }

    const disconnectWallet = () => {
        deactivate();
        activate(network);
    }

    const systemValue = {
        connectWallet,
        mintRedeemCurrencyModal,
        setMintRedeemCurrencyModal,
        disconnectWallet,
        isWalletModal,
        setIsWalletModal,
        tokens,
        contracts,
        balances,
        web3Loading,
        changeTokenBalance
    }

    return (
        <SystemContext.Provider value={systemValue}> 
            {children}
        </SystemContext.Provider>
    )
}