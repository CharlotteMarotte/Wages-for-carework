var express = require('express');
var router = express.Router();
const db = require('../model/helper');

router.get('/', (req, res) => {
  // Send back the full list of items
  db(`SELECT *
    FROM statistic_data 
   ORDER BY statisticID ASC;`)
    .then(async (results) => {
      let data = results.data;
      res.send(data);
    })
    .catch((err) => res.status(500).send(err));
});


router.post('/new', async function (req, res) {
  // The request's body is available in req.body
  // If the query is successfull you should send back the full list of statistic data properties

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
    const result = await db('SELECT * FROM statistic_data ORDER BY statisticID ASC;');
    res.send(result);
  } catch (error) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
