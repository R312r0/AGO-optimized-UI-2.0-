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
    FACTORY: "0x455E6079BEd492DEE0C332A894089AE823C43558",
    ROUTER: "0x7C223368aF85fcabF01F99cC248FC892c63068B2",
}

export const CONTRACT_ADRESESS = {
    AGO: "0x9bbb8B243748B2D0336d07391D6f7756cce33DcC",

    AGOUSD: "0x3b5a134F4e6feD26eDA6c19821aA43Ef0E2741e3",
    CNUSD: "0xbaa24609E48758Bf26A81559F7268a353cA2D9AB",

    AGOBTC: "0x4128DC1288cA0e9FFcCB35FbE9f0044e39401325",
    CNBTC: "0x446033Cc8b6D73A655D6F4361d5fd9309FeC0039",

    WMATIC: "0x4020825Cf63C4Df2153ae2F61FbB2f4294f5D271",
    USDT: "0x7446A191F2684531bF844E30d0ba1cD0091BEC7a",
    USDC: "0xD35BbaB1A4098da2018b66885e0aB0E7BD058C41",
    DAI: "0x5ae7F397d7Bb0f999bb2B9b12AfB1Cb09FE45E98",
    WBTC: "0x1391a8E7ef9dF2dd772Bb5d6074168988b278E2E",

    FOUNDRY_AGOUSD: "0x9e56F6C5299daF0A625b45f4Ba37D09D4ADd886b",
    POOL_AGOUSD: "0xDd6f1b8478f64FC6469978DEA030eE1b686c16D7",
    TREASURY_AGOUSD: "0x61669855E45d04Cc92D8Abc4ed16feCA3CE1Dc71",

    FOUNDRY_AGOBTC: "0x90f2FB337c2Bf07FEBE1ED96986EDa1f88314182",
    POOL_AGOBTC: "0x9D5d0F0929A69E6d09254313E4258710093d4563",
    TREASURY_AGOBTC: "0x54aFD712090288013E3EBCbbae8520268092D11f",

    MASTER_CHEF: "0x1948846B480aB6bD02e6aF6B30c926F277101a88"
}



export const LOADER_INDICATOR =             <LoadingOutlined 
style={{ 
    fontSize: "7vw",
    color: "#40BA93",
    position: "absolute",
    top: "50%", left: "50%"
}} />    

export const LOADER_INDICATOR_LOCAL = <LoadingOutlined style={{ fontSize: "3vw", color: "#40BA93", position: "absolute", top: "50%", left: "50%" }} />

// Connectors
export const metaMask = new InjectedConnector({ supportedChainIds: [80001] });
export const network = new NetworkConnector({ urls: { 80001: "https://rpc-mumbai.maticvigil.com/" }, defaultChainId: 80001 })

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