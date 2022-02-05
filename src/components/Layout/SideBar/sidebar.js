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
import { useThemeContext } from '../layout';
import { SideBarWrapper, LinkList, LinkListItem, SocialMediasList, BottomLinks } from './styles';

export const SideBar = ({ history }) => {

  const [expandSocMedias, setExpandSocMedias] = useState(false);
  const [openDoc, setOpenDoc] = useState(false);
  const [activeTab, setActiveTab] = useState(history.location.pathname);
  const isTabletScreen = useMediaQuery({ query: '(max-width: 1024px)' });
  const { theme } = useThemeContext();

  const links = useRef(null);

  const handleClickOutside = (event) => {
    if (links.current && !links.current.contains(event.target)) {
      setOpenDoc(false);
    }
  };

  useEffect(() => {

    if (history.location.pathname) {
      setActiveTab(history.location.pathname);
    }

  }, [history.location.pathname])

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  });

  // FIXME: Why all layout rerender when we click link, because Layout Component is
  // is inside <Router> -> <Switch> and every time history changes all childrens are rerender.

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
          <a href="https://t.me/Argano_io" target="_blank" rel="noreferrer"><i className="fab fa-telegram-plane"></i></a>
          <a href="https://discord.com/invite/mH7PJnNCWP" target="_blank" rel="noreferrer"><i className="fab fa-discord"></i></a>
          <a href="https://twitter.com/argano_io" target="_blank" rel="noreferrer"><i className="fab fa-twitter"></i></a>
          <a href="https://argano.medium.com/" target="_blank" rel="noreferrer"><i className="fab fa-medium"></i></a>
          <a href="https://github.com/Argano-DEX/Argano-Contracts" target="_blank" rel="noreferrer"><i className="fab fa-github"></i></a>
        </SocialMediasList>
        {PAGES.map((item, index) => {
          return (
            <NavLink to={item.path} onClick={() => setActiveTab(item.path)} key={`side_bar_${index}`}>
              <LinkListItem active={item.path === activeTab} name={item.name} light={theme === "light"}>
                {React.createElement(item.component, {})}
                <div className='hover_title'>{item.name}</div>
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
      {/* <ThemeSwitcher /> */}
    </SideBarWrapper >
  )
}