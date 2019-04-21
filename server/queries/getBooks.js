const dbConnection = require('../database/db_connection');

const getBooks = ( cb ) => {
  dbConnection.query('SELECT * FROM books;',(err, result) => {
    if(err) cb(err);
    cb(null, result.rows);
  });
}

module.exports = getBooks;
