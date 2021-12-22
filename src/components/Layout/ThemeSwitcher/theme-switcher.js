import React, { useEffect } from 'react';
import styled from 'styled-components';
import {useSystemContext} from '../../../systemProvider';
import {useMediaQuery} from 'react-responsive';

const ThemeSwitcherWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  margin: ${props => props.mobile ? "0" : "2vw 0 4vw 0.7vw"};
  
  width: 100%;

  svg {
    width: ${props => props.mobile ? "3.733vw" : "0.729vw"};
    height : ${props => props.mobile ? "3.733vw" : "0.729vw"};

    &:first-child {
      width: ${props => props.mobile ? "2.4vw" : "0.469vw"};
    }
  }

  .acitve-daytime {
    color: #40BA93;
  }

  .switch-wrapper {
    width: fit-content;
    padding: ${props => props.mobile ? " 0 2.667vw " : "0 0.521vw"};

    .switch {
      display: none;
    }
    
    .switch + div {
      width: ${props => props.mobile ? "13.333vw" : "2.604vw"};
      height: ${props => props.mobile ? "6.933vw" : "1.354vw"};

      border-radius: ${props => props.mobile ? "26.667vw" : "1.042vw"};
      border: ${props => props.mobile ? "0.400vw" : "0.052vw"} solid #F2F2F2;

      background: #F2F2F2;
      transition: background-color 200ms;
      cursor: pointer;
    }
    
    .switch + div > div {
      width: 50%;
      height: ${props => props.mobile ? "100%" : "100%"};

      border-radius: 100%;
      background: #333;

      transition: transform 250ms;
      pointer-events: none;
    }

    .switch:checked + div > div {
      background-color: white;
    }
    
    .switch:checked + div {
      border: ${props => props.mobile ? "0.400vw" : "0.052vw"} solid #40BA93;
      background-color: #40BA93;
    }
    
    .switch:checked + div > div {
      transform: ${props => props.mobile ? "translateX(100%)" : "translateX(100%)"};
    }
  }
`

export const ThemeSwitcher = () => {

    const {theme, setTheme} = useSystemContext();
    const isMobileScreen = useMediaQuery({query: '(max-width: 750px)'});

    const setNewTheme = () => {
      const trueTheme = theme === "dark" ? "light" : "dark";
      localStorage.setItem('theme', trueTheme);
      setTheme(trueTheme);
    }

    useEffect(()=>{
      setTimeout(()=>{
          const themeValue = localStorage.getItem('theme');
          if(themeValue === "light"){
            document.body.classList.add('light-theme')
          }else{
            document.body.classList.remove('light-theme')
          }
      },0)
    },[theme])
    return (
        <ThemeSwitcherWrapper theme={theme} mobile={isMobileScreen}>
            <svg width="9" height="14" viewBox="0 0 9 14" fill={theme === "dark" ? '#40BA93' : '#333'} xmlns="http://www.w3.org/2000/svg">
            <path d="M6.92308 0C7.65 0 8.34231 0.112 9 0.322C6.18923 1.211 4.15385 3.864 4.15385 7C4.15385 10.136 6.18923 12.789 9 13.678C8.34231 13.888 7.65 14 6.92308 14C3.10154 14 0 10.864 0 7C0 3.136 3.10154 0 6.92308 0Z" />
            </svg>

            {/* <label className="label">
                <div className={theme === "light" ? 'toggle active-theme-switch' : 'toggle'}>
                    <input 
                    className="toggle-state" 
                    onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
                    type="checkbox" name="check"
                    />
                    <div className="indicator"></div>
                </div>
            </label> */}

            <div className="switch-wrapper">
                <label>
                    <input 
                    className="switch" 
                    checked={theme !== "dark"}
                    type="checkbox" 
                    onChange={setNewTheme}
                    />
                    <div>
                      <div></div>
                    </div>
                </label>
            </div>
            <svg width="14" height="14" viewBox="0 0 14 14" fill={theme === "light" ? '#40BA93' : 'white'} xmlns="http://www.w3.org/2000/svg">
            <path d="M10.5 7C10.5 7.92826 10.1313 8.8185 9.47487 9.47487C8.8185 10.1313 7.92826 10.5 7 10.5C6.07174 10.5 5.1815 10.1313 4.52513 9.47487C3.86875 8.8185 3.5 7.92826 3.5 7C3.5 6.07174 3.86875 5.1815 4.52513 4.52513C5.1815 3.86875 6.07174 3.5 7 3.5C7.92826 3.5 8.8185 3.86875 9.47487 4.52513C10.1313 5.1815 10.5 6.07174 10.5 7ZM7 0C7.11603 0 7.22731 0.0460936 7.30936 0.128141C7.39141 0.210188 7.4375 0.321468 7.4375 0.4375V2.1875C7.4375 2.30353 7.39141 2.41481 7.30936 2.49686C7.22731 2.57891 7.11603 2.625 7 2.625C6.88397 2.625 6.77269 2.57891 6.69064 2.49686C6.60859 2.41481 6.5625 2.30353 6.5625 2.1875V0.4375C6.5625 0.321468 6.60859 0.210188 6.69064 0.128141C6.77269 0.0460936 6.88397 0 7 0V0ZM7 11.375C7.11603 11.375 7.22731 11.4211 7.30936 11.5031C7.39141 11.5852 7.4375 11.6965 7.4375 11.8125V13.5625C7.4375 13.6785 7.39141 13.7898 7.30936 13.8719C7.22731 13.9539 7.11603 14 7 14C6.88397 14 6.77269 13.9539 6.69064 13.8719C6.60859 13.7898 6.5625 13.6785 6.5625 13.5625V11.8125C6.5625 11.6965 6.60859 11.5852 6.69064 11.5031C6.77269 11.4211 6.88397 11.375 7 11.375ZM14 7C14 7.11603 13.9539 7.22731 13.8719 7.30936C13.7898 7.39141 13.6785 7.4375 13.5625 7.4375H11.8125C11.6965 7.4375 11.5852 7.39141 11.5031 7.30936C11.4211 7.22731 11.375 7.11603 11.375 7C11.375 6.88397 11.4211 6.77269 11.5031 6.69064C11.5852 6.60859 11.6965 6.5625 11.8125 6.5625H13.5625C13.6785 6.5625 13.7898 6.60859 13.8719 6.69064C13.9539 6.77269 14 6.88397 14 7ZM2.625 7C2.625 7.11603 2.57891 7.22731 2.49686 7.30936C2.41481 7.39141 2.30353 7.4375 2.1875 7.4375H0.4375C0.321468 7.4375 0.210188 7.39141 0.128141 7.30936C0.0460936 7.22731 0 7.11603 0 7C0 6.88397 0.0460936 6.77269 0.128141 6.69064C0.210188 6.60859 0.321468 6.5625 0.4375 6.5625H2.1875C2.30353 6.5625 2.41481 6.60859 2.49686 6.69064C2.57891 6.77269 2.625 6.88397 2.625 7ZM11.9499 2.05012C12.0319 2.13217 12.078 2.24343 12.078 2.35944C12.078 2.47545 12.0319 2.58671 11.9499 2.66875L10.7126 3.90688C10.6719 3.94749 10.6237 3.9797 10.5705 4.00167C10.5174 4.02363 10.4605 4.03491 10.403 4.03487C10.2869 4.03479 10.1756 3.98859 10.0936 3.90644C10.0529 3.86576 10.0207 3.81748 9.99877 3.76436C9.97681 3.71123 9.96553 3.6543 9.96557 3.59682C9.96565 3.48072 10.0118 3.36941 10.094 3.28737L11.3313 2.05012C11.4133 1.96811 11.5246 1.92203 11.6406 1.92203C11.7566 1.92203 11.8678 1.96811 11.9499 2.05012ZM3.906 10.094C3.98802 10.176 4.03409 10.2873 4.03409 10.4033C4.03409 10.5193 3.98802 10.6306 3.906 10.7126L2.66875 11.9499C2.58624 12.0296 2.47572 12.0737 2.36101 12.0727C2.2463 12.0717 2.13657 12.0257 2.05545 11.9445C1.97434 11.8634 1.92833 11.7537 1.92733 11.639C1.92633 11.5243 1.97043 11.4138 2.05012 11.3313L3.28737 10.094C3.36942 10.012 3.48068 9.96591 3.59669 9.96591C3.7127 9.96591 3.82396 10.012 3.906 10.094ZM11.9499 11.9499C11.8678 12.0319 11.7566 12.078 11.6406 12.078C11.5246 12.078 11.4133 12.0319 11.3313 11.9499L10.094 10.7126C10.0143 10.6301 9.97021 10.5196 9.97121 10.4049C9.9722 10.2902 10.0182 10.1804 10.0993 10.0993C10.1804 10.0182 10.2902 9.9722 10.4049 9.97121C10.5196 9.97021 10.6301 10.0143 10.7126 10.094L11.9499 11.3313C12.0319 11.4133 12.078 11.5246 12.078 11.6406C12.078 11.7566 12.0319 11.8678 11.9499 11.9499ZM3.906 3.90688C3.82396 3.98889 3.7127 4.03497 3.59669 4.03497C3.48068 4.03497 3.36942 3.98889 3.28737 3.90688L2.05012 2.66875C2.00834 2.62839 1.97501 2.58012 1.95208 2.52674C1.92915 2.47336 1.91708 2.41595 1.91658 2.35786C1.91607 2.29977 1.92714 2.24216 1.94914 2.1884C1.97114 2.13463 2.00362 2.08578 2.0447 2.0447C2.08578 2.00362 2.13463 1.97114 2.1884 1.94914C2.24216 1.92714 2.29977 1.91607 2.35786 1.91658C2.41595 1.91708 2.47336 1.92915 2.52674 1.95208C2.58012 1.97501 2.62839 2.00834 2.66875 2.05012L3.906 3.28737C3.94674 3.32801 3.97907 3.37629 4.00112 3.42945C4.02318 3.4826 4.03453 3.53958 4.03453 3.59713C4.03453 3.65467 4.02318 3.71165 4.00112 3.7648C3.97907 3.81796 3.94674 3.86624 3.906 3.90688Z"/>
            </svg>
        </ThemeSwitcherWrapper>
    )
}