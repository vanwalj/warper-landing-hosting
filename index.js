/**
 * Created by Jordan on 5/8/2015.
 */
'use strict';

var express             = require('express');
var bodyParser          = require('body-parser');
var GoogleSpreadsheet   = require("google-spreadsheet");

var models = require('./models');

var app = express();
var sheet = new GoogleSpreadsheet(process.env.G_SPREADSHEET_ID);

app.use(bodyParser.json());

app.use('/', express.static('static'));

app.post('/newsletter', function (req, res, next) {
    models.Newsletter.create({ email: req.body.email })
        .then(function (newsletter) {
            sheet.setAuth(process.env.G_USER_LOGIN, process.env.G_USER_PASSWORD, function (err) {
                if (err) return console.error(err);
                sheet.addRow(1, {
                    id: newsletter.id,
                    email: newsletter.email,
                    userAgent: req.headers['user-agent'],
                    date: new Date()
                });
            });
            res.sendStatus(201);
            next();
        })
        .catch(models.Sequelize.UniqueConstraintError, function (err) {
            console.log(err);
            res.sendStatus(409);
            next();
        })
        .catch(function (err) {
            console.log(err);
            res.sendStatus(400);
            next();
        });
});

module.exports = app;