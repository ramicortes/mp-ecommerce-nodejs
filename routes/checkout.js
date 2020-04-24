const express = require('express');
const mercadopago = require('mercadopago');
const app = express();

app.post('/checkout/payment', (req, res) => {
    console.log(mercadopago);
    res.json('Aca se paga');
});

app.post('/checkout/webhook', (req, res) => {
    res.json('Aca se reciben notificaciones');
});

module.exports = app;