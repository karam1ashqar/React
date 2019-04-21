const dbConnection = require('../database/db_connection');

const createUser = (name, username, password, cb) => {
  //checks if the user Exist
  dbConnection.query(`SELECT username FROM users WHERE username='${username}';`, (err, result) => {
    if (err) cb(err);
    if (result.rowCount !== 0) {
      cb(new Error('username_exist'));
    } else {
      //if the user does not Exist we add it to data base
      dbConnection.query('INSERT INTO users ( name, username, password) VALUES ( $1, $2, $3 )',
        [name, username, password],
        (err, result) => {
          if (err) cb(err);
          else cb(null,"Done");
        });
    }
  });

}


module.exports = createUser;
