const dbConnection = require("../database/db_connection");

const userExsit = (username, cb) => {
  dbConnection.query(
    "SELECT username FROM users where username LIKE $1;",
    [username],
    (err, result) => {
      if (err) cb(err);
      else {
        if (result.rowCount !== 0) {
          cb(null, true);
        } else {
          cb(null, false);
        }
      }
    }
  );
};
module.exports = userExsit;
