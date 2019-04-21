const dbConnection = require('../database/db_connection');

const getUsers = ( cb ) => {
  dbConnection.query('SELECT * FROM users;',(err, result) => {
    if(err) cb(err);
    cb(null, result.rows);
  });
}

module.exports = getUsers;
