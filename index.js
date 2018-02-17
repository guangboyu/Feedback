const express=require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');

const keys = require('./config/keys');
//middleware
const app = express();
app.use(
  cookieSession({
    maxAge: 30*24*60*60*1000,
    keys:[keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());
//services
mongoose.connect(keys.mongoURI);
require('./models/user');
require('./servers/passport');
//routes
require('./routes/authRoute')(app);


app.get('/', function(req, res){
  res.json('hello');
})

const PORT = process.env.PORT || 5000;

app.listen(PORT);
