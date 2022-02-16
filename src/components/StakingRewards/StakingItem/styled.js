import styled from "styled-components";

export const StakingItemContainer = styled.div`
  backface-visibility: hidden;
  background: ${(props) =>
    props.theme.light
      ? "#fff"
      : props.isExpanded
      ? "radial-gradient(63.69% 1148.13% at 41.28% 56.35%, rgba(46, 147, 115, 0.2) 0%, rgba(0, 0, 0, 0.2) 100%), linear-gradient(90.99deg, #1D1D1D 2.18%, #232323 104.4%)"
      : "linear-gradient(90.99deg, #1d1d1d 2.18%, #232323 104.4%)"};
  padding: ${(props) =>
    props.isExpanded
      ? "1.25vw 2.813vw 1.25vw 3.906vw"
      : "1.25vw 2.813vw 1.25vw 3.906vw"};
  height: ${(props) => (props.isExpanded ? "18.271vw" : "5.573vw")};
  cursor: ${props => props.isExpanded ? "default" : "pointer"};
  margin-top: 0.938vw;
  border-radius: 2.083vw;
  width: 81.771vw;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: ${(props) => (props.isExpanded ? "scale(1.01)" : "scale(1.01)")};
  }
`;

export const Text = styled.span`
  color: ${(props) =>
    !props.theme.light ? props.color ?? "#4F4F4F" : "#4F4F4F"};
  min-width: ${(props) => props.minW};
  padding-left: ${(props) => props.pl};
  margin-top: ${(props) => props.mt};
  margin-left: ${(props) => props.ml};
  margin-right: ${(props) => props.mr};
  position: relative;
  left: ${(props) => props.left};
  line-height: 1.406vw;
  font-size: 0.938vw;
  font-weight: 300;

  b {
    color: ${(props) => (props.theme.light ? "#333" : "#fff")};
    line-height: ${(props) => (props.isExpanded ? "1.875vw" : "1.406vw")};
    font-size: ${(props) => (props.isExpanded ? "1.25vw" : "0.938vw")};
    font-weight: 500;
  }

  a {
    line-height: ${(props) => (props.isExpanded ? "1.875vw" : "1.406vw")};
    font-size: ${(props) => (props.isExpanded ? "1.25vw" : "0.938vw")};
    font-weight: ${(props) => (props.inactive ? 500 : 300)};
    color: ${(props) =>
      props.inactive ? (props.theme.light ? "#333" : "#fff") : "#40ba93"};
    cursor: ${(props) => (props.inactive ? "default" : "pointer")};
  }

  img {
    height: 1.354vw;
    width: 1.289vw;
  }

  -webkit-animation: growElement 0.3s 1;
  animation: growElement 0.3s 1;

  @keyframes growElement {
    0% {
      -webkit-transform: scale(0.5, 0.5);
      transform: scale(0.5, 0.5);
    }
    50% {
      -webkit-transform: scale(0.75, 0.75);
      transform: scale(1, 1);
    }
    100% {
      -webkit-transform: scale(1, 1);
      transform: scale(1, 1);
    }
  }
`;

export const HDiv = styled.div`
  margin-top: ${(props) => props.mt};
  margin-left: ${(props) => props.ml};
  margin-right: ${(props) => props.mr};
  padding-left: ${(props) => props.pl};
  padding-right: ${(props) => props.pr};
  align-items: ${(props) => props.alignItems};
  justify-content: space-between;
  display: flex;
  width: 100%;

  div {
    min-width: 6vw;
    display: flex;
  }

  img {
    margin-right: ${(props) => (props.isExpanded ? "0.469vw" : "0.729vw")};
    width: ${(props) => (props.isExpanded ? "1.823vw" : "1.302vw")};
  }
`;

export const VDiv = styled.div`
  flex-direction: column;
  position: relative;
  right: ${(props) => props.right};
  left: ${(props) => props.left};

  div {
    justify-content: space-between;
    align-items: center;
  }
  
  button {
    border-radius: 2.083vw;
    background: ${(props) =>
      props.theme.light
        ? "linear-gradient(108.47deg, #40BA93 18.02%, #9421EE 151.52%);"
        : "#2c2c2c"};
    font-size: 0.729vw;
    height: 1.875vw;
    width: 4.219vw;
    color: #fff;

    &:hover {
      opacity: 0.8;
    }
  }
`;

export const ChangeActionButton = styled.span`
  transition: 0.3s all;
  cursor: pointer;
  color: ${props => props.active ? "#40BA93" : "#4f4f4f"};
  &:hover {
    color: white;
  }
    
`;

export const ToggleBtnWrapper = styled.div`
  margin-left: ${(props) => props.ml};
  margin-top: ${(props) => props.mt};
  font-size: 0.729vw;
  height: 1.615vw;
  width: 4.896vw;
  color: #40ba93;

  button {
    -webkit-backface-visibility: hidden;
    border-radius: inherit;
    border-radius: 1.042vw;
    border: 0.04vw solid;
    position: relative;
    overflow: hidden;
    height: inherit;
    width: inherit;
    z-index: 1;
  }

  button:after {
    background: linear-gradient(102.16deg, #40ba93 12.3%, #9421ee 160.82%);
    transition: all 0.3s ease-out;
    background-repeat: repeat;
    position: absolute;
    overflow: hidden;
    height: inherit;
    width: inherit;
    content: "";
    z-index: 2;
    opacity: 0;
    left: 0;
    top: 0;
  }

  button:hover:after {
    opacity: 1;
  }

  button:hover span {
    color: white;
  }

  button span {
    color: ${(props) => (props.theme.light ? "#333" : "#fff")};
    position: relative;
    z-index: 3;
  }
`;

export const ExpandedDataWrapper = styled.div`
  width: 59.948vw;
  display: flex;
  animation: 0.2s show ease-in-out;
  animation-delay: 0.2s;
  animation-fill-mode: backwards;

  @keyframes show {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const StackingBtnContainer = styled.div`
  margin-left: 4.688vw;
  flex-direction: column;
  display: flex;
  justify-content: flex-end;
`;
export const StackingBtn = styled.button`
  background: ${(props) => (props.stake ? "#40BA93" : "transparent")};
  margin-top: ${(props) => props.mt};
  color: ${(props) =>
    props.theme.light ? (props.stake ? "#fff" : "333") : "#fff"};
  border: ${(props) => (props.stake ? "unset" : "0.052vw solid")};
  border-color: ${(props) => (props.stake ? "unset" : "#4F4F4F")};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 1.563vw;
  height: 2.969vw;
  font-size: 0.938vw;
  min-width: 7.552vw;

  &:hover {
    opacity: 0.8;
  }
`;

export const HarvestBtn = styled.button`
  justify-content: center;
  border-radius: 1.042vw;
  border: 0.052vw solid;
  border-color: #4f4f4f;
  align-items: center;
  font-size: 0.938vw;
  font-weight: 300;
  height: 2.552vw;
  width: 8.333vw;
  color: #828282;
  display: flex;

  &:hover {
    background: ${(props) => (props.theme.light ? "#E0E0E0" : "#1a1a1a")};
  }
`;

export const Wrapper = styled.div`
  padding: 1.771vw 2.5vw 1.198vw 2.917vw;
  border-radius: 2.083vw;
  margin-top: 0.781vw;
  background: ${(props) => (props.theme.light ? "#FBFBFB" : "#1e1e1e")};
  width: 59.948vw;
  height: 7.188vw;
`;

export const StakingInputContainer = styled.div`
  color: ${(props) =>
    props.placeholderColor ?? (props.theme.light ? "#333" : "#fff")};
  padding-left: 0.833vw;
  font-weight: 300;
  border: 0.052vw solid;
  border-color: ${(props) => (props.theme.light ? "#E0E0E0" : "#333")};
  border-radius: 2.083vw;
  align-items: center;
  font-size: 1vw;
  display: flex;
  margin-top: 0.156vw;

  width: 16.25vw;
  height: 2.865vw;

  input {
    width: 100%;
    ::placeholder {
      color: ${(props) =>
        props.placeholderColor ?? (props.theme.light ? "#828282" : "#333")};
    }
  }

  button {
    font-size: 0.729vw;
    border-radius: 2.083vw;
    width: 4.219vw;
    height: 1.875vw;
    background: ${(props) =>
      props.theme.light
        ? "linear-gradient(288.26deg, #9421EE -65.56%, #40BA93 74.1%)"
        : "#2c2c2c"};
    color: #fff;

    &:hover {
      opacity: 0.8;
      color: #fff;
    }
  }
`;
