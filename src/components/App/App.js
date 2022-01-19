import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { WalletModal } from "../WalletModal/wallet_modal"
import { CurrencySwitchModal } from '../MintRedeem/CurrencySwitchModal/currency-switch-modal';

// Pages
import Dashboard from '../Dashboard/dashboard';
import MintRedeem from '../MintRedeem/mint_redeem';
import { StakingRewards } from '../StakingRewards/staking-rewards';
import LiquidityPools from '../LiquidityPools/liquidity-pools';
import { Trading } from '../Trading/trading';
import Layout from '../Layout/layout';
import { Accounts } from '../Accounts/accounts';
import 'antd/dist/antd.css';
import { Foundry } from "../Foundry/foundry";
import { useSystemContext } from '../../systemProvider'

export const App = () => {
    // const { connectWallet } = useSystemContext()
    // useEffect(() => {
    //     setTimeout(() => {

    //         const connectedWallet = localStorage.getItem('connected Wallet');
    //         if (connectedWallet) {
    //             connectWallet(connectedWallet);
    //         }
    //     }, 0)

    // }, [])


    return (
        <>
            <Router>
                <Switch>
                    <Layout>
                        <Route path="/" component={Dashboard} exact />
                        <Route path="/mint-redeem" component={MintRedeem} exact />
                        <Route path="/foundry" component={Foundry} exact />
                        <Route path="/staking" component={StakingRewards} exact />
                        <Route path="/liqudity-pools" component={LiquidityPools} exact />
                        <Route path="/trading" component={Trading} exact />
                        <Route path="/accounts" component={Accounts} exact />
                    </Layout>
                </Switch>
            </Router>
        </>
    )
}