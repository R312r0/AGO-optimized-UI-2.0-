import styled from "styled-components"

export const BalancesTabWrapper = styled.div`
  max-width: 100%;
  transition: 0.3s all;
  /* width: ${props => props.opened ? "fit-content" : "20%"}; */
  width: fit-content;
  align-self: center;
  height: 52px;
  transition: all .5s ease;

  padding: 0.4vw ${props => props.account ? "0.8vw 0.4vw 0.5vw" : "1.2vw"};
  margin: 0.4vw 0 0.45vw 0.5vw;

  background: ${props => props.mobile ? "transparent" : props.light ? "#40BA93" : "linear-gradient(95.07deg, rgba(58, 58, 58, 0.4) -21.03%, rgba(0, 0, 0, 0.4) 139.31%), rgba(51, 51, 51, 0.1)"};
  border: ${props => props.mobile ? "0" : props.light ? "1px solid #BDBDBD" : "0.052vw solid #333333"};
  box-sizing: border-box;
  border-radius: 1.302vw;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 0.65vw;
  overflow: hidden;
  overflow-x: auto;
  cursor: pointer;

  &::-webkit-scrollbar {
      height:0px;
    }
    
    &::-webkit-scrollbar-track {
      box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    }
    
    &::-webkit-scrollbar-thumb {
      background-color: darkgrey;
      outline: 1px solid slategrey;
    }

  @media screen and (max-width: 1024px) {
    font-size: 0.9vw;
  }

  @media screen and (max-width: 750px) {
    width: 100%;
    height: auto;

    margin: 0;
    font-size: 2.5vw;
  }

  .vector {
    width: 0.521vw;
    height: 0.521vw;
    -webkit-transition: .4s ease;

    margin: auto auto auto ${props => props.opened ? "0.2vw" : "0.7vw"};
    transform: ${props => props.opened ? "rotate(180deg)" : "none"};
    
    @media screen and (max-width: 1024px) {
      width: 0.938vw;
      height: 0.938vw;

      margin: 0 0.5vw;
    }

    @media screen and (max-width: 750px) {
      display: none;
    }
  }

  p {
    color: white;
    white-space: nowrap;
    line-height: 1;
  }

  .balance-tab-wrapper {
    display: flex;
    align-items: center;
    margin-right: auto;
    
    @media screen and (max-width: 750px) {
      display: grid;
      grid-template-columns: repeat(2, auto);
      grid-template-rows: repeat(2, 1fr);

      margin: 0;

      align-items: center;
    }

    .balance {
      color:  ${props => props.light ? '#fff' : "#40BA93"};
  
      @media screen and (max-width: 750px) {
        grid-area: 1 / 2 / 2 / 3;
        
        margin-left: 1.6vw;

        font-size: 3.733vw;
        font-weight: 500;
      }
    }

    .balance-tab-wrapper__pig {
      width: 2.083vw;
      height: 2.083vw;

      grid-area: 1 / 1 / 3 / 2;

      & path{
        &:nth-child(1){
          fill: ${props => props.light ? '#fff' : "#4F4F4F"}
        }
      }

      & circle{
        &:nth-child(2){
          fill: ${props => props.light ? '#40BA93' : "#4F4F4F"}
        }
        &:nth-child(3){
          fill: ${props => props.light ? '#fff' : "#4F4F4F"}
        }
        &:nth-child(4){
          fill: ${props => props.light ? '#BDBDBD' : "#4F4F4F"}
        }
       
        
      }

      @media screen and (max-width: 750px) {
        width: 9.067vw;
        height: 9.067vw;
      }
    }

    p {
      font-size: 0.8vw;

      @media screen and (max-width: 1024px) {
        font-size: 1.2vw;
      }

      @media screen and (max-width: 750px) {
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

      @media screen and (max-width: 1024px) {
        margin-left: ${props => props.opened ? "3.2vw" : "2.8vw"};
      }

      @media screen and (max-width: 750px) {
        grid-area: 2 / 2 / 5 / 3;

        margin: 0 auto 0 1.6vw;
        font-size: 4vw;
        justify-content: start;
      }
    }

    transition: all .3s;

    &:hover{
      opacity: 0.6;
    }
  }
`

export const BalancesMobileExpandWrapper = styled.div`
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

export const BalanceExpand = styled.div`
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

export const BalanceOverall = styled.div`
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

export const BalanceList = styled.ul`
  max-width: 100%;
  width: 100%;
  box-sizing: border-box;
  padding: 2.083vw;
  overflow: hidden;
  display: grid;
  grid-template-columns: auto;
`

export const BalanceSwipeStripe = styled.div`
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

export const BalanceListItem = styled.li`
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

export const BalanceListDesktop = styled.ul`
  max-width: 80%;
  display: flex;
  height: 100%;
  transition: all .5s ease;
  width:  ${props => props.opened ? "fit-content" : "0"};
  margin-left: ${props => props.opened ? "20px" : "0"};
  margin-bottom: 0;
  align-items: center;
  column-gap: 35px;
  color: white;

  opacity: ${props => props.opened ? "1" : "0"};
  overflow: hidden;
  overflow-x: auto;

    &::-webkit-scrollbar {
        height:0px;
      }
    
    &::-webkit-scrollbar-track {
      box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    }
    
    &::-webkit-scrollbar-thumb {
      background-color: darkgrey;
      outline: 1px solid slategrey;
    }
  
  @media screen and (max-width: 750px) {
    display: none;
  }
`

export const BalanceListItemDesktop = styled.li`
  display: flex;
  align-items: center;
  column-gap: 5px;
  padding-right: 30px;

  img {
    max-width:23px;
    width: 100%;
    background: ${props => props.light ? "#fff" : "transpered"};
    border-radius: 50%;
    padding: 1px;
  }

  span {
    color: ${props => props.light ? "#fff" : "#828282"};
    font-size: 0.729vw;
  }

  &:not(:last-child) {
    border-right:1px solid #4F4F4F;
  }
`