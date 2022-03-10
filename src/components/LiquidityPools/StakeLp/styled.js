import styled from "styled-components";

export const StakeLPContainer = styled.div`
  flex-direction: column;
  display: flex;
`;

export const StakeLPInfoContainer = styled.div`
  background: ${(props) =>
    props.theme.light
      ? props.theme.color === "green"
        ? "#4FCCA4"
        : props.theme.color === "violet"
        ? "#C184F2"
        : "#F2F2F2"
      : "linear-gradient(90.99deg, #1d1d1d 2.18%, #232323 104.4%)"};
  padding: 1.25vw 0 2.448vw 2.135vw;
  margin-top: 0.313vw;
  border-radius: 2.083vw;
  height: 8.75vw;
  width: 53.125vw;
`;

export const HDiv = styled.div`
  justify-content: ${(props) => props.justifyContent};
  align-items: ${(props) => props.alignItems};
  margin-top: ${(props) => props.mt};
  flex-direction: row;
  display: flex;
`;

export const IconWrapper = styled.div`
  justify-content: center;
  margin-right: 0.313vw;
  margin-left: 13.177vw;
  align-items: center;
  display: flex;

  img {
    height: 1.094vw;
    width: 1.094vw;
  }
`;

export const Text = styled.span`
  font-weight: ${(props) => props.fontWeight ?? "400"};
  font-size: ${(props) => props.fontSize ?? "0.729vw"};
  color: ${(props) => (props.theme.light ? "#fff" : props.color ?? "#4f4f4f")};
  margin-left: ${(props) => props.ml};
  min-width: ${(props) => props.minW};
  line-height: 1.094vw;
  display: flex;

  b {
    line-height: 1.406vw;
    font-size: 0.938vw;
    font-weight: 400;
    color: #fff;
  }
`;

export const StakeLPInputContainer = styled.div`
  border: 0.052vw solid;
  border-color: ${(props) => (props.theme.light ? "#fff" : "#333")};
  border-radius: 2.083vw;
  padding-left: 0.781vw;
  align-items: center;
  font-size: 0.938vw;
  font-weight: 300;
  display: flex;

  width: 21.354vw;
  height: 2.865vw;

  input {
    width: 100%;
    color: ${(props) => (props.theme.light ? props.theme.color ? "#fff" : "#333" : "#fff")};

    ::placeholder {
      color: ${(props) =>
        props.theme.light
          ? props.theme.color === "green"
            ? "#fff"
            : "#9421EE"
          : "#333"};
    }
  }

  button {
    border-radius: 2.083vw;
    margin-right: 0.521vw;
    background: ${(props) => (props.theme.light ? "#fff" : "#2c2c2c")};
    height: 1.875vw;
    width: 4.219vw;
    color: ${(props) => (props.theme.light ? "#4f4f4f" : "#fff")};

    &:hover {
      opacity: 0.8;
    }
  }
`;

export const ClaimBtnWrapper = styled.div`
  margin-top: ${(props) => props.mt};
  border-radius: 1.563vw;
  height: 2.969vw;
  width: 11.927vw;

  button {
    color: ${(props) => (!props.theme.light ? "#fff" : "#4F4F4F")};
    justify-content: center;
    border-radius: 1.563vw;
    border: 0.05vw solid;
    border-color: ${(props) => (props.theme.light ? "#fff" : "#40ba93")};
    align-items: center;
    position: relative;
    font-size: 0.938vw;
    font-weight: 500;
    overflow: hidden;
    height: inherit;
    width: inherit;
    color: #fff;
    z-index: 1;
    display: flex;
  }

  button:after {
    background: linear-gradient(98.91deg, #40ba93 24.2%, #9421ee 180.77%);
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

  button:hover {
    border-color: "40ba93";
    color: #fff;
  }

  button:hover:after {
    opacity: 1;
  }

  button span {
    position: relative;
    z-index: 3;
  }

  button img {
    margin-right: 0.938vw;
    position: relative;
    height: 1.25vw;
    width: 1.25vw;
    z-index: 3;
  }
`;

export const ApproveBtnWrapper = styled(ClaimBtnWrapper)`
  background: ${(props) =>
    props.theme.light && props.theme.color === "violet"
      ? "#9421EE"
      : "linear-gradient(114.78deg, #40ba93 22.8%, #9421ee 145.16%)"};
  border-radius: 1.563vw;
  margin-left: 21.563vw;
  height: 2.969vw;
  width: 7.552vw;

  button {
    border: none;
  }

  button:after {
    background: linear-gradient(102.66deg, #09eda4 23.65%, #9421ee 279.17%);
  }
`;

export const UnstakeBtn = styled.button`
  border-radius: 1.563vw;
  border: 1px solid;
  border-color: ${(props) => (props.theme.light ? "#fff" : "#4f4f4f")};
  height: 2.969vw;
  margin-left: 0.625vw;
  font-size: 0.938vw;
  font-weight: 500;
  width: 7.552vw;
  color: #fff;

  &:hover {
    border-color: ${(props) => (props.theme.light ? "#828282" : "#fff")};
  }
`;
