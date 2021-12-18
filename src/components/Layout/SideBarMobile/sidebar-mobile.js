import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import { PAGES } from '../../../constants';
import { ConnectWalletButton } from '../ConnectWallet/connect-wallet';
import { ThemeSwitcher } from '../ThemeSwitcher/theme-switcher';
import comments_black from '../../../assets/icons/nav-links/dark-theme/comment-black.svg';
import { useSwipeable } from 'react-swipeable';
import { useOuterClick } from '../../../hooks/outerClickHook';

const SideBarWrapper = styled.div`
    display: grid;
    grid-template-rows: 1fr 3fr 1fr;

    width: 100vw;
    height: 100%;

    transition: 0.3s;
    overflow-y: auto;

    position: fixed;
    z-index: 99999;
    top: 0;
    right: 0;

    transform: ${props => props.visible ? "translateX(0)" : "translateX(100vw)"};
    background: radial-gradient(circle, rgba(44,94,77,1) 0%, rgba(38,51,47,1) 23%, rgba(35,35,35,1) 52%);
`

const Header = styled.div`
    position: relative;

    display: flex;
    flex-direction: column;
    justify-items: center;

    padding: 8.533vw 0 16vw;

    h1 {
        font-size: 6.4vw;
        color: white;
    }
`

const HeaderWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    position: relative;
`

const CloseButton = styled.button`
    height: 100%;

    background: transparent;
    color: white;
    border: 0;

    font-size: 6.4vw;

    svg {
        position: absolute;
        top: 50%;
        right: 7.467vw;

        transform: translateY(-50%);

        width: 4.267vw;
        height: 4.267vw;
    }
`

const NavLinkList = styled.ul`
    width: 100%;
    height: 100%;

    display: grid;
    grid-template-rows: auto;
    align-items: center;
`

const NavLinkListItem = styled.li`
    position: relative;

    display: flex;
    align-items: center;


    margin-bottom: 7.467vw;

    img {
        width: 6.667vw;
        height: 6.667vw;

        margin: 0 7.733vw 0 10.4vw;
    }

    h1 {
        font-size: 4.8vw;

        color: ${props => props.active ? "white" : "#828282"};
        font-weight: ${props => props.active ? "600" : "500"};
    }
`

const ActiveBorderNavListItem = styled.div`
    position: absolute;
    left: 0;
    
    width: 2.667vw;
    height: 100%;

    visibility: ${props => props.active ? "visible" : "hidden"};
    background: linear-gradient(180deg, #40BA93 0%, rgba(64, 186, 147, 0) 126.47%);

    border-radius: 0 1.333vw 1.333vw 0;
`

const Footer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;

    padding: 13.333vw 0 13.867vw;
    border-top: 0.267vw solid #333333;
`

const SocialMediasListButton = styled.button`
    position: relative;
    width: ${props => props.opened ? "15.200vw" : "16vw"};
    height: 16vw;
    
    place-self: center;
    background: transparent;
    
    border: 0.267vw solid ${props => props.opened ? "transparent" : "#4F4F4F"};
    border-radius: 2.667vw;

    img {
        width: 5.333vw;
        height: 5.333vw;

        opacity: ${props => props.opened ? "0" : "1"};
    }
`

const SocialMediasList = styled.div`
    transition: 0.4s all;
    
    width: 100%;
    height: ${props => props.opened ? "fit-content" : "0"};
    padding: ${props => props.opened ? "13.867vw 0" : "0"};
    
    opacity: ${props => props.opened ? "1" : "0"};
    overflow: hidden;
    border-radius: 3.2vw;

    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;

    background: #232323;
    border: 0.267vw solid ${props => props.opened ? "#4F4F4F" : "transparent"};

    display: flex;
    flex-direction: column;

    a {
        color: white;
        transition: 0.4s all;
        padding: ${props => props.opened ? "18.667vw 0 0" : "0 0"};

        &:first-child {
            padding: 0;
        }
    }
`

export const SideBarMobile = ({showMobileSideBar, setShowMobileSideBar}) => {

    const history = useHistory();

    const [socialOpened, setSocialsOpened] = useState(false);

    const handlers = useSwipeable({
        onSwipedRight: () => setShowMobileSideBar(false),
        preventDefaultTouchmoveEvent: true,
    })

    const innerRef = useOuterClick(ev => {
        if (socialOpened) {
            setSocialsOpened(false)
        }
    });

    return (
        <SideBarWrapper {...handlers} visible={showMobileSideBar}> 
            <Header> 
                <HeaderWrapper>
                    <h1> Menu </h1>
                    <CloseButton onClick={() => setShowMobileSideBar(false)}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.87818 7.99886L15.606 2.28357C15.8568 2.03271 15.9977 1.69246 15.9977 1.33769C15.9977 0.98291 15.8568 0.642664 15.606 0.391799C15.3552 0.140934 15.015 0 14.6602 0C14.3055 0 13.9653 0.140934 13.7145 0.391799L8 6.12041L2.28552 0.391799C2.03469 0.140934 1.6945 -2.64329e-09 1.33977 0C0.985044 2.64329e-09 0.644846 0.140934 0.394017 0.391799C0.143188 0.642664 0.00227327 0.98291 0.00227327 1.33769C0.00227327 1.69246 0.143188 2.03271 0.394017 2.28357L6.12182 7.99886L0.394017 13.7142C0.269166 13.838 0.17007 13.9853 0.102444 14.1477C0.0348177 14.31 0 14.4842 0 14.66C0 14.8359 0.0348177 15.01 0.102444 15.1724C0.17007 15.3347 0.269166 15.4821 0.394017 15.6059C0.517848 15.7308 0.665174 15.8299 0.827496 15.8975C0.989818 15.9652 1.16392 16 1.33977 16C1.51562 16 1.68972 15.9652 1.85204 15.8975C2.01437 15.8299 2.16169 15.7308 2.28552 15.6059L8 9.87731L13.7145 15.6059C13.8383 15.7308 13.9856 15.8299 14.148 15.8975C14.3103 15.9652 14.4844 16 14.6602 16C14.8361 16 15.0102 15.9652 15.1725 15.8975C15.3348 15.8299 15.4822 15.7308 15.606 15.6059C15.7308 15.4821 15.8299 15.3347 15.8976 15.1724C15.9652 15.01 16 14.8359 16 14.66C16 14.4842 15.9652 14.31 15.8976 14.1477C15.8299 13.9853 15.7308 13.838 15.606 13.7142L9.87818 7.99886Z" fill="white"/>
                        </svg>
                    </CloseButton>
                </HeaderWrapper>

                <ConnectWalletButton/>
            </Header>
            <NavLinkList> 
                {PAGES.map((item) => {
                    return (
                        <NavLink onClick={() => setShowMobileSideBar(false)} to={item.path}>
                            <NavLinkListItem active={item.path === history.location.pathname}>
                                <img src={item.path === history.location.pathname ? item.imgActive : item.img} alt={item.name + "-link"}/>
                                <h1>{item.name} </h1>
                                <ActiveBorderNavListItem active={item.path === history.location.pathname}/>
                            </NavLinkListItem>
                        </NavLink>
                    )
                })}
            </NavLinkList>
            <Footer> 
                <ThemeSwitcher/>
                <SocialMediasListButton opened={socialOpened} onClick={() => setSocialsOpened(true)}>
                    <img src={comments_black} alt={"social-medias"}/>
                    <SocialMediasList ref={innerRef} opened={socialOpened}> 
                        <a href="mailto:email@argano.io" target="_blank" rel="noreferrer"> <i className="fas fa-envelope"></i> </a>
                        <a href="https://t.me/ARGANO_DEFI" target="_blank" rel="noreferrer"> <i className="fab fa-telegram-plane"></i> </a>
                        <a href="https://discord.com/invite/mH7PJnNCWP" target="_blank" rel="noreferrer"> <i className="fab fa-discord"></i> </a>
                        <a href="https://twitter.com/argano_io" target="_blank" rel="noreferrer"> <i className="fab fa-twitter"></i> </a>
                        <a href="https://argano.medium.com/" target="_blank" rel="noreferrer"> <i className="fab fa-medium"></i> </a>
                        <a href="https://github.com/Argano-DEX/Argano-Contracts" target="_blank" rel="noreferrer"> <i className="fab fa-github"></i> </a>
                    </SocialMediasList>
                </SocialMediasListButton>
            </Footer>
        </SideBarWrapper>
    )
}