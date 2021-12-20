import React, { useContext, useEffect, useState } from 'react';
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core';
import { NoEthereumProviderError, UserRejectedRequestError } from '@web3-react/injected-connector';
import {DEX_ADDRESESS, metaMask, network} from './constants';
import ERC20_ABI from './abi/ERC20.json';
import ROUTER_ABI from './abi/Router.json';
import TREASURY_ABI from './abi/TREASURY.json';
import STABLE_ABI from './abi/STABLE.json';
import SHARE_ABI from './abi/SHARE.json';
import STABLE_POOL_ABI from './abi/STABLE_POOL.json';
import MASTER_CHEF_ABI from './abi/MasterChef.json';
import TOKEN_ORACLE_ABI from './abi/TOKEN_ORACLE.json';
import { CONTRACT_ADRESESS } from './constants';
import { formatFromDecimal } from './utils/helpers';
import { message } from 'antd';
import { ethErrors } from 'eth-rpc-errors'
import { EthereumRpcError, EthereumProviderError } from 'eth-rpc-errors'
import {useQuery} from "@apollo/client";
import {TOKENS_FOR_USER_BALANCES} from "./api/client";


const SystemContext = React.createContext();
export const useSystemContext = () => useContext(SystemContext);

export const SystemProvider = ({children}) => {

    const {account, activate, active, library, deactivate} = useWeb3React();

    const [theme, setTheme] = useState(localStorage.getItem('theme') || "dark");

    const [mintRedeemCurrency, setMintRedeemCurrency] = useState("AGOUSD");
    const [mintRedeemCurrencyModal, setMintRedeemCurrencyModal] = useState(false);

    const [tokens, setTokens] = useState(null);
    const [contracts, setContracts] = useState(null);

    const [userProtfolio, setUserPortfolio] = useState(null);
    const [isWalletModal, setIsWalletModal] = useState(false);

    const [mintRedeemInfo, setMintRedeemInfo] = useState(null);
    const [mintRedeemSlipage, setMintRedeemSlipage] = useState(3);

    const [loading, setLoading] = useState(true);

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



    // useEffect(() => {
    //
    //     if (error instanceof UnsupportedChainIdError ) {
    //         message.error({content: "You choose wrong network in your wallet please change it to Polygon Mainnet", key: "NETWORK", className: "ant-argano-message", duration: 3000})
    //     }
    //     else {
    //         message.success({content: "Success!", key: "NETWORK", className: "ant-argano-message", duration: 3})
    //     }
    //
    //
    // }, [error])

    // 2. Inits contracts and tokens not-depend if user connected or not.
    useEffect(() => {
        if (active && !tokens && !contracts) {
            try {
                initTokens();
                initContracts();
            }

            catch(e) {
                alert("Some error due init tokens and contracts");
            }

        }
    }, [active])

    useEffect(() => {

        if (contracts && tokens) {
            if (account) {
                try {
                    getUserPortfolio();
                    setLoading(false);
                }

                catch(e) {
                    alert("Some error due get user portfolio!")
                }
                
                
            }
            else {
                setLoading(false);
            }
        }

    }, [account, contracts, tokens])

    useEffect(() => {

        if (userProtfolio) {
            setLoading(false);
        }


    }, [userProtfolio])


    const initTokens = async () => {

        const AGO = new library.eth.Contract(ERC20_ABI, CONTRACT_ADRESESS.AGO);
        const AGOUSD = new library.eth.Contract(STABLE_ABI, CONTRACT_ADRESESS.AGOUSD);
        const AGOBTC = new library.eth.Contract(STABLE_ABI, CONTRACT_ADRESESS.AGOBTC);
        const CNUSD = new library.eth.Contract(SHARE_ABI, CONTRACT_ADRESESS.CNUSD);
        const CNBTC = new library.eth.Contract(SHARE_ABI, CONTRACT_ADRESESS.CNBTC);
        const USDT = new library.eth.Contract(ERC20_ABI, CONTRACT_ADRESESS.USDT);
        const USDC = new library.eth.Contract(ERC20_ABI, CONTRACT_ADRESESS.USDC);
        const DAI = new library.eth.Contract(ERC20_ABI, CONTRACT_ADRESESS.DAI);
        const WMATIC = new library.eth.Contract(ERC20_ABI, CONTRACT_ADRESESS.WMATIC);
        const WBTC = new library.eth.Contract(ERC20_ABI, CONTRACT_ADRESESS.WBTC)


        setTokens({
            AGOBTC: {name: "AGOBTC",instance: AGOBTC, decimals: await AGOBTC.methods.decimals().call(), totalSupply: await AGOBTC.methods.totalSupply().call()},
            CNBTC: {name: "CNBTC",instance: CNBTC, decimals: await CNBTC.methods.decimals().call(), totalSupply: await CNBTC.methods.totalSupply().call()},
            AGOUSD: {name: "AGOUSD",instance: AGOUSD, decimals: await AGOUSD.methods.decimals().call(), totalSupply: await AGOUSD.methods.totalSupply().call()},
            CNUSD: {name: "CNUSD",instance: CNUSD, decimals: await CNUSD.methods.decimals().call(), totalSupply: await CNUSD.methods.totalSupply().call()},
            AGO: {name: "AGO",instance: AGO, decimals: await AGO.methods.decimals().call(), totalSupply: await AGO.methods.totalSupply().call()},
            USDT: {name: "USDT",instance: USDT, decimals: await USDT.methods.decimals().call(), totalSupply: await USDT.methods.totalSupply().call()},
            WMATIC: {name: "WMATIC",instance: WMATIC, decimals: await WMATIC.methods.decimals().call(), totalSupply: await WMATIC.methods.totalSupply().call()},
            WBTC: {name: "WBTC",instance: WBTC, decimals: await WBTC.methods.decimals().call(), totalSupply: await WBTC.methods.totalSupply().call()}
        });

    }

    const initContracts = () => {
        const POOL_AGOUSD = new library.eth.Contract(STABLE_POOL_ABI, CONTRACT_ADRESESS.POOL_AGOUSD);
        const TREASURY_AGOUSD = new library.eth.Contract(TREASURY_ABI, CONTRACT_ADRESESS.TREASURY_AGOUSD);
        const POOL_AGOBTC = new library.eth.Contract(STABLE_POOL_ABI, CONTRACT_ADRESESS.POOL_AGOBTC);
        const TREASURY_AGOBTC = new library.eth.Contract(TREASURY_ABI, CONTRACT_ADRESESS.TREASURY_AGOBTC);
        const ROUTER = new library.eth.Contract(ROUTER_ABI, DEX_ADDRESESS.ROUTER)
        const MASTER_CHEF = new library.eth.Contract(MASTER_CHEF_ABI, CONTRACT_ADRESESS.MASTER_CHEF);
        // setContracts({POOL_AGOUSD, TREASURY_AGOUSD, POOL_AGOBTC, TREASURY_AGOBTC});
        setContracts({ROUTER, POOL_AGOUSD, TREASURY_AGOUSD, POOL_AGOBTC, TREASURY_AGOBTC, MASTER_CHEF})
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

    const getUserPortfolio = async () => {

        const balances = Object.entries(tokens).map(async (item) => {

            const obj = {
                name: item[0],
                userNativeBalance: await item[1].instance.methods.balanceOf(account).call(),
                decimals: await item[1].instance.methods.decimals().call()
            }

            obj.userNativeBalance = parseInt(formatFromDecimal(obj.userNativeBalance, obj.decimals))
            // obj.userUsdBalance = parseInt(obj.userNativeBalance) * usdBalance[MOCK_PRICE_ADDRESS[item[0]]].usd

            if (item[0].startsWith("AGO")) {
                obj.color = "#40BA93"
            }
            else if (item[0].startsWith("CN")) {
                obj.color = "#EFBF14"
            }
            else {
                obj.color = "#B3362A"
            }

            return obj
        })

        setUserPortfolio(await Promise.all(balances));

    }

    const getTokenBalance = (name) => {
        return parseFloat(userProtfolio.find((item) => item.name === name).userNativeBalance).toFixed(2)
    }

    const systemValue = {
        theme,
        setTheme,
        mintRedeemCurrencyModal,
        setMintRedeemCurrencyModal,
        mintRedeemCurrency,
        getTokenBalance,
        setMintRedeemCurrency,
        connectWallet,
        disconnectWallet,
        loading,
        isWalletModal,
        setIsWalletModal,
        tokens,
        contracts,
        userProtfolio,
        mintRedeemSlipage,
        setMintRedeemSlipage,
        mintRedeemInfo,
    }

    return (
        <SystemContext.Provider value={systemValue}> 
            {children}
        </SystemContext.Provider>
    )
}