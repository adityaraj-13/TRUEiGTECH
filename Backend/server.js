const express = require("express");
const mongoose = require("mongoose");
const db_config = require('./config/db.config');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// Database connection
mongoose.connect(db_config.DB_URL);

const db =mongoose.connection;

db.on("error", ()=>{
    console.log("Error while connecting to the mongodb.");
});

db.once("open",()=>{
    console.log("connected to MongoDB.");
});

require('./routers/auth.routes')(app);
require('./routers/plan.routes')(app);
require('./routers/subscription.routes')(app);
require('./routers/user.routes')(app);

app.listen(PORT,() =>{
    console.log(`Server running on port ${PORT}`);
});