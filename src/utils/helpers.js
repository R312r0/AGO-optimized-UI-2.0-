import { useState, useEffect } from 'react';
import BigNumber from "bignumber.js";
import fromExponential from "from-exponential";

import Numeral from 'numeral';
import {MONTHS} from "../constants";


export const MAX_INT = '115792089237316195423570985008687907853269984665640564039457584007913129639935';

// Splits final query output for better understandingΩ
export async function splitQuery(query, localClient, vars, list, skipCount) {
    let fetchedData = {}
    let allFound = false
    let skip = 0


    while (!allFound) {
        let end = list.length
        if (skip + skipCount < list.length) {
            end = skip + skipCount
        }
        let sliced = list.slice(skip, end)
        let result = await localClient.query({
            query: query(...vars, sliced),
            fetchPolicy: 'cache-first',
        })

        fetchedData = {
            ...fetchedData,
            ...result.data,
        }
        if (Object.keys(result.data).length < skipCount || skip + skipCount > list.length) {
            allFound = true
        } else {
            skip += skipCount
        }
    }


    // Null check for chart correct work.
    for (let item in fetchedData) {
        if (fetchedData[item] === null) {
            delete fetchedData[item]
        }
    }

    return fetchedData
}


export const getCoinGeckoCurrentPrice = (tokenName) => {



    const data = fetch(`https://api.coingecko.com/api/v3/coins/${tokenName}?tickers=false&community_data=false&developer_data=false&sparkline=false`)
    .then((res) => res.json())
    .then((fin) => fin.market_data.current_price.usd);

    return data;

}

export const findNearestPortfolioTokenPrice = (tokensArr, balanceTimeStamp, symbol) => {

    const tok = tokensArr.find(item => item.symbol === symbol)
    const chart = tok.lineChartUSD
    let priceItem;
    const chartFiltered = chart.filter(itemC => itemC.timestamp <= balanceTimeStamp);

    let deltaArrs = []

    if (chartFiltered.length > 0) {
        chartFiltered.forEach((line, _ind) => {
            deltaArrs.push(balanceTimeStamp - line.timestamp)
        })

        const minDelta = Math.min(...deltaArrs);

        priceItem = chartFiltered.find(chart => balanceTimeStamp - chart.timestamp === minDelta).valueUSD;
    }

    else {
        chart.forEach((line, _ind) => {
            deltaArrs.push(line.timestamp - balanceTimeStamp)
        })

        const minDelta = Math.min(...deltaArrs);

        priceItem = chart.find(chart => chart.timestamp - balanceTimeStamp === minDelta).valueUSD;
    }


    return priceItem;

};


export const formatToDecimal = (value, decimals) => {
    if (value === "MAX") return MAX_INT;
    let returned_amount = new BigNumber(new BigNumber(value).multipliedBy(new BigNumber(10**decimals))).toString()
    if (returned_amount.includes('e')) {
      returned_amount = fromExponential(returned_amount)
    }
    const result = returned_amount;
    return result
}
  
export const formatFromDecimal = (value, decimals) => {
    if(isNaN(Number(value))) {
      return;
    }
  
    let returned_amount = new BigNumber(value).div(new BigNumber(10**decimals)).toString()
  
    if (returned_amount.includes('e')) {
      returned_amount = fromExponential(returned_amount)
    }
    return returned_amount;
}

export const calculateTimeDifference = (timestamp) => {

    const currentTime = new Date();
    const txTime = new Date(timestamp * 1000);
    let diff = (Math.abs(currentTime - txTime))/(1000 * 60);

    if (diff >= 60) {
        diff = (diff / 60).toFixed(0) + " hour ago"
    }
    else if (diff < 1) {
        diff = "recently"
    }
    else {
        diff = parseFloat(diff).toFixed(0) + " minutes ago"
    }
    return diff;
}


// Percent change between current time and yesterday
export const getPercentChange = (valueNow, value24HoursAgo) => {
    const adjustedPercentChange =
        ((parseFloat(valueNow) - parseFloat(value24HoursAgo)) / parseFloat(value24HoursAgo)) * 100
    if (isNaN(adjustedPercentChange) || !isFinite(adjustedPercentChange)) {
        return 0
    }
    return adjustedPercentChange
}


// Format number for more human readable for example (100k $, 1b $, 150m $)
export const formattedNum = (number, usd = false, acceptNegatives = false) => {
    if (isNaN(number) || number === '' || number === undefined) {
        return usd ? '$0' : 0
    }
    let num = parseFloat(number)

    if (num > 500000000) {
        return (usd ? '$' : '') + toK(num.toFixed(0), true)
    }

    if (num === 0) {
        if (usd) {
            return '$0'
        }
        return 0
    }

    if (num < 0.0001 && num > 0) {
        return usd ? '< $0.0001' : '< 0.0001'
    }

    if (num > 1000) {
        return usd ? formatDollarAmount(num, 0) : Number(parseFloat(num).toFixed(0)).toLocaleString()
    }

    if (usd) {
        if (num < 0.1) {
            return formatDollarAmount(num, 4)
        } else {
            return formatDollarAmount(num, 2)
        }
    }

    return Number(parseFloat(num).toFixed(4)).toString()
}

// Addition for "formattedNum"
export const formatDollarAmount = (num, digits) => {
    const formatter = new Intl.NumberFormat([], {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: digits,
        maximumFractionDigits: digits,
    })
    return formatter.format(num)
}

// Addition for "formattedNum"
export const toK = (num) => {
    return Numeral(num).format('0.[00]a')
}

export const formatDateUnixTxs = (dateUnix) => {


    const date = new Date(dateUnix * 1000)
    const month = MONTHS[date.getMonth()]
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    const year = date.getFullYear();

    return `${month} ${day}, ${year}`

}

export const formatAMPM = (date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    let strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}

// Format date for chart
export const formatDate = (date) => {
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

// Gets window dimension for mobile responsive logic
function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}

// Format user address to "ffff....ffff" type.
export const formatAddress = (address) => {
    return `${address.slice(0, 5)}...${address.slice(-3)}`;
};

export default function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowDimensions;
}