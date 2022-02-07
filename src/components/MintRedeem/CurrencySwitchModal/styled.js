import { Modal, Switch } from "@mui/material";
import { styled as styledMUI } from "@mui/material/styles";
import styled from "styled-components";

export const CurrencySwitchModalContainer = styledMUI(Modal)(() => ({
  justifyContent: "center",
  alignItems: "center",
  display: "flex",
}));

export const CurrencySwitchModalContent = styled.div`
  background: radial-gradient(
      106.65% 106.65% at 45.24% 101.55%,
      rgba(218, 255, 70, 0.2) 0%,
      rgba(0, 0, 0, 0) 100%
    ),
    radial-gradient(
      88.45% 106.08% at 85.95% 21.61%,
      rgba(64, 186, 147, 0.2) 0%,
      rgba(0, 0, 0, 0) 100%
    ),
    radial-gradient(
      83.55% 83.55% at 7.26% 16.45%,
      rgba(198, 20, 214, 0.2) 0%,
      rgba(0, 0, 0, 0) 100%
    ),
    rgba(36, 26, 46, 0.9);
  width: 19.531vw;
  height: 13.438vw;
  padding: 0.885vw 2.604vw 1.979vw 2.604vw;
  display: flex;
  align-items: center;
  flex-direction: column;
  border-radius: 2.604vw;
`;

export const IOSSwitch = styledMUI((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: "2.552vw",
  height: "1.302vw",
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    top: "0.096vw",
    left: "0.1vw",
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(1.25vw)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#BDBDBD" : "#40BA93",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "0.313vw solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: "1.094vw",
    height: "1.094vw",
  },
  "& .MuiSwitch-track": {
    borderRadius: "5.208vw",
    backgroundColor: theme.palette.mode === "light" ? "#BDBDBD" : "#40BA93",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

export const ModalButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: ${(props) =>
    props.theme.light
      ? ""
      : "-0.417vw -0.417vw 1.042vw rgba(28, 27, 27, 0.25), 0.208vw 0.208vw 0.521vw rgba(0, 0, 0, 0.25)"};
  cursor: pointer;
  border-radius: 0.833vw;
  background: ${(props) => (props.theme.light ? "#F2F2F2" : "#171717")};
  width: 3.542vw;
  height: 2.344vw;

  img {
    width: 1.146vw;
    height: 1.146vw;
  }

  &:hover {
    background: ${(props) => (props.theme.light ? "#C4C4C4" : "#0e0e0e")};
  }
`;

export const Text = styled.span`
  line-height: ${(props) => props.lineHeight ?? "1.563vw"};
  font-size: ${(props) => props.fontSize ?? "1.042vw"};
  font-weight: ${(props) => props.fontWeight ?? 500};
  color: #fff;
`;

export const HDiv = styled.div`
  justify-content: space-between;
  align-items: center;
  margin-top: 2.813vw;
  display: flex;

  svg {
    margin: 0 2.083vw;
  }
`;

export const Divider = styled.div`
  background: #404040;
  margin: 1.406vw 0;
  width: 14.271vw;
  height: 0.052vw;
`;
