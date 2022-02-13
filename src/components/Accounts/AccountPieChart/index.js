import React, { useEffect, useRef, useState } from 'react';
import { Doughnut } from 'react-chartjs-2'
import styled from 'styled-components';
import { useThemeContext } from '../../Layout/layout';
import { formattedNum } from '../../../utils/helpers';
import { tokenColors } from '../../../constants';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
)

window.arcSpacing = 0.1;
window.segmentHovered = false;


const PieCartWrapper = styled.div`
    /* max-width: 260px; */
    /* width: 100%; */
    background-position: right center;
    background-size: 116%;
    position: relative;
    /* margin-right: 20px; */

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

    & .chartCanvas{
        position: absolute;
        /* top: 0px;
        left: 0px; */
        max-width: 100%;
        width: 100%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
`




const AccountPieChart = ({ userBalanceData }) => {

    const { theme } = useThemeContext();
    const [chartData, setChartData] = useState(null);
    const [chartOptions, setChartOptions] = useState(null);

    const chartCanvasRef = useRef(null);


    useEffect(() => {

        if (userBalanceData) {
            const dataSets = userBalanceData.filter(item => item.name !== "AGOy").map((item) => item.usdBalance);

            setChartData({ datasets: [{ data: dataSets, backgroundColor: tokenColors }] })

        }

    }, [userBalanceData])


    useEffect(() => {

        if (chartData) {
            setChartOptions(
                {
                    // responsive: true,
                    cutout: "87%",
                    responsive: true,
                    elements: {
                        arc: {
                            borderWidth: 6,
                            borderRadius: 20,
                            borderColor: theme === 'light' ? '#fff' : '#1e1e1e',
                        },
                    },
                    legend: {
                        display: false
                    },
                    tooltips: {
                        enabled: false
                    },
                    plugins: {
                        legend: {
                            display: false
                        },
                    },
                    animation: {
                        onComplete: function (animation) {
                            if (!window.segmentHovered) {
                                var value = chartData.datasets[0].data.reduce(function (a, b) {
                                    return a + b;
                                }, 0);
                                var label = 'Total Balance';

                                textInCenter(`$${formattedNum(value)}`, label);
                            }
                        },
                    }
                })
        }

    }, [chartData, theme]);

    const textInCenter = (value, label) => {
        const canvas = chartCanvasRef.current;
        const ctx = canvas && canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        ctx.restore();

        // Draw value
        ctx.fillStyle = theme === 'light' ? '#333' : '#FFFFFF';
        ctx.font = '24px sans-serif';
        ctx.textBaseline = 'middle';

        // Define text position
        var textPosition = {
            x: Math.round((canvas.width - ctx.measureText(value).width) / 2),
            y: canvas.height / 2,
        };

        ctx.fillText(value, textPosition.x, textPosition.y);

        // Draw label
        ctx.fillStyle = theme === 'light' ? '#333' : '#FFFFFF';
        ctx.font = '14px sans-serif';

        // Define text position
        var labelTextPosition = {
            x: Math.round((canvas.width - ctx.measureText(label).width) / 2),
            y: canvas.height / 2,
        };

        ctx.fillText(label, labelTextPosition.x, labelTextPosition.y - 20);
        ctx.save();
    }


    return (
        <>
            {chartData && chartOptions ?
                <PieCartWrapper light={theme === "light"} style={{
                    position: 'relative',
                    height: '100%',
                    width: '13.541666666666666vw'
                }}>
                    {/* <HighchartsReact
                            highcharts={Highcharts}
                            options={options}
                        /> */}


                    <Doughnut data={chartData} options={chartOptions} redraw height='200px' style={{
                        height: '17.727272727272727vh',
                    }} />
                    <canvas className={'chartCanvas'} ref={chartCanvasRef} />
                    {/* <Doughnut data={chartData} options={chartOptions} height='200px' redraw />
                        <canvas className={'chartCanvas'} ref={chartCanvasRef}  /> */}
                </PieCartWrapper>
                :
                null
            }
        </>

    )
};

export default AccountPieChart;