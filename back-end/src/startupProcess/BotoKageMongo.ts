import MongoConnection from "../connectionRaw/MongoConnection";


// BOTOKAGE MONGO CONNECTION
const botokageMongoHost = process.env.BOTOKAGE_MONGO_HOST || 'mongodb://172.17.0.2:27017';
const botokageMongoDb = process.env.BOTOKAGE_MONGO_DB_NAME || 'botokage';

const BotokageConnection = new MongoConnection();
// BotokageConnection.connect(botokageMongoHost, botokageMongoDb);

export default BotokageConnection;