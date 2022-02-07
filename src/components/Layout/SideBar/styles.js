import styled from "styled-components"

export const SideBarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  
  margin-top: 0.5vw;
  overflow: visible;
  position: relative;
  z-index: 10;

  &::-webkit-scrollbar {
    display: none;
  }

  .document_icon {
    margin-top: 1.4vw;

    width: 1.563vw;
    height: 2.083vw;
  }
`

export const SocialMediasList = styled.div`
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

export const LinkList = styled.ul`
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
    border: ${props => props.light ? '1px solid #E0E0E0': '1px solid #4F4F4F'};
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

export const LinkListItem = styled.li`
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
  
  background-color: ${(props) => (props.isActive ? "#40BA93" : "transparent")};


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
    z-index: 10;
    opacity:0;
    white-space:nowrap;
  }

  &:hover {
    background-color: ${(props) =>
      props.isActive ? "#40BA93" : props.light ? "#E0E0E0" : "#2D2C2C"};
    transition: 0.3s background-color;
    border-radius: 12px;

    & .hover_title {
      opacity: 1;
    }
  }

  &:last-child {
    // border: 0.052vw solid #4F4F4F;
    // margin-top: 4vw;
    border-radius: 0.6vw;
  }

  & svg {
    fill: ${(props) =>
      props.theme.light
        ? props.isActive
          ? "#fff"
          : "#BDBDBD"
        : props.isActive
        ? "#fff"
        : "#4F4F4F"};
  }
 
`


export const BottomLinks = styled.div`
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