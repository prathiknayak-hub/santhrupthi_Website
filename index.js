// importing the modules
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');

const cookieParser=require("cookie-parser");

const app = express();

app.use( express.static(path.join( __dirname,"view" ) ));

// EJS
app.use(expressLayouts);
app.set('views','./view');
app.set('view engine','ejs');

// Bodyparser
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());

// Routes
const login= require('./router/login')
const register=require('./router/register')
const welcome=require('./router/welcome')
const dashboard=require('./router/dashboard')
const profile=require('./router/profile')
const donation=require('./router/donation')
app.use('/',welcome);
app.use('/login',login);
app.use('/register',register);
app.use('/dashboard',dashboard);
app.use('/profile',profile);
app.use('/donation',donation);

const PORT = process.env.PORT || 5000;

app.listen(PORT,console.log(`Server started on port ${PORT}`));