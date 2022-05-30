var express = require('express');
var router = express.Router();
const db = require('../model/helper');

router.get('/', (req, res) => {
  // Send back the full list of items
  db(`SELECT *
    FROM statistic_data 
   ORDER BY id ASC;`)
    .then(async (results) => {
      let data = results.data;
      res.send(data);
    })
    .catch((err) => res.status(500).send(err));
});

function makeWhereFromFilters(q) {
  let filters = [];

  if (q.relationshipstyle) {
      filters.push(`partner_sexualOrient = '${q.breed}'`);
  }


  // Return all filters joined by AND
  return filters.join(' AND ');
}

router.get('/specify', async function (req, res) {
  // The request's body is available in req.body
  // If the query is successfull you should send back the full list of invoice properties
  // Add your code here

  const {data} = req.body;
  console.log(data);

  let sql = `SELECT * FROM data WHERE partner_sexualOrient IN (${data});`;

  try {
    let results = await db(sql);
    res.status(201);
    res.send(results);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});



router.post('/new', async function (req, res) {
  // The request's body is available in req.body
  // If the query is successfull you should send back the full list of invoice properties
  // Add your code here

  const {
    amt_HouseholdMem,
    amt_children0_6,
    amt_children7_18,
    amt_flatmates,
    amt_partners,
    otherCaringResp,
    partner_sexualOrient,
    partner_relStyle,
    employment_status,
    domesticHelp,
  } = req.body;
  const sql = `INSERT INTO statistic_data (amt_HouseholdMem, amt_children0_6, amt_children7_18, amt_flatmates, amt_partners, otherCaringResp, partner_sexualOrient, partner_relStyle, employment_status, domesticHelp) VALUES (${amt_HouseholdMem}, ${amt_children0_6}, ${amt_children7_18}, ${amt_flatmates}, ${amt_partners}, ${otherCaringResp}, '${partner_sexualOrient}', '${partner_relStyle}', '${employment_status}', ${domesticHelp});`;
  try {
    let results = await db(sql);
    // The results contain the new invoice's ID thanks to LAST_INSERT_ID()
    res.status(201);
    const result = await db('SELECT * FROM statistic_data ORDER BY id ASC;');
    res.send(result);
  } catch (error) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
