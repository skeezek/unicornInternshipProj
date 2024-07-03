const express = require('express');
const cors = require('cors');

const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Provider = require('./schema/userSchema'); // Correct path to your userSchema.js file
app.use(cors()) 

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
const uri = "mongodb+srv://admin:admin@cluster0.whveyts.mongodb.net/ElectricityProviders?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(uri)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

// Default route for root URL
app.get('/', (req, res) => {
    res.send('Welcome to the Electricity Providers API');
});

// CRUD routes
app.get('/api/electricity_provider/get', async (req, res) => {
    try {
        const providers = await Provider.find();
         return res.json(providers);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching data from MongoDB');
    }
});

app.post('/api/electricity_provider/create', async (req, res) => {
    try {
        const newProvider = new Provider(req.body);
        const result = await newProvider.save();
        res.status(201).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error creating provider');
    }
});

app.put('/api/electricity_provider/update/:name', async (req, res) => {
    try {
        const { name } = req.params;
        const updatedProvider = req.body;
        console.log("Provider", name)
        const result = await Provider.findOneAndUpdate({Name:name}, updatedProvider, { new: true });
        console.log("result", result)
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error updating provider');
    }
});

app.delete('/api/electricity_provider/delete/:name', async (req, res) => {
    try {
        const { name } = req.params;
        const result = await Provider.findOneAndDelete({Name:name});
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error deleting provider');
    }
});

// Start the server
app.listen(8888, () => {
    console.log("Server started on port 8888");
});