var express = require('express'),
	router = express.Router();

var searchController = require('../controllers/searchController');

router.get('/', searchController.index);
router.get('/direccionar', searchController.direccionar);

module.exports = router;