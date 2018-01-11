var express = require('express'),
	bodyParser = require('body-parser'),
	app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/search', require('./routers/search'));

module.exports = app;