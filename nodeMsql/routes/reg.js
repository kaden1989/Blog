var express = require('express');
var router = express.Router();
var usr = require('db/nodeMysql');
var redisUser = require('db/nodeRedis');

router.get('/',function(req,res){
        res.render('reg',{title:'注册'});
    });
router.post('/',function(req,res) {
      
        /*usr.insertFun(req.body.username ,req.body.password, req.body.email,function (err) {
              if(err) console.log('注册出错：',err);
              res.send('<h1>注册成功!</h1>'+"<a href='/login'>请重新登录</a>");
        });*/

        redisUser.redisAdd(req.body.username ,req.body.password, req.body.email,function (err) {
              if(err) console.log('注册出错：',err);
              res.send('<h1>注册成功!</h1>'+"<a href='/login'>请重新登录</a>");
        });
    });

module.exports = router;