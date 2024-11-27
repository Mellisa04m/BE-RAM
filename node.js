const mysql = require('mysql2');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Create connection to MySQL database
const connection = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost', // Use environment variable or default to localhost
    user: process.env.DB_USER || 'root',      // Use environment variable or default to root
    password: process.env.DB_PASSWORD || '',   // Use environment variable or default to empty string
    database: process.env.DB_NAME || 'beram_sneakers' // Use environment variable or default to 'beram_sneakers'
});

// Connect to the database
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    console.log('Connected to the database as ID ' + connection.threadId);
});

// Handle process exit to close the connection
process.on('exit', () => {
    connection.end((err) => {
        if (err) {
            console.error('Error closing the database connection:', err.stack);
        } else {
            console.log('Database connection closed.');
        }
    });
});

module.exports = connection;