const express = require('express');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');

const app = express()

//Set up view engine
app.set('view engine', 'ejs');

app.use(cookieSession({
  maxAge: 24*60*60*1000,
  keys: [keys.session.cookieKey]
}));

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

//connect to mongoose db
mongoose.connect(keys.mongodb.dbURL, { useNewUrlParser: true }, () => {
  console.log('mongodb connected');
});

//set up routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

//Get home route
app.get('/', function(req, res){
  res.render('home', { user: req.user});
});

app.listen(3000, () => {
  console.log("App is listening to port 3000")
});
