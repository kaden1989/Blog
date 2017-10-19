//mysql
var mysql = require('mysql');

var connection = mysql.createConnection({//链接配置数据库
  host : 'localhost',
  user : 'root',
  password : '123456',
  post : '3306',
  database:'nodemysql',
});
//连接测试
exports.connectTest = function(){
	return connection.connect(function(err){
  if (err) {
    console.log('[query] - :'+err); return;
  }
  console.log('[connection connect] succeed!' );
  console.log('connected as id ' + connection.threadId);
})
}

//执行sql语句
var insertSql = 'insert into kaden2 (name,sex,age,tel,address,others) values("username","man","15","河南","135235..","更新备注信息")';
var selectSql = 'select * from kaden2 ';
var deleteSql = 'delete from kaden2 where name="jiangWu"';
var updateSql = 'update kaden2 set name="jiangWu" where name = "username"';


//delete
exports.delete = function(){
connection.query(deleteSql,function(err0,res0){
  if (err0) console.log(err0);
  console.log("DELETE Return ==>");
  console.log(res0);
});
}
//insert
exports.insert = function(){
connection.query(insertSql,function(err,res){
    if (err) console.log(err);
    console.log("INSERT Return ==>");
    console.log(res);
});
}
//query
exports.select = function(){
connection.query(selectSql, function (err2, rows) {
  if (err2) console.log(err2);
  console.log("SELECT ==> ");
  for (var i in rows) {
    console.log(rows[i]);
  }
});
}

//update
exports.update = function(){
connection.query(updateSql, function (err3, res3) {
  if (err3) console.log(err3);
  console.log("UPDATE Return ==> ");
  console.log(res3);
});
}

//query
/*connection.query(selectSql, function (err4, rows2) {
    if (err4) console.log(err4);
      console.log("SELECT ==> ");
      for (var i in rows2) {
          console.log(rows2[i]);
      }
});*/

//关闭connection
exports.connectClose = function(){
connection.end(function(err){
  if (err) {
    return;
  }
  console.log('[connection end] succeed!');
})
}


//mysql连接池
var pool = mysql.createPool({
  connectionLimit : 10,
  host : 'localhost',
  user : 'root',
  password : '123456',
  database : 'nodemysql',
});

exports.poolConnection = function(){
  pool.query('SELECT 1 + 1 AS solution',function(err,results,field){
    if (err) {throw err;}
    console.log('The solution is:',results[0].solution);
  });
}
exports.poolGet = function(){
  pool.getConnection(function(err,connection){
    connection.query('select name="kai" from kaden2',function(err,result,field){
      console.log(result);
      connection.release();//释放连接，将其返回给连接池
      if (err) {throw err;}
    })
  })
};

exports.poolEvent = function(){
  pool.on('acquire',function(connection){
  //监听事件：向连接池发出连接请求时触发
    console.log('connection %d acquire',connection.threadId);
  });

  pool.on('connection', function(connection) {
  //一个新连接成功时触发
    connection.query('update kaden2 set address="商丘" where name = "jiangwen"',function(err,result,field){
      console.log(result);
      if (err) {throw err;}
    })
  });

  pool.on('release', function(connection) {
  //释放一个连接还给连接池时触发
    console.log('Connection %d had been released',connection.threadId);
    /* Act on the event */
  });

  pool.on('enqueue', function() {
  //当一个回调函数等待一个可用的连接时调用
    console.log('等待可用连接....');
    /* Act on the event */
  });
};

exports.poolClose = function(){
  pool.end();
}


//模拟密码错误
exports.test = test;
function test(){
  connection.connect(function(err){
    if (err) {
      console.log('-------------------------------connection error----------------------------------');  
      console.log('connecting to nodemysql database err:',err);
       console.log('---------------------------------------------------------------------------------\n\n');  
      setTimeout(test, 2000);
    }
  });

  connection.on('error', function(err) {
    console.log('nodemysql error',err);
    // 如果是连接断开，自动重新连接
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            test();
        } else {
            throw err;
        }
  });
}





//连接blog
exports.selectFun = function(username,callback){
  connection.query('select password from blog1 where username="'+username+'"',function(err,result,filed){
    if (err) {throw err;}
    callback(result);
  })
exports.insertFun = function(username,password,callback){
  connection.query('insert into blog1 value(?,?)',[username,password],function(err,result){
    if (err) {throw err;}
    callback(result);
  })
}
}