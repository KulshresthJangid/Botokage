"use strict";
const mysql = require('mysql');
class MySqlConnection {
    constructor(host, user, password, database) {
        this.connectionDetails = {
            host,
            user,
            password,
            database
        };
        this.connection = mysql.createConnection(this.connectionDetails);
    }
    connect() {
        this.connection.connect();
    }
    query(sql, values, callback) {
        this.connection.query(sql, values, callback);
    }
    end() {
        this.connection.end();
    }
    setHost(host) {
        this.connectionDetails.host = host;
        this.reconnect();
    }
    setUser(user) {
        this.connectionDetails.user = user;
        this.reconnect();
    }
    setPassword(password) {
        this.connectionDetails.password = password;
        this.reconnect();
    }
    setDatabase(database) {
        this.connectionDetails.database = database;
        this.reconnect();
    }
    reconnect() {
        this.connection = mysql.createConnection(this.connectionDetails);
        this.connect();
    }
}
module.exports = MySqlConnection;
