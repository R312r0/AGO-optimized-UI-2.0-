import { InjectedConnector } from '@web3-react/injected-connector';
import { NetworkConnector } from '@web3-react/network-connector';
import { styled } from 'styled-components';
// Dark theme icons.
import dashboard_black from './assets/icons/nav-links/dark-theme/dashboard-black.svg';
import mint_redeem_black from './assets/icons/nav-links/dark-theme/mint-redeem-black.svg';
import foundry_black from './assets/icons/nav-links/dark-theme/foundry-active.svg';
import staking_black from './assets/icons/nav-links/dark-theme/staking-black.svg';
import liquidity_pools_black from './assets/icons/nav-links/dark-theme/liquidity-pools-black.svg';
import trading_black from './assets/icons/nav-links/dark-theme/trading-black.svg';
import accounts_black from './assets/icons/nav-links/dark-theme/accounts-black.svg';
// Light theme icons.


//component svg

import { ReactComponent as Dashboard_black } from './assets/icons/nav-links/dark-theme/dashboard-black.svg';
import { ReactComponent as Mint_redeem_black } from './assets/icons/nav-links/dark-theme/mint-redeem-black.svg';
import { ReactComponent as Foundry_black } from './assets/icons/nav-links/dark-theme/foundry-active.svg';
import { ReactComponent as Staking_black } from './assets/icons/nav-links/dark-theme/staking-black.svg';
import { ReactComponent as Liquidity_pools_black } from './assets/icons/nav-links/dark-theme/liquidity-pools-black.svg';
import { ReactComponent as Trading_black } from './assets/icons/nav-links/dark-theme/trading-black.svg';
import { ReactComponent as Accounts_black } from './assets/icons/nav-links/dark-theme/accounts-black.svg';

// Active icons.
import dashboard_active from './assets/icons/nav-links/active/dashboard-active.svg';
import mint_redeem_active from './assets/icons/nav-links/active/mint-redeem-active.svg';
import foundry_active from './assets/icons/nav-links/active/foundry-active.svg';
import staking_active from './assets/icons/nav-links/active/staking-active.svg';
import liquidity_pools_active from './assets/icons/nav-links/active/liq-pools-active.svg';
import trading_active from './assets/icons/nav-links/active/trading-active.svg';
import accounts_acitve from './assets/icons/nav-links/active/accounts-active.svg';
import { LoadingOutlined } from "@ant-design/icons";

// User txs icons
import lateralArrowsIcon from './assets/icons/lateral-arrows-history.svg';
import downloadIcon from './assets/icons/download-history.svg'
import downArrowIcon from './assets/icons/down-arrow-history.svg';
import lockIcon from './assets/icons/lock-history.svg';
import documentIcon from './assets/icons/document-history.svg';


export const COINGECKO_IDS = {
    AGO: "uniswap",
    AGOUSD: "tether",
    CNUSD: "usd-coin",
    AGOBTC: "wrapped-bitcoin",
    CNBTC: "adamant",
    WMATIC: "wmatic",
    USDT: "tether",
    WBTC: "wrapped-bitcoin",
}

export const DEX_ADDRESESS = {
    FACTORY: "0xDAB3117a88082B3ED8a07f0e0363c033d41E3fBF",
    ROUTER: "0x4332F8C0616f5449FDDbB654460bc45029BAb484",
}

export const CONTRACT_ADRESESS = {

    FOUNDRY_AGOUSD: "0xC29e189A350B28353fC24Fe07a59B7154494cBB4",
    POOL_AGOUSD: "0xaC8034DAFF3fb9FAbB28d8730D920eE03d8aa9fb",
    TREASURY_AGOUSD: "0xA4f3664fc835cb44C83029347F6AF2A2ED6F65fF",

    USDT: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
    AGOUSD: "0xA996135C16AD3d8689127C167A62Dfa0586f9746",
    CNUSD: "0x794adF01EB99B1Bfd7d598Ac908bfA7bdba07592",

    WMATIC: "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270",

    WBTC: "0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6",
    AGOBTC: "0x79E2b283D24117E740627D960C767Fd7658F20b2",
    CNBTC: "0xe75E5186CC972b14d154a8Db2c515c6d9Cfd137E",

    FOUNDRY_AGOBTC: "0xE479a5dd333f5cFE7baf45b893B9B0a6F8b898c0",
    POOL_AGOBTC: "0xF50D96Ea44FAE5dc472272F5793a17CD8ECD51B5",
    TREASURY_AGOBTC: "0xb4b468a05c9392937Cd9D7f01cC40dEc0137A7F4",
}


export const SINGLE_STAKING_POOL = [
    {name: "AGO", address: "0x4bDDb9BCf1b268d8F6C1273a889f3452f3F9D003"},
    // {name: "AGOUSD", address: ""},
    // {name: "AGOBTC", address: "0x360239EE2776f23CE01E40799Ff7768D1aaC0060"}
]

export const LP_STAKING_POOL = [
    {name: "AGOUSD-USDT", address: "0x3B9B897DE879b09292267ae08137EC1C854AD34D"},
    // {},
    // {},
    // {}
]


export const LOADER_INDICATOR =             <LoadingOutlined 
style={{ 
    fontSize: "7vw",
    color: "#40BA93",
    position: "absolute",
    top: "50%", left: "50%"
}} />    

export const LOADER_INDICATOR_LOCAL = <LoadingOutlined style={{ fontSize: "3vw", color: "#40BA93", position: "absolute", top: "50%", left: "50%" }} />

// Connectors
export const metaMask = new InjectedConnector({ supportedChainIds: [137] });
export const network = new NetworkConnector({ urls: { 137: "https://polygon-rpc.com/" }, defaultChainId: 137 })

// Message keys
export const MINT_REDEEM_KEY = "MINT_REDEEM_KEY";

// Other
export const MAX_INT = '115792089237316195423570985008687907853269984665640564039457584007913129639935';

export const PAGES = [
    { path: "/", name: "Dashboard", img: dashboard_black, imgActive: dashboard_active, component: Dashboard_black },
    { path: "/mint-redeem", name: "Mint/Redeem", img: mint_redeem_black, imgActive: mint_redeem_active, component: Mint_redeem_black },
    { path: "/foundry", name: "Foundry", img: foundry_black, imgActive: foundry_active, component: Foundry_black },
    { path: "/staking", name: "Staking rewards", img: staking_black, imgActive: staking_active, component: Staking_black },
    { path: "/liqudity-pools", name: "Liquidity-Pools", img: liquidity_pools_black, imgActive: liquidity_pools_active, component: Liquidity_pools_black },
    { path: "/trading", name: "Trading", img: trading_black, imgActive: trading_active, component: Trading_black },
    { path: "/accounts", name: "Accounts", img: accounts_black, imgActive: accounts_acitve, component: Accounts_black },
]

export const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

export const TXS_NAME = {
    SWAP: "Swap",
    ADD: "Add liquidity",
    BURN: "Remove liquidity",
    MINT: "Mint",
    REDEEM: "Redeem",
    COLLECT_REDEMPTION: "Collect redemption",
    STAKE: "Stake",
    UNSTAKE: "Unstake"
}

export const TXS_ICONS = {
    SWAP: lateralArrowsIcon,
    ADD: downloadIcon,
    BURN: downArrowIcon,
    MINT: downloadIcon,
    REDEEM: documentIcon,
    COLLECT_REDEMPTION: downloadIcon,
    STAKE: lockIcon,
    UNSTAKE: downArrowIcon
}