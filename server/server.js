const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());


app.get('/get', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

// POST method route
app.post('/log', (req, res) => {

  res.send(JSON.stringify(res.data))
})



app.listen(port, () => console.log(`Listening on port ${port}`));
