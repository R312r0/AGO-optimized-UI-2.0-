import React, { useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router';
import { NavLink } from 'react-router-dom';
import { ReactComponent as Comments_black } from '../../../assets/icons/nav-links/dark-theme/comment-black.svg';
import { ReactComponent as Documentsvg } from '../../../assets/icons/nav-links/document.svg';
import document_icon from './../../../assets/icons/sidebar-documents.svg';
import { PAGES } from '../../../constants';
import { useSystemContext } from '../../../systemProvider';
import styled from 'styled-components';
import { ThemeSwitcher } from '../ThemeSwitcher/theme-switcher';
import { useMediaQuery } from 'react-responsive';


const SideBarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  
  margin-top: 0.5vw;
  overflow: visible;
  position: relative;
  z-index: 100;

  &::-webkit-scrollbar {
    display: none;
  }

  .document_icon {
    margin-top: 1.4vw;

    width: 1.563vw;
    height: 2.083vw;
  }
`

const SocialMediasList = styled.div`
  width: 80%;
  height: ${props => props.opened ? "calc(100% - 1.042vw)" : "0"};
  padding: 1.2vw 0;
  
  position: absolute;
  left: 50%;
  bottom: 0.521vw;
  z-index: ${props => props.opened ? "1000" : "-1000"};

  transition: 0.3s all;
  background: ${props => props.light ? "linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), #40BA93;" : "linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), radial-gradient(60.68% 60.68% at 50.88% 47.73%, #265041 0%, #222121 100%)"};
  transform: translateX(-50%);

  border:${props => props.light ? "0.052vw solid #BDBDBD" : "0.052vw solid #4F4F4F"};
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
  text-align: center;

  padding: 0.521vw 0.665vw;
  
  border: ${props => props.light ? "0.052vw solid #E0E0E0" : "0.052vw solid #4F4F4F"};
  border-radius: 1vw;
  
  display: flex;
  flex-direction: column;
  position: relative;

  .soc-list-light {
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), #40BA93;
  }

  .opened-expanded-list {
    transition: 0.3s all;
    height: 95%;
    visibility: visible;
    z-index: 1000;
  }

  .link-message-item {
    border: ${props => props.light ? '1px solid #E0E0E0' : '1px solid #4F4F4F'};
    margin-top: 4vw;

    &:hover {
      transition: 0.15s all ease-out;
      opacity: 0;
    }
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
 
  transition: all .3s;

  img {
    width: 0.9vw;
    height: 1.5vw;
  }

  @media screen and (max-width: 1024px) {
    padding: 1.7vw 1.2vw;

    img {
      width: 1.2vw;
      height: 2vw;
    }
  }

  background-color: ${props => props.active ? "#40BA93" : "transparent"};


  & .hover_title{
    position: absolute;
    left: 95px;
    font-size: 14px;
    line-height: 16px;

    color: ${props => props.light ? "#000" : " rgba(255, 255, 255, 0.61)"};
    max-width: 120px;
    width: 100%;
    text-align: left;
    transition: all .3s;
    z-index: 100;
    opacity:0;
    white-space:nowrap;
  }

  &:hover {
    background-color: ${props => props.active ? "#40BA93" : (props.light ? "#E0E0E0" : "#2D2C2C")};
    transition: 0.3s background-color;
    border-radius: 12px;

      & .hover_title{
        opacity: 1;
      
    }

    
  }

  &:last-child {
    // border: 0.052vw solid #4F4F4F;
    // margin-top: 4vw;
    border-radius: 0.6vw;
  }

  & svg{
    max-width: 22px;
    width: 100%;
    fill:  ${props => props.active ? "#fff" : (props.light ? "#828282" : "#4F4F4F")};
    /* stroke:  ${props => props.active ? "#fff" : "#4F4F4F"}; */
  }
 
`


const BottomLinks = styled.div`
  display: flex;
  flex-direction: column;

  /* margin-top: 1.4vw; */

  a {
    /* margin-left: 2.083vw; */
    font-size: 0.729vw;
    font-weight: 300;
    color: ${props => props.light ? '#4F4F4F' : '#fff'};
    
    @media screen and (max-width: 750px) {
      display: none;
    }
  }
`


export const SideBar = () => {

  const history = useHistory();
  const [expandSocMedias, setExpandSocMedias] = useState(false);
  const [openDoc, setOpenDoc] = useState(false);
  const [activeTab, setActiveTab] = useState(history.location.pathname);
  const isTabletScreen = useMediaQuery({ query: '(max-width: 1024px)' });
  const { theme, setTheme } = useSystemContext();
  const links = useRef(null);

  const handleClickOutside = (event) => {
    if (links.current && !links.current.contains(event.target)) {
      setOpenDoc(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  });


  return (
    <SideBarWrapper light={theme === "light"}>
      <LinkList light={theme === "light"}>
        <SocialMediasList
          opened={expandSocMedias}
          onMouseEnter={() => setExpandSocMedias(true)}
          onMouseLeave={() => setExpandSocMedias(false)}
          light={theme === "light"}
        >
          <a href="mailto:email@argano.io" target="_blank" rel="noreferrer"><i className="fas fa-envelope"></i></a>
          <a href="https://t.me/ARGANO_DEFI" target="_blank" rel="noreferrer"><i className="fab fa-telegram-plane"></i></a>
          <a href="https://discord.com/invite/mH7PJnNCWP" target="_blank" rel="noreferrer"><i className="fab fa-discord"></i></a>
          <a href="https://twitter.com/argano_io" target="_blank" rel="noreferrer"><i className="fab fa-twitter"></i></a>
          <a href="https://argano.medium.com/" target="_blank" rel="noreferrer"><i className="fab fa-medium"></i></a>
          <a href="https://github.com/Argano-DEX/Argano-Contracts" target="_blank" rel="noreferrer"><i className="fab fa-github"></i></a>
        </SocialMediasList>
        {PAGES.map((item, index) => {
          return (
            <NavLink to={item.path} onClick={() => setActiveTab(item.path)} key={`side_bar_${index}`}>
              <LinkListItem active={item.path === history.location.pathname} name={item.name} light={theme === "light"}>
                {React.createElement(item.component, {})}
                <div className='hover_title'>{item.name}</div>
                {/* {item.component} */}
                {/* <img src={item.img} alt={`${item.path}`} className={activeTab === item.path && 'active__page'}/> */}
                {/* <img src={activeTab === item.path ? item.imgActive : item.img} alt={`${item.path}`} /> */}
              </LinkListItem>
            </NavLink>
          )
        })}
        <LinkListItem className='link-message-item' onMouseEnter={() => setExpandSocMedias(true)} light={theme === "light"}>
          <Comments_black />
        </LinkListItem>
      </LinkList>
      <div className='document__box' onClick={() => setOpenDoc(!openDoc)} ref={links} >
      <div className={`document__box__links ${openDoc && 'document__box__links__open'}`}>
        <BottomLinks light={theme === "light"}>
          <a href="https://argano-1.gitbook.io/argano-ecosystem/algorithmic-functionality/rebalancing" target="_blank" rel="noreferrer">White Paper</a>
          <a href="https://argano-1.gitbook.io/argano-ecosystem/" target="_blank" rel="noreferrer">GitBook</a>
          <a href="https://github.com/Tibereum/obelisk-audits/blob/main/Argano.pdf" target="_blank" rel="noreferrer">Audit Report</a>
          <a href="https://argano-1.gitbook.io/argano-ecosystem/smart-contracts-structure" target="_blank" rel="noreferrer">$AGO contracts</a>
        </BottomLinks>
      </div>
      <Documentsvg />
    </div>
     
      {/* {!isTabletScreen
        ? <img className="document_icon" src={document_icon}></img>
        : <BottomLinks light={theme === "light"}>
          <a href="https://argano-1.gitbook.io/argano-ecosystem/algorithmic-functionality/rebalancing" target="_blank" rel="noreferrer">White Paper</a>
          <a href="https://argano-1.gitbook.io/argano-ecosystem/" target="_blank" rel="noreferrer">GitBook</a>
          <a href="https://github.com/Tibereum/obelisk-audits/blob/main/Argano.pdf" target="_blank" rel="noreferrer">Audit Report</a>
          <a href="https://argano-1.gitbook.io/argano-ecosystem/smart-contracts-structure" target="_blank" rel="noreferrer">$AGO contracts</a>
        </BottomLinks>
      } */}
  <ThemeSwitcher />
    </SideBarWrapper >
  )
}