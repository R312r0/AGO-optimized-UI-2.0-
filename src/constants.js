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
    FACTORY: "0x763119d679a4e15Ec7a4D0B72e159901a81f830e",
    ROUTER: "0x8Fa4913b6a0C3D549f07b05893e4a1B8C027e22B",
}

export const CONTRACT_ADRESESS = {
    AGO: "0x21F4c9ded0ef120bD00824d422c069aDd2eF791d",

    AGOUSD: "0x63b2BBa0C59980B09d923a447196CcdAF489c0C8",
    CNUSD: "0xd25aC3Ec98A77420E5Cb6528c116029B5beFe3f3",

    AGOBTC: "0x4610D280fF25C4c8509097A322d84DaDa737C91c",
    CNBTC: "0x2A09e5CE8aE3e51Ce598293Afef9dF16e851226C",

    WMATIC: "0x404edA0eB5044c5EA97C8160a27d1A8EF028E769",
    USDT: "0x279Fcc08716ec9699c63715dF85e52bd71E84ffd",
    USDC: "0x26c7aEdef8608b645BA600a81C77141957E58ebF",
    DAI: "0x09d31375f2579e3Ac1F041e13D63F6d1fAe9De47",
    WBTC: "0x0504ABFeF6d779537C18fF6D2cd3D46f7cC4ce0D",

    FOUNDRY_AGOUSD: "0x83557Ec7aa16635b708EC2640717f15423C9D9B1",
    POOL_AGOUSD: "0xb5b10A9e4f80F392FB205B7EA77E9a85cdEEc3D4",
    TREASURY_AGOUSD: "0x9b7A436fD9964538b5d877B9Af2D5FD6508D2B45",

    FOUNDRY_AGOBTC: "0x6184177897B7C2207C33fF5A9776b7Ea02baABbB",
    POOL_AGOBTC: "0x3C8DA1e17B821adeC3BED8dAE75Eb8E9d052D369",
    TREASURY_AGOBTC: "0x54aFD712090288013E3EBCbbae8520268092D11f",
}

export const SINGLE_STAKING_POOL = [
    {name: "AGO", address: "0xD0B5A822087D6306Fd5Dd521e612931C2a55342E"},
    {name: "AGOUSD", address: "0x3bcD0e03b3E188946dcBf3974E2AD813eDCb7015"},
    {name: "AGOBTC", address: "0x360239EE2776f23CE01E40799Ff7768D1aaC0060"}
]

export const LP_STAKING_POOL = [
    {},
    {},
    {},
    {}
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