/**
 * Created by Jordan on 5/8/2015.
 */
'use strict';

var express     = require('express');
var bodyParser  = require('body-parser');

var models = require('./models');

var app = express();

app.use(bodyParser.json());

app.use('/', express.static('static'));

app.post('/newsletter', function (req, res, next) {
    models.Newsletter.create({ email: req.body.email })
        .then(function () {
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