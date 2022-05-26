var express = require('express');
var router = express.Router();
const db = require('../model/helper');

let catAmt = 0;
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

// Convert DB results into a useful JSON format: invoice obj with nested array of invoice items objs
function joinToJson(results) {
  getCatAmt();
  // here catAmt is 0
  console.log(catAmt);
  // send back length of categories table
  let resultInvoices = [];

  // WHY IS CATAMT 0? NOT GOOD TO WRITE 9
  for (let i = 0; i < results.length; i += 9) {
    let row = results[i];
    let invoiceItems = [];

    // Create array of invoice items objs

    // WHY IS CATAMT 0? NOT GOOD TO WRITE 9
    for (let j = 0; j < 9; j++) {
      let invoiceItObj = new Object();

      invoiceItObj.category = results[j].cat_name;
      invoiceItObj.hours = results[j].hour;
      invoiceItObj.rate = results[j].rate;
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

/* GET home page. */

router.get('/', (req, res) => {
  // Send back the full list of items
  db(`SELECT i.*, iIt.hour,  iIt.rate, c.cat_name
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
          `(${invoiceID}, ${invoiceItem.CatId}, ${invoiceItem.hours}, ${invoiceItem.rate})`
        );
      }
      let sql = `INSERT INTO invoice_items (fk_invoiceID, fk_categoriesID, hour, rate) 
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
