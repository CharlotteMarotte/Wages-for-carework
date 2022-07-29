const cors = require('cors');  
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var CategoriesRouter = require('./routes/categories');
var InvoiceRouter = require('./routes/invoices');
var StatisticRouter = require('./routes/statistics');
var UsersRouter = require('./routes/users');
var AuthRouter = require('./routes/auth');



var app = express();

app.use(cors());  
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/bill-cats', CategoriesRouter);
app.use('/invoices', InvoiceRouter);
app.use('/statistics', StatisticRouter);
app.use('/users', UsersRouter);
app.use('/auth', AuthRouter);




module.exports = app;
