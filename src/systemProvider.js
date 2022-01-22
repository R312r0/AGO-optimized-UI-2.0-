import React, { useContext, useEffect, useState } from 'react';
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core';

// ABIS
import ERC20_ABI from './abi/ERC20.json';
import ROUTER_ABI from './abi/Router.json';
import TREASURY_ABI from './abi/TREASURY.json';
import FOUNDRY_ABI from './abi/Foundry.json';
import STABLE_POOL_ABI from './abi/STABLE_POOL.json';
import CHAINLINK_ORACLE_ABI from './abi/OracleChainLink.json';

import { CONTRACT_ADRESESS, DEX_ADDRESESS, metaMask, network } from './constants';
import { formatFromDecimal } from './utils/helpers';
import { message } from 'antd';
import { useDataContext } from './dataProvider';


const SystemContext = React.createContext();
export const useSystemContext = () => useContext(SystemContext);

export const SystemProvider = ({ children }) => {

    const { account, activate, active, library, deactivate, error } = useWeb3React();

    const [contracts, setContracts] = useState(null);
    const [balances, setBalances] = useState(null);

    const [isWalletModal, setIsWalletModal] = useState(false);

    const { tokens } = useDataContext();

    const [mintRedeemCurrencyModal, setMintRedeemCurrencyModal] = useState(false);

    const [stakingPools, setStakingPools] = useState(null);

    const [web3Loading, setWeb3Loading] = useState(true);

    const [approveDataForModal, setApproveDataForModal] = useState(null);
    const [approveModal, setApproveModal] = useState(false);

    // 1. Check if user are already connected trough MetaMask if yes then connect him again.
    useEffect(() => {
        metaMask.isAuthorized()
            .then((res) => {
                if (res) {
                    try {
                        activate(metaMask);
                    }
                    catch (e) {
                        alert("Some error due activate")
                    }

                }
                else {
                    try {
                        activate(network);
                    }

                    catch (e) {
                        alert("Some error due activate")
                    }

                }
            })
    }, [])


    useEffect(() => {

        if (error instanceof UnsupportedChainIdError) {
            message.error({ content: "You choose wrong network in your wallet please change it to Polygon Mainnet", key: "NETWORK", className: "ant-argano-message", duration: 3000 })
        }
        else {
            message.success({ content: "Success!", key: "NETWORK", className: "ant-argano-message", duration: 3 })
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

            catch (e) {
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

        const WETH = new library.eth.Contract(ERC20_ABI, "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619");
        const POOL_AGOUSD = new library.eth.Contract(STABLE_POOL_ABI, CONTRACT_ADRESESS.POOL_AGOUSD);
        const TREASURY_AGOUSD = new library.eth.Contract(TREASURY_ABI, CONTRACT_ADRESESS.TREASURY_AGOUSD);
        const FOUNDRY_AGOUSD = new library.eth.Contract(FOUNDRY_ABI, CONTRACT_ADRESESS.FOUNDRY_AGOUSD);
        const POOL_AGOBTC = new library.eth.Contract(STABLE_POOL_ABI, CONTRACT_ADRESESS.POOL_AGOBTC);
        const TREASURY_AGOBTC = new library.eth.Contract(TREASURY_ABI, CONTRACT_ADRESESS.TREASURY_AGOBTC);
        const FOUNDRY_AGOBTC = new library.eth.Contract(FOUNDRY_ABI, CONTRACT_ADRESESS.FOUNDRY_AGOBTC);
        const ROUTER = new library.eth.Contract(ROUTER_ABI, DEX_ADDRESESS.ROUTER)
        const QUICKSWAP_ROUTER = new library.eth.Contract(ROUTER_ABI, DEX_ADDRESESS.QUICK_ROUTER);
        const USDT_CHAINLINK = new library.eth.Contract(CHAINLINK_ORACLE_ABI, CONTRACT_ADRESESS.USDT_CHAINLINK);
        const WBTC_CHAINLINK = new library.eth.Contract(CHAINLINK_ORACLE_ABI, CONTRACT_ADRESESS.WBTC_CHAINLINK);


        setContracts({ ...tokensContractsObj, USDT_CHAINLINK, WBTC_CHAINLINK, QUICKSWAP_ROUTER, WETH, ROUTER, POOL_AGOUSD, TREASURY_AGOUSD, POOL_AGOBTC, TREASURY_AGOBTC, FOUNDRY_AGOUSD, FOUNDRY_AGOBTC })
    }

    const getUserPortfolio = async () => {

        const balancesResult = tokens.filter((item) => item.isProtocolMain).map(async (item) => {

            const tokenContract = contracts[item.symbol];
            const nativeBalance = parseFloat(formatFromDecimal(await tokenContract.methods.balanceOf(account).call(), item.decimals));
            const usdBalance = nativeBalance * item.priceUSD;

            return { symbol: item.symbol, nativeBalance, usdBalance };

        })

        const res = await Promise.all(balancesResult)

        res.sort((a, b) => {
            if (a.symbol < b.symbol) { return -1; }
            if (a.symbol > b.symbol) { return 1; }
            return 0;
        })

        setBalances(res)
    }

    const changeTokenBalance = (operations) => {

        let balancesArr = [...balances];

        operations.forEach((item) => {

            let findedIndex = balancesArr.findIndex(bal => bal.symbol === item.name);

            if (findedIndex === -1) {
                return;
            }

            else {
                let balCopy = { ...balancesArr[findedIndex] }

                if (item.sub) {
                    balCopy.nativeBalance -= parseFloat(item.amount)
                }

                else {
                    balCopy.nativeBalance += parseFloat(item.amount)
                }

                balCopy.usdBalance = balCopy.nativeBalance * tokens.find((itemTok) => itemTok.symbol === item.name).priceUSD;
                balancesArr[findedIndex] = balCopy;
            }
        })

        balancesArr.sort((a, b) => {
            if (a.symbol < b.symbol) { return -1; }
            if (a.symbol > b.symbol) { return 1; }
            return 0;
        });

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
        changeTokenBalance,
        approveModal,
        setApproveModal,
        approveDataForModal,
        setApproveDataForModal
    }

    return (
        <SystemContext.Provider value={systemValue}>
            {children}
        </SystemContext.Provider>
    )
}