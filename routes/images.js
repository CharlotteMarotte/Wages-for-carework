var express = require('express');
var router = express.Router();
const path = require('path');
const db = require('../model/helper');
const fs = require('fs/promises');
const multer = require('multer');
const PUBLIC_DIR_URL = 'http://localhost:5000/clientimages';



/**
 * Multer initialization
 **/

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/clientimages'); // store files here
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // something should get added to avoid duplicates
  },
});
const upload = multer({ storage });


/**
 * Routes
 **/

/* POST a file */
router.post('/', upload.single('clientimage'), async function (req, res) {
  let { userID } = req.body;

  try {
    // Insert DB record; only save the filename, not the entire path

    // something should get added to filename to avoid duplicates
    let sql = `
            INSERT INTO images (filename)
            VALUES ('${req.file.originalname}'); 
            SELECT LAST_INSERT_ID();
        `;
    let results = await db(sql);
    let imageID = results.data[0].insertId;

    let imageSetSql = `SELECT * FROM images INNER JOIN users ON images.imageID = users.fk_imageID WHERE users.userID = ${userID};`;

    let testResult = await db(imageSetSql); // checks if user had already uploaded a profile picture

    if (testResult.data && testResult.data.length !== 0) {
      // delete old profile picture if exists
      let result = await db(
        `SELECT fk_imageID from users WHERE userID = ${userID}`
      );

      let oldImageID = result.data[0].fk_imageID;
      await db(`DELETE FROM images WHERE imageID = ${oldImageID}`);
    }

    let patchUserSQL = `UPDATE users 
      SET fk_imageID = ${imageID}
      WHERE userID = ${userID}`; // update profile picture in users table

    await db(patchUserSQL);

    let response = await db(
      `SELECT filename FROM images WHERE imageID = ${imageID};`
    );

    let userImage = response.data[0];
    res.send(userImage); // return file name of new profile picture

    res.status(201); // new resource created
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
