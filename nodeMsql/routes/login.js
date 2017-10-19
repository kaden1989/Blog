var express = require('express');
var router = express.Router();
var usr = require('db/nodeMysql');
var redisUser = require('db/nodeRedis');

/* GET users listing. */
router.get('/', function(req, res) {
	if (req.session.islogin) {
		res.locals.islogin = req.session.islogin;
	}
	if (req.cookies.islogin) {
		req.session.islogin = req.cookies.islogin ;
	}
  res.render('login',{ title: '用户登录' ,test:res.locals.islogin});
  
});

router.post('/', function(req,res) {
	/*var user={
		username:'Kaden',
		password:'admin'
	};

	if(req.body.username===user.username && req.body.password===user.password){
		//res.redirect('/home');
		res.render('home', {title: '主页' , username: req.body.username});console.log('right');
	}else{
		res.render('login',{ title: '用户登录' })

		console.log('wrong');	
	}*/


	//mysql数据库处理方式
	/*client = usr.selectFun(req.body.username,function(result){
		if (result === undefined) {
			res.send('没有这货！');
		}else {
			if (result.password === req.body.password) {
				req.session.islogin = req.body.username;
				res.locals.islogin = req.session.islogin;
				console.log(result);
				console.log(req.session);
				res.cookie('islogin',res.locals.islogin,{maxAge:60000});
				res.redirect('/home');
			}else{
				res.redirect('/login');
			}
		}
	});
*/

	//redis处理
	redisUser.redisGet(req.body.username,function (result) {
		if (result === undefined) {
			res.send('没有这货！');
		}else {
			if (result.password === req.body.password) {
				req.session.islogin = req.body.username;
				res.locals.islogin = req.session.islogin;
				console.log(result);
				console.log(req.session);
				res.cookie('islogin',res.locals.islogin,{maxAge:60000});
				res.redirect('/home');
			}else{
				res.redirect('/login');
			}
		}
	})


})

/*function dologin(req,res,next) {
	var user={
		username:'admin',
		password:'admin'
	};
	console.log('wrong');
	if(req.body.username===user.username && req.body.password===user.password){
res.redirect('/home');console.log('right');
}
res.redirect('/login');console.log('wrong');
}

exports.dologin = dologin;*/
module.exports = router;
