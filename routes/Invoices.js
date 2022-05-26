var express = require('express');
var router = express.Router();
const db = require('../model/helper');

let catAmt = 9;
let lastInvoiceID = 1;

async function getCatAmt() {
  try {
    // to get number of categories
    let sql = `SELECT COUNT(id) AS total FROM categories;`;
    let results = await db(sql);
    catAmt = results.data[0].total;
    // here catAmt is 9
    console.log(catAmt);
  } catch (error) {
    res.status(500).send({ error: err.message });
  }
}

async function getLastInvoiceID() {
  try {
    // to get number of categories
    let sql = `SELECT MAX(id) AS lastID FROM invoices;`;
    let results = await db(sql);
    lastInvoiceID = results.data[0].lastID;
    console.log('inside', lastInvoiceID);
  } catch (error) {
    res.status(500).send({ error: err.message });
  }
}

// Convert DB results into a useful JSON format: invoice obj with nested array of invoice items objs
function joinToJson(results) {
  getCatAmt();
  // here catAmt is 0
  console.log(catAmt);
  // send back length of categories table
  let resultInvoices = [];

  // WHY IS CATAMT 0? NOT GOOD TO WRITE 9
  for (let i = 0; i < results.length; i += catAmt) {
    let row = results[i];
    let invoiceItems = [];

    // Create array of invoice items objs

    // WHY IS CATAMT 0? NOT GOOD TO WRITE 9
    for (let j = 0; j < catAmt; j++) {
      let invoiceItObj = new Object();

      invoiceItObj.category = results[j].cat_name;
      invoiceItObj.hours = results[j].hour;
      invoiceItObj.rate = results[j].rate;
      invoiceItObj.amount = results[j].amount;
      invoiceItems.push(invoiceItObj);
    }

    // // Create invoice obj
    let invoice = {
      id: row.id,
      nameFrom: row.nameFrom,
      emailFrom: row.emailFrom,
      nameTo: row.nameTo,
      emailTo: row.emailTo,
      invoiceDate: row.invoiceDate,
      invoiceItems,
    };
    resultInvoices.push(invoice);
  }
  return resultInvoices;
}

function joinLastInvoiceToJson(results) {
  // Get first row
  let row0 = results.data[0];

  // Create array of invoice item objs
  invoiceItems = results.data.map((it) => ({
    category: it.cat_name,
    hours: it.hour,
    rate: it.rate,
    amount: it.amount,
  }));

  // Create author obj
  let invoice = {
    id: row0.id,
    nameFrom: row0.nameFrom,
    emailFrom: row0.emailFrom,
    nameTo: row0.nameTo,
    emailTo: row0.emailTo,
    invoiceDate: row0.invoiceDate,
    invoiceItems,
  };

  return invoice;
}

router.get('/', (req, res) => {
  // Send back the full list of items
  db(`SELECT i.*, iIt.hour,  iIt.rate, iIT.amount, c.cat_name
  FROM invoices AS i
  INNER JOIN invoice_items AS iIt ON i.id = iIt.fk_invoiceID
  INNER JOIN categories AS c ON c.id = iIt.fk_categoriesID ORDER BY id ASC;`)
    .then((results) => {
      let invoice = results.data;
      invoice = joinToJson(invoice);
      res.send(invoice);
    })
    .catch((err) => res.status(500).send(err));
});

router.get('/last-invoice', async function (req, res) {
  getLastInvoiceID();
  // and again lastInvoiceID is 0 outside the function, should not be 9 in l. 97
  try {
    let sql = `SELECT i.*, iIt.hour,  iIt.rate, iIt.amount, c.cat_name
    FROM invoices AS i
    LEFT OUTER JOIN invoice_items AS iIt ON i.id = iIt.fk_invoiceID
    LEFT OUTER  JOIN categories AS c ON c.id = iIt.fk_categoriesID 
    WHERE i.id = ${lastInvoiceID};`;
    let results = await db(sql);
    // Convert DB results into "sensible" JSON
    invoice = joinLastInvoiceToJson(results);
    res.status(200).send(invoice);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

router.get('/:id/total', async function (req, res) {
  let id = Number(req.params.id);  
  console.log(id);
  // and again lastInvoiceID is 0 outside the function, should not be 9 in l. 97
  try {
    let sql = `SELECT SUM (amount) total FROM invoice_items WHERE fk_invoiceID = ${id};`;
    let results = await db(sql);
    let total = results.data[0].total.toString();
    // Convert DB results into "sensible" JSON
    res.status(200).send(total);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});


router.post('/new', async function (req, res) {
  // The request's body is available in req.body
  // If the query is successfull you should send back the full list of invoice properties
  // Add your code here

  const { nameFrom, emailFrom, nameTo, emailTo, invoiceDate, invoiceItems } =
    req.body;
  const sql = `INSERT INTO invoices (nameFrom, emailFrom, nameTo, emailTo, invoiceDate) 
                VALUES ('${nameFrom}', '${emailFrom}', '${nameTo}', '${emailTo}', '${invoiceDate}');
                SELECT LAST_INSERT_ID();`;

  try {
    let results = await db(sql);
    // The results contain the new invoice's ID thanks to LAST_INSERT_ID()
    let invoiceID = results.data[0].insertId;

    // Add invoice items with invoice ID to invoice item table
    if (invoiceItems && invoiceItems.length) {
      let vals = [];
      for (let invoiceItem of invoiceItems) {
        vals.push(
          `(${invoiceID}, ${invoiceItem.CatId}, ${invoiceItem.hours}, ${invoiceItem.rate}, ${invoiceItem.amount})`
        );
      }
      let sql = `INSERT INTO invoice_items (fk_invoiceID, fk_categoriesID, hour, rate, amount) 
      VALUES ${vals.join(', ')}`;
      await db(sql);
    }
    res.status(201);
    const result = await db('SELECT * FROM invoices ORDER BY id ASC;');
    res.send(result);
  } catch (error) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
