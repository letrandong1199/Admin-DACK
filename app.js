var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var flash=require('connect-flash');
var session = require('express-session');
var bodyParser = require("body-parser");

//var hbs=require('express-handlebars');
const hbs=require('hbs');

const routing=require('./routing');
var app = express();
const passport = require('passport');

require("./config/passport");
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false 
})); 
app.use(flash()); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize())
app.use(passport.session())


// view engine setup
//app.engine('hbs',hbs({extname:'hbs',defaultLayout:'layout',layoutsDir:__dirname+'/views/layouts/'}));
app.set('view engine','hbs');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
require("./helper");
app.use(express.static('public'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const { getStateAuthenticated } = require("./controllers/authenticationController");

// Routing
app.use("/", getStateAuthenticated, routing);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
