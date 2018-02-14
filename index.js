const express=require('express');
const passport = require('passport');

require('./servers/passport');
const app = express();

app.get('/', function(req, res){
  res.json('hello');
})

app.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));

app.get('/auth/google/callback',
        passport.authenticate('google'),
        (req, res) => {
          console.log('hi');
          res.redirect('/');
        });



const PORT = process.env.PORT || 5000;

app.listen(PORT);
