const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const hashPassword = (password, callback) => {
  bcrypt.genSalt(10,function(err,salt){
    bcrypt.hash(password, salt, function(err, hash) {
      if( err )
         callback(null)
      else
         callback(null, hash)
    });
  });
};

const functions = {
  sign: (value) => {
    return crypto.createHmac('sha256', "super secret").update(value).digest('hex');
  },
  validate: (value, hash) => {
    const correctHash = functions.sign(value);
    return correctHash === hash;
  }
};



const comparePasswords = (password, hashedPassword, callback) => {
  bcrypt.compare(password, hashedPassword, callback);
};

module.exports = {
  hash:hashPassword,
  functions,
  compare:comparePasswords
}
