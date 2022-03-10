import { MenuItem, Select } from "@mui/material";

import styled from "styled-components";
import { styled as styledMUI } from "@mui/material/styles";

export const TradingChartContainer = styled.div`
  background: ${(props) =>
    props.theme.light
      ? "radial-gradient(113.47% 7561.36% at -5.76% -16.06%, rgba(95, 234, 190, 0.56) 0%, rgba(95, 234, 190, 0) 100%)"
      : "radial-gradient(94.26% 94.26% at 47.39% 30.04%,rgba(64, 186, 147, 0.16) 0%,rgba(0, 0, 0, 0) 100%),linear-gradient(90.99deg, #1d1d1d 2.18%, #232323 104.4%)"};
  padding: 0.677vw 2.5vw 1.094vw 2.5vw;
  border-radius: 2.083vw;
  border: ${(props) => (props.theme.light ? "0.052vw solid #40BA93" : "none")};
  margin-top: 1.302vw;
  height: 33.698vw;
  width: 50.938vw;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0.208vw 2.083vw rgba(0, 0, 0, 0.25);
`;

export const ChartsContainer = styled.div`
  flex-direction: column;
  display: flex;
`;

export const HDiv = styled.div`
  align-items: ${(props) => props.alignItems};
  justify-content: ${(props) => props.justifyContent};
  margin-left: ${(props) => props.ml};
  margin-top: ${(props) => props.mt};
  flex-direction: row;
  display: flex;
`;

export const Text = styled.span`
  color: ${(props) => (props.theme.light ? "#333" : "#fff")};
  font-weight: ${(props) => props.fontWeight ?? "300"};
  margin-left: ${(props) => props.ml};
  line-height: 1.875vw;
  font-size: 1.25vw;
`;

export const ChartSwitchBtn = styled.button`
  justify-content: center;
  border-radius: 0.521vw;
  margin-left: 1.042vw;
  align-items: center;
  background: #40ba93;
  height: 1.979vw;
  width: 1.979vw;
  display: flex;

  &:hover {
    opacity: 0.8;
  }
`;

export const ChartWrapper = styled.div`
  display: flex;
  width: auto;
`;

export const ResetBtn = styled.button`
  justify-content: center;
  align-items: center;
  border-radius: 0.521vw;
  margin-top: 0.1vw;
  background: #40ba93;
  font-size: 0.729vw;
  height: 1.458vw;
  width: 4.063vw;
  color: #fff;
  display: flex;

  &:hover {
    opacity: 0.8;
  }
`;

export const DropdownMenu = styledMUI(Select)((props) => ({
  border: "0.052vw solid",
  borderColor: "#40BA93",
  borderRadius: "0.521vw",
  height: "1.979vw",
  width: "6.302vw",
  fontSize: "0.729vw",
  color: props.theme === "light" ? "#333" : "#fff",
  position: "relative",

  ".MuiOutlinedInput-input": {
    display: "flex",
    padding: "0 0 0 0.521vw",
  },

  ".MuiOutlinedInput-notchedOutline": {
    border: "none",
  },

  ".MuiSelect-icon": {
    color: props.theme === "light" ? "#333" : "#fff",
    display: "flex",
    position: "absolute",
    right: "0.2vw",
    top: "0.15vw",
    height: "1.521vw",
    margin: 0,
    padding: 0,
    width: "1.521vw",
  },
}));

export const DropdownMenuItem = styledMUI(MenuItem)((props) => ({
  color: "#fff",
  fontSize: "0.729vw",
  lineHeight: "1.094vw",
  fontWeight: 500,
  width: "6.302vw",
  "&.MuiMenuItem-root": {
    "&:hover, &.Mui-focusVisible": {
      background: props.theme === "dark" ? "rgb(10%, 10%, 10%, .9)" : "#C376FF",
    },
    "&.Mui-selected": {
      background: props.theme === "dark" ? "rgb(10%, 10%, 10%, .9)" : "#C376FF",
      "&:hover": {
        background:
          props.theme === "dark" ? "rgb(10%, 10%, 10%, .9)" : "#C376FF",
      },
    },
    "&:hover": {
      background:
        props.theme === "dark"
          ? "rgb(10%, 10%, 10%, .4)"
          : "rgb(10%, 10%, 10%, .1)",
    },
  },
  minHeight: "1.198vw",
}));
