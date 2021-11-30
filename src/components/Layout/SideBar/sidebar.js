import React, {useState} from 'react';
import {useHistory} from 'react-router';
import {NavLink} from 'react-router-dom';
import comments_black from '../../../assets/icons/nav-links/dark-theme/comment-black.svg';
import {PAGES} from '../../../constants';
import {useSystemContext} from '../../../systemProvider';
import styled from 'styled-components';
import {ThemeSwitcher} from '../ThemeSwitcher/theme-switcher';


const SideBarWrapper = styled.div`
  display: grid;
  grid-template-rows: 70% 15% 15%;
  align-items: center;
  justify-items: center;
  max-height: 100vh;
  @media screen and (min-width: 500px) and (max-width: 768px) {
    grid-template-rows: 75% 0 0;
  }
`

const SocialMediasList = styled.div`
  transition: 0.3s all;
  position: absolute;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), radial-gradient(60.68% 60.68% at 50.88% 47.73%, #265041 0%, #222121 100%);
  width: 80%;
  left: 50%;
  height: ${props => props.opened ? "95%" : "0"};
  transform: translateX(-50%);
  bottom: 10px;
  border: 1px solid #4F4F4F;
  border-radius: 12px;
  visibility: ${props => props.opened ? "visible" : "hidden"};
  z-index: ${props => props.opened ? "1000" : "-1000"};
  display: grid;
  grid-template-rows: repeat(6, 1fr);
  align-items: center;

  a {
    display: ${props => props.opened ? "block" : "none"};
    opacity: 1;
    transition: 3ms opacity;
    color: white;

    &:hover {
      transition: 0.15s all;
      font-size: 1.250vw;
    }
  }
`

const LinkList = styled.ul`
  position: relative;
  text-align: center;
  height: auto;
  padding: 0.521vw 0.665vw;
  width: 42%;
  border: 1px solid #4F4F4F;
  box-sizing: border-box;
  border-radius: 1vw;
  display: grid;
  grid-template-rows: repeat(6, 1fr) 2fr;
  align-self: center;
  align-items: center;

  .soc-list-light {
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), #40BA93;
  }

  .opened-expanded-list {
    transition: 0.3s all;
    height: 95%;
    visibility: visible;
    z-index: 1000;
  }

  .active-nav-tab {
    border: 1px solid #40BA93;
    border-radius: 0.625vw;
    background: #40BA93;
    width: 100%;
    height: 70%;
    transition: 0.3s all;

    &:hover {
      background: #40BA93;
    }
  }
`

const LinkListItem = styled.li`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20%;
  
  padding: 0.3vw;
  margin: 0.3vw 0;

  background-color: ${props => props.active ? "#40BA93" : "transparent"};

  &:hover {
    background-color: ${props => props.active ? "#40BA93" : "#E0E0E0"};
    transition: 0.3s background-color;
  }

  &:last-child {
    border: 0.052vw solid #4F4F4F;
    border-radius: 0.6vw;
    padding: 0.7vw 0.9vw;

    justify-self: center;
    align-self: flex-end;
    display: grid;
    place-items: center;
    
    &:hover {
      transition: 0.15s all ease-out;
      opacity: 0;
    }
  }

  img {
    width: 0.9vw;
    height: 1.5vw;
  }
`

const BottomLinks = styled.div`
  display: grid;
  align-self: center;

  a {
    font-size: 0.8vw;
    color: white;
    @media screen and (min-width: 500px) and (max-width: 768px) {
      display: none;
    }
  }
`


export const SideBar = () => {

    const history = useHistory();
    const [expandSocMedias, setExpandSocMedias] = useState(false);
    const [activeTab, setActiveTab] = useState(history.location.pathname);
    const {theme, setTheme} = useSystemContext();


    return (
        <SideBarWrapper>
            <LinkList>
                <SocialMediasList opened={expandSocMedias} onMouseEnter={() => setExpandSocMedias(true)}
                                  onMouseLeave={() => setExpandSocMedias(false)}>
                    <a href="mailto:email@argano.io" target="_blank" rel="noreferrer"> <i class="fas fa-envelope"></i>
                    </a>
                    <a href="https://t.me/ARGANO_DEFI" target="_blank" rel="noreferrer"> <i
                        class="fab fa-telegram-plane"></i> </a>
                    <a href="https://discord.com/invite/mH7PJnNCWP" target="_blank" rel="noreferrer"> <i
                        class="fab fa-discord"></i> </a>
                    <a href="https://twitter.com/argano_io" target="_blank" rel="noreferrer"> <i
                        class="fab fa-twitter"></i> </a>
                    <a href="https://argano.medium.com/" target="_blank" rel="noreferrer"> <i class="fab fa-medium"></i>
                    </a>
                    <a href="https://github.com/Argano-DEX/Argano-Contracts" target="_blank" rel="noreferrer"> <i
                        class="fab fa-github"></i> </a>
                </SocialMediasList>
                {PAGES.map((item) => {
                    return (
                        <LinkListItem active={item.path === history.location.pathname}>
                            <NavLink to={item.path} onClick={() => setActiveTab(item.path)}>
                                <img src={activeTab === item.path ? item.imgActive : item.img} alt={`${item.path}`}/>
                            </NavLink>
                        </LinkListItem>
                    )
                })}
                <LinkListItem onMouseEnter={() => setExpandSocMedias(true)}>
                    <img src={comments_black} alt={'comments'}/>
                </LinkListItem>
            </LinkList>
            <BottomLinks>
                <a href="https://argano-1.gitbook.io/argano-ecosystem/algorithmic-functionality/rebalancing"
                   target="_blank" rel="noreferrer"> White Paper </a>
                <a href="https://argano-1.gitbook.io/argano-ecosystem/" target="_blank" rel="noreferrer"> GitBook </a>
                <a href="https://github.com/Tibereum/obelisk-audits/blob/main/Argano.pdf" target="_blank"
                   rel="noreferrer"> Audit Report </a>
                <a href="https://argano-1.gitbook.io/argano-ecosystem/smart-contracts-structure" target="_blank"
                   rel="noreferrer"> $AGO contracts </a>
            </BottomLinks>
            <ThemeSwitcher/>
        </SideBarWrapper>
    )
}