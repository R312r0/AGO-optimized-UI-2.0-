import styled from 'styled-components';

export const DashboardWrapper = styled.div`
  display: grid;
  width: 100%;
  padding: 1vw 4vw 0 1.771vw;
  row-gap: 20px;

  position: relative;
  grid-template-rows: auto auto auto auto;
  justify-items: center;

  &::-webkit-scrollbar {
    display: none;
  }

  .tvl-volume {
    display: grid;
    width: 100%;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 4.167vw;

    /* margin-bottom: 3.646vw; */
    
    @media only screen and (max-width: 1024px){
      grid-column-gap: 2.5vw;
      margin-bottom: 2vw;
    }

    @media only screen and(max-width: 750px) {
      width: 95%;
      margin-bottom: 15px;
    }
  }
`

export const Heading = styled.div`
  width: 100%;
  margin-left: 1.25vw;
`
