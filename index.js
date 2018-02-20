const express=require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');

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
app.use(bodyParser.json());
//services
mongoose.connect(keys.mongoURI);
require('./models/user');
require('./servers/passport');
//routes
require('./routes/authRoute')(app);
require('./routes/billingRoutes')(app);

app.get('/', function(req, res){
  res.json('hello');
})

if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets
  // like our main.js file, or main.css file!
  app.use(express.static('client/build'));

  // Express will serve up the index.html file
  // if it doesn't recognize the route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT);
