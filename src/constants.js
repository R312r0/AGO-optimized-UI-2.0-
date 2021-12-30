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
    FACTORY: "0xe800ee925f003817253CB349F848c0d2a102039a",
    ROUTER: "0x7D9bc0eFb3297b6C62a0C6B63D0ff9FDb382EdeF",
}

export const CONTRACT_ADRESESS = {
    AGO: "0x18Dfcf862e7Ab6B248A34aa91059B9aa1FcD6f94",

    AGOUSD: "0x57fe397F01945702ACc311243a51134dD5435a34",
    CNUSD: "0x7292D0b7D7c942830132AFe44fA822a77EC333aa",

    AGOBTC: "0xF2e86379A7a05a5DEF31d25E70AbBcf546c12804",
    CNBTC: "0x39bE597308d5C99351AbC957A694A7a1D1EA549a",

    WMATIC: "0xd23CE9F6C19aEec1b8996a4831043Dfd4d36FEB6",
    USDT: "0x9381c172a1067B93CDD7Ed4c6f5deD9d5283dB8f",
    USDC: "0xe1109D7e332f153A2C9c45e2E7c86184A2f16DF9",
    DAI: "0x0e9158d8c24584BC286868C40910F2bbe1E5350E",
    WBTC: "0xB8995Da33d186dc5bb92125c1f2028A25b638219",

    FOUNDRY_AGOUSD: "0x8F9622f9d7FB2d361a77Ac17F805984CC2C38b77",
    POOL_AGOUSD: "0x8CE3f4FdD333bC0B5B2877b8e87d055A707101a2",
    TREASURY_AGOUSD: "0x4119A89218b7e5346fd51368fc0b3a2a43c6a039",

    FOUNDRY_AGOBTC: "0x1893D04A5cb7d5688A5A1FEAFc2C3d347EC412D7",
    POOL_AGOBTC: "0x995e5BA3752567D5c47D756CfD5b4B42cF9E6732",
    TREASURY_AGOBTC: "0x4D48895400150429cb64286e21fF025543c62013",
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