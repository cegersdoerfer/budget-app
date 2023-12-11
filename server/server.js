import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';
import { connect,
        disconnect, 
        getBudgetData, 
        getLoginData, 
        createUserData, 
        updateBudgetCategories,
        updateExpenses
    } from './mongo_db.js';


const app = express();
const port = 4000;

// set up cors to allow us to accept requests from our client
app.use(cors({ origin: process.env.CLIENT_ORIGIN }));


// Middleware to parse JSON request bodies
app.use(express.json());

// Secret key for JWT
const secretKey = 'key';

await connect().then(() => {
    console.log('connected');
});


const jwtAuth = (req, res, next) => {
    const token = req.headers.authorization;
    
    if (!token) {
        return res.status(401).json({ message: 'Missing token' });
    }
    
    try {
        // Verify the JWT token
        const decoded = jwt.verify(token, secretKey);
    
        // Attach the user ID to the request object
        req.userId = decoded.userId;
    
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};




// Login endpoint
app.post('/login', async (req, res) => {
    const { username, password, expirationTime } = req.body;

    const loginData = await getLoginData(username).then((data) => {
        return data.at(0);
    });
    
    if (!loginData || (loginData.password !== password)) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    else {
        const token = jwt.sign({ userId: username }, secretKey, { expiresIn: expirationTime });
        res.json({ sessionToken: token, message: 'Login successful' });
    }
});




// Signup endpoint
app.post('/signup', async (req, res) => {
    const { username, password, expirationTime } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username or Password not provided' });
    }

    // Check if the username already exists
    const existingUser = await getLoginData(username);

    if (existingUser.length > 0) {
        return res.status(409).json({ message: 'Username already taken' });
    }

    // Create a new user
    await createUserData(username, password).catch((error) => {
        return res.status(500).json({ message: error.message });
    });
    const token = jwt.sign({ userId: username }, secretKey, { expiresIn: expirationTime });

    res.json({ sessionToken: token, message: 'User created successfully' });
});



app.post('/extendSession', jwtAuth, (req, res) => {
    const { username, expirationTime } = req.body;

    if (!username) {
        return res.status(400).json({ message: 'Username not provided' });
    }

    const newToken = jwt.sign({ userId: username }, secretKey, { expiresIn: expirationTime });

    res.json({ sessionToken: newToken, message: 'Session extended successfully' });
});

// Budget data endpoint
app.post('/getBudget', jwtAuth, async (req, res) => {
    const { username } = req.body;
    const budgetData = await getBudgetData(username).then((data) => {
            return data.at(0);
        });

    res.json(budgetData);
});

app.post('/updateBudgetCategories', jwtAuth, async (req, res) => {
    const { username, categories } = req.body;
    await updateBudgetCategories(username, categories).then((data) => {
        res.status(200).json({ message: 'Budget categories updated successfully' });
    }
    ).catch((error) => {
        console.log(error);
        res.status(500).json({ message: error.message });
    });
});

app.post('/updateExpenses', jwtAuth, async (req, res) => {
    const { username, expenses } = req.body;
    await updateExpenses(username, expenses).then((data) => {
        res.status(200).json({ message: 'Expenses updated successfully' });
    }
    ).catch((error) => {
        res.status(500).json({ message: error.message });
    });
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

process.on('SIGINT', () => {
    disconnect();
    process.exit();
});
