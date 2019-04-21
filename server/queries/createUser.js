const dbConnection = require('../database/db_connection');
const userExist = require('./userExist');

const createUser = (name, username, password, orgPassword, cb) => {


userExist( username, (err, exists) => {

if( err ) cb(err)

else if (valdiated("Your name",name) !== ""){
  cb(null,valdiated("Your name",name))
}
else if (valdiated("Username",username) !== ""){
  cb(null,valdiated("Username",username))
}
else if (valdiated("Password",orgPassword) !== ""){
  cb(null,valdiated("Pasword",orgPassword))
}
else if( exists )
      cb(new Error('username_exist'));
else {
      dbConnection.query('INSERT INTO users ( name, username, password) VALUES ( $1, $2, $3 )',
        [name, username, password],
        (err, result) => {
          if (err) cb(err);
          else cb(null,"Done");
        });
    //}
  }

  });
}

const valdiated = (type,str) => {

    if( str.trim() == "" )
    return type+ " must not be empty";

    if( type !== "Your name" && type !== "Username" ) {
    if ( str.trim().length < 6 )
    return type+ " must be atleast 6 characters";

    else if ( !/\d/.test(str))
    return type+ " must have atleast one number"

    else if ( /^\d+$/.test(str) )
    return type+ " must have atleast one char";
  }
    return "";
}


module.exports = createUser;
