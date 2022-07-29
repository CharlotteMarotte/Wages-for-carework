var express = require('express');
var router = express.Router();
const { ensureSameUser } = require('../middleware/guards');
const db = require('../model/helper');
const bcrypt = require('bcrypt');
const { BCRYPT_WORK_FACTOR } = require('../config');

/**
 * Update user information with userID = 'id'
 **/

router.put('/:userID', async (req, res) => {
  // The request's body is available in req.body
  let { userID } = req.params;
  let { firstname, lastname, email, username, currentpassword, newpassword} = req.body;



  try {
    let result = await db(`SELECT * FROM users WHERE userID = ${userID}`);
    if (result.data.length === 0) {
      res.status(404).send({ error: 'User not found' });
      return;
    } else {

      let user = result.data[0]; // the user's row/record from the DB

      let passwordsEqual = await bcrypt.compare(currentpassword, user.password);

      if (passwordsEqual) {
        let hashedPassword = await bcrypt.hash(
          newpassword,
          BCRYPT_WORK_FACTOR
        );

        let sql = `
            UPDATE users SET password ='${hashedPassword}' WHERE userID = ${userID}`;
        await db(sql);
      }else{
        res.status(401).send({ error: 'Incorrect current password' });
      }

      let sql = `
        UPDATE users 
        SET firstname = '${firstname}', lastname = '${lastname}', email = '${email}', username='${username}'
        WHERE userID = ${userID}`;
      await db(sql); // update user

      let response = await db(`SELECT * FROM users WHERE userID = ${userID}`);
      user = response.data[0];
      delete user.password;
      res.send(user); // return updated user
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
