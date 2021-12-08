import { InjectedConnector } from '@web3-react/injected-connector';
import { NetworkConnector } from '@web3-react/network-connector';
// Dark theme icons.
import dashboard_black from './assets/icons/nav-links/dark-theme/dashboard-black.svg';
import mint_redeem_black from './assets/icons/nav-links/dark-theme/mint-redeem-black.svg';
import foundry_black from './assets/icons/nav-links/active/foundry-active.svg';
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

export const USD_PRICE_ENDPOINT = (contractAddress) => {

    return `https://api.coingecko.com/api/v3/simple/token_price/polygon-pos?contract_addresses=${contractAddress}&vs_currencies=usd`;
}

export const MATIC_USD_PRICE_ENDPOINT = 'https://api.coingecko.com/api/v3/simple/token_price/polygon-pos?contract_addresses=0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270&vs_currencies=usd';

export const FACTORY_ADDRESS = "0x5fc8d32690cc91d4c39d9d3abcbd16989f875707"

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
    FACTORY: "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707",
    ROUTER: "0x0165878A594ca255338adfa4d48449f69242Eb8F",
}

export const CONTRACT_ADRESESS = {
    AGO: "0x6F5b69CF3090e65872b28E150B00cb8cD0f5e1bA",
    AGOUSD: "0xeabfC74db4aEdB95F1822e3e1E2ec2AC9a1B2F8F",
    CNUSD: "0x06CB38bE23Cd8c1FaA79C15a5FDdD81598bfb79E",
    // AGOBTC: "0x36F1c6dcd73c246Ae557585a839e8437C8Bd8558",
    // CNBTC: "0x6b2Cff0e587C9Ad77a3e913Aa25cd97c25a45369",
    WMATIC: "0x7FD21700b827C2De3E2F00bD7b3782Ab1ab64484",
    USDT: "0x92F649404a501C58e5173a9493b992c29621F79E",
    USDC: "0x145114129ee7ECFDEAff5DF1Fc13E68D5D06390f",
    DAI: "0x87c67bcB19Fdf0587cB02f2CE080b663fa6361b5",
    // WBTC: "0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
    POOL_AGOUSD: "0xFe939BcfE3cD3561620BeAeeC0a8E46B3ef6534a",
    ORACLE_AGOUSD: "0x39dFCFF38d9BA1deA0CEe694097376349be567EE",
    TREASURY_AGOUSD: "0x8ECF669120A78d0B1dd24c484EB0243E37f6E363",
    // POOL_AGOBTC: "0x98273aEC2E1157BAfA77cfAe5d02e4F70Bd14aB7",
    // ORACLE_AGOBTC: "0x4877533A6B6C717432316d278b2789D47907200D",
    // TREASURY_AGOBTC: "0x3DD514281E4aFd5EDaB6261Face66A1bCA207bcE"
}

export const TX_OPERATIONS = {
    collectRedemption: "Collect Redemption",
    mint: "Mint",
    redeem: "Redeem"
}


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