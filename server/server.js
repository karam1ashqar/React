const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const port = process.env.PORT || 5000;
const getBooks = require('./queries/getBooks');
const createUser = require('./queries/createUser');
const loginUser = require('./queries/loginUser');
const querystring = require('querystring');
const utils = require('./utils');

app.use(cors());


app.get('/get', (req, res) => {
  getBooks((err, result) => {
  if (err) {
    // res.writeHead(500);
    // res.end(serverError);
    res.send(400)
  } else {
  //  res.writeHead(200, exType.json);
//    res.end(dynamicData);
    res.send(result);

  }
});
});

app.post('/createUser', (req, res) => {
  let body = "";
 req.on("data", chunk => {
   body += chunk.toString();
 });
 req.on("end", () => {

   if (body != null) {
     let hey = JSON.parse(JSON.parse(JSON.stringify(body)))
     utils.hash(hey.password, ( err, hash ) => {
       createUser(hey.fullname, hey.username, hash, (err, result) => {
         if (err) res.end(err.toString())
         else
         {
           res.send( result );
}
       });
     })}
 });
})

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

// POST method route
app.post('/login', (req, res) => {

  let body = "";
  req.on("data", chunk => {
    body += chunk.toString();
  });
  req.on("end", () => {
    if (body != null) {

        body = JSON.parse(JSON.parse(JSON.stringify(body)))

      loginUser(body.username, body.password, (err, result) => {
        if (err) res.send(err.toString());
        else {
          if (result) {

            res.cookie('cook',`logged_in=true&username=${body.username}`, { httpOnly: true });
            res.send("Logged in successfully")
          } else {
            res.send("Invalid username or password");
          }
        }
      });
    }
  });
})



app.listen(port, () => console.log(`Listening on port ${port}`));
