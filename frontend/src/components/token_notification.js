import React from 'react';
import { Box, Button, Alert, AlertIcon, AlertTitle, CloseButton } from '@chakra-ui/react';


const TokenNotification = ({setTokenExpiration, setNotifyExpiration, setToken, token, user, apiAddress}) => {
    function extendSession() {
        console.log('extend session');
        const data = { username: user, expirationTime: "1m" };
        fetch(`${apiAddress}/extendSession`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': token,
            },
            body: JSON.stringify(data),
        })
        .then((response) => {
            // wait for the response from the server
            response.json().then((data) => {
                const token = data.sessionToken;
                if (token) {
                    setToken(token);
                    //set token expirtion to current time + 1 minute
                    const tokenExpiration = new Date();
                    tokenExpiration.setMinutes(tokenExpiration.getMinutes() + 1);
                    setTokenExpiration(tokenExpiration);
                    setNotifyExpiration(false);
                }
            });
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    
      }
    return (
        <Box position="fixed" bottom={4} right={4}>
            <Alert status="warning" variant="subtle" flexDirection="column" alignItems="start" justifyContent="center" textAlign="left" borderRadius="md" boxShadow="md" p={4}>
                <AlertIcon />
                <AlertTitle fontSize='md' color='black'>Your session will expire in 20 seconds.</AlertTitle>
                <Button colorScheme="blue" size="sm" mt={2} onClick={extendSession}>
                    Extend Session
                </Button>
                <CloseButton position="absolute" right="8px" top="8px" onClick={() => setNotifyExpiration(false)} /> 
            </Alert>
        </Box>
    );
};

export default TokenNotification;
