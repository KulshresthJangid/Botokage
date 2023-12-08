"use strict";
const mysql = require('mysql');
const dbManager = require('../nlps/dbNllp');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'botokage_test_db'
});
connection.connect((err) => {
    if (err)
        console.log("Error while connecting to SQL database");
    console.log("Your sql database connected successfully");
});
connection.query('SHOW TABLES', function (error, results) {
    if (error)
        console.log(error);
    let tableNames;
    if (results) {
        tableNames = results.map(result => result[`Tables_in_${connection.config.database}`]);
    }
    console.log(tableNames);
    dbManager.addNamedEntityText('table', tableNames, ['en'], tableNames);
});
module.exports = connection;
