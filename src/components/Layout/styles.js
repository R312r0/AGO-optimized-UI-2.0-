import styled from "styled-components";

export const LayoutWrapper = styled.div`
  display: grid;
  height: 100vh;
  grid-template-columns: ${(props) => (props.mobile ? "1fr" : "10% 90%")};
  grid-template-rows: ${(props) => (props.mobile ? "auto 1fr" : "5vw auto")};
  background: ${(props) => (props.mobile ? "rgb(41,67,58)" : null)};
  background: ${(props) =>
    props.mobile
      ? "radial-gradient(circle, rgba(44,94,77,1) 0%, rgba(38,51,47,1) 23%, rgba(35,35,35,1) 52%)"
      : props.light
      ? "#EFEFEF"
      : "#202020"};
  transition: 0.3s background-color;
`;

export const Header = styled.div`
  display: grid;
  grid-column: 1/5;
  /* grid-template-columns: ${(props) =>
    props.mobile ? "1fr 3fr 1fr" : "0.4fr 3fr 0.5fr"}; */
  grid-template-columns: ${(props) =>
    props.mobile ? "1fr 3fr 1fr" : "10% 75% 15%"};
  grid-template-rows: ${(props) => (props.mobile ? "1fr 1fr" : "none")};
  box-sizing: border-box;
  column-gap: 10px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;

  padding-bottom: 100px;
  position: relative;
  overflow-y: auto;

  @media only screen and (max-width: 750px) {
    padding-bottom: 0;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;
// export const AgoLogo = styled.img`
export const AgoLogo = styled.img`
  width: 2.6vw;
  height: 2.2vw;
  place-self: center;
  &:hover {
    cursor: pointer;
  }

  @media screen and (max-width: 1200px) {
    width: 3.4vw;
    height: 3.4vw;
  }

  @media screen and (max-width: 750px) {
    width: 9vw;
    height: 8vw;
  }
`;

// MOBILE

export const MobileHeader = styled.div`
  display: flex;
  flex-direction: column;

  padding-bottom: 5.333vw;
`;

export const MobileMainHeader = styled.div`
  display: flex;
  justify-content: space-between;

  padding: 5.333vw 5.333vw 3.333vw;
`;

export const PageName = styled.h1`
  display: ${(props) => (props.mobile ? "block" : "none")};
  color: white;
  place-self: center;

  @media screen and (max-width: 750px) {
    font-size: 6vw;
  }
`;

export const BurgerButton = styled.button`
  display: grid;
  width: 5vw;
  height: 5vw;
  place-self: center;
  background-color: transparent;
  border: none;

  img {
    width: 5vw;
    height: 5vw;
  }
`;

export const ComingSoonMessageBox = styled.div`
  display: flex;
  flex-direction: column;
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
  box-shadow: 0 0.208vw 4.167vw rgba(0, 0, 0, 0.25);
  padding: 8vw 0 0 8vw;
  border-radius: 5.333vw;
  justify-self: center;
  align-self: center;
  height: 74.133vw;
  width: 88.267vw;

  img {
    align-self: flex-end;
    margin-top: -10.1vw;
    margin-right: 3.2vw;
    height: 47.467vw;
    width: 36vw;
  }
`;

export const Text = styled.span`
  font-size: ${(props) => props.fontSize ?? "4.8vw"};
  line-height: ${(props) => props.lineHeight ?? "7.200vw"};
  max-width: 48.267vw;
  margin-top: ${(props) => props.mt};
  color: #fff;
`;
