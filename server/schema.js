import mongoose from 'mongoose';

const BudgetSchema = mongoose.model('BudgetSchema',
    new mongoose.Schema({
    budget_categories: {
        type: Array,
        required: true
    },
    expenses: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    },
    username: {
        type: String, 
        required: true
    }
}, {collection: 'budget_data'}));

const LoginSchema = mongoose.model('LoginSchema',
    new mongoose.Schema({
    username: {
        type: String, 
        required: true
    },
    password: {
        type: String, 
        required: true
    }
}, {collection: 'login'}));


export {
    BudgetSchema,
    LoginSchema
};
