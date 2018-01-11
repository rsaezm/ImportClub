var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var schema = new Schema({
	Consulta: { type: mongoose.Schema.Types.ObjectId, ref: 'Consulta' }
}, {
	collection: 'Subasta'
});

module.exports = mongoose.model('Subasta', schema);