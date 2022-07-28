var express = require('express');
var router = express.Router();
const { ensureSameUser } = require('../middleware/guards');
const db = require('../model/helper');
const bcrypt = require('bcrypt');
const { BCRYPT_WORK_FACTOR } = require('../config');
const path = require('path');
const fs = require('fs/promises');
const multer = require('multer');


/**
 * Multer initialization
 **/

 const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/clientfiles'); // store files here
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // keep original filename
  },
});

const upload = multer({ storage });


/**
 * Update user information with userID = 'id'
 **/

router.put('/:userID', upload.single('clientimage'), async (req, res) => {
  // The request's body is available in req.body
  let { userID } = req.params;
  let { firstname, lastname, email, username, password } = req.body;

  let hashedPassword = '';

  if (password) {
    hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);
  }

  try {
    let result = await db(`SELECT * FROM users WHERE userID = ${userID}`);
    if (result.data.length === 0) {
      res.status(404).send({ error: 'User not found' });
      return;
    } else {
      hashedPassword = hashedPassword.length
        ? result.data.password
        : hashedPassword;

      // Insert DB record; only save the filename, not the entire path
      let sqlMulter = `
      INSERT INTO images (filename)
      VALUES ('${req.file.originalname}')
  `;
      await db(sqlMulter);

      let sql = `
        UPDATE users 
        SET firstname = '${firstname}', lastname = '${lastname}', email = '${email}', username='${username}', password = '${hashedPassword}'
        WHERE userID = ${userID}`;
      await db(sql); // update user

      let response = await db(`SELECT * FROM users WHERE userID = ${userID}`);
      let user = response.data[0];
      delete user.password;
      res.send(user); // return updated user
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});



module.exports = router;
