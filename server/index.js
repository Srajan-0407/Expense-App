const express = require('express');
const app = express()
const cors = require('cors');
const port = 3025
const configDB = require('../server/config/db');
const router = require('./config/routes');
require('dotenv').config()
app.use(express.json())
app.use(cors())
app.use(router)
configDB()

app.listen(port, () => {
    console.log(`App running on port ${port}`);
})