const cors = require('cors');  
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var CategoriesRouter = require('./routes/Categories');
var InvoiceRouter = require('./routes/Invoices');
var StatisticRouter = require('./routes/Statistics');


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

module.exports = app;
