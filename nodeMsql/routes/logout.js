var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.clearCookie('islogin');
	req.session.destroy();
	res.redirect('/');
});

module.exports = router;
