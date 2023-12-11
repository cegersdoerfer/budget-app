
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, FormControl, FormLabel, Input, Alert, AlertIcon, AlertTitle } from '@chakra-ui/react';
import { TypeAnimation } from 'react-type-animation';

const LoginPanel = ({setLoggedIn, setUser, setToken, setTokenExpiration, apiAddress, setNotifyExpiration}) => {
    const [fillForm, setFillForm] = useState(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    
    const setLogin = () => {
        setFillForm('login');
    }
    const setSignUp = () => {
        setFillForm('signup');
    }

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const checkConfirmPassword = (event) => {
        setConfirmPassword(event.target.value);
        if (password !== confirmPassword) {
            console.log('Passwords do not match');
        }
    };

    const handleLogin = () => {
        const data = { username, password, expirationTime: "1m" };
        console.log(data);
        setLoading(true);

        fetch(`${apiAddress}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then((response) => {
            // wait for the response from the server
            response.json().then((data) => {
                console.log(data);
                const token = data.sessionToken;
                console.log('token', token);
                if (token) {
                    setUser(username);
                    setLoggedIn(true);
                    setToken(token);
                    //set token expirtion to current time + 1 minute
                    const tokenExpiration = new Date();
                    tokenExpiration.setMinutes(tokenExpiration.getMinutes() + 1);
                    setTokenExpiration(tokenExpiration);
                    setNotifyExpiration(false);
                    navigate('/dashboard');
                }
            });
        })
        .catch((error) => {
            console.error('Error:', error);
        })
        .finally(() => {
            setLoading(false); 
        });
    };

    const handleSignUp = () => {
        const data = { username, password, expirationTime: "1m" };
        setLoading(true);

        fetch(`${apiAddress}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then((response) => {
            // wait for the response from the server
            response.json().then((data) => {
                console.log(data);
                const token = data.sessionToken;
                console.log('token', token);
                if (token) {
                    setUser(username);
                    setLoggedIn(true);
                    setToken(token);
                    const tokenExpiration = new Date();
                    tokenExpiration.setMinutes(tokenExpiration.getMinutes() + 1);
                    setTokenExpiration(tokenExpiration);
                    setNotifyExpiration(false);
                    navigate('/dashboard');
                }
            });
        })
        .catch((error) => {
            console.error('Error:', error);
        })
        .finally(() => {
            setLoading(false);
        });
    }
  
    if (!fillForm) {
        return (
        <>
            <div className="typed-header">
                <TypeAnimation cursor={false} sequence={['Welcome to your financial future']}/>
            </div>
            <Box>
                <Button colorScheme="teal" onClick={setLogin} disabled={loading}>
                    {loading ? 'Loading...' : 'Login'}
                </Button>
                <Button colorScheme="pink" onClick={setSignUp} ml={4} disabled={loading}>
                    {loading ? 'Loading...' : 'Sign Up'}
                </Button> 
            </Box>
        </>
        );
    }

    return (
        <>
            <div className="typed-header">
                <TypeAnimation cursor={false} sequence={['Welcome to your financial future']}/>
            </div>
            <Box>
                {fillForm === 'login' ? (
                    <>
                    <FormControl>
                        <FormLabel>Email</FormLabel>
                        <Input type="email" placeholder="Enter your email" onChange={handleUsernameChange} />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Password</FormLabel>
                        <Input type="password" placeholder="Enter your password" onChange={handlePasswordChange} />
                    </FormControl>
                    <Button mt={4} colorScheme="teal" onClick={handleLogin} disabled={loading}>
                        {loading ? 'Loading...' : 'Login'}
                    </Button>
                    </>
                ) : (
                    <>
                    <FormControl>
                        <FormLabel>Email</FormLabel>
                        <Input type="email" placeholder="Enter your email" onChange={handleUsernameChange} />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Password</FormLabel>
                        <Input type="password" placeholder="Enter your password" onChange={handlePasswordChange} />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Confirm Password</FormLabel>
                        <Input type="password" placeholder="Confirm your password" onChange={checkConfirmPassword} />
                    </FormControl>
                    {password !== confirmPassword && (
                        <Alert status="error">
                            <AlertIcon />
                            <AlertTitle fontSize='md' mr={2}>Passwords do not match</AlertTitle>
                        </Alert>
                    )}
                    {password === confirmPassword && (
                        <Button mt={4} colorScheme="teal" onClick={handleSignUp} disabled={loading}>
                            {loading ? 'Loading...' : 'Sign Up'}
                        </Button>
                    )}
                    
                    </>
                )}
            </Box>
        </>
    );
};

export default LoginPanel;
