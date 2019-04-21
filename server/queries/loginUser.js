const dbConnection = require("../database/db_connection");
const bcrypt = require("bcryptjs");

const loginUser = (username, password, cb) => {
  dbConnection.query(
    `SELECT password FROM users where username LIKE '${username}';`,
    (err, result) => {
      if (err) cb(err);
      else {
        bcrypt.compare(password, result.rows[0].password, function(err, res) {
          if (err) console.log("error");
          cb(null, res);
        });
      }
    }
  );
};

module.exports = loginUser;
