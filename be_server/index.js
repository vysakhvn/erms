const express = require('express');
const chalk = require('chalk');
const morgan = require('morgan');
const authRouter = require('./src/routes/authRouter');
const { errors } = require('celebrate');
const cors = require('cors');
const userRouter = require('./src/routes/userRouter');
const employeeRouter = require('./src/routes/employeeRouter');
require('dotenv').config();

const PORT = process.env.PORT || 3010;
const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.options('*',cors());
app.use(cors());
app.use('/v1/auth',authRouter);
app.use('/v1/signup',userRouter);
app.use('/v1/employee',employeeRouter);

app.get('/v1/',(req,res) => {
    res.send("Root API");
});

app.use(errors());
app.use((err,req,res,next) => {
    res.status(err.status);
    res.json({
        message: err.message,
        details: err.details || null,
    });
})

app.listen(PORT, () => {
    console.log(`Running on port ${chalk.greenBright(PORT)}`);
});