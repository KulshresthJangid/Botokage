import MySqlConnection from "../connectionRaw/SQLConnection";

// BOTOKAGE SQL CONNECTION

const botokageSqlHost: string = process.env.BOTOKAGE_SQL_HOST || 'localhost';
const botokageSqlUser: string = process.env.BOTOKAGE_SQL_USER || 'root';
const botokageSqlPass: string = process.env.BOTOKAGE_SQL_PASSWORD || 'root';
const botokageSqlDbName: string = process.env.BOTOKAGE_SQL_DB_NAME || 'botokage_test_db';

const BotokageSQL = new MySqlConnection(botokageSqlHost, botokageSqlUser,botokageSqlPass, botokageSqlDbName);
BotokageSQL.connect();

export default BotokageSQL;
