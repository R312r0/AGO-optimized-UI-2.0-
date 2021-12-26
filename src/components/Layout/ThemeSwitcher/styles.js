import styled from 'styled-components';

export const ThemeSwitcherWrapper = styled.div`
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