var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var schema = new Schema({
	Nombre: { type: String, required: true, unique: true },
	Descripcion: { type: String, required: false, unique: false },
	Url: { type: String, required: true, unique: true },
	Puja: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Puja' }]
}, {
	collection: 'Cliente'
});

module.exports = mongoose.model('Cliente', schema);