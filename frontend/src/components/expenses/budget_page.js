
import React from 'react';
import './budget.css';
import BudgetInput from './budget_input';
import ActiveBudgetCategories from './budget_config';
import ExpenseInput from './value_input';
import Calendar from './budget_calendar';
import { Card, CardHeader, CardBody } from '@chakra-ui/react'
import { useState, useEffect } from 'react';
import { useLocation} from 'react-router-dom';
import { motion } from "framer-motion"



const ExpensesPage = ({user, token, apiAddress}) => {
    const [activeCategories, setActiveCategories] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [expenses, setExpenses] = useState({});
    const [emptyCategories, setEmptyCategories] = useState(false);
    const location = useLocation();

    const getBudget = () => {
        // mongo call to get budget
        const data = { username: user};
        fetch(`${apiAddress}/getBudget`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': token,
            },
            body: JSON.stringify(data)
        })
        .then((response) => {
            // wait for the response from the server
            response.json().then((data) => {
                console.log(data);
                if (data) {
                    setActiveCategories(data.budget_categories);
                    setExpenses(data.expenses? data.expenses : {});
                }
            });
        })
        .catch((error) => {
            console.error('Error:', error);
        });

    }

    const updateCategories = () => {
        const data = { username: user, categories: activeCategories };
        fetch(`${apiAddress}/updateBudgetCategories`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': token,
            },
            body: JSON.stringify(data)
        })
        .then((response) => {
            // wait for the response from the server
            if (response.status === 200) {
                console.log('success');
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    const updateExpenses = () => {
        const data = { username: user, expenses: expenses };
        console.log('update exp via endpoint', data);
        console.log('update exp via endpoint', JSON.stringify(data));
        fetch(`${apiAddress}/updateExpenses`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': token,
            },
            body: JSON.stringify(data)
        })
        .then((response) => {
            // wait for the response from the server
            if (response.status === 200) {
                console.log('success');
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    useEffect(() => {
        // mongo call to get categories
        console.log('get budget');
        getBudget();
    }, [location]);

    useEffect(() => {
        // mongo call to get categories
        if (activeCategories.length > 0 || emptyCategories) {
            console.log('update categories');
            updateCategories();
            console.log('update expenses');
            updateExpenses();
            console.log('update expenses', expenses);
            if (emptyCategories) {
                setEmptyCategories(false);
            }
        }

    }, [activeCategories, expenses]);

    const handleAddCategory = (category) => {
        setActiveCategories([...activeCategories, category]);
    }

    const handleRemoveCategory = (category) => {
        console.log('remove category', category);
        // remove category from active categories
        const newCategories = activeCategories.filter((item) => item !== category);
        if (newCategories.length === 0) {
            setEmptyCategories(true);
        }
        setActiveCategories(newCategories);
    }

    const handleUpdateExpenses = (new_expenses, year, month) => {
        console.log('new expenses', new_expenses);
        const updated_expenses = { ...expenses }; // Create a new object
        updated_expenses[year] = updated_expenses[year] || {};
        updated_expenses[year][month] = updated_expenses[year][month] || {};
    
        for (const [key, value] of Object.entries(new_expenses)) {
            updated_expenses[year][month][key] = value;
        }
    
        console.log('updated expenses', updated_expenses);
        setExpenses(updated_expenses);
    };



    return (
        <> 
            <div className='budget_grid'>
                <motion.div
                    initial={{ x: -1000 }}
                    animate={{ x: 0 }}
                    transition={{ duration: 1 }}
                >
                    <Card>
                        <CardHeader>Add Budget Categories</CardHeader>
                        <CardBody>
                            <BudgetInput activeCategories={activeCategories} onAddCategory={handleAddCategory}/>
                        </CardBody>
                    </Card>
                </motion.div>

                <motion.div
                    initial={{ x: 1000 }}
                    animate={{ x: 0 }}
                    transition={{ duration: 1 }}
                >
                    <Card>
                        <CardHeader>Set Month</CardHeader>
                        <CardBody>
                            <Calendar selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} selectedYear={selectedYear} setSelectedYear={setSelectedYear} />
                        </CardBody>
                    </Card>
                </motion.div>

                <motion.div
                    initial={{ x: -1000 }}
                    animate={{ x: 0 }}
                    transition={{ duration: 1 }}
                >
                    <Card>
                        <CardHeader>Active Budget Categories</CardHeader>
                        <CardBody>
                            <ActiveBudgetCategories activeCategories={activeCategories} onRemoveCategory={handleRemoveCategory} />
                        </CardBody>
                    </Card>
                </motion.div>

                <motion.div
                    initial={{ x: 1000 }}
                    animate={{ x: 0 }}
                    transition={{ duration: 1 }}
                >
                    <Card>
                        <CardHeader>Expense Input</CardHeader>
                        <CardBody>
                            <ExpenseInput activeCategories={activeCategories} selectedMonth={selectedMonth} selectedYear={selectedYear} expenses={expenses} onChangeExpenses={handleUpdateExpenses} />
                        </CardBody>
                    </Card>
                </motion.div>



            </div>
        </>
    );
};

export default ExpensesPage;



