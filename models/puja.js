var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var schema = new Schema({
	Cliente: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente' },
	Subasta: { type: mongoose.Schema.Types.ObjectId, ref: 'Subasta' },
	Oferta: {
		ValorClick: { type: Number, require: true, unique: false },
		Presupuesto: { type: Number, require: false, unique: false },
		Clicks: { type: Number, require: false, unique: false }
	}
}, {
	collection: 'Puja'
});

module.exports = mongoose.model('Puja', schema);