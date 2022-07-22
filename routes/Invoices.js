var express = require('express');
var router = express.Router();
const db = require('../model/helper');


async function getCatAmt() {
  try {
    // to get number of categories
    let sql = `SELECT COUNT(id) AS total FROM categories;`;
    let results = await db(sql);
    return results.data[0].total;
  } catch (error) {
    res.status(500).send({ error: err.message });
  }
}

async function getLastInvoiceID() {
  try {
    // to get number ID of last invoice added to DB
    let sql = `SELECT MAX(id) AS lastID FROM invoices;`;
    let results = await db(sql);
    return results.data[0].lastID;
  } catch (error) {
    res.status(500).send({ error: err.message });
  }
}

// Convert DB results into a useful JSON format: invoice obj with nested array of invoice items objs
// !!! it's an async function, so whenever it gets called it needs to happen with an await
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
      id: row.id,
      nameFrom: row.nameFrom,
      emailFrom: row.emailFrom,
      nameTo: row.nameTo,
      emailTo: row.emailTo,
      invoiceDate: row.invoiceDate,
      amt_householdMem: row.amt_householdMem,
      amt_children0_6: row.amt_children0_6,
      amt_children7_18: row.amt_children7_18,
      amt_flatmates: row.amt_flatmates,
      amt_partners: row.amt_partners,
      otherCaringResp: row.otherCaringResp,
      partner_sexualOrient: row.partner_sexualOrient,
      partner_relStyle: row.partner_relStyle,
      employment_status: row.employment_status,
      domesticHelp: row.domesticHelp,
      invoiceItems,
    };
    resultInvoices.push(invoice);
  }
  return resultInvoices;
}

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
  // Send back the full list of invoices joined with name from categories and data from invoice items
  db(`SELECT i.*, s.*, iIt.hour, iIt.rate, iIT.amount, c.cat_name
  FROM invoices AS i
  INNER JOIN statistic_data AS s ON i.id = s.id
  INNER JOIN invoice_items AS iIt ON i.id = iIt.fk_invoiceID
  INNER JOIN categories AS c ON c.id = iIt.fk_categoriesID ORDER BY i.id ASC;`)
    .then(async (results) => {
      let invoice = results.data;
      invoice = await joinToJson(invoice); // joinToJson is async so needs to get called with await
      res.send(invoice);
    })
    .catch((err) => res.status(500).send(err));
});

router.get('/last-invoice', async function (req, res) {
  let lastInvoiceID = await getLastInvoiceID();
  try {
    let sql = `SELECT i.*, iIt.hour,  iIt.rate, iIt.amount, c.cat_name
    FROM invoices AS i
    LEFT OUTER JOIN invoice_items AS iIt ON i.id = iIt.fk_invoiceID
    LEFT OUTER  JOIN categories AS c ON c.id = iIt.fk_categoriesID 
    WHERE i.id = ${lastInvoiceID};`;

    let results = await db(sql);
    // Convert DB results into "sensible" JSON
    invoice = await joinLastInvoiceToJson(results); // joinToJson is async so needs to get called with await
    res.status(200).send(invoice);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

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
  INNER JOIN invoice_items AS iIt ON i.id = iIt.fk_invoiceID
  INNER JOIN categories AS c ON c.id = iIt.fk_categoriesID WHERE i.id
  IN (SELECT st.id FROM statistic_data AS st WHERE partner_sexualOrient IN (${queryString}))`; // nested SELECT statement

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

router.get('/total', async function (req, res) {
  let id = Number(req.params.id);
  try {
    let sql = `SELECT SUM(amount) AS total FROM invoice_items;`;
    let results = await db(sql);
    let total = results.data[0].total.toString(); // cannot send number, that's why it needs to be converted to String
    // Convert DB results into "sensible" JSON
    res.status(200).send(total);
  } catch (err) {
    res.status(500).send({ error: err.message });
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
    FROM invoice_items AS iIt INNER JOIN categories AS c ON c.id = iIt.fk_categoriesID WHERE fk_categoriesID=${catID};`;
    let results = await db(sql);
    let averages = results.data[0];
    // Convert DB results into "sensible" JSON
    res.status(200).send(averages);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

router.get('/:id/total', async function (req, res) {
  let id = Number(req.params.id);
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

router.get('/:id/stats', async function (req, res) {
  let id = Number(req.params.id);
  try {
    // i.id and s.id always match because there is always the same amount of entries in there
    let sql = `SELECT i.*, s.*
    FROM invoices AS i
    LEFT OUTER JOIN statistic_data AS s ON i.id = s.id 
    WHERE i.id = ${id};`;
    let results = await db(sql);
    results = results.data[0];
    // Convert DB results into "sensible" JSON
    res.status(200).send(results);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

router.post('/new', async function (req, res) {
  // The request's body is available in req.body
  // If the query is successfull you should send back the full list of invoice properties

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
