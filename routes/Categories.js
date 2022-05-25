var express = require('express');
var router = express.Router();
const db = require("../model/helper");


/* GET home page. */
router.get("/", (req, res) => {
  // Send back the full list of items
  db("SELECT * FROM Categories ORDER BY id ASC;")
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});

module.exports = router;
