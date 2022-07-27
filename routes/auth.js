var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { BCRYPT_WORK_FACTOR, SECRET_KEY } = require('../config');
const db = require('../model/helper');

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

async function joinToJson(results) {
  // Get first row
  let row0 = results[0];
 
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

    let formatDate = new Date(row.invoiceDate);
    formatDate = (formatDate.getMonth() + 1) + "/" + formatDate.getDate() + "/" + formatDate.getFullYear();

    // // Create invoice obj
    let invoice = {
      id: row.invoiceID,
      nameTo: row.nameTo,
      emailTo: row.emailTo,
      invoiceDate: formatDate,
      total: row.total,
      invoiceItems,
    };
    resultInvoices.push(invoice);
  }

  // Create invoice obj
  let user = {
    id: row0.userID,
    username: row0.username,
    firstname: row0.firstname,
    lastname: row0.lastname,
    email: row0.email,
    demographicData: {
      amt_householdMem: row0.amt_householdMem,
      amt_children0_6: row0.amt_children0_6,
      amt_children0_6: row0.amt_children0_6,
      amt_children0_6: row0.amt_children0_6,
      amt_partners: row0.amt_partners,
      amt_otherCaringResp: row0.amt_otherCaringResp,
      partner_sexualOrient: row0.partner_sexualOrient,
      partner_relStyle: row0.partner_relStyle,
      employment_status: row0.employment_status,
      domesticHelp: row0.domesticHelp,
    },
    invoices: resultInvoices
  };

  return user;
}


/**
 * Register a user
 **/

router.post('/register', async (req, res) => {
  let { username, password, firstname, lastname, email } = req.body;
  let hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

  try {
    let test = await db(`SELECT * FROM users WHERE username='${username}'`);
    if (test.data.length !== 0) {
      res.status(400).send({ error: 'User name is already taken' });
    } else {
      let sql = `
            INSERT INTO users (username, password, firstname, lastname, email)
            VALUES ('${username}', '${hashedPassword}', '${firstname}', '${lastname}', '${email}')
        `;
      await db(sql);
      res.send({ message: 'Registration succeeded' });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

/**
 * Log in a user
 **/

router.post('/login', async (req, res) => {
  let { username, password } = req.body;

  try {
    let results = await db(
      `SELECT u.*, i.*, s.*, iIt.hour, iIt.rate, iIT.amount, c.cat_name
      FROM users AS u 
      LEFT JOIN invoices AS i ON u.userID = i.fk_userID
      LEFT JOIN statistic_data AS s ON u.fk_statisticsID = s.statisticID
      LEFT JOIN invoice_items AS iIt ON i.invoiceID = iIt.fk_invoiceID
      INNER JOIN categories AS c ON c.categoryID = iIt.fk_categoriesID 
      WHERE u.username='${username}'
      ORDER BY i.invoiceID ASC;
      `
    );
    if (results.data.length === 0) {
      // Username not found
      res.status(401).send({ error: 'Login failed' });
    } else {
      let user = results.data[0]; // the user's row/record from the DB
      let passwordsEqual = await bcrypt.compare(password, user.password);
      if (passwordsEqual) {
        // Passwords match
        let payload = { userId: user.id };
        // Create token containing user ID
        let token = jwt.sign(payload, SECRET_KEY);
        user = await joinToJson(results.data);
        res.send({
          message: 'Login succeeded',
          token: token,
          user: user,
        });
      } else {
        // Passwords don't match
        res.status(401).send({ error: 'Login failed' });
      }
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
