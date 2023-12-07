import * as mysql from 'mysql';

class MySqlConnection {
    private connectionDetails: mysql.ConnectionConfig;
    private connection: mysql.Connection;

    constructor(host: string, user: string, password: string, database: string) {
        this.connectionDetails = {
            host,
            user,
            password,
            database
        };
        this.connection = mysql.createConnection(this.connectionDetails);
    }

    connect(): void {
        this.connection.connect();
    }

    query(sql: string, values: any, callback: (error: mysql.MysqlError | null, results: any, fields: mysql.FieldInfo[] | undefined) => void): void {
        this.connection.query(sql, values, callback);
    }

    end(): void {
        this.connection.end();
    }

    setHost(host: string): void {
        this.connectionDetails.host = host;
        this.reconnect();
    }

    setUser(user: string): void {
        this.connectionDetails.user = user;
        this.reconnect();
    }

    setPassword(password: string): void {
        this.connectionDetails.password = password;
        this.reconnect();
    }

    setDatabase(database: string): void {
        this.connectionDetails.database = database;
        this.reconnect();
    }

    private reconnect(): void {
        this.connection = mysql.createConnection(this.connectionDetails);
        this.connect();
    }
}

export = MySqlConnection;
