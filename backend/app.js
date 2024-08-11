const express = require('express');
const morgan = require('morgan');
require('dotenv').config();
require('./db/mongodb'); // Ensure this connects to MongoDB correctly
const cors = require('cors');
const postRoute = require('./routes/postRoute'); // Ensure this is correctly imported
// const userRoute = require('./routes/userRoute');
const PORT = process.env.PORT || 3000;
const app = express();

// Middleware
app.use(express.json()); // Global JSON parsing middleware
app.use(morgan('dev'));
app.use(cors());

// Routes
app.use('/api', postRoute);
// app.use('/user', userRoute);

// app.get('/*',function(req,res){res.sendFile(path.join(__dirname,'../Employeeappfrontend/index.html'));});
// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`${PORT} is up and running`);
});
