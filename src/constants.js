import { InjectedConnector } from '@web3-react/injected-connector';
import { NetworkConnector } from '@web3-react/network-connector';
// Dark theme icons.
import dashboard_black from './assets/icons/nav-links/dark-theme/dashboard-black.svg';
import mint_redeem_black from './assets/icons/nav-links/dark-theme/mint-redeem-black.svg';
import foundry_black from './assets/icons/nav-links/dark-theme/foundry-active.svg';
import staking_black from './assets/icons/nav-links/dark-theme/staking-black.svg';
import liquidity_pools_black from './assets/icons/nav-links/dark-theme/liquidity-pools-black.svg';
import trading_black from './assets/icons/nav-links/dark-theme/trading-black.svg';
import accounts_black from './assets/icons/nav-links/dark-theme/accounts-black.svg';
// Light theme icons.

// Active icons.
import dashboard_active from './assets/icons/nav-links/active/dashboard-active.svg';
import mint_redeem_active from './assets/icons/nav-links/active/mint-redeem-active.svg';
import foundry_active from './assets/icons/nav-links/active/foundry-active.svg';
import staking_active from './assets/icons/nav-links/active/staking-active.svg';
import liquidity_pools_active from './assets/icons/nav-links/active/liq-pools-active.svg';
import trading_active from './assets/icons/nav-links/active/trading-active.svg';
import accounts_acitve from './assets/icons/nav-links/active/accounts-active.svg';
import {LoadingOutlined} from "@ant-design/icons";



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
    FACTORY: "0xD97c98cCe28353a2EfbB41b9f13B3a7229b02b92",
    ROUTER: "0xc44De2adc61909F27877fcDC6D467ec1D886ef56",
}

export const CONTRACT_ADRESESS = {
    AGO: "0x4712D01F889FFc0e729a9B7E6228F4B6c3ec5Daa",

    AGOUSD: "0x3295a41Bb929dCE32CC4598b8B6a1A032E72E1c0",
    CNUSD: "0x7F4709a14ff74184db51b50d27c11fC9e4A59C02",

    AGOBTC: "0x3Ca12532Ca8F65C2C296729514170c5146548bAF",
    CNBTC: "0x83FaC28Ee84D1A4018f836C40E4e87baF7E3A7fC",

    WMATIC: "0xf86e9D05e5465EE287D898BE4CaFBcA8dc49c752",
    USDT: "0x7A15b47b851Cd24aBbC2A6d11c12C94185DCCFB1",
    USDC: "0x8beADf271aDfc20c11Fc02FbC645728885a4E2c4",
    DAI: "0x5E06D8eed6FBbfDeB3bFd56007Df2a134d329364",
    WBTC: "0x42ab48a1A6D356661EC72F7AB0E0Ec7F4631fBE0",

    FOUNDRY_AGOUSD: "0xECA969cc98223eDbDF7E45758B381A04560A21e9",
    POOL_AGOUSD: "0x3EEfC50453Fa7EBDcA08623196c9aDa6678f4245",
    TREASURY_AGOUSD: "0xBdcD2775aaA8d508Bfdc9628440E6B77CC687407",

    FOUNDRY_AGOBTC: "0x2486A114BC98187e0d0921Ea944B419ee950117f",
    POOL_AGOBTC: "0x7c2f93fBE7ec3ee75778D013bb813478efe22b64",
    TREASURY_AGOBTC: "0x4ba0780Eb663BceDC58d1C18b0b08c920ea5D08f",

    MASTER_CHEF: "0xe3b49f1382e146b6C2c7E497d4A32b39D2AD07B6"
}


export const LOADER_INDICATOR = <LoadingOutlined style={{fontSize: "7vw", color: "#40BA93", position: "fixed", top: "50%", left: "50%"}}/>

export const LOADER_INDICATOR_LOCAL = <LoadingOutlined style={{fontSize: "3vw", color: "#40BA93", position: "absolute", top: "50%", left: "50%"}}/>

// Connectors
export const metaMask = new InjectedConnector({ supportedChainIds: [80001] });
export const network = new NetworkConnector({ urls: { 80001: "https://rpc-mumbai.maticvigil.com/" }, defaultChainId: 80001 })

// Message keys
export const MINT_REDEEM_KEY = "MINT_REDEEM_KEY";

// Other
export const MAX_INT = '115792089237316195423570985008687907853269984665640564039457584007913129639935';

export const PAGES = [
    {path: "/", name: "Dashboard", img: dashboard_black, imgActive: dashboard_active},
    {path: "/mint-redeem", name: "Mint/Redeem", img: mint_redeem_black, imgActive: mint_redeem_active},
    {path: "/foundry", name: "Foundry", img: foundry_black, imgActive: foundry_active},
    {path: "/staking", name: "Staking rewards", img: staking_black, imgActive: staking_active},
    {path: "/liqudity-pools", name: "Liquidity-Pools", img: liquidity_pools_black, imgActive: liquidity_pools_active},
    {path: "/trading", name: "Trading", img: trading_black, imgActive: trading_active},
    {path: "/accounts", name: "Accounts", img: accounts_black, imgActive: accounts_acitve},
]

export const TXS_NAME = {
    SWAP: "Swap",
    ADD: "Add liquidity",
    BURN: "Remove liquidity",
    MINT: "Mint",
    REDEEM: "Redeem",
    COLLECT_REDEMPTION: "Collect redemption"
}