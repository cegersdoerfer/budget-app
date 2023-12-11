import { Box, Select, Flex, Text } from "@chakra-ui/react";

const TimeSelection = ({months, years,
    startMonth,
    startYear,
    endMonth,
    endYear,
    setStartYear,
    setStartMonth,
    setEndYear,
    setEndMonth,
}) => {

  const handleStartYearChange = (event) => {
    setStartYear(event.target.value);
  };

  const handleStartMonthChange = (event) => {
    setStartMonth(event.target.value);
  };

  const handleEndYearChange = (event) => {
    setEndYear(event.target.value);
  };

  const handleEndMonthChange = (event) => {
    setEndMonth(event.target.value);
  };

  return (
    
    <Box justifyContent='center' alignItems='center' style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Flex gap={3} >
        <Text fontSize='md'>Start Year:</Text>
        <Select onChange={handleStartYearChange} defaultValue={startYear}>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </Select>
        <Text fontSize='md'>Start Month:</Text>
        <Select onChange={handleStartMonthChange} defaultValue={startMonth}>
          {months.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </Select>
      </Flex>
      <Flex gap={3}>
        <Text fontSize='md'>End Year:</Text>
        <Select onChange={handleEndYearChange} defaultValue={endYear}>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </Select>
        <Text fontSize='md'>End Month:</Text>
        <Select onChange={handleEndMonthChange} defaultValue={endMonth}>
          {months.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </Select>
      </Flex>
    </Box>
  );
};

export default TimeSelection;
