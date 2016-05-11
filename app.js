var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//layout 模板
var partials = require('express-partials');
//mongoose 数据库操作
var mongoose = require('mongoose');

//路由表
var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');
//添加以下  
app.engine('.html',require('ejs').__express);  
app.set('view engine', 'html'); 

//数据库连接
mongoose.connect('mongodb://localhost/test');

//数据库连接测试
var Cat = mongoose.model('Cat',{name:String});
var kitty = new Cat({name:"ziazan"});
kitty.save(function(err){
  if (err) 
    console.log(err);
  console.log('meow');
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//使用layout模板
app.use(partials());
//路由设置

//根页面请求
app.use('/', routes);

//帐户类型的请求放在这里
app.use('/account', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
