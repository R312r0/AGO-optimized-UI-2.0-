import styled from "styled-components";

export const TradingContainer = styled.div`
  flex-direction: column;
  display: flex;
  margin-left: 1.2vw;
`;

export const TradingWrapper = styled.div`
  flex-direction: row;
  display: flex;
`;

export const ChartsContainer = styled.div`
  flex-direction: column;
  display: flex;
`;

export const ToggleTabBtnWrapper = styled.div`
  justify-content: space-between;
  width: 13.542vw;
  height: 1vw;
  display: flex;
`;

export const ToggleBtn = styled.button`
  width: 7.656vw;
  height: 1.875vw;
  background: ${(props) => (props.active ? "#40BA93" : "transparent")};
  border-radius: 1.042vw;
  color: ${(props) => (props.active ? "#fff" : "#828282")};
  font-size: 0.729vw;

  &:hover {
    opacity: 0.8;
  }
`;

export const HDiv = styled.div`
  align-items: ${(props) => props.alignItems};
  justify-content: ${(props) => props.justifyContent};
  margin-right: ${(props) => props.mr};
  margin-left: ${(props) => props.ml};
  margin-top: ${(props) => props.mt};
  flex-direction: row;
  display: flex;
`;

export const Text = styled.span`
  font-weight: ${(props) => props.fontWeight ?? "300"};
  margin-left: ${(props) => props.ml};
  min-width: ${(props) => props.minW};
  color: #828282;
  font-size: 0.729vw;
  line-height: 1.094vw;

  b {
    color: ${(props) => (props.theme.light ? "#333" : "#fff")};
    line-height: 1.875vw;
    font-size: 1.25vw;
  }
`;

export const TableText = styled(Text)`
  line-height: 1.406vw;
  font-size: 0.938vw;
  color: #4f4f4f;
`;

export const SearchBarWrapper = styled.div`
  justify-content: space-between;
  border-radius: 2.083vw;
  margin-left: 14.063vw;
  padding: 0 2.083vw;
  align-items: center;
  background: ${(props) => (props.theme.light ? "#F2F2F2" : "#1a1a1a")};
  font-size: 0.938vw;
  font-weight: 300;
  width: 39.323vw;
  height: 4.063vw;
  display: flex;
  color: ${(props) => (props.theme.light ? "#333" : "#fff")};

  input {
    width: inherit;
    ::placeholder {
      color: ${(props) => (props.theme.light ? "#BDBDBD" : "#4F4F4F")};
    }
  }
`;

export const TradingBar = styled.div`
  width: 100%;
  height: 2.292vw;

  position: relative;
  display: flex;
  color: #fff;
  opacity: 1;
  margin-left: 4.583vw;

  .buttons {
    width: fit-content;
    display: flex;
    align-items: center;

    margin: 0 8.5vw 0 auto;
  }

  main {
    position: ${(props) => (props.listExapned ? "absolute" : "relative")};
    padding: ${(props) =>
      props.listExapned ? "0.8vw 1.25vw" : "0.417vw 1.25vw"};

    display: flex;
    align-items: center;
    z-index: 999;
    cursor: pointer;

    border: ${(props) =>
      props.theme.light ? "none" : "0.052vw solid #4f4f4f"};
    border-radius: 1.302vw;
    background: ${(props) =>
      props.theme.light
        ? " linear-gradient(94.62deg, rgba(150, 17, 255, 0.4) 0%, rgba(155, 8, 207, 0.4) 116.74%)"
        : "linear-gradient(94.62deg, rgba(150, 17, 255, 0.4) 0%, rgba(61, 27, 87, 0.4) 116.74%), #212121"};

    img {
      &:not(:first-child) {
        margin-left: 0.313vw;
      }

      width: 1.354vw;
      height: 1.354vw;
    }

    p {
      margin-left: 0.521vw;
      font-weight: 400;
      font-size: 0.938vw;
    }

    svg {
      margin: ${(props) => (props.listExapned ? "0 auto" : "0 0.625vw")};
      width: 0.052vw;
      height: 100%;

      &:last-child {
        width: 0.521vw;
        height: 0.313vw;
      }
    }

    span {
      font-weight: 400;
      font-size: 0.938vw;
      color: #fff;
    }

    b {
      margin-right: ${(props) => (props.listExapned ? "0" : "1.25vw")};
      margin-left: 0.417vw;

      font-size: 0.938vw;
      font-weight: 500;

      color: #fff;
    }

    .expanded-liquidity-list {
      height: fit-content;
      margin-bottom: 0;
      overflow-y: scroll;

      &::-webkit-scrollbar {
        display: none;
      }

      li {
        display: grid;
        grid-template-columns: 1fr 3.125vw 1fr;
        padding: 0.5vw 1vw;
        margin-bottom: 0.26vw;

        border-radius: 1vw;
        transition: 0.3s;

        .data-wrapper {
          display: flex;
        }

        &:hover {
          background: rgba(0, 0, 0, 0.3);
        }
      }

      .quick-swap-pool-item {
        grid-template-columns: 0.25fr 1fr 0.1fr 1fr;
        background-color: rgb(33, 114, 229);
        &:hover {
          background-color: rgb(22, 63, 121);
        }
      }
    }
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
  border-color: #4f4f4f;
  height: 2.917vw;
  width: 11.771vw;
  color: #fff;

  svg {
    margin-right: 1.458vw;
    height: 1.094vw;
    width: 1.094vw;
  }

  &:hover {
    border-color: #fff;
  }
`;

export const SortArrowsContainer = styled.div`
  justify-content: space-between;
  margin-left: 1.25vw;
  align-items: center;
  display: flex;
  width: 2vw;

  svg {
    cursor: pointer;
    fill: red;
  }
`;

export const LiquidityPoolsTable = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 6vw;
`;

export const TradingTableContainer = styled.div`
  background: ${(props) =>
    props.theme.light
      ? "#fff"
      : "radial-gradient(94.26% 94.26% at 47.39% 30.04%, rgba(64, 186, 147, 0.16) 0%, rgba(0, 0, 0, 0) 100%), linear-gradient(90.99deg, #1D1D1D 2.18%, #232323 104.4%)"};
  padding: 1.146vw 0 0 3.594vw;
  border-radius: 2.083vw;
  margin-top: 1.875vw;
  width: 50.938vw;
  min-height: 10.104vw;
  box-shadow: 0 0.208vw 3.125vw rgba(0, 0, 0, 0.25);
`;
