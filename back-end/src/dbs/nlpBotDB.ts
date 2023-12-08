import * as mysql from 'mysql';
import dbManager from '../nlps/dbNllp';
import MySqlConnection from './botQueryDB';

const host = 'localhost';
const user = 'root';
const password = 'root';
const database = 'botokage_test_db';

const createNewConnection = new MySqlConnection(host, user, password, database);
createNewConnection.connect();
createNewConnection.query('SHOW TABLES', null, function (error, results) {
    if (error) console.log(error);
    let tableNames
    if (results) {
        console.log(results);
    }
    // console.log(tableNames);
    dbManager.addNamedEntityText('table', tableNames, ['en'], tableNames);
})

// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'root',
//     database: 'botokage_test_db'
// })

// connection.query('SHOW TABLES', function (error, results) {
//     if (error) console.log(error);
//     let tableNames
//     if (results) {
//         tableNames = results.map((result: { [x: string]: any; }) => result[`Tables_in_${connection.config.database}`]);
//     }
//     console.log(tableNames);
//     dbManager.addNamedEntityText('table', tableNames, ['en'], tableNames);
// });

// export default connection;