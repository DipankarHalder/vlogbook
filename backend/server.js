const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const tagRoutes = require('./routes/tag');

// create app
const app = express();

// connect with database
const mongo_uri = process.env.DATABASE_LOCAL;
mongoose
    .connect(mongo_uri, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false, useUnifiedTopology: true })
    .then(() => {
        if(mongo_uri === process.env.DATABASE_LOCAL) console.log('2. Database connected with.... MongoDB local');
        if(mongo_uri === process.env.DATABASE_CLOUD) console.log('2. Database connected with.... MongoDB Cloud');
    })
    .catch((err) => console.log(err));

// use middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());

// use cors
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Authorization");
    if (req.mathod === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({ msg: 'CORS ERROR' });
    }
    next();
});

if(process.env.NODE_EVN === "development") {
    app.use(cors({ origin: `${process.env.CLIENT_URL}` }));
}

// use routes
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', categoryRoutes);
app.use('/api', tagRoutes);

// check api url exist or not
app.use((req, res, next) => {
    const error = new Error('The API url not found');
    error.status = 400;
    next(error);
});
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({ error: { msg: error.message } })
});

// create server
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`1. Backend server running on.... ${port}`);
})



