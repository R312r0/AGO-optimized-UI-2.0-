import { useWeb3React } from '@web3-react/core';
import React, { useEffect, useState } from 'react';
import { CONTRACT_ADRESESS } from '../../constants';
import { useSystemContext } from '../../systemProvider';
import { formatFromDecimal } from '../../utils/helpers';
import FoundryActions from './foundry-actions/foundry-actions';
import FoundryData from './foundry-data/foundry-data';
import './foundry.scss'

export const Foundry = () => {

    const { account } = useWeb3React();
    const { contracts, tokens } = useSystemContext();
    const [foundryStaked, setFoundryStaked] = useState(null);


    useEffect(() => {

        if (contracts && tokens) {
            getFoundryInfo();
        }

    }, [contracts, tokens])


    const getFoundryInfo = async () => {

        const cnusdToken = tokens.find(item => item.symbol === "CNUSD");
        const cnbtcToken = tokens.find(item => item.symbol === "CNBTC");

        const cnUsdFoundryBalance = formatFromDecimal(await contracts.CNUSD.methods.balanceOf(CONTRACT_ADRESESS.FOUNDRY_AGOUSD).call(), cnusdToken.decimals);
        const cnBtcFoundryBalance = formatFromDecimal(await contracts.CNBTC.methods.balanceOf(CONTRACT_ADRESESS.FOUNDRY_AGOBTC).call(), cnbtcToken.decimals);

        const usdtFoundryBalance = formatFromDecimal(await contracts.USDT.methods.balanceOf(CONTRACT_ADRESESS.FOUNDRY_AGOUSD).call(), tokens.find(item => item.symbol === "USDT").decimals);
        const wbtcFoundryBalance = formatFromDecimal(await contracts.WBTC.methods.balanceOf(CONTRACT_ADRESESS.FOUNDRY_AGOBTC).call(), tokens.find(item => item.symbol === "WBTC").decimals);

        const tvl = (parseFloat(cnUsdFoundryBalance) * parseFloat(cnusdToken.priceUSD)) + (parseFloat(cnBtcFoundryBalance) * parseFloat(cnbtcToken.priceUSD));

        setFoundryStaked({
            cnusd: cnUsdFoundryBalance,
            cnbtc: cnBtcFoundryBalance,
            usdt: usdtFoundryBalance,
            wbtc: wbtcFoundryBalance,
            tvl
        })

    }


    return (
        <div className='foundry'> 
            <h1 className='foundry__heading main__heading__page'>Foundry</h1>

            <main className='foundry__wrapper'>
                <div className='foundry__details'>
                    <p>Stake your CNUSD and CNBTC</p>
                    <p>Earn profit from the protocol's performance</p>
                </div>
                <FoundryData data={foundryStaked} />
                <FoundryActions />
            </main>
        </div>
    )
}