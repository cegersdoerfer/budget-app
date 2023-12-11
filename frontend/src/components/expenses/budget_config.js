
import React from 'react';
import { Box, Text, IconButton } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';


const ActiveBudgetCategories = ({ activeCategories, onRemoveCategory}) => {

  return (
    <Box display="flex" flexWrap="wrap" alignItems="center">
      {activeCategories.map((category) => (
        <Box key={category} display="flex" alignItems="center">
          <Text fontSize='md'>{category}</Text>
          <IconButton
            icon={<CloseIcon />}
            size="sm"
            onClick={() => onRemoveCategory(category)}
          />
        </Box>
      ))}
    </Box>
  );
};

export default ActiveBudgetCategories;
