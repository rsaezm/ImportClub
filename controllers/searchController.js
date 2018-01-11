var Cliente = require('../models/cliente');
var Consulta = require('../models/consulta');
var Puja = require('../models/puja');
var Subasta = require('../models/subasta');

module.exports = {

	index: function (req, res) {
		var query = req.query.q;

		Consulta.findOne({ 'Key': query }, {}, function (err, consulta) {
			if (err) res.status(500).send(err);
			else {

				Subasta.findOne({ 'Consulta': consulta }, {}, function (err, subasta) {
					if (err) res.status(500).send(err);
					else {

						Puja.find({ 'Subasta': subasta }).populate('Cliente').exec(function (err, pujas) {
							if (err) res.status(500).send(err);
							else {
								var map = function filter(elements, done) {
									var elements = elements.filter(function (item) {
										//	Se filtran las pujas que ya no tienen presupuesto disponible
										return item.Oferta.Clicks * item.Oferta.ValorClick <= item.Oferta.Presupuesto;
									});

									elements = elements.sort(function (a, b) {
										//	Reemplazar por criterio de puntajes de busqueda
										//	Actualmente ordena por presupuesto disponible
										return a.Oferta.Presupuesto - a.Oferta.Clicks * a.Oferta.ValorClick <= b.Oferta.Presupuesto - b.Oferta.Clicks * b.Oferta.ValorClick;
									})

									elements = elements.map(function (item) {
										//	Se Mapean los datos para entregar la información a la vista con los datos 
										//	relevantes al usuario
										return {
											Nombre: item.Cliente.Nombre,
											Descripcion: item.Cliente.Descripcion,
											Direccion: {
												Url: item.Cliente.Url,
												Link: 'http://localhost:4200/search/direccionar?q=' + query + '&url=' + item.Cliente.Url
											}
										};
									});

									done(elements);
								};

								map(pujas, function (result) {
									res.status(200).json({
										consulta: query,
										Resultados: result
									});
								})
							}
						});
					}
				});
			}
		});
	},
	direccionar: function (req, res) {
		var url = req.query.url;
		var query = req.query.q;

		Cliente.findOne({ 'Url': url }, {}, function (err, cliente) {
			if (err) res.status(500).send(err);
			else {
				Consulta.findOne({ 'Key': query }, {}, function (err, consulta) {
					if (err) res.status(500).send(err);
					else {

						Subasta.findOne({ 'Consulta': consulta }, {}, function (err, subasta) {
							if (err) res.status(500).send(err);
							else {

								Puja.findOne({ 'Subasta': subasta, Cliente: cliente }, {}, function (err, puja) {
									if (err) res.status(500).send(err);
									else {
										puja.Oferta.Clicks = puja.Oferta.Clicks + 1;

										puja.save(function (err, result) {
											if (err) res.status(500).send(err);
											else {
												res.status(200).json(result);
											}
										})
									}
								});
							}
						});
					}
				});
			}
		});
	}
}