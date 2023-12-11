import React, { useState } from 'react';
import { Box, Button, Input, Select, VStack } from '@chakra-ui/react';

const BudgetInput = ({ activeCategories, onAddCategory }) => {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [customCategory, setCustomCategory] = useState('');

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };
    const handleCustomCategoryChange = (event) => {
        setCustomCategory(event.target.value);
    }

    const handleAddCategory = () => {
        if (selectedCategory) {
            if (selectedCategory === 'Custom') {
                if (activeCategories.includes(customCategory) && customCategory) {
                    console.log('Category already selected');
                    setSelectedCategory('');
                    
                } else {
                    console.log('Custom category:', customCategory);
                    onAddCategory(customCategory);
                }
                setCustomCategory('');
            } else {
                if (activeCategories.includes(selectedCategory)) {
                    console.log('Category already selected');
                    setSelectedCategory('');
                } 
                else {
                    console.log('Selected category:', selectedCategory);  
                    onAddCategory(selectedCategory);
                }
                
            }
            setSelectedCategory('');
        }
    };

    return (
        <Box>
            <VStack spacing={4}>
                <Select value={selectedCategory} onChange={handleCategoryChange}>
                    <option value="">Select a category</option>
                    <option value="Food">Food</option>
                    <option value="Transportation">Transportation</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Custom">Custom</option>
                    {selectedCategory === 'Custom' && (
                        <option value="Custom">Custom</option>
                    )}
                </Select>
                {selectedCategory === 'Custom' && (
                    <Input 
                        placeholder="Name your custom category"
                        value={customCategory}
                        onChange={handleCustomCategoryChange}
                    />
                )}
                <Button onClick={handleAddCategory}>Add Category</Button>
            </VStack>
        </Box>
    );
};

export default BudgetInput;
