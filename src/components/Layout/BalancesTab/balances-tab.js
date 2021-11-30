import React, {useState} from 'react';
import styled from 'styled-components';
import {useSystemContext} from '../../../systemProvider';
import {formattedNum} from '../../../utils/helpers';
import {TokenIcon} from '../../TokenIcon/token_icon';
import pig_icon from '../../../assets/icons/pig-balances.svg';
import pig_icon_light from '../../../assets/icons/pig-balances-light.svg';
import {useWeb3React} from '@web3-react/core';
import {useMediaQuery} from 'react-responsive';
import {useSwipeable} from 'react-swipeable';
import vector from '../../../assets/icons/whiteVector.svg';

const BalancesTabWrapper = styled.div`
  transition: 0.3s all;
  width: ${props => props.opened ? props.account ? "79%" : "13vw" : "13vw"};
  align-self: center;
  height: 2.969vw;

  padding: 0 0.4vw;
  margin: 0.4vw 0 0.45vw 0.5vw;

  background: ${props => props.mobile ? "transparent" : "linear-gradient(95.07deg, rgba(58, 58, 58, 0.4) -21.03%, rgba(0, 0, 0, 0.4) 139.31%), rgba(51, 51, 51, 0.1)"};
  border: ${props => props.mobile ? "0" : "1px solid #333333"};
  box-sizing: border-box;
  border-radius: 1.302vw;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 0.61vw;
  cursor: pointer;

  @media screen and (max-width: 1200px) {
    width: ${props => props.opened ? props.account ? "79%" : "13vw" : "13vw"};
    height: 3.2vw;
    font-size: 0.81vw;
  }

  @media screen and (max-width: 768px) {
    grid-row-start: 2;
    grid-row-end: 3;
    grid-column-start: 1;
    grid-column-end: 4;

    margin auto;
    width: ${props => props.opened ? "70%" : "34%"};
    font-size: 2.5vw;
  }

  img {
    margin-right: 0.2vw;
    grid-row: ${props => props.mobile ? "1/3" : "1/2"};
    padding: 0.2vw 0;
    width: 1.875vw;
    height: 2.083vw;

    @media screen and (max-width: 1200px) {
      padding: 0.2vw 0;
      width: 2.4vw;
      height: 2.7vw;
    }

    @media screen and (max-width: 768px) {
      width: 12vw;
      height: 12vw;
    }
  }

  @media screen and (max-width: 480px) {
    .vector img {
      display: none;
    }
  }

  .vector {
    width: 0.521vw;
    height: 0.521vw;
    -webkit-transition: .4s ease;

    margin: auto auto auto ${props => props.opened ? "0.2vw" : "0.7vw"};
    // position: ${props => props.opened ? "relative" : "static"};
    // bottom: ${props => props.opened ? "28px" : "2px"};
    // left: ${props => props.opened ? "250px" : "0"};
    transform: ${props => props.opened ? "rotate(180deg)" : "none"};
    
    @media screen and (max-width: 768px) {
      display: none;
    }
  }

  p {
    /*grid-row: ${props => props.mobile ? "none" : "1/2"};*/
    color: white;
    white-space: nowrap;
    line-height: 1;
  }

  .balance {
    color: #40BA93;
    @media screen and (max-width: 768px) {
      font-size: 4vw;
      margin-top: 10%;
    }
  }

  .balance-tab-wrapper {
    display: flex;
    align-items: center;
    margin-right: auto;
    
    @media screen and (max-width: 768px) {
      display: grid;
      grid-template-rows: 1fr 1fr;
      grid-template-columns: auto auto;
    }

    p {
      font-size: 0.8vw;

      @media screen and (max-width: 768px) {
        font-size: 3.8vw;
      }

      &:not(:first-child) {
        padding: 0 0.3vw;
      }
    }
    
    .balance-arrow-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: ${props => props.opened ? "5vw" : "3vw"};

      transition: .4s ease;

      @media screen and (max-width: 768px) {
        margin-left: 3%;
        font-size: 3.3vw;
        justify-content: start;
      }
    }
  }
`

const BalancesMobileExpandWrapper = styled.div`
  position: fixed;
  transition: 0.6s opacity;
  left: 0;
  top: 0;
  opacity: ${props => props.opened ? "1" : "0"};
  background: rgba(0, 0, 0, 0.7);
  height: 100vh;
  width: 100vw;
  z-index: ${props => props.opened ? "9999" : "-1000"};
`

const BalanceExpand = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  display: grid;
  transition: 0.6s all;
  transform: ${props => props.opened ? "translateY(0)" : "translateY(-100vh)"};
  grid-template-rows: 1fr 6fr 0.5fr;
  background: linear-gradient(157.07deg, rgba(30, 30, 30, 0.741) 0%, rgba(5, 5, 5, 0.95) 64.86%);
  border-radius: 0 0 2.083vw 2.083vw;
  z-index: ${props => props.opened ? "99999" : "-1000"};
`

const BalanceOverall = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-column-gap: 0.260vw;

  img {
    grid-row: 1/3;
    align-self: center;
    justify-self: flex-end;
  }

  h5 {
    font-size: 0.729vw;
    color: #40BA93;
    align-self: flex-end;

    &:last-child {
      align-self: flex-start;
      color: white;
    }
  }
`

const BalanceList = styled.ul`
  box-sizing: border-box;
  padding: 2.083vw;
`

const BalanceSwipeStripe = styled.div`
  display: grid;
  height: 100%;
  width: 100%;
  place-items: center;

  div {
    background: #4F4F4F;
    border-radius: 0.521vw;
    height: 0.260vw;
    width: 15%;
  }
`

const BalanceListItem = styled.li`
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 3fr;
  background: linear-gradient(90.99deg, #272727 2.18%, #1C1C1C 104.4%);
  border-radius: 1.042vw;
  margin-bottom: 1.042vw;
  height: 2.604vw;
  box-sizing: border-box;
  padding: 0 1.042vw;

  span {
    grid-row: 1/3;
    align-self: center;
    justify-self: flex-end;
    color: white;
  }

  img {
    width: 1.042vw;
    height: 1.042vw;
  }
`

const BalanceListDesktop = styled.ul`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  width: 100%;
  overflow: auto;
  margin: 0 0 0 auto;
  display: ${props => props.opened ? "flex" : "none"};

  @media screen and (min-width: 500px) and (max-width: 768px) {
    margin-right: 150px;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`

const BalanceListItemDesktop = styled.li`

  &:not(:first-child) {
    padding-left: 1%;
  }

  white-space: nowrap;
  border-right: 0.104vw solid #4F4F4F;

  &:last-child {
    border-right: 0;
  }

  img {
    width: 1.042vw;
    height: 1.042vw;
  }

  span {
    color: #828282;
    font-size: 0.625vw;
    margin-right: 1.042vw;
    @media screen and (min-width: 500px) and (max-width: 768px) {
      font-size: 12px;
    }
  }
`


export const BalancesTab = () => {

    const [balancesExpanded, setBalancesExpaned] = useState(false);
    const [balancesMobileExpanded, setBalancesMobileExpanded] = useState(false)
    const {account} = useWeb3React();
    const {theme, userProtfolio} = useSystemContext();
    const isMobileScreen = useMediaQuery({query: '(max-width: 768px)'})

    const handlersMobileBalancesExpanded = useSwipeable({
        onSwipedUp: () => {
            setBalancesMobileExpanded(false)
        },
        preventDefaultTouchmoveEvent: true,
    })

    return (
        <BalancesTabWrapper 
          opened={balancesExpanded} mobile={isMobileScreen} account={account}
          onClick={() => isMobileScreen ? setBalancesMobileExpanded(true) : setBalancesExpaned(!balancesExpanded)}
          >
            <>
                {account ?
                    <>
                        <div className="balance-tab-wrapper">
                          <img src={theme === "light" ? pig_icon_light : pig_icon} width={20} height={20} alt="balance"/>
                          <p className='balance'> Balance </p>
                          <div className="balance-arrow-wrapper">
                            <p> {userProtfolio ? formattedNum(userProtfolio.reduce((a, {userUsdBalance}) => a + userUsdBalance, 0)) : 0.00}$ </p>
                              <svg className="vector" width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.901211 1.07468e-08L6 5L0.901211 10L1.05386e-08 9.11625L4.19758 5L1.0871e-07 0.88375" fill="white"/>
                              </svg>
                          </div>
                        </div>
                        <BalanceListDesktop opened={balancesExpanded}>
                            {userProtfolio?.map((item) => {
                                return (
                                    <BalanceListItemDesktop key={"token-" + item.name}>
                                        <TokenIcon iconName={item.name}/>
                                        <span> {formattedNum(+item.userNativeBalance)}{item.name}/{formattedNum(item.userUsdBalance)}$ </span>
                                    </BalanceListItemDesktop>
                                )
                            })}
                        </BalanceListDesktop>
                    </>
                    :
                    <p> No balance, connect wallet! </p>
                }
            </>
            {isMobileScreen ?
                <>
                    <BalancesMobileExpandWrapper opened={balancesMobileExpanded}>
                    </BalancesMobileExpandWrapper>
                    <BalanceExpand opened={balancesMobileExpanded}>
                        <BalanceOverall>
                            <img src={theme === "light" ? pig_icon_light : pig_icon} width={35} height={35}
                                 alt="balance"/>
                            <h5> Balance </h5>
                            <h5> {userProtfolio ? formattedNum(userProtfolio.reduce((a, {userUsdBalance}) => a + userUsdBalance, 0)) : 0.00}$ </h5>
                        </BalanceOverall>
                        <BalanceList>
                            {userProtfolio?.map(item => {
                                return (
                                    <BalanceListItem>
                                        <TokenIcon iconName={item.name}/>
                                        <span> {formattedNum(+item.userNativeBalance)}{item.name}/{formattedNum(item.userUsdBalance)}$ </span>
                                    </BalanceListItem>
                                )
                            })}
                        </BalanceList>
                        <BalanceSwipeStripe {...handlersMobileBalancesExpanded}>
                        </BalanceSwipeStripe>
                    </BalanceExpand>
                </>
                :
                null
            }
        </BalancesTabWrapper>
    )
}