
/*
//日志
//方法一，express支持的morgan日志模块，但不能满足实际需求
var logger = require('morgan');
var fs = require('fs');
var path = require('path');
//定义日志文件access.log
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'});
//自定义token格式,可以作为日志格式的一部分
logger.token('form',function(req,res){
	return req.query.from || '-';
});
//自定义日志格式
logger.format('loggerName','[loggerName] :method :url :status :form');
//app.use(logger('short',{stream: accessLogStream}));
app.use(logger('loggerName',{stream: accessLogStream}));

//日志分割
var FileStreamRotator = require('file-stream-rotator');
var logDirectory = path.join(__dirname, 'log');
// ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)
// create a rotating write stream
var accessLogStream2 = FileStreamRotator.getStream({
  date_format: 'YYYYMMDD',
  filename: path.join(logDirectory, 'access-%DATE%.log'),
  frequency: 'daily',
  verbose: false
})
app.use(logger('combined', {stream: accessLogStream2}));
*/

//方法二：Log4js
//log4js输出的6个级别:trace, debug, info, warn, error, fatal
//如果输出的级别是info，则不会打印低于info级别的日志（trace跟踪和debug调试），
//只会打印info信息、warm警告、error错误和fatal致命错误
/*var log4js = require('log4js');

log4js.configure({//配置日志
  appenders: { cheese: { type: 'file', filename: 'log4js.log' } },//配置日志文件（根目录下）
  categories: { default: { appenders: ['cheese'], level: 'error' } }//配置日志文件的类型和级别
});

var logger = log4js.getLogger('cheese');//取用配置过的日志类型

exports.log4jsMethod = function(){
logger.trace('Entering cheese testing');
logger.debug('Got cheese.');
logger.info('Cheese is Gouda.');
logger.warn('Cheese is quite smelly.');
logger.error('Cheese is too ripe!');
logger.fatal('Cheese was breeding ground for listeria.');
}
*/

//方法三：Winston
/*var winston = require('winston');  
var logger = new winston.Logger();  

exports.winstonMethod = function(){   
logger.log('info', 'Hello distributed log files!');  
logger.info('Hello again distributed logs'); 
}*/

//方法四：Bunyan
var bunyan = require('bunyan');
var ringbuffer = new bunyan.RingBuffer({ limit: 100 });//限定记录100条log
var log = bunyan.createLogger({//配置
  name: 'bunyan',
  serializers: {
		req: bunyan.stdSerializers.req,
		res: bunyan.stdSerializers.res,
		err: bunyan.stdSerializers.err
	},
  streams: [
    {
      level: 'info',
      path: '../bunyan.log'            // log INFO and above to stdout 
    },
    {
      level: 'error',
      path: 'bunyan.log'  // log ERROR and above to a file 
    },
    {
      level: 'warn',
      path: 'bunyan.log'  // log ERROR and above to a file 
    }
  ]
});
exports.bunyanMethod = function(){
log.info('app.js');
log.warn({lang: 'fr'}, 'au revoir');
log.info({foo: 'some foo'}, 'some info msg');
log.error();
log.addStream({
  	type: 'rotating-file',
	path: 'log/bunyanFoo.log',
	period: '1d',   // daily rotation 
	count: 3 
});
log.addStream({
            level: 'trace',
            type: 'raw',    // use 'raw' to get raw log record objects 
            stream: ringbuffer
})
}
