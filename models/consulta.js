var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var schema = new Schema({
	Key: { type: String, require: true, unique: true },
}, {
	collection: 'Consulta'
});

module.exports = mongoose.model('Consulta', schema);
