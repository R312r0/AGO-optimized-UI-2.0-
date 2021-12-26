import styled from "styled-components"

export const Volume24hChartWrapper = styled.div`
    position: relative;
    background: ${props => props.mobile ? "transparent" : props.light ? "radial-gradient(113.47% 7561.36% at -5.76% -16.06%, rgba(95, 234, 190, 0.56) 0%, rgba(95, 234, 190, 0) 100%);" : " radial-gradient(61.16% 3404.86% at 48.28% 79.61%, rgba(30, 117, 89, 0.3) 0%, rgba(9, 33, 25, 0.3) 100%), linear-gradient(90.99deg, #272727 2.18%, #1C1C1C 104.4%)"};
    box-shadow: ${props => props.mobile || props.light ? "none" : "0px 4px 16px rgba(0, 0, 0, 0.25)"};
    border-radius: ${props => props.mobile ? "40px" : "2vw"};
    border:  ${props => props.light ? "0.5px solid #40BA93;" : "none"};
    width: 100%;
    height: 21.5vw;
    display: grid;
    align-self: center;
    box-sizing: border-box;
    justify-self: flex-start;
    grid-template-rows: 30% 70%;
    padding: ${props => props.mobile ? "0" : "4.5% 11.5%"};
  
  // Responsive || Height
  
  @media only screen and (max-width: 1880px) {
    height: ${props => props.mobile ? "100%" : "30vw"};
}

@media only screen and (max-width: 1680px) {
    height: ${props => props.mobile ? "100%" : "28vw"};
}

// Responsive || Width

@media only screen and (max-width: 1024px){
    padding: ${props => props.mobile ? "0" : "2.5% 5.5%"};
}

@media screen and (max-width: 480px) {
    grid-template-rows: 20% 70%;
}


@media screen and (max-width: 750px) {
    height: ${props => props.mobile ? "80%" : "23vh"};
    grid-template-rows: 25% 75%;
}

@media only screen and (max-width: 750px) {
    .volume24-chart {
        width: 100vw;
        padding: 0 5%;
    }
}
    .volume24-chart {
        overflow: hidden;
    }

  .volume24-info {
    display: grid;
    padding: ${props => props.mobile ? "0 5%" : "0"};
    grid-template-rows: ${props => props.mobile ? " 1fr 1fr" : " 1fr 3fr 1fr"};

    p {
      font-weight: 500;
      font-size: ${props => props.mobile ? "3.6vw" : "14px"};
      color: ${props => props.mobile ? "#BDBDBD" : props.light ? "#333" : "white"};
      line-height: 27px;

      &:last-child{
        color: ${props => props.mobile ? "#BDBDBD" : props.light ? "#828282" : "white"};
      }
    }

    h1 {
      color: ${props => props.mobile ? "white" : "#40BA93"};
      font-weight: ${props => props.mobile ? "600" : "500"};
      font-size: ${props => props.mobile ? "6.6vw" : "24px"};
      line-height: 36px;
      align-self: flex-end;
    }
  }
`