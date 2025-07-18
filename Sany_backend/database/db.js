var mysql = require('mysql2');

var db;
var db_config = {
    host: 'localhost',
    user: 'root',
    password: 'Root@1234',
    database: 'sanycbware',
    multipleStatements: true,
    port: 3306,
    // charset: 'utf8'
};

db = mysql.createPool(db_config).promise();


module.exports = db;
