import Slider, { SliderThumb } from "@mui/material/Slider";

import { Modal } from "@mui/material";
import styled from "styled-components";
import { styled as styledMUI } from "@mui/material/styles";

export const RemoveLiqudityModalContainer = styledMUI(Modal)(() => ({
  justifyContent: "center",
  alignItems: "center",
  display: "flex",
}));

export const LiqSlider = styledMUI(Slider)({
  width: "12.188vw",
  color: "#40BA93",
  height: "0.260vw",
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-thumb": {
    height: "0.573vw",
    width: "0.573vw",
    backgroundColor: "#40BA93",
    border: "0.104vw solid #fff",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
    },
    "&:before": {
      display: "none",
    },
  },
});

export const VDiv = styled.div`
  justify-content: ${(props) => props.justifyContent};
  align-items: ${(props) => props.alignItems};
  flex-direction: column;
  display: flex;
  height: 1.7vw;
`;

export const RemoveLiqudityModalContent = styled.div`
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

export const ChartBtn = styled.button`
  border-radius: 1.563vw;
  background: #40ba93;
  height: 1.51vw;
  font-size: 0.729vw;
  width: 5.521vw;
  color: #fff;

  &:hover {
    opacity: 0.8;
  }
`;

export const RemoveLiqudityInfoContainer = styled.div`
  padding: 1.042vw 2.865vw 1.823vw 2.865vw;
  border-radius: 2.083vw;
  margin-top: 2.031vw;
  background: ${(props) => (props.theme.light ? "#FBFBFB" : "#1e1e1e")};
  height: 13.906vw;
  width: 35.938vw;
`;

export const HDiv = styled.div`
  justify-content: ${(props) => props.justifyContent};
  align-items: ${(props) => props.alignItems};
  margin-top: ${(props) => props.mt};
  margin-left: ${(props) => props.ml};
  flex-direction: row;
  display: flex;
`;

export const IconWrapper = styled.div`
  margin-right: ${(props) => props.mr};
  margin-left: ${(props) => props.ml};
  color: ${(props) => props.color};
  height: ${(props) => props.size};
  width: ${(props) => props.size};
  fill: #c4c4c4;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: inherit;
    height: inherit;
  }

  img {
    width: inherit;
    height: inherit;
  }
`;

export const Divider = styled.div`
  justify-self: center;
  align-self: center;
  display: flex;
  background: ${(props) => (props.theme.light ? "#E0E0E0" : "#333")};
  height: 1.927vw;
  width: 0.104vw;
`;

export const Text = styled.span`
  font-size: ${(props) => props.fontSize ?? "0.938vw"};
  color: ${(props) => props.color ?? "#4f4f4f"};
  margin-left: ${(props) => props.ml};
  min-width: ${(props) => props.minW};
  bottom: ${(props) => props.bottom};
  line-height: 1.406vw;
  position: relative;

  b {
    color: ${(props) => props.color ?? (props.theme.light ? "#333" : "#fff")};
    font-weight: ${(props) => props.fontWeight ?? "500"};
    font-size: ${(props) => props.fontSize ?? "1.25vw"};
    line-height: 1.875vw;
  }
`;

export const RemoveLiqudityInput = styled.input`
  font-size: 0.938vw;
  height: 1.563vw;
  width: 18.229vw;
  color: ${(props) => (props.theme.light ? "#333" : "#fff")};

  ::placeholder {
    color: #4f4f4f;
  }
`;

export const RemoveLiquidityBtn = styled.button`
  background: #40ba93;
  color: #fff;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  border-radius: 1.563vw;
  font-size: 0.938vw;
  align-self: center;
  width: 17.813vw;
  height: 3.698vw;

  &:hover {
    opacity: 0.8;
  }
`;

export const CancelBtn = styled.button`
  color: ${(props) => (props.theme.light ? "#4f4f4f" : "#fff")};
  border-radius: 1.563vw;
  border: 0.052vw solid;
  border-color: ${(props) => (props.theme.light ? "#E0E0E0" : "#40BA93")};
  margin-left: 0.313vw;
  font-size: 0.938vw;
  align-self: center;
  width: 17.813vw;
  height: 3.698vw;

  &:hover {
    opacity: 0.8;
  }
`;
