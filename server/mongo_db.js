import mongoose from 'mongoose';
import { BudgetSchema, LoginSchema } from './schema.js';


// Define the connection URL
const mongoURI = process.env.MONGODB_URI;

async function connect() {
    try {
        await mongoose.connect(mongoURI);
        console.log('connected');
    }
    catch (error) {
        throw new Error(error);
    }
}

async function disconnect() {
    try {
        await mongoose.connection.close();
        console.log('disconnected');
    }
    catch (error) {
        throw new Error(error);
    }
}
async function getBudgetData(username) {
    try {
        const budgetData = await BudgetSchema.find({username: username});
        console.log("get budget data:", budgetData);
        return budgetData;
    }
    catch (error) {
        throw new Error(error);
    }
}

async function getLoginData(username) {
    try {
        const loginData = await LoginSchema.find({username: username})
        return loginData;

    }
    catch (error) {
        throw new Error(error);
    }
}

async function createUserData(username, password) {
    try {
        const loginData = new LoginSchema({username: username, password: password});
        await loginData.save();
        const budgetData = new BudgetSchema({username: username, budget_categories: [], expenses: {}});
        await budgetData.save();
    }
    catch (error) {
        throw new Error(error);
    }
}

async function updateBudgetCategories(username, categories) {
    try {
        const budgetData = await BudgetSchema.findOneAndUpdate(
            { username: username },

            { budget_categories: categories },
            { new: true, useFindAndModify: false }
        );
        console.log('updated categories', budgetData);
    }
    catch (error) {
        throw new Error(error);
    }
}

async function updateExpenses(username, expenses) {
    try {
        const budgetData = await BudgetSchema.findOneAndUpdate(
            { username: username },
            { $set: { 'expenses': expenses } },
            { new: true, useFindAndModify: false }
        );
        console.log('updated expenses', budgetData);
    }
    catch (error) {
        throw new Error(error);
    }
}

export {
    connect,
    disconnect,
    getBudgetData,
    getLoginData,
    createUserData,
    updateBudgetCategories,
    updateExpenses
};




