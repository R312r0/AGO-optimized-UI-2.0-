import { Modal } from "@mui/material";
import styled from "styled-components";
import { styled as styledMUI } from "@mui/material/styles";

export const CreatePairModalContainer = styledMUI(Modal)(() => ({
  justifyContent: "center",
  alignItems: "center",
  display: "flex",
}));

export const CreatePairModalContent = styled.div`
  background: ${(props) =>
    props.theme.light
      ? "#fff"
      : "radial-gradient(61.16% 3404.86% at 48.28% 79.61%,rgba(30, 117, 89, 0.3) 0%,rgba(9, 33, 25, 0.3) 100%),linear-gradient(90.99deg, #272727 2.18%, #1c1c1c 104.4%)"};
  width: 41.563vw;
  padding: 1.094vw 2.969vw 2.969vw 2.969vw;
  display: flex;
  flex-direction: column;
  border-radius: 2.604vw;
`;

export const CloseBtn = styled.button`
  justify-content: center;
  border-radius: 0.833vw;
  background: ${(props) => (props.theme.light ? "#F2F2F2" : "#171717")};
  align-items: center;
  height: 2.344vw;
  width: 3.542vw;
  display: flex;

  svg {
    stroke: ${(props) => (props.theme.light ? "#BDBDBD" : "#4f4f4f")};
    height: 0.99vw;
    width: 0.99vw;
  }

  &:hover {
    opacity: 0.8;
  }
`;

export const HDiv = styled.div`
  justify-content: ${(props) => props.justifyContent};
  align-items: ${(props) => props.alignItems};
  margin-left: ${(props) => props.ml};
  flex-direction: row;
  display: flex;
`;

export const IconWrapper = styled.div`
  margin-right: ${(props) => props.mr};
  margin-left: ${(props) => props.ml};
  margin: ${(props) => props.margin};
  align-self: center;
  height: ${(props) => props.size};
  width: ${(props) => props.size};
  fill: #c4c4c4;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.color};

  svg {
    width: inherit;
    height: inherit;
  }

  img {
    width: inherit;
    height: inherit;
  }
`;

export const IconBtn = styled.button`
  margin-right: ${(props) => props.mr};
  margin-left: ${(props) => props.ml};
  height: ${(props) => props.size};
  width: ${(props) => props.size};
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    fill: ${(props) => props.color};
    width: inherit;
    height: inherit;
  }
`;

export const Text = styled.span`
  font-size: ${(props) => props.fontSize ?? "0.938vw"};
  color: ${(props) => props.color ?? "#4f4f4f"};
  margin-left: ${(props) => props.ml};
  min-width: ${(props) => props.minW};
  line-height: 1.406vw;

  b {
    color: ${(props) => props.color ?? (props.theme.light ? "#333" : "#fff")};
    font-size: ${(props) => props.fontSize ?? "1.25vw"};
    font-weight: ${(props) => props.fontWeight ?? "500"};
    line-height: 1.875vw;
  }
`;

export const CreatePairModalBtn = styled.button`
  margin-left: 7.76vw;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 2.083vw;
  font-size: 0.938vw;
  border: 0.052vw solid;
  border-color: ${(props) => (props.theme.light ? "#9421EE" : "#4f4f4f")};
  height: 2.917vw;
  width: 11.771vw;
  color: ${(props) => (props.theme.light ? "#9421EE" : "#fff")};

  svg {
    fill: ${(props) => (props.theme.light ? "#9421EE" : "#fff")};
    stroke: ${(props) => (props.theme.light ? "#9421EE" : "#fff")};
    margin-right: 1.458vw;
    height: 1.094vw;
    width: 1.094vw;
  }

  &:hover {
    border-color: ${(props) => (props.theme.light ? "#333" : "#fff")};;
  }
`;

export const CreatePairInputContainer = styled.div`
  background-color: ${(props) => (props.theme.light ? "#FBFBFB" : "#1E1E1E")};
  padding: 1.25vw 1.344vw 1.938vw 1.8vw;
  margin-top: ${(props) => props.mt};
  height: 6.771vw;
  border-radius: 2.083vw;
  width: 35.625vw;
`;

export const InputWrapper = styled.div`
  color: ${(props) =>
    props.placeholderColor ?? (props.theme.light ? "#333" : "#fff")};
  padding: 0.521vw 0.573vw 0.521vw 1.302vw;
  justify-content: space-between;
  border: 0.052vw solid;
  border-color: ${(props) => (props.theme.light ? "#E0E0E0" : "#333")};
  border-radius: 2.083vw;
  margin-top: 0.313vw;
  align-items: center;
  font-size: 1.25vw;
  display: flex;

  width: 22.135vw;
  height: 2.865vw;

  input {
    ::placeholder {
      color: ${(props) =>
        props.placeholderColor ?? (props.theme.light ? "#BDBDBD" : "#333")};
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

export const CreatePairBtn = styled.button`
  background: ${(props) => (props.disabled ? "transparent" : "#40BA93")};
  color: ${(props) =>
    props.disabled ? (props.theme.light ? "#BDBDBD" : "#828282") : "#fff"};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  border-radius: 1.563vw;
  border: 0.052vw solid;
  border-color: ${(props) => (props.theme.light ? "#BDBDBD" : "#4f4f4f")};
  margin-top: 2.083vw;
  font-size: 0.938vw;
  align-self: center;
  width: 17.813vw;
  height: 3.698vw;

  &:hover {
    opacity: ${(props) => (props.disabled ? "1" : "0.8")};
  }
`;

export const TokenSearchInput = styled.input`
  padding: 0.885vw 0 0.885vw 2.396vw;
  border-radius: 2.083vw;
  border: 0.052vw solid;
  border-color: ${(props) => (props.theme.light ? "#E0E0E0" : "#4f4f4f")};
  margin-top: 1.094vw;
  font-size: 1.25vw;
  width: 35.625vw;
  height: 3.646vw;
  color: ${(props) => (props.theme.light ? "#333" : "#fff")};

  ::placeholder {
    color: ${(props) =>
      props.placeholderColor ?? (props.theme.light ? "#BDBDBD" : "#4F4F4F")};
    font-size: 1.25vw;
    font-weight: 300;
  }
`;

export const TokensList = styled.div`
  overflow-y: scroll;
  height: 24.2vw;
  width: 36.979vw;

  &::-webkit-scrollbar {
    width: 0.208vw;

    background: ${(props) => (props.theme.light ? "#F2F2F2" : "#333")};
    border-radius: 0.26vw;
  }

  &::-webkit-scrollbar-thumb {
    background: ${(props) => (props.theme.light ? "#BDBDBD" : "#333")};
    border-radius: 0.26vw;
  }
`;

export const ListItem = styled.li`
  padding: 1.172vw 0 1.172vw 2.708vw;
  border-radius: 2.083vw;
  background: ${(props) => (props.theme.light ? "#FBFBFB" : "#1e1e1e")};
  margin: 0.521vw 0;
  cursor: pointer;
  height: 4.219vw;
  width: 35.938vw;
  display: flex;

  &:hover {
    opacity: 0.95;
  }
`;

export const CancelBtn = styled.button`
  background: #40ba93;
  color: #fff;
  border-radius: 1.563vw;
  border: 0.052vw solid;
  border-color: ${(props) => (props.theme.light ? "#E0E0E0" : "#4f4f4f")};
  margin-top: 2.083vw;
  font-size: 0.938vw;
  align-self: center;
  width: 17.813vw;
  height: 3.698vw;

  &:hover {
    opacity: 0.8;
  }
`;
