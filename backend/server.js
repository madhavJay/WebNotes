const express = require('express');
const bodyParser = require('body-parser');

const HomeRoutes = require('./routes/NoteRoutes'); 
const DB = require('./config/db'); 

const dotenv = require('dotenv');
dotenv.config();

const ratelimiter = require('./middleware/RateLimiter'); // Assuming you have a rate limiter middleware

const cors = require('cors');

const app = express();
const port = 5000;


app.use(express.json());
app.use(cors());
app.use(ratelimiter);
app.use('/Notes', HomeRoutes);

DB.connectToDatabase().then(()=>{
    app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    });
});



