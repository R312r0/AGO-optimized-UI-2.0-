import styled from "styled-components"

export const TokenPriceChartWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;

  position: relative;
  overflow: hidden;
  transition: 0.3s all;
  cursor: pointer;

  height: ${props => props.isWindowExpanded ? "30vw" : "10.5vw"};
  padding: 1.823vw 2.084vw;
  /* margin-bottom: 3.646vw; */
  
  background: ${props => props.light ? 'radial-gradient(225.24% 9617% at -0.8% -6.31%, rgba(95, 234, 190, 0.3) 0%, rgba(95, 234, 190, 0.057) 100%);' : 'radial-gradient(61.16% 3404.86% at 48.28% 79.61%, rgba(30, 117, 89, 0.3) 0%, rgba(9, 33, 25, 0.3) 100%), linear-gradient(90.99deg, #272727 2.18%, #1C1C1C 104.4%)'};
  box-shadow: ${props => props.light ? "none" : "0px 0.208vw 0.833vw rgba(0, 0, 0, 0.25)"};
  border-radius: ${props => props.light ? "40px" : "2vw"};
  border:  ${props => props.light ? "0.5px solid #40BA93;" : "none"};
  box-sizing: border-box;
  
  // Responsive || Width
  
  @media only screen and (max-width: 1024px){
    height: ${props => props.isWindowExpanded ? "28.5vw" : "11.3vw"};
    padding: 2vw 1.074vw;
    margin-bottom: 2vw;
  }
  
  .token-heading {
    opacity: ${props => props.isWindowExpanded ? "1" : "0"};
    transition: ${props => props.isWindowExpanded ? "0.4s all" : "0.1s all"};
    height: ${props => props.isWindowExpanded ? "3.2vw" : "0"};
    
    margin: 0 0 0 1vw;
    color: white;
    font-size: 1.25vw;
    
    @media only screen and (max-width: 1024px){
      font-weight: 300;
      font-size: 1.5vw;

      height: ${props => props.isWindowExpanded ? "4vw" : "0"};
    }
  }

  .separator {
    margin-bottom: auto;

    width: 0.052vw;
    height: 100%;
    background: #40BA93;

    transition: 0.4s ease;

    &:not(:nth-child(4)) {
      height: ${props => props.isWindowExpanded ? "0" : "100%"};
    }

    &:last-child {
      display: none;
    }
  }

  .single-price-wrapper {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    overflow-x: scroll;
    overflow-y: hidden;
    justify-content: space-between;
    transition: 0.3s all;
    

    &::-webkit-scrollbar {
      height:0px;
    }
    
    &::-webkit-scrollbar-track {
      box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    }
    
    &::-webkit-scrollbar-thumb {
      background-color: darkgrey;
      outline: 1px solid slategrey;
    }

    .price-block-wrapper {
      display: flex;
      flex-direction: column;
      justify-content: center;
      transition: 0.3s all;

      padding: 0 1.0415vw 0 1vw;

      margin-bottom: auto;

      border-right: 1px solid #40BA93;

    &:last-child{
      border-right: none;
    }

      .price-block-chart {
        display: flex;
        flex-direction: column;
        opacity: ${props => props.isWindowExpanded ? "1" : "0"};
        transition: ${props => props.isWindowExpanded ? "2s all" : "0.1s all"};
        .chart-wrapper {
          width: 17.708vw;
          height: 8.490vw;
          cursor: pointer;
          font-size: 1vw;
        }
        main {
          display: flex;
          flex-direction: column;

          margin-top: 1.354vw;
          font-size: 0.729vw;

          .token-data {
            padding: 0.365vw 0.938vw;

            display: flex;
            margin-right: auto;

            color: ${props => props.light ? '#333' : '#1E1E1E'};
            background: ${props => props.light ? '#fff' : '#1E1E1E'};
            border-radius: 0.625vw;

            &:not(:last-child) {
              margin-bottom: 0.573vw;
            }

            p {
              color: ${props => props.light ? '#828282' : '#4F4F4F'};
            }

            span {
              margin-left: 1.25vw;
            }
          }
        }
      }
    }
  }
`

export const SinglePriceBlock = styled.div`
  display: flex;
  flex-direction: column;

  .demo-chart {
    width: ${props => props.isWindowExpanded ? "0" : "10vw"};
    height: 0;

    transition: 0.1s ease;
    opacity: 0;
    margin-bottom: auto;
    margin-right: auto;
  }

  &:hover {
    transition: .4s ease;

    .demo-chart {
      transition: ${props => props.isWindowExpanded ? "0.1s ease" : ".5s ease"};

      height: ${props => props.isWindowExpanded ? "0" : "3vw"};
      opacity: 1;
    }

    h3 {
      margin-bottom: ${props => props.isWindowExpanded ? "0" : "0"};
    }

    h1 {
      font-size: ${props => props.isWindowExpanded ? "1.875vw" : "0.729vw"};
    }
  }

  @media only screen and (max-width: 1024px){
    &:hover {
      .demo-chart {
        height: 0;
      }

      h3 {
        margin-bottom: 0;
        @media only screen and (max-width: 1024px){
          font-size: 1.5vw;
        }
      }

      h1 {
        font-size: 0.729vw;
        @media only screen and (max-width: 1024px){
          font-size: 1.9vw;
        }
      }
    }
  }

  h3 {
    font-size: 1vw;
    /* margin-bottom: 0.938vw; */
    transition: .4s ease;

    color: ${props => props.light ? '#333333' : '#fff'};

    @media only screen and (max-width: 1024px){
      font-size: 1.5vw;
      margin-bottom: 0;
    }

    @media only screen and (max-width: 750px) {
      font-size: 2vw;
    }
  }

  h1 {
    font-size: 1.875vw;
    color: #40BA93;
    transition: .4s ease;

    @media only screen and (max-width: 1024px){
      font-size: 1.9vw;
      margin: auto 0;
    }

    @media only screen and (max-width: 750px) {
      font-size: 2.6vw;
    }
  }

  span {
    display: flex;
    align-items: center;

    font-size: 0.729vw;
    color: ${props => props.light ? '#333333' : '#fff'};

    @media only screen and (max-width: 1024px){
      font-size: 1vw;
    }

    img {
      display: block;

      width: 0.8vw;
      height: 1.1vw;
      margin-right: 0.313vw;

      @media only screen and (max-width: 1024px){
        width: 1.4vw;
        height: 1.2vw;
      }
    }

    span {
      font-size: 0.729vw;
      color: #4F4F4F;
      margin-left: 0.469vw;
    }
  }
`