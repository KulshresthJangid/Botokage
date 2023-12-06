require('dotenv').config()

const express = require('express')
const { NlpManager } = require('node-nlp');

const connection = require('./dbs/nlpBotDB');
const searchQueryRouter = require('./routes/searchQueryRoute')

// intents
const dbSearchIntents = require('./intents/dbSearchIntents')


const app = express();

const port = process.env.PORT || 3000;

app.use(express.json())
app.use('/searchQuery', searchQueryRouter)
// app.get('/', async (req, res) => {
//     const manager = new NlpManager({ languages: ['en'] });


//     // Add examples of queries related to updating a MySQL database
//     manager.addDocument('en', 'create a new customer record', 'query.update');
//     manager.addDocument('en', 'add a new product to the inventory', 'query.update');
//     manager.addDocument('en', 'update the shipping address for order 456', 'query.update');
//     manager.addDocument('en', 'delete all orders placed before Jan 1st', 'query.update');

//     // Add examples of queries related to general database administration tasks
//     manager.addDocument('en', 'backup the database', 'query.admin');
//     manager.addDocument('en', 'check the database for errors', 'query.admin');
//     manager.addDocument('en', 'optimize the database performance', 'query.admin');

//     // Add some example responses for each intent
//     manager.addAnswer('en', 'query.search', 'Sure, which table should I search?');
//     manager.addAnswer('en', 'query.update', 'Sure, which record should I update?');
//     manager.addAnswer('en', 'query.admin', 'Sure, what do you want me to do?');

//     manager.addNamedEntityText('table', 'users', ['en'], ['Users']);

//     // Train the model
//     await manager.train();

//     // Test the model with a sample input
//     const response = await manager.process('search in table users');
//     const intent = response.intent;
//     const tablename = response.entities.table ? response.entities.table[0].option : null;
//     const { entities } = response;;

//     console.log(response);

//     res.send({
//         message: response, 
//         tableName: tablename
//     })
// })

app.listen(port, () => {
    console.log(`Server is up and running on port ${port}`)
})