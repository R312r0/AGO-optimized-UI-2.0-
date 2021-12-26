import styled from "styled-components"

export const ConnectWallet = styled.div`
display: grid;
grid-template-columns: 1fr 1fr;
width: 100%;
text-align: right;

span {
  color: ${props => props.light ? "#000" : "#fff"};
  align-self: center;
  justify-self: flex-end;
  white-space: nowrap;
  font-size: 0.990vw;
}

button {
  justify-self: center;
  align-self: center;
  display: grid;
  align-items: center;
  justify-items: center;

  width: 3.281vw;
  height: 3.281vw;

  background-color: transparent;
  border: 0.104vw solid #40BA93;
  border-radius: 50%;
  color: ${props => props.light ? "#000" : "#fff"};

  font-size: 1.250vw;

  cursor: pointer;

  img {
    width: 1.302vw;
    height: 1.302vw;
  }

  &:hover {
    background-color: #40BA93;
    transition: 0.3s all;
  }

  @media screen and (max-width: 750px) {
    width: 16.800vw;
    height: 16.800vw;

    img {
      width: 8vw;
      height: 8vw;
    }

    i {
      font-size: 6vw;
    }
  }
}

@media screen and (max-width: 750px) {
  display: flex;
  flex-direction: row-reverse;

  width: fit-content;
  padding: 3.2vw 5.333vw 0;

  span {
    font-size: 4.8vw;
    margin-left: 3.2vw;
  }
}
`