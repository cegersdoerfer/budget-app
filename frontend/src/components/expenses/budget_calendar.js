import React, { useState } from 'react';
import { Box, Button, Flex, Select, VStack } from '@chakra-ui/react';

const Calendar = ({ selectedMonth, setSelectedMonth, selectedYear, setSelectedYear }) => {

    const handleMonthChange = (event) => {
        setSelectedMonth(event.target.value);
    };

    const handleYearChange = (event) => {
        setSelectedYear(event.target.value);
    };

    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];

    const years = [
        '2020',
        '2021',
        '2022',
        '2023',
        '2024'
    ];

    return (
        <Box>
            <VStack spacing={4}>
                <Flex align="center" columnGap={2}>
                    <Select value={selectedMonth} onChange={handleMonthChange} placeholder="Month">
                        {months.map((month) => (
                            <option key={month} value={month}>
                                {month}
                            </option>
                        ))}
                    </Select>
                    <Select value={selectedYear} onChange={handleYearChange} placeholder="Year">
                        {years.map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                        
                    </Select>
                </Flex>
            </VStack>
        </Box>
    );
};

export default Calendar;
