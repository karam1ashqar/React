const dbConnection = require('../database/db_connection.js');

const deleteData = (id, cb) => {
  dbConnection.query('DELETE FROM users WHERE id = $1', [id], (err, res) => {
    if (err) console.log('error deleting 2');
    cb(null, res);
  });
};

module.exports = deleteData;
