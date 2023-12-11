
import React from 'react';
import TimeSelection from './time_selection';
import BudgetPie from './budget_pie';
import BudgetBar from './budget_bar';
import BudgetAggregateChart from './budget_aggregate';
import { Grid, GridItem, Flex, Text } from '@chakra-ui/react'

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

const DashboardPage = ({user, token, apiAddress}) => {
  const [startYear, setStartYear] = React.useState('2020');
  const [startMonth, setStartMonth] = React.useState('January');
  const [endYear, setEndYear] = React.useState('2024');
  const [endMonth, setEndMonth] = React.useState('December');
  const [activeCategories, setActiveCategories] = React.useState([]);
  const [expenses, setExpenses] = React.useState({});

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

  React.useEffect(() => {
    // mongo call to get budget
    console.log('get budget');
    getBudget();
  }
  , [activeCategories, expenses]);




  return (
    <>
        <Grid
          h="100%"
          templateRows="repeat(2, 1fr)"
          templateColumns="repeat(2, 1fr)"
          gap={4}
          paddingTop={20}
          paddingBottom={5}
        >
          <GridItem rowSpan={1} colSpan={1} bg="#034142">
            <Flex justifyContent='center' paddingTop={5} paddingBottom={20} flexDirection='column'>
              <Text fontSize='xl' fontWeight='Bold'>Time Selection</Text>
              <Text fontSize='md' fontWeight='normal' fontStyle='italic' paddingLeft={5} paddingRight={5}>Select the time frame which should be represented in the plots</Text>
            </Flex>
            <Flex justifyContent='center' paddingTop={5} paddingBottom={5}>
              <TimeSelection months={months} years={years} startYear={startYear} startMonth={startMonth} endYear={endYear} endMonth={endMonth} setStartYear={setStartYear} setStartMonth={setStartMonth} setEndYear={setEndYear} setEndMonth={setEndMonth} />
            </Flex>
          </GridItem>
          <GridItem rowSpan={1} colSpan={1} bg="#034142">
            <Flex justifyContent='center' paddingTop={5} paddingBottom={5} flexDirection='column'>
              <Text fontSize='xl' fontWeight='Bold'>Budget Pie Chart</Text>
              <Text fontSize='md' fontWeight='normal' fontStyle='italic' paddingLeft={5} paddingRight={5}>This chart shows the distribution of expenses across categories for the selected time frame. The data represented for each category is an aggregated sum.</Text>
            </Flex>
            <Flex justifyContent='center' paddingTop={5} paddingBottom={5}>
              <BudgetPie months={months} years={years} activeCategories={activeCategories} budgetData={expenses} startYear={startYear} startMonth={startMonth} endYear={endYear} endMonth={endMonth} />
            </Flex>
          </GridItem>
          <GridItem rowSpan={1} colSpan={1} bg="#034142">
            <Flex justifyContent='center' paddingTop={5} paddingBottom={5} flexDirection='column'>
              <Text fontSize='xl' fontWeight='Bold'>Budget Bar Chart</Text>
              <Text fontSize='md' fontWeight='normal' fontStyle='italic' paddingLeft={5} paddingRight={5}>This chart shows the distribution of expenses across categories for the selected time frame. The data represented for each category is an average computed based only on months where data is present.</Text>
            </Flex>
            <Flex justifyContent='center' paddingTop={5} paddingBottom={5}>
              <BudgetBar months={months} years={years} activeCategories={activeCategories} budgetData={expenses} startYear={startYear} startMonth={startMonth} endYear={endYear} endMonth={endMonth} />
            </Flex>
          </GridItem>
          <GridItem rowSpan={1} colSpan={1} bg="#034142">
            <Flex justifyContent='center' paddingTop={5} paddingBottom={5} flexDirection='column'>
              <Text fontSize='xl' fontWeight='Bold'>Budget Aggregate Chart</Text>
              <Text fontSize='md' fontWeight='normal' fontStyle='italic' paddingLeft={5} paddingRight={5}>This chart shows the sum of all expenses across all categories, each month, over the selected time frame.</Text>
            </Flex>
            <Flex justifyContent='center' paddingTop={5} paddingBottom={5}>
              <BudgetAggregateChart months={months} years={years} activeCategories={activeCategories} budgetData={expenses} startYear={startYear} startMonth={startMonth} endYear={endYear} endMonth={endMonth} />
            </Flex>
          </GridItem>
        </Grid>
    </>
  );
};

export default DashboardPage;
