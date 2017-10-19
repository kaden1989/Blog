var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
//var routes = require('./routes/index');
var index = require('./routes/index');

var reg = require('./routes/reg');
var users = require('./routes/users');
var login = require('./routes/login');
var home = require('./routes/home');
var logout = require('./routes/logout');

var app = express();
app.use(express.static(path.join(__dirname, 'public')));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

//日志
var log = require('./routes/log');
//  log.bunyanMethod();



//连接MySQL
//var nodemysql = require('./routes/nodeMysql');
/*nodemysql.connectTest();
nodemysql.delete();
nodemysql.insert();
nodemysql.select();
nodemysql.update();
nodemysql.connectClose();*/

//nodemysql.poolConnection();
//nodemysql.poolGet();
//nodemysql.poolEvent();
//nodemysql.poolClose();

//nodemysql.test();

//连接Redis
var nodeRedis = require('db/nodeRedis');

/*nodeRedis.connectTest();
nodeRedis.connectClose();
nodeRedis.redisClient();*/



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//当前后端建立连接时就会产生一个session，下面是对全局session的设置（即对每次连接之后的session进行统一的设置）
app.use(cookieParser('An'));
app.use(session({
  secret:'an',
  resave:false,
  saveUninitialized:true
}));


app.use('/', index);
app.use('/reg',reg);
app.use('/login', login);
app.use('/logout', logout);
app.use('/home',home);

/*app.get('/', routes.index);
app.get('/login', routes.login);
app.post('/login', routes.doLogin);
app.get('/logout', routes.logout);
app.get('/home', routes.home);
*/




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
