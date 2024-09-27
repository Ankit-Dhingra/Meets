
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./config/database.js'); 
const authRoutes = require('./routes/authRoutes.js'); 
const eventRoutes = require('./routes/eventRoutes.js'); 
const dotenv = require('dotenv'); 


dotenv.config();


const app = express();
const port = process.env.PORT || 5000; 


app.use(cors());
// app.use(cors({
//     origin: 'http://localhost:5173', // Allow requests from the frontend
//     credentials: true,
// }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);


sequelize.authenticate()
    .then(() => {
        console.log('Database connected...');
    })
    .catch(err => {
        console.error('Database connection error:', err);
    });


sequelize.sync()
    .then(() => {
        console.log('Models synchronized with the database.');
    })
    .catch(err => {
        console.error('Error synchronizing models:', err);
    });


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
