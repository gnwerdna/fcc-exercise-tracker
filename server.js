// server.js
// where your node app starts

// init project
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.
mongoose.connect(process.env.MONGO_URL);
const userSchema = new mongoose.Schema({
  username: String,
  description: String,
  duration: Number,
  date: Date
});
const User = mongoose.model("User", userSchema);

// http://expressjs.com/en/starter/static-files.html
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.route('/api/exercise')
  .post("/new-user", (req, res) => {});

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
