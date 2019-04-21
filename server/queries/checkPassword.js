const dbConnection = require('../database/db_connection');
const bcrypt = require('bcryptjs');

const checkPassword = ( cb, username, password ) => {
  dbConnection.query('SELECT password FROM users where username = ' + username ,(err, result) => {
    if(err) cb(err);
    cb(null, result.rows);

    const hashedPassInDB = result.rows;

    hashPassword( password, compare )

  });
}

const compare = (err, hashedPassUserInput, hashedPassInDB, cb) => {
  if( err )
   cb( err )

   else {
     if( hashedPassUserInput == hashedPassInDB )
   }
}

module.exports = checkPassword;
