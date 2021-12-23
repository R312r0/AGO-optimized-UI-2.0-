import React from 'react';

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import chartBgImage from '../../../assets/charts/pieChartBg.svg';

import { useSystemContext } from '../../../systemProvider';

import styled from 'styled-components';

const PieCartWrapper = styled.div`
    max-width: 260px;
    width: 100%;
    background: url(${chartBgImage});
    background-position: right center;
    background-size: 116%;

    & .highcharts-credits{
        display: none;
    }

    & .highcharts-title{
        text-align: center;

        & p{
            font-weight: 300;
            font-size: 36px;
            line-height: 54px;
        }
        & span{
            color: ${props => props.light ? "#D20373!important" : "#D20373!important"};
        }
    }
`


const AccountPieChart = () => {

    const { theme } = useSystemContext();

    const options = {
        chart: {
            renderTo: 'container',
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie',
            width: '240',
            height: '240',
            backgroundColor: 'transparent',
            borderRadius:10,
        },
        colors: ['#40BA93', '#0885F8', '#EA8C00', '#1BB8DB', '#9018EE',
        '#DB1B60', '#EAD200', '#DB1BB1'],
        title: {
            verticalAlign: 'middle',
            floating: true,
            style:{
                color: theme === "light" ? "#4F4F4F": "#fff",
                fontSize: '14px'
            },
            useHTML: true,
            text: `Total balance<br><p>${'5.96'}</p><span>-$0.175557 (1.2%)</span>`
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        plotOptions: {
            pie: {
                innerSize: '90%',
                // allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                // showInLegend: true
            }
        },
        series: [{
            name: 'Brands',
            // colorByPoint: true,
            data: [{
                name: 'Chrome',
                y: 61.41,
                sliced: false,
                selected: true
            }, {
                name: 'Internet Explorer',
                y: 11.84,
                sliced: false,
                selected: true
            }, {
                name: 'Firefox',
                y: 10.85,
                sliced: false,
                selected: true
            }, {
                name: 'Edge',
                y: 4.67,
                sliced: false,
                selected: true
            }, {
                name: 'Safari',
                y: 4.18,
                sliced: false,
                selected: true
            }, {
                name: 'Other',
                y: 7.05,
                sliced: false,
                selected: true
            }]
        }]
    }

    return (
        <PieCartWrapper light={theme === "light"}>
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
            />
        </PieCartWrapper>
    )
};

export default AccountPieChart;