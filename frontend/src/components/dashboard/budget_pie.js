import React, { useState, useEffect } from 'react';
import { Pie } from '@visx/shape';
import { Group } from '@visx/group';
import { scaleOrdinal } from '@visx/scale';
import { schemeCategory10 } from 'd3-scale-chromatic';

const BudgetPie = ({ months, years, activeCategories, budgetData, startYear, startMonth, endYear, endMonth }) => {
    
    const [pieData, setPieData] = useState([]);

    const calculatePieData = () => {
        let sumByCategory = {};
        // Calculate sum for selected time frame
        
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
                        }
                        else {
                            sumByCategory[category] = value;
                        }
                    }
                });
            });
        });

        const categories = pieData.map((d) => d.category);
        const colorScale = scaleOrdinal({
            domain: categories,
            range: schemeCategory10,
        });

        // Convert to pie data format
        const pieChartData = Object.entries(sumByCategory).map(([category, value]) => {
            return { category: category, value: value, color: colorScale(category) };
        });

        setPieData(pieChartData);
        console.log('pie data', pieChartData);
    };

    useEffect(() => {
        calculatePieData();
    }, [activeCategories, budgetData, startYear, startMonth, endYear, endMonth]);



    return (
        <div>
            <svg width={400} height={400}>
                <Group top={200} left={200}>
                    <Pie
                        data={pieData}
                        pieValue={(d) => d.value}
                        outerRadius={100}
                        innerRadius={50}
                        cornerRadius={3}
                        padAngle={0.005}
                    >
                        {(pie) => {
                            return pie.arcs.map((arc, index) => {
                                const { category, color } = arc.data;
                                const [centroidX, centroidY] = pie.path.centroid(arc);
                                const hasSpaceForLabel = arc.endAngle - arc.startAngle >= 0.1;
                                return (
                                    <g key={`arc-${category}-${index}`}>
                                        <path d={pie.path(arc)} fill={color} />
                                        {hasSpaceForLabel && (
                                            <text
                                                x={centroidX}
                                                y={centroidY}
                                                dy=".33em"
                                                fill="#ffffff"
                                                fontSize={9}
                                                textAnchor="middle"
                                                pointerEvents="none"
                                            >
                                                {category + ': $' + arc.value}
                                            </text>
                                        )}
                                    </g>
                                );
                            });
                        }}
                    </Pie>
                </Group>
            </svg>
        </div>
    );
};

export default BudgetPie;

