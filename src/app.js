const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();

// Set view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));

// MySQL connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

function connectToDatabase(retries = 5) {
    db.connect((err) => {
        if (err) {
            console.error('Error connecting to MySQL:', err);
            if (retries > 0) {
                console.log(`Retrying... (${5 - retries + 1})`);
                setTimeout(() => connectToDatabase(retries - 1), 5000);
            } else {
                console.error('Max retries reached. Exiting...');
                process.exit(1);
            }
        } else {
            console.log('Connected to MySQL');
        }
    });
}

connectToDatabase();

// Routes
const indexRouter = require('./routes/index');
app.use('/', indexRouter);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
