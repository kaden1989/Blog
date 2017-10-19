var express = require('express');
var qs = require("querystring");
var router = express.Router(),
	util = require('util'),
	formidable = require('formidable');

/* GET home page. */
router.get('/',function(req,res,next){
	/*var form = new formidable.IncomingForm();
	form.parse(req, function(error, fields, files) {
		console.log('right');
		console.log(util.inspect(fields.username));
		console.log(req.body.username);
		res.render('home', {title: '主页' , username: util.inspect(fields.username)});

	});*/

	if (req.cookies.islogin) {
		req.session.islogin = req.cookies.islogin;
	}
	if (req.session.islogin) {
		res.locals.islogin = req.session.islogin;
	}
  res.render('home',{ title: '主页' ,user:res.locals.islogin});
  	
})

/*router.post('/', function(req, res) {
res.render('home', { title: '主页' ,username: 'user'});	
});*/

//exports.router = router;
module.exports = router;
