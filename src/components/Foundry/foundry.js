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

        console.log(await contracts.TREASURY_AGOBTC.methods.calcCollateralBalance().call());

        const usdCollateralBalance = await contracts.TREASURY_AGOUSD.methods.calcCollateralBalance().call();
        const wbtcCollateralBalance = await contracts.TREASURY_AGOBTC.methods.calcCollateralBalance().call();

        const usdtEstimatedAllocation = usdCollateralBalance._exceeded ? formatFromDecimal(usdCollateralBalance._collateral_value, 18) : 0;
        const wbtcEstimatedAllocation = wbtcCollateralBalance._exceeded ? formatFromDecimal(wbtcCollateralBalance._collateral_value, 18) : 0;


        const tvl = (parseFloat(cnUsdFoundryBalance) * parseFloat(cnusdToken.priceUSD)) + (parseFloat(cnBtcFoundryBalance) * parseFloat(cnbtcToken.priceUSD));

        setFoundryStaked({
            cnusd: cnUsdFoundryBalance,
            cnbtc: cnBtcFoundryBalance,
            usdt: usdtEstimatedAllocation,
            wbtc: wbtcEstimatedAllocation,
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