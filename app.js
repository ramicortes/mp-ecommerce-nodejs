require('./config/config');
var express = require('express');
var exphbs = require('express-handlebars');
const mercadopago = require('mercadopago');

var app = express();

// configuracion de handlebars
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// configuracion de rutas
app.get('/', function(req, res) {
    res.render('home');
});
app.get('/detail', function(req, res) {
    res.render('detail', req.query);
});
app.use(require('./routes/index'));

// configuración de mercadopago
mercadopago.configure({
    access_token: process.env.ACCESS_TOKEN
});

app.use(express.static('assets'));

app.use('/assets', express.static(__dirname + '/assets'));

app.listen(process.env.PORT);