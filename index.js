var app = require('./app');
var mongoose = require('mongoose');

mongoose.connection.on('connecting', function(){
    console.log("trying to establish a connection to mongo");
});

mongoose.connection.on('connected', function() {
	mongoose.connection.db.dropDatabase(function(err, result) {
		console.log("Database droped")

		var Cliente = require('./models/cliente');
		var Consulta = require('./models/consulta');
		var Puja = require('./models/puja');
		var Subasta = require('./models/subasta');

		var consulta = new Consulta({ Key: 'Seguros de vida' });

		var subasta = new Subasta({
			Consulta: consulta,
			Pujas: []
		});

		var metlife = new Cliente({ Nombre: 'MetLife', Descripcion: "MetLife | Seguros, Rentas y Créditos", Url: 'https://w3.metlife.cl/' });
		var pujaMetlife = new Puja({
			Cliente: metlife,
			Subasta: subasta,
			Oferta: {
				ValorClick: 0.5,
				Presupuesto: 20,
				Clicks: 0
			}
		});

		var consorcio = new Cliente({ Nombre: 'Consorcio', Descripcion: "Seguros, Previsión, Ahorro, Banco | Grupo Consorcio", Url: 'https://www.consorcio.cl/' });
		var pujaConsorcio = new Puja({
			Cliente: consorcio,
			Subasta: subasta,
			Oferta: {
				ValorClick: 0.5,
				Presupuesto: 15,
				Clicks: 0
			}
		});

		var pentavida = new Cliente({ Nombre: 'Penta Vida', Descripcion: "Penta Vida | Soluciones para cada etapa de la vida", Url: 'https://www.pentavida.cl/' });
		var pujaPentaVida = new Puja({
			Cliente: pentavida,
			Subasta: subasta,
			Oferta: {
				ValorClick: 0.5,
				Presupuesto: 10,
				Clicks: 0
			}
		});

		Cliente.create([metlife, consorcio, pentavida], function(err, result){
			if (err) console.log(err);
		});

		Consulta.create(consulta, function(err, result){
			if (err) console.log(err);
		});

		Puja.create([pujaConsorcio, pujaMetlife, pujaPentaVida], function(err, result){
			if (err) console.log(err);
		});

		Subasta.create(subasta, function(err, result){
			if (err) console.log(err);
		});
	});
    console.log("connection established successfully");
});

mongoose.connection.on('error', function(err) {
    console.log('connection to mongo failed ' + err);
});

mongoose.connection.on('disconnected', function() {
    console.log('mongo db connection closed');
})

mongoose.connect('mongodb://localhost/ImportClub', { useMongoClient: true });
mongoose.Promise = global.Promise;
mongoose.Debug = true;

var port = process.env.port || 4200;

app.listen(port, function () {
	console.log('Servicio escuchando en localhost:' + port);
});
