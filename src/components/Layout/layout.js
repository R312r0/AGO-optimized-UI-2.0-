import React, {useContext, useState} from 'react';
import {SideBar} from './SideBar/sidebar';
import ago_icon from '../../assets/icons/ago-logo.svg';
import burger_menu from '../../assets/icons/burger-menu.svg'
import BalancesTab from './BalancesTab/balances-tab';
import {useMediaQuery} from 'react-responsive';
import {SideBarMobile} from './SideBarMobile/sidebar-mobile';
import {ConnectWalletButton} from './ConnectWallet/connect-wallet';
import { WalletModal } from '../WalletModal/wallet_modal';
import { CurrencySwitchModal } from '../MintRedeem/CurrencySwitchModal/currency-switch-modal';
import { LayoutWrapper, MobileHeader, MobileMainHeader, AgoLogo, BurgerButton, Header, Content } from './styles';
import { useSystemContext } from '../../systemProvider';
import { Spin } from 'antd';
import { LOADER_INDICATOR } from '../../constants';
import { ApproveModal } from '../ApproveModal/approve-modal';
import { useHistory, Link } from 'react-router-dom';


const ThemeContext = React.createContext();
export const useThemeContext = () => useContext(ThemeContext);

const Layout = ({children}) => {

    const [showMobileSideBar, setShowMobileSideBar] = useState(false);
    const isMobileScreen = useMediaQuery({query: '(max-width: 750px)'})
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
    const { web3Loading } = useSystemContext();
    const history = useHistory();

    return (
        <ThemeContext.Provider value={{theme, setTheme}}>
            <LayoutWrapper mobile={isMobileScreen} light={theme === "light"}>
                {
                  isMobileScreen ?
                    <>
                      <MobileHeader>
                        <MobileMainHeader>
                            <AgoLogo mobile={isMobileScreen} src={ago_icon} alt="ago-coin" />
                          {/* <PageName mobile={isMobileScreen}>{PAGES.find(item => item.path === history.location.pathname).name}</PageName> */}
                          <BurgerButton onClick={() => setShowMobileSideBar(true)} mobile={isMobileScreen}>
                            <img src={burger_menu} alt="burger-mobile"/>
                          </BurgerButton> 
                        </MobileMainHeader>
                        <BalancesTab/>
                      </MobileHeader>

                      <SideBarMobile showMobileSideBar={showMobileSideBar} setShowMobileSideBar={setShowMobileSideBar} />
                    </>
                    :
                    <>
                      <Header mobile={isMobileScreen}>
                        <AgoLogo 
                        onClick={() => history.push("/")}
                        mobile={isMobileScreen} 
                        src={ago_icon} alt="ago-coin"
                        />
                        <BalancesTab/>
                        <ConnectWalletButton/>
                      </Header>
                      <SideBar history={history}/>
                    </>
                  }

                <Content mobile={isMobileScreen}>
                  {web3Loading ? <Spin indicator={LOADER_INDICATOR}/> : children}                    
                </Content>
                <WalletModal />
                <ApproveModal/>
            </LayoutWrapper>
        </ThemeContext.Provider>
    )
}

export default React.memo(Layout);