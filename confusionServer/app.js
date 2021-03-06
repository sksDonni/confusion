const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const dishRouter = require('./routes/dishRouter');
const promoRouter = require('./routes/promoRouter');
const leaderRouter = require('./routes/leaderRouter');
const Dishes = require('./models/dishModel');
const session = require('express-session')
const FileStore = require('session-file-store')(session);
const app = express();
const url = 'mongodb://localhost:27017/conFusion';
const connect = mongoose.connect(url);
connect.then((db) => {
    console.log("Connected correctly to server");
}, (err) => { console.log(err); });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('12345-67890-09876-54321'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  name: 'session-id',
  secret: '12345-67890-09876-54321',
  saveUnitialized : false,
  resave: false,
  store: new FileStore()
}));


const authorisation = (req, res, next) => {
  console.log(req.session);

  if(!req.session.user)
  {
    const authHeader = req.header.authorization;
    if(!authHeader)
    {
      const err = new Error('You are not authenticatied!');
      res.setHeader('WWW-Authenticate', 'Basic');
      err.status = 401;
      next(err);
      return;
    }

    const auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
    const user = auth[0];
    const password = auth[1];

    if(user === 'admin' && password === 'password')
    {
      res.session.user = 'admin';
      next();   
    }else
    {
      const err = new Error('You are not authenticatied!!');
      err.setHeader('WWW-Authenticate', 'Basic');
      err.status = 401;
      next(err);
    }
  }
  else
  {
    if(req.signedCookies.user == 'admin')
    {
      next();
    }else
    {
      const err = new Error('You are not authenticatied!!');
      err.setHeader('WWW-Authenticate', 'Basic');
      err.status = 401;
      next(err);
    }
  }  
}


app.use(authorisation);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/dishes',dishRouter);
app.use('/promotions',promoRouter);
app.use('/leaders',leaderRouter);

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








