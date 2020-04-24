require('./config/config');
var express = require('express');
var exphbs = require('express-handlebars');
const mercadopago = require('mercadopago');
const bodyParser = require('body-parser');

var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

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
app.get('/approved', function(req, res) {
    res.render('approved');
});
app.get('/rejected', function(req, res) {
    res.render('rejected');
});
app.get('/pending', function(req, res) {
    res.render('pending');
});
app.use(require('./routes/index'));

// configuración de mercadopago
mercadopago.configure({
    access_token: process.env.ACCESS_TOKEN_PROD
});

app.use(express.static('assets'));

app.use('/assets', express.static(__dirname + '/assets'));

app.listen(process.env.PORT);