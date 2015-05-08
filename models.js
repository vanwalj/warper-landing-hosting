/**
 * Created by Jordan on 5/8/2015.
 */

var Sequelize = require('sequelize');
var sequelize = new Sequelize(process.env.DB_URI);

var db = {};

db.Newsletter = sequelize.define('newsletter', {
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate: {
            isEmail: true
        }
    }
});

db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;