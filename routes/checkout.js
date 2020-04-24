const express = require('express');
const mercadopago = require('mercadopago');
const app = express();

app.post('/checkout/preference', (req, res) => {
    console.log('payment');
    let preference = {
        items: [{
            id: '1234',
            title: req.body.title,
            description: 'Dispositivo móvil de tienda e-commerce',
            picture_url: req.body.picture,
            unit_price: Number(req.body.price) || 0,
            quantity: 1,
        }],
        payer: {
            name: 'Lalo',
            surname: 'Landa',
            email: 'test_user_63274575@testuser.com',
            phone: {
                area_code: '011',
                number: 22223333
            },
            identification: {
                type: 'DNI',
                number: '22.333.444'
            },
            address: {
                zip_code: '1111',
                street_name: 'Falsa',
                street_number: 123
            }
        },
        payment_methods: {
            excluded_payment_methods: [{
                id: 'amex'
            }],
            excluded_payment_types: [{
                id: 'amt'
            }],
            installments: 6
        },
        back_urls: {
            success: 'localhost:3000/approved',
            pending: 'localhost:3000/pending',
            failure: 'localhost:3000/rejected'
        },
        notification_url: 'localhost:3000/checkout/webhook',
        auto_return: 'approved',
        external_reference: 'ABCD1234'
    };

    mercadopago.preferences.create(preference)
        .then(function(response) {
            // Este valor reemplazará el string "$$init_point$$" en tu HTML
            global.id = response.body.id;
            res.json(response);
        })
        .catch(function(error) {
            console.log(error);
        });
});

app.post('/checkout/payment', (req, res) => {
    console.log('hola');
    console.log(req);
    res.json(req);
});

app.post('/checkout/webhook', (req, res) => {
    console.log("hay retorno");
    console.log(req);
    res.json('Aca se reciben notificaciones');
});

module.exports = app;