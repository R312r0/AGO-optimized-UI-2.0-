import { Slider, Switch } from "@mui/material";

import styled from "styled-components";
import { styled as styledMUI } from "@mui/material/styles";
import { useThemeContext } from "../../Layout/layout";

export const TradingFiltersContainer = styled.div`
  background: ${(props) =>
    props.theme.light
      ? "#fff"
      : "radial-gradient(94.26% 94.26% at 47.39% 30.04%,rgba(64, 186, 147, 0.16) 0%,rgba(0, 0, 0, 0) 100%),linear-gradient(90.99deg, #1d1d1d 2.18%, #232323 104.4%)"};
  padding: 1.458vw 3.854vw 2.24vw 3.854vw;
  border-radius: 2.083vw;
  margin-top: 1.302vw;
  width: 33.438vw;
  margin-left: 2.031vw;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0.208vw 2.083vw rgba(0, 0, 0, 0.25);
`;

export const HeadingText = styled.span`
  line-height: 1.875vw;
  font-size: 1.25vw;
  color: ${(props) => (props.theme.light ? "#333" : "#fff")};
`;

export const HDiv = styled.div`
  align-items: ${(props) => props.alignItems};
  justify-content: ${(props) => props.justifyContent};
  margin-right: ${(props) => props.mr};
  margin-left: ${(props) => props.ml};
  margin-top: ${(props) => props.mt};
  flex-direction: row;
  display: flex;

  div {
    svg {
      margin-left: 0.313vw;
      fill: #4f4f4f;
      height: 1.625vw;
      width: 1.625vw;
    }
  }
`;

export const VDiv = styled.div`
  color: ${(props) => props.color ?? "#828282"};
  margin-left: ${(props) => props.ml};
  margin-top: ${(props) => props.mt};
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  display: flex;

  span {
    color: ${(props) => props.color ?? "#828282"};
    font-size: 0.521vw;
    line-height: 0.781vw;
  }
`;

export const Dot = styled.div`
  border: ${(props) => (props.theme.light ? "none" : "0.052vw solid #333333")};
  background: #40ba93;
  border-radius: 50%;
  margin: ${(props) => props.ml ?? "0 0.313vw"};
  height: 0.417vw;
  width: 0.417vw;
`;

export const Text = styled.span`
  color: ${(props) => (props.theme.light ? "#828282" : "#828282")};
  font-weight: ${(props) => props.fontWeight ?? "400"};
  margin-left: ${(props) => props.ml};
  line-height: 1.094vw;
  font-size: ${(props) => props.fontSize ?? "0.729vw"};

  b {
    font-weight: 500;
    font-size: 0.938vw;
    line-height: 1.406vw;
    color: ${(props) =>
      props.theme.light ? props.color ?? "#333" : props.color ?? "#fff"};
  }
`;

export const Container = styled.div`
  background: ${(props) => (props.theme.light ? "#FBFBFB" : " #1f1e20")};
  padding: 0.938vw 1.146vw 0.729vw 1.146vw;
  margin-top: ${(props) => props.mt};
  height: ${(props) => props.height};
  border-radius: 1.563vw;
  width: 25.729vw;
`;

export const InputWrapper = styled.div`
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  border: 0.052vw solid;
  border-color: ${(props) => (props.theme.light ? "#E0E0E0" : "#333")};
  border-radius: 1.042vw;
  display: flex;
  padding: ${(props) => props.padding ?? "0 0.99vw;"};
  align-items: center;

  input {
    width: inherit;
    display: flex;
    justify-content: center;
    font-size: ${(props) => props.fontSize};
    font-weight: 300;
    color: ${(props) => (props.theme.light ? "#333" : "#fff")};
    ::placeholder {
      color: ${(props) => (props.theme.light ? "#E0E0E0" : "#333")};
    }
  }
`;

export const AmountSlider = styledMUI(Slider)((props) => ({
  width: "13.2vw",
  height: "0.260vw",
  color: "#40BA93",
  marginLeft: "2.813vw",
  marginTop: "0.2vw",
  padding: "0",
  marginRight: "0.4vw",

  ".Mui-disabled": {
    color: "#333",
    backgroundcolor: "#333",

    "& .MuiSlider-valueLabel": {
      color: "#333",
    },
  },

  "&.MuiSlider-root.Mui-disabled": {
    color: "#333",
    backgroundcolor: "#333",

    "& .MuiSlider-track": {
      backgroundColor: "#333",
    },

    "& .MuiSlider-markActive": {
      backgroundColor: "#333",
    },
  },

  "& .MuiSlider-thumb": {
    display: "none",
  },

  "& .MuiSlider-mark": {
    width: "0.573vw",
    height: "0.573vw",
    border: "0.052vw solid",
    borderColor: useThemeContext().theme === "light" ? "#fff" : "#333",
    borderRadius: "50%",
    backgroundColor: "#333",
  },

  "& .MuiSlider-markActive": {
    backgroundColor: "#40BA93",
  },

  "& .MuiSlider-rail ": {
    backgroundColor: "#333 !important",
    opacity: "1",
  },
}));

export const SplitSlider = styledMUI(Slider)((props) => ({
  width: "1.302vw",
  height: "0.208vw",
  color: "#40BA93",
  padding: "0",

  ".Mui-disabled": {
    color: "#40BA93",
    backgroundcolor: "#333",

    "& .MuiSlider-valueLabel": {
      color: "#333",
    },
  },

  "&.MuiSlider-root.Mui-disabled": {
    color: "#333",
    backgroundcolor: "#333",

    "& .MuiSlider-track": {
      backgroundColor: "#333",
    },
  },

  "& .MuiSlider-thumb": {
    width: "0.573vw",
    height: "0.573vw",
    border: "0.052vw solid",
    borderColor: useThemeContext().theme === "light" ? "#fff" : "#333",
    backgroundColor: "#40BA93",
    boxShadow: "none !important",

    "&:hover": {
      boxShadow: "none !important",
    },
  },
  
  "& .MuiSlider-mark": {
    width: "0.573vw",
    height: "0.573vw",
    border: "0.052vw solid",
    borderColor: useThemeContext().theme === "light" ? "#fff" : "#333",
    borderRadius: "50%",
    backgroundColor: "#333",
  },

  "& .MuiSlider-markActive": {
    backgroundColor: "#40BA93",
  },

  "& .MuiSlider-track": {
    backgroundColor: "#40BA93",
  },
}));

export const SplitSlider2 = styledMUI(Slider)((props) => ({
  width: "2.292vw",
  height: "0.208vw",
  color: "#40BA93",
  padding: "0",

  ".Mui-disabled": {
    color: "#333",
    backgroundcolor: "#333",

    "& .MuiSlider-valueLabel": {
      color: "#333",
    },
  },

  "&.MuiSlider-root.Mui-disabled": {
    color: "#333",
    backgroundcolor: "#333",

    "& .MuiSlider-track": {
      backgroundColor: "#333",
    },
  },

  "& .MuiSlider-thumb": {
    width: "0.573vw",
    height: "0.573vw",
    border: "0.052vw solid",
    borderColor: useThemeContext().theme === "light" ? "#fff" : "#333",
    backgroundColor: "#40BA93",
    boxShadow: "none !important",

    "&:hover": {
      boxShadow: "none !important",
    },
  },
  "& .MuiSlider-track": {
    backgroundColor: "#40BA93",
  },
}));

export const SplitSlider3 = styledMUI(Slider)((props) => ({
  width: "3.594vw",
  height: "0.208vw",
  color: "#40BA93",
  padding: "0",

  ".Mui-disabled": {
    color: "#333",
    backgroundcolor: "#333",

    "& .MuiSlider-valueLabel": {
      color: "#333",
    },
  },

  "&.MuiSlider-root.Mui-disabled": {
    color: "#333",
    backgroundcolor: "#333",

    "& .MuiSlider-track": {
      backgroundColor: "#333",
    },
  },

  "& .MuiSlider-thumb": {
    width: "0.573vw",
    height: "0.573vw",
    border: "0.052vw solid",
    borderColor: useThemeContext().theme === "light" ? "#fff" : "#333",
    backgroundColor: "#40BA93",
    boxShadow: "none !important",

    "&:hover": {
      boxShadow: "none !important",
    },
  },
  "& .MuiSlider-track": {
    backgroundColor: "#40BA93",
  },
}));

export const TradeBtn = styled.button`
  margin-top: 2vw;
  border-radius: 1.042vw;
  font-size: 0.729vw;
  align-self: center;
  background: #10dc9b;
  height: 1.875vw;
  width: 7.344vw;
  color: #fff;

  &:hover {
    opacity: 0.8;
  }
`;

export const TrailingSlider = styledMUI(Slider)((props) => ({
  width: "12.188vw",
  height: "0.208vw",
  color: "#EF3725",
  padding: "1vw 0",
  margin: "0 0 0 2.438vw",

  ".Mui-disabled": {
    color: "#333",
    backgroundcolor: "#333",

    "& .MuiSlider-valueLabel": {
      color: "#333",
    },
  },

  "&.MuiSlider-root.Mui-disabled": {
    color: useThemeContext().theme === "light" ? "#E0E0E0" : "#333",
    backgroundcolor: "#333",

    "& .MuiSlider-track": {
      backgroundColor: useThemeContext().theme === "light" ? "#E0E0E0" : "#333",
    },
  },

  "& .MuiSlider-thumb": {
    width: "0.573vw",
    height: "0.573vw",
    border: "0.052vw solid",
    borderColor: useThemeContext().theme === "light" ? "#fff" : "#333",
    boxShadow: "none !important",
    backgroundColor: useThemeContext().theme === "light" ? "#E0E0E0" : "#333",

    "&:hover": {
      boxShadow: "none !important",
    },
  },

  "& .MuiSlider-track": {
    backgroundColor: "#BDBDBD",
  },

  "& .MuiSlider-valueLabel": {
    fontFamily: "'Poppins', sans-serif",
    fontSize: "0.729vw",
    backgroundColor: "transparent",
    transform: "translateY(70%) scale(1) !important",
  },
}));

export const StopLossSlider = styledMUI(Slider)((props) => ({
  width: "12.188vw",
  height: "0.208vw",
  color: "#EF3725",
  padding: "1vw 0",
  margin: "0 0 0 2.438vw",

  "& .MuiSlider-thumb": {
    width: "0.573vw",
    height: "0.573vw",
    border: "0.052vw solid #333",
    boxShadow: "none !important",

    "&:hover": {
      boxShadow: "none !important",
    },
  },

  "& .MuiSlider-track": {
    backgroundColor: useThemeContext().theme === "light" ? "#E0E0E0" : "#333",
  },

  "& .MuiSlider-valueLabel": {
    fontFamily: "'Poppins', sans-serif",
    fontSize: "0.729vw",
    backgroundColor: "transparent",
    transform: "translateY(70%) scale(1) !important",
  },
}));

export const IOSSwitch = styledMUI((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: "2.552vw",
  height: "1.302vw",
  padding: 0,
  border: "0.052vw solid",
  borderColor: useThemeContext().theme === "light" ? "#E0E0E0" : "#4F4F4F",
  borderRadius: "5.208vw",
  "& .MuiSwitch-switchBase": {
    padding: 0,
    top: "0.04vw",
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
    border: useThemeContext().theme === "light" ? "0.052vw solid #BDBDBD" : "none",
  },
  "& .MuiSwitch-track": {
    borderRadius: "5.208vw",
    backgroundColor: theme.palette.mode === "light" ? "transparent" : "#40BA93",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));
