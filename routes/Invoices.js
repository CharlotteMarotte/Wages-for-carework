var express = require('express');
var router = express.Router();
const { ensureSameUser } = require('../middleware/guards');
const db = require('../model/helper');

//
// GET and POST methods for invoices
//

/**
 * GET number of invoices in table
 **/

router.get('/count', async function (req, res) {
  try {
    let sql = `SELECT COUNT(*) FROM invoices;`;
    let results = await db(sql);
    // Convert DB results into "sensible" JSON
    res.status(200).send({ count: results.data[0]['COUNT(*)'] });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

/**
 * GET one invoice with ID 'id'
 **/

router.get('/no/:id', async function (req, res) {
  let { id } = req.params;
  try {
    let sql = `SELECT u.*, i.*, iIt.hour, iIt.rate, iIT.amount, c.cat_name
    FROM users AS u 
    LEFT JOIN invoices AS i ON u.userID = i.fk_userID
    LEFT JOIN invoice_items AS iIt ON i.invoiceID = iIt.fk_invoiceID
    INNER JOIN categories AS c ON c.categoryID = iIt.fk_categoriesID 
    WHERE i.invoiceID='${id}';`;

    let results = await db(sql);
    // Convert DB results into "sensible" JSON
    invoice = await joinLastInvoiceToJson(results); // joinToJson is async so needs to get called with await
    res.status(200).send(invoice);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

/**
 * GET one user
 * Add all the invoices connected to this user
 **/

router.get('/user/:id', async function (req, res) {
  let { id } = req.params;
  try {
    let sql = `SELECT u.*, i.*, iIt.hour, iIt.rate, iIT.amount, c.cat_name
    FROM users AS u 
    LEFT JOIN invoices AS i ON u.userID = i.fk_userID
    LEFT JOIN invoice_items AS iIt ON i.invoiceID = iIt.fk_invoiceID
    INNER JOIN categories AS c ON c.categoryID = iIt.fk_categoriesID 
    WHERE u.userID='${id}';`;

    let results = await db(sql);
    // Convert DB results into "sensible" JSON
    invoice = await joinToJson(results.data); // joinToJson is async so needs to get called with await
    res.status(200).send(invoice);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

/**
 * DELETE invoice with ID 'id'
 **/

router.delete('/:id', async (req, res) => {
  let { id } = req.params;
  let { userID } = req.body;

  try {
    let result = await db(`SELECT * FROM invoices WHERE invoiceID = ${id}`); // does invoice exist?
    if (result.data.length === 0) {
      res.status(404).send({ error: 'Invoice not found' });
    } else {
      await db(`DELETE FROM invoices WHERE invoiceID = ${id}`); // delete invoice

      let sql = `SELECT i.*, iIt.hour, iIt.rate, iIT.amount, c.cat_name
      FROM users AS u 
      LEFT JOIN invoices AS i ON u.userID = i.fk_userID
      LEFT JOIN invoice_items AS iIt ON i.invoiceID = iIt.fk_invoiceID
      INNER JOIN categories AS c ON c.categoryID = iIt.fk_categoriesID 
      WHERE u.userID=${userID}`;
      let result = await db(sql);
      // Convert DB results into "sensible" JSON
      let invoices = await joinToJson(result.data); // joinToJson is async so needs to get called with await
      res.status(201);
      res.send(invoices);
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

/**
 * POST a new invoice
 * Return all invoices (updated) for user who added invoice
 **/

router.post('/new', async function (req, res) {
  // The request's body is available in req.body
  // If the query is successfull you should send back the full list of invoice properties

  const { nameTo, emailTo, invoiceDate, invoiceItems, total, fk_userID } =
    req.body;
  const sql = `INSERT INTO invoices (nameTo, emailTo, invoiceDate, total, fk_userID) 
                VALUES ('${nameTo}', '${emailTo}', '${invoiceDate}', ${total}, ${fk_userID});
                SELECT LAST_INSERT_ID();`;

  try {
    let results = await db(sql);
    // The results contain the new invoice's ID thanks to LAST_INSERT_ID()
    let myInvoiceID = results.data[0].insertId;

    // Add invoice items with invoice ID to invoice item table
    if (myInvoiceID && invoiceItems.length) {
      let vals = [];
      for (let invoiceItem of invoiceItems) {
        vals.push(
          `(${myInvoiceID}, ${invoiceItem.catId}, ${invoiceItem.hours}, ${invoiceItem.rate}, ${invoiceItem.amount})`
        );
      }
      let sql = `INSERT INTO invoice_items (fk_invoiceID, fk_categoriesID, hour, rate, amount) 
          VALUES ${vals.join(', ')}`;
      await db(sql);
    }

    let invoiceSql = `SELECT i.*, iIt.hour, iIt.rate, iIT.amount, c.cat_name
    FROM users AS u 
    LEFT JOIN invoices AS i ON u.userID = i.fk_userID
    LEFT JOIN invoice_items AS iIt ON i.invoiceID = iIt.fk_invoiceID
    INNER JOIN categories AS c ON c.categoryID = iIt.fk_categoriesID 
    WHERE u.userID=${fk_userID};`;

    let result = await db(invoiceSql);
    // Convert DB results into "sensible" JSON
    let invoices = await joinToJson(result.data); // joinToJson is async so needs to get called with await
    res.status(201);
    res.send({ lastInvoiceID: myInvoiceID, invoices });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

//
// Functions to format results from GETs to a useful format
//

/**
 * Convert DB results into a useful JSON format: array of invoice objects with nested array of invoice items objs
 * !!! it's an async function, so whenever it gets called it needs to happen with an await
 **/

async function joinToJson(results) {
  let catAmt = await getCatAmt();
  // send back length of categories table
  let resultInvoices = [];

  for (let i = 0; i < results.length; i += catAmt) {
    let row = results[i];
    let invoiceItems = [];

    // Create array of invoice items objs
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
      id: row.invoiceID,
      // nameFrom: row.nameFrom,
      // emailFrom: row.emailFrom,
      nameTo: row.nameTo,
      emailTo: row.emailTo,
      invoiceDate: row.invoiceDate,
      total: row.total,
      // amt_householdMem: row.amt_householdMem,
      // amt_children0_6: row.amt_children0_6,
      // amt_children7_18: row.amt_children7_18,
      // amt_flatmates: row.amt_flatmates,
      // amt_partners: row.amt_partners,
      // otherCaringResp: row.otherCaringResp,
      // partner_sexualOrient: row.partner_sexualOrient,
      // partner_relStyle: row.partner_relStyle,
      // employment_status: row.employment_status,
      // domesticHelp: row.domesticHelp,
      invoiceItems,
    };
    resultInvoices.push(invoice);
  }
  return resultInvoices;
}

/**
 * Convert DB results into a useful JSON format: invoice obj with nested array of invoice items objs
 * !!! it's an async function, so whenever it gets called it needs to happen with an await
 **/

async function joinLastInvoiceToJson(results) {
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
    id: row0.invoiceID,
    firstNameFrom: row0.firstname,
    lastNameFrom: row0.lastname,
    emailFrom: row0.email,
    nameTo: row0.nameTo,
    emailTo: row0.emailTo,
    total: row0.total,
    invoiceDate: row0.invoiceDate,
    invoiceItems,
  };

  return invoice;
}

//
// Helper functions
//

/**
 * GET amount of categories in DB
 **/

async function getCatAmt() {
  try {
    // to get number of categories
    let sql = `SELECT COUNT(categoryID) AS total FROM categories;`;
    let results = await db(sql);
    return results.data[0].total;
  } catch (error) {
    res.status(500).send({ error: err.message });
  }
}

//
// Functions to calculate statistics
//

router.get('/specify/*', async function (req, res) {
  // The request's parameters are available in req.query
  const queryParams = req.query.partner_sexualOrient;

  // Sometimes there happened a weird bug here, so tried to catch the error with this if, try reloading if it happens
  if (typeof queryParams === 'object' && queryParams.length !== 0) {
    for (let i = 0; i < queryParams.length; i++) {
      queryParams[i] =
        queryParams[i][0].toUpperCase() + queryParams[i].substring(1); // params from URL are always lowercase in DB value is capitalized in the beginning of the word
      queryParams[i] = `"${queryParams[i]}"`; // wraps param from URL in string for SQL request
    }
    let queryString = queryParams;
    // if there is more than one queryParams, items should be seperated with ,
    // BUG FIX: if it's === 1, something else should happen because SQL IN only works with more than one argument
    if (queryParams.length > 1) {
      queryString = queryParams.join(', ');
    }

    let sql = `SELECT i.*, iIt.hour, iIt.rate, iIT.amount, c.cat_name FROM invoices AS i
  INNER JOIN invoice_items AS iIt ON i.invoiceID = iIt.fk_invoiceID
  INNER JOIN categories AS c ON c.categoryID = iIt.fk_categoriesID WHERE i.invoiceID
  IN (SELECT s.statisticID FROM statistic_data AS s WHERE partner_sexualOrient IN (${queryString}))`; // nested SELECT statement

    try {
      let results = await db(sql);
      results = await joinToJson(results.data);
      res.status(201);
      res.send(results);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  } else {
    console.log('Something went wrong with the queryParams.');
  }
});

router.get('/total-hours', async function (req, res) {
  let id = Number(req.params.id);
  try {
    let sql = `SELECT SUM(hour) AS total FROM invoice_items;`;
    let results = await db(sql);
    let total = results.data[0].total.toString();
    // Convert DB results into "sensible" JSON
    res.status(200).send(total);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

router.get('/average/:catID', async function (req, res) {
  let catID = Number(req.params.catID);
  try {
    let sql = `SELECT c.cat_name AS catName, AVG(hour) AS avgHour, AVG(rate) AS avgRate, AVG(amount) AS avgAmount 
    FROM invoice_items AS iIt INNER JOIN categories AS c ON c.categoryID = iIt.fk_categoriesID WHERE fk_categoriesID=${catID};`;
    let results = await db(sql);
    let averages = results.data[0];
    // Convert DB results into "sensible" JSON
    res.status(200).send(averages);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

router.get('/:id/stats', async function (req, res) {
  let id = Number(req.params.id);
  try {
    // i.id and s.id always match because there is always the same amount of entries in there
    let sql = `SELECT i.*, s.*
    FROM invoices AS i
    LEFT OUTER JOIN statistic_data AS s ON i.invoiceID = s.statisticID 
    WHERE i.invoiceID = ${id};`;
    let results = await db(sql);
    results = results.data[0];
    // Convert DB results into "sensible" JSON
    res.status(200).send(results);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
