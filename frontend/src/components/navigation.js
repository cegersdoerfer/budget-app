import React from 'react';
import { Box, Flex, Spacer, Link, Button } from '@chakra-ui/react';
import { useLocation, Link as RouterLink } from 'react-router-dom';


const DashboardNavigation = ({onSignOut}) => {
    const location = useLocation();

    return (
        <div style={{ position: 'absolute', top: 0, width: '100%' }}>
            <Box bg="gray.800" w="100vw" p={3} fontSize={20}>
                <Flex alignItems="center">
                    <Link as={RouterLink} to="/dashboard" color={location.pathname === '/' ? 'teal.500' : 'white'} fontSize="xl" fontWeight="bold">
                        My Budget App
                    </Link>
                    <Spacer />
                    <Flex alignItems="center">
                        <Link as={RouterLink} to="/dashboard" color={location.pathname === '/dashboard' ? 'teal.500' : 'white'} mr={4}>
                            Dashboard
                        </Link>
                        <Link as={RouterLink} to="/expenses" color={location.pathname === '/expenses' ? 'teal.500' : 'white'} mr={4}>
                            Expenses
                        </Link>
                        <Button colorScheme="teal" variant="outline" onClick={onSignOut}>
                            Sign Out
                        </Button>
                    </Flex>
                </Flex>
            </Box>
        </div>
    );
};

export default DashboardNavigation;
