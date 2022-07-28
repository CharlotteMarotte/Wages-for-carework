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



const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images/')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
})

const upload = multer({ storage: storage })

app.use(cors())

app.post('/image', upload.single('file'), function (req, res) {
  res.json({})
})

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})



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
