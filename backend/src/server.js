const express = require('express');
require("dotenv/config");

const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');

const app = express();

mongoose.connect(process.env.MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333);
