const mongoose = require('mongoose');
let dotenv = require("dotenv")
dotenv.config({ path: './.env' });
const db = process.env.DATABASE


mongoose.connect(db)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });




