const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const morgan = require('morgan');
const compression = require('compression');
const port = process.env.PORT || 5000;
const getBooks = require("./queries/getBooks");
const createUser = require("./queries/createUser");
const loginUser = require("./queries/loginUser");
const querystring = require("querystring");
const utils = require("./utils");
const { sign, verify } = require("jsonwebtoken");
const SECRET = "poiugyfguhijokpkoihugyfyguhijo";

// const whitelist = ['http://localhost:3000', `http://localhost:${process.env.PORT}`, 'http://172.18.96.174:10163', 'http://localhost:5000', 'https://reactauthentication.herokuapp.com'];
// const corsOptions = {
//   credentials: true, // This is important.
//   origin: (origin, callback) => {
//     if(whitelist.includes(origin))
//       return callback(null, true)
//
//       callback(new Error('Not allowed by CORS'));
//   }
// }
app.disable('x-powered-by');
app.use(compression())
app.use(morgan('common'))
// app.use(cors(corsOptions));


app.use(express.static(path.resolve(__dirname,  "..", "public")))

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, "..",  'public', 'index.html'))
})

app.get("/get", (req, res) => {
  getBooks((err, result) => {
    if (err) {

      res.send(400);
    } else {

      res.send(result);
    }
  });
});


app.get("/checkauthen", (req, res) => {

const ps = querystring.parse(req.headers.cookie);
if(ps.jwt) {
  res.end('logged_in')
} else {
  res.end('logged_out')

}
});

app.post("/createUser", (req, res) => {
  let body = "";
  req.on("data", chunk => {
    body += chunk.toString();
  });
  req.on("end", () => {
    if (body != null) {
      body = JSON.parse(body);

      utils.hash(body.password, (err, hash) => {
        createUser(body.fullname, body.username, hash, body.password, (err, result) => {
          if (err) {
            if (err.message === "username_exist") {
              res.end(JSON.stringify("Username Already exists!"));
            }
            return err;
          } else {
            let userDetails = { username: body.username, logged_in: true };
            let cookie = sign(userDetails, SECRET);

            res.cookie('jwt',cookie);

            if(result == "Done")
            res.end(JSON.stringify("Logged in successfully!"));
            else
            res.end(JSON.stringify("Err"));

          }
        });
      });
    }
  });
});

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

// POST method route
app.post("/login", (req, res) => {
  let body = "";
  req.on("data", chunk => {
    body += chunk.toString();
  });
  req.on("end", () => {
    if (body != null) {
      body = JSON.parse(body);

      loginUser(body.username, body.password, (err, result) => {
        if (err) res.send(err.toString());
        else {
          if (result) {

            let userDetails = { username: body.username, logged_in: true };
            let cookie = sign(userDetails, SECRET);

            res.cookie('jwt',cookie);

            res.send("Logged in successfully");
          } else {
            res.send("Invalid username or password");
          }
        }
      });
    }
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
