import React, {useState} from 'react';
import {useHistory} from 'react-router';
import {NavLink} from 'react-router-dom';
import comments_black from '../../../assets/icons/nav-links/dark-theme/comment-black.svg';
import {PAGES} from '../../../constants';
import {useSystemContext} from '../../../systemProvider';
import styled from 'styled-components';
import {ThemeSwitcher} from '../ThemeSwitcher/theme-switcher';


const SideBarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  
  margin-top: 0.5vw;

  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`

const SocialMediasList = styled.div`
  width: 80%;
  height: ${props => props.opened ? "27.4vw" : "0"};
  padding: 1.2vw 0;
  
  position: absolute;
  left: 50%;
  bottom: 0.521vw;
  z-index: ${props => props.opened ? "1000" : "-1000"};

  transition: 0.3s all;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), radial-gradient(60.68% 60.68% at 50.88% 47.73%, #265041 0%, #222121 100%);
  transform: translateX(-50%);

  border: 0.052vw solid #4F4F4F;
  border-radius: 0.8vw;
  font-size: 1vw;
  
  visibility: ${props => props.opened ? "visible" : "hidden"};

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  a {
    display: ${props => props.opened ? "block" : "none"};
    opacity: 1;
    transition: 3ms opacity;
    color: white;

    &:hover {
      transition: 0.15s all;
      font-size: 1.4vw;
    }
  }
`

const LinkList = styled.ul`
  position: relative;
  text-align: center;

  padding: 0.521vw 0.665vw;
  
  border: 0.052vw solid #4F4F4F;
  border-radius: 1vw;
  
  display: flex;
  flex-direction: column;

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
    width: 100%;
    height: 70%;

    border: 0.052vw solid #40BA93;
    border-radius: 0.625vw;
    background: #40BA93;

    transition: 0.3s all;

    &:hover {
      background: #40BA93;
    }
  }
`

const LinkListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 0;
  
  cursor: pointer;
  border-radius: 20%;
  
  padding: 1.4vw 0.9vw;
  margin: 0.3vw 0;

  img {
    width: 0.9vw;
    height: 1.5vw;
  }

  background-color: ${props => props.active ? "#40BA93" : "transparent"};

  &:hover {
    background-color: ${props => props.active ? "#40BA93" : "#E0E0E0"};
    transition: 0.3s background-color;
  }

  &:last-child {
    border: 0.052vw solid #4F4F4F;
    border-radius: 0.6vw;

    margin-top: 4vw;
    
    &:hover {
      transition: 0.15s all ease-out;
      opacity: 0;
    }
  }
`

const BottomLinks = styled.div`
  display: flex;
  flex-direction: column;

  margin-top: 1.4vw;

  a {
    margin-left: 2vw;
    font-size: 0.8vw;
    color: white;
    
    @media screen and (max-width: 768px) {
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
                <SocialMediasList 
                  opened={expandSocMedias} 
                  onMouseEnter={() => setExpandSocMedias(true)}
                  onMouseLeave={() => setExpandSocMedias(false)}
                  >
                    <a href="mailto:email@argano.io" target="_blank" rel="noreferrer"><i class="fas fa-envelope"></i></a>
                    <a href="https://t.me/ARGANO_DEFI" target="_blank" rel="noreferrer"><i class="fab fa-telegram-plane"></i></a>
                    <a href="https://discord.com/invite/mH7PJnNCWP" target="_blank" rel="noreferrer"><i class="fab fa-discord"></i></a>
                    <a href="https://twitter.com/argano_io" target="_blank" rel="noreferrer"><i class="fab fa-twitter"></i></a>
                    <a href="https://argano.medium.com/" target="_blank" rel="noreferrer"><i class="fab fa-medium"></i></a>
                    <a href="https://github.com/Argano-DEX/Argano-Contracts" target="_blank" rel="noreferrer"><i class="fab fa-github"></i></a>
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
                <a href="https://argano-1.gitbook.io/argano-ecosystem/algorithmic-functionality/rebalancing" target="_blank" rel="noreferrer">White Paper</a>
                <a href="https://argano-1.gitbook.io/argano-ecosystem/" target="_blank" rel="noreferrer">GitBook</a>
                <a href="https://github.com/Tibereum/obelisk-audits/blob/main/Argano.pdf" target="_blank" rel="noreferrer">Audit Report</a>
                <a href="https://argano-1.gitbook.io/argano-ecosystem/smart-contracts-structure" target="_blank" rel="noreferrer">$AGO contracts</a>
            </BottomLinks>
            <ThemeSwitcher/>
        </SideBarWrapper>
    )
}