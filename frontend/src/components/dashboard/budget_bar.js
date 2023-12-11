import React, { useState, useEffect } from 'react';
import { Bar } from '@visx/shape';
import { scaleLinear, scaleBand } from '@visx/scale';
import { AxisBottom, AxisLeft } from '@visx/axis';


const BudgetBar = ({ months, years, activeCategories, budgetData, startYear, startMonth, endYear, endMonth }) => {
    // Filter budget data based on start and end dates
    const [data, setData] = useState([]);

    const calculateBarData = () => {
        let sumByCategory = {};
        let countByCategory = {};

        // Calculate sum and count for selected time frame
        const selectedMonths = years.slice(years.indexOf(startYear), years.indexOf(endYear) + 1).map((year) => {
            return months.slice(months.indexOf(startMonth), months.indexOf(endMonth) + 1).map((month) => {
                return budgetData[year] && budgetData[year][month] ? budgetData[year][month] : {};
            });
        });

        selectedMonths.forEach((year) => {
            year.forEach((month) => {
                Object.entries(month).forEach(([category, value]) => {
                    if (activeCategories.includes(category)) {
                        if (sumByCategory[category]) {
                            sumByCategory[category] += value;
                            countByCategory[category] += 1;
                        }
                        else {
                            sumByCategory[category] = value;
                            countByCategory[category] = 1;
                        }
                    }
                });
            });
        });

        // Calculate average for each category
        const averageByCategory = Object.entries(sumByCategory).reduce((acc, [category, sum]) => {
            const count = countByCategory[category];
            const average = count > 0 ? sum / count : 0;
            acc[category] = average;
            return acc;
        }, {});

        // Convert to bar data format
        const barChartData = Object.entries(averageByCategory).map(([category, value]) => {
            return { category: category, value: value };
        });
        

        setData(barChartData);
        console.log('bar data', barChartData);
    };

    useEffect(() => {
        calculateBarData();
    }
    , [activeCategories, budgetData, startYear, startMonth, endYear, endMonth]);

    // Define the graph dimensions and margins
    const width = 500;
    const height = 450;
    const margin = { top: 20, bottom: 30, left: 20, right: 20 };

    // Define the x and y scales
    const xScale = scaleBand({
        domain: data.map((d) => d.category),
        range: [margin.left, width - margin.right],
        padding: 0.1,
    });
    const yScale = scaleLinear({
        domain: [0, Math.max(...data.map((d) => d.value))],
        range: [height - margin.bottom, margin.top],
    });

    return (
        <svg width={width} height={height}>
            {data.map((d) => (
                <Bar
                    key={d.category}
                    x={xScale(d.category)}
                    y={yScale(d.value)}
                    width={xScale.bandwidth()}
                    height={height - margin.bottom - yScale(d.value)}
                    fill="#007bff"
                />
            ))}
            <AxisBottom
                top={height - margin.bottom}
                scale={xScale}
                tickFormat={(value) => value}
                stroke="#ffffff"
                tickStroke="#ffffff"
                tickLabelProps={() => ({
                    fill: '#ffffff',
                    fontSize: 11,
                    textAnchor: 'middle',
                })}
            />
            <AxisLeft
                left={margin.left}
                scale={yScale}
                tickFormat={(value) => value}
                stroke="#ffffff"
                tickStroke="#ffffff"
                tickLabelProps={() => ({
                    fill: '#ffffff',
                    fontSize: 11,
                    textAnchor: 'end',
                    verticalAnchor: 'middle',
                })}
            />
        </svg>
    );
};

export default BudgetBar;



