import React, { useState, useEffect } from 'react';
import { Group } from '@visx/group';
import { LinePath } from '@visx/shape';
import { scaleLinear, scaleBand } from '@visx/scale';
import { AxisBottom, AxisLeft } from '@visx/axis';
// line chart representing the sum of all expenses in all categories over time


const BudgetAggregateChart = ({
    months,
    years,
    activeCategories,
    budgetData,
    startMonth,
    startYear,
    endMonth,
    endYear,
}) => {
    const [monthlySums, setMonthlySums] = useState([]);
    // Filter budget data based on start and end date
    const calculateMonthlySums = () => {
        const selectedMonths = years
            .slice(years.indexOf(startYear), years.indexOf(endYear) + 1)
            .map((year) => {
                return months
                    .slice(months.indexOf(startMonth), months.indexOf(endMonth) + 1)
                    .map((month) => {
                        return budgetData[year] && budgetData[year][month]
                            ? budgetData[year][month]
                            : {};
                    });
            });
        const monthlySums = [];
        selectedMonths.forEach((year) => {
            year.forEach((month) => {
                let sum = 0;
                Object.entries(month).forEach(([category, value]) => {
                    if (activeCategories.includes(category)) {
                        sum += value;
                    }
                });
                monthlySums.push(sum);
            });
        });
        setMonthlySums(monthlySums);
    };
    useEffect(() => {
        calculateMonthlySums();
    }, [activeCategories, budgetData, startYear, startMonth, endYear, endMonth]);

    // Define the graph dimensions and margins
    const width = 500;
    const height = 450;
    const margin = { top: 20, bottom: 30, left: 40, right: 20 };

    // Define the x and y scales
    const xScale = scaleBand({
        domain: monthlySums.map((d, i) => i),
        range: [margin.left, width - margin.right],
    });
    const yScale = scaleLinear({
        domain: [0, Math.max(...monthlySums)],
        range: [height - margin.bottom, margin.top],
    });

    return (
        <div>
            <svg width={width} height={height}>
                <Group>
                    <LinePath
                        data={monthlySums}
                        x={(d, i) => xScale(i) + xScale.bandwidth() / 2}
                        y={(d) => yScale(d)}
                        stroke="#83d1d3"
                        strokeWidth={2}
                    />
                </Group>
                <Group top={height - margin.bottom}>
                    <AxisBottom
                        scale={xScale}
                        stroke="#ffffff"
                        tickStroke="#ffffff"
                        tickLabelProps={() => ({
                            fill: '#ffffff',
                            fontSize: 11,
                            textAnchor: 'middle',
                        })}
                        tickValues={monthlySums.map((d, i) => i).filter((d, i) => i % 12 === 0)}
                        tickFormat={(value, index) => years[Math.floor(index)]}
                    />
                </Group>
                <Group left={margin.left}>
                    <AxisLeft
                        scale={yScale}
                        stroke="#ffffff"
                        tickStroke="#ffffff"
                        tickLabelProps={() => ({
                            fill: '#ffffff',
                            fontSize: 11,
                            textAnchor: 'end',
                            verticalAnchor: 'middle',
                        })}
                    />
                </Group>
            </svg>
        </div>
    );
}

export default BudgetAggregateChart;

