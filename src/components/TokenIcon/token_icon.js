import React from 'react'

// Protocol icons import
import ago from './svg/newIcons/AGO.svg'
import agoy from './svg/newIcons/AGOy.svg'
import agoUsd from './svg/newIcons/AGOUSD.svg'
import agoBtc from './svg/newIcons/AGOBTC.svg'
import cnUsd from './svg/newIcons/CNUSD.svg'
import cnBtc from './svg/newIcons/CNBTC.svg'
// import real_matic from './svg/real_matic.svg';

// Market icons import
import real_matic from './svg/real_matic.svg'
import matic from './svg/MATIC.svg'
import usdt from './svg/USDT.svg'
import wbtc from './svg/WBTC.svg'
import dai from './svg/DAI.svg';
import usdc from './svg/USDC.svg';

// Unknonw token icon
import unknow from './svg/UNKNOWN_TOKEN.png';

export const TokenIcon = ({iconName}) => {
    const tokens = [
        { name: "AGO", icon: ago },
        { name: "AGOy", icon: agoy},
        { name: "AGOUSD", icon: agoUsd },
        { name: "MATIC", icon: real_matic },
        { name: "AGOBTC", icon: agoBtc },
        { name: "CNUSD", icon: cnUsd },
        { name: "CNBTC", icon: cnBtc },
        { name: "WMATIC", icon: matic },
        { name: "USDT", icon: usdt },
        { name: "WBTC", icon: wbtc },
        { name: "DAI", icon: dai },
        { name: "USDC", icon: usdc },
    ]
    
    const returnedToken = tokens.find(item => item.name === iconName)

    return <img src={returnedToken?.icon ? returnedToken?.icon : unknow} />
}