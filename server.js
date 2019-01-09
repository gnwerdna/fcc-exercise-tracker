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

app.route('/api/exercise/new-user')
  .post((req, res) => {
    let userObj = new User({
      username: req.body.username
    });
    userObj.save((err, data) => {
      err ? res.send(err) : res.send(data);
      console.log(data);
    }); 
});

app.route('/api/exercise/add')
  .post((req, res) => {
    let { userId, description, duration, date } = req.body;
    User.findById({_id: userId}, (err, data) => {
      if(err) res.send(err);
      description && (data.description = description);
      duration && (data.duration = duration);
      date && (data.date = date);
      data.save((err, data) => {
        err ? res.send(err) : res.send(data);
      });
    });
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
