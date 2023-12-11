
import React, { useState, useEffect } from 'react';
import { Box, Input, Select, Button, Text, Alert, AlertIcon, AlertTitle } from '@chakra-ui/react';

const ExpenseInput = ({ activeCategories, selectedMonth, selectedYear, expenses, onChangeExpenses }) => {
    // set expensevalues to 
    const [expenseValues, setExpenseValues] = useState({})

    const handleSubmit = () => {
        if (expenseValues.length === 0) {
            console.log('No expenses entered');
        }
        else {
            onChangeExpenses(expenseValues, selectedYear, selectedMonth);
        }

    };

    const handleExpenseChange = (event, category) => {
        // save as a number

        const updatedExpenseValues = { ...expenseValues };
        if (event.target.value === '') {
            updatedExpenseValues[category] = 0;
        }
        else{
            updatedExpenseValues[category] = Number(event.target.value);
        }
        setExpenseValues(updatedExpenseValues);

    };

    useEffect(() => {
        const updatedExpenseValues = {};
        if (!selectedMonth || !selectedYear) {
            setExpenseValues({});
            return;
        }
        activeCategories.forEach((category) => {
            updatedExpenseValues[category] = expenses[selectedYear] && expenses[selectedYear][selectedMonth] && expenses[selectedYear][selectedMonth][category]
                ? expenses[selectedYear][selectedMonth][category]
                : 0;
        });
        setExpenseValues(updatedExpenseValues);
    }, [activeCategories, selectedMonth, selectedYear, expenses]);



    if (!selectedMonth || !selectedYear) {
        return (
        <>
        <Alert status="error">
            <AlertIcon />
            <AlertTitle fontSize='md' mr={2}>Please select a month and year</AlertTitle>
        </Alert>
        </>
        );
    }

    return (
        <>
            <Text fontSize="sm" mb={0} mt='-10%'>
                Enter Expenses for {selectedMonth} {selectedYear}
            </Text>
            <Box>

                {activeCategories.map((category) => (
                    <Input
                        key={category}
                        placeholder={category}
                        value={expenseValues[category] || ''}
                        onChange={(event) => handleExpenseChange(event, category)}
                    />
                ))}
                <Button onClick={handleSubmit}>Submit</Button>
            </Box>
        </>
    );
};

export default ExpenseInput;
