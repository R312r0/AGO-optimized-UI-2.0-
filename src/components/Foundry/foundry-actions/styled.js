import styled from "styled-components";

export const FoundryActionsContainer = styled.div`
  margin-top: 3.49vw;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-gap: 2.083vw;
`;

export const FoundryActionsItem = styled.div`
  background: ${(props) => (props.theme.light ? "#fff" : "linear-gradient(90.99deg, #1d1d1d 2.18%, #232323 104.4%)")};
  padding: 4.375vw 2.5vw 1.823vw 2.5vw;
  border-radius: 2.083vw;
  flex-direction: column;
  width: 41.563vw;
  display: flex;
`;

export const FoundryActionsItemLabel = styled.div`
  background: ${(props) => (props.theme.light ? "#C990FD" : "#333")};
  border-radius: 1.042vw;
  margin-top: -5.99vw;
  margin-left: -1.5vw;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 1.25vw;
  width: 8.073vw;
  height: 3.229vw;
`;

export const Text = styled.span`
  color: ${(props) => (props.theme.light ? "#333" : "#fff")};
  margin-top: ${(props) => props.mt};
  margin-left: ${(props) => props.ml};
  line-height: 1.875vw;
  font-size: 1.25vw;
`;

export const HDiv = styled.div`
  margin-top: ${(props) => props.mt};
  margin-left: ${(props) => props.ml};
  margin-right: ${(props) => props.mr};
  justify-content: space-between;
  align-items: center;
  display: flex;

  img {
    margin-right: 0.417vw;
    width: 2.448vw;
    height: 2.448vw;
  }

  div {
    align-items: center;
    display: flex;
  }
`;

export const FoundryActionsInputContainer = styled.div`
  margin-top: ${(props) => props.mt};
  justify-content: space-between;
  border: 0.052vw solid;
  border-color: ${(props) => (props.theme.light ? "#F2F2F2" : "#333")};
  padding: 0 0.313vw 0 0.885vw;
  border-radius: 1.563vw;
  align-items: center;
  font-size: 0.938vw;
  display: flex;

  width: 27.344vw;
  height: 2.448vw;
  color: #828282;

  input {
    /* color: #fff; */
    width: inherit;
    ::placeholder {
      color: ${(props) => (props.theme.light ? "#BDBDBD" : "#4F4F4F")};
    }
  }

  button {
    background: ${(props) => (props.theme.light ? "linear-gradient(112.62deg, #40BA93 11.06%, #C407E3 128.79%)" : "#2c2c2c")};
    border-radius: 2.083vw;
    font-size: 0.729vw;
    width: 4.219vw;
    height: 1.875vw;
    color: #fff;

    &:hover {
      opacity: 0.8;
    }
  }
`;

export const Divider = styled.div`
  background: #333333;
  margin: 0 0.521vw;
  height: 2.188vw;
  width: 0.052vw;
`;

export const FoundryActionsBtnWrapper = styled.div`
  width: ${(props) => props.w ?? "8.021vw"};
  margin-top: ${(props) => props.mt};
  border-radius: 1.042vw;
  font-size: 0.729vw;
  height: 2.448vw;

  button {
    -webkit-backface-visibility: hidden;
    border-radius: 1.042vw;
    border: 0.05vw solid;
    border-color: ${(props) => (props.withGradient ? "#40ba93" : "#4F4F4F")};
    color: ${(props) => (props.withGradient && !props.theme.light ? "#fff" : "#4F4F4F")};
    position: relative;
    overflow: hidden;
    height: inherit;
    width: inherit;
    z-index: 1;
  }

  button:after {
    background: ${(props) =>
      props.withGradient
        ? "linear-gradient(102.16deg, #40ba93 12.3%, #9421ee 160.82%)"
        : ""};
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
    border-color: ${(props) => (props.withGradient ? "40ba93" : props.theme.light ? "#000" : "#fff")};
    color: ${(props) => (!props.withGradient &&  props.theme.light ? "#000" : "#fff")};
  }

  button:hover:after {
    opacity: 1;
  }

  button span {
    position: relative;
    z-index: 3;
  }
`;
