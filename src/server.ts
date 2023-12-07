require('dotenv').config()

import express, {Request, Response, NextFunction} from 'express';
const { NlpManager } = require('node-nlp');

const connection = require('./dbs/nlpBotDB');
import searchRouter from './routes/searchQueryRoute';

// intents
const dbSearchIntents = require('./intents/dbSearchIntents')


const app = express();

const port = process.env.PORT || 3000;


app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(req);
    next()
})

app.use(express.json())
app.use('/searchQuery', searchRouter)
logRoutes(app);



function logRoutes(app: express.Express) {
    const routes: { path: string; methods: string[] }[] = [];
    collectRoutes(app._router, '');

    console.log('\nAvailable Routes:');
    routes.forEach((route) => {
        console.log(`${route.path} - [${route.methods.join(', ')}]`);
    });

    function collectRoutes(router: express.IRouter, basePath: string) {
        router.stack.forEach((middleware: any) => {
            if (middleware.route) {
                const route = middleware.route;
                const methods = Object.keys(route.methods).filter((method) => route.methods[method]);
                routes.push({
                    path: basePath + route.path,
                    methods: methods as string[],
                });
            } else if (middleware.name === 'router') {
                collectRoutes(middleware.handle, basePath + middleware.regexp);
            }
        });
    }
}






// app.get('/', async (req, res) => {
//     const manager = new NlpManager({ languages: ['en'] });s


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

app.get('/', (req: any, res: { send: (arg0: { daalle: string; }) => void; }) => {
    res.send({
        "daalle": "dalle"
    })
})

app.listen(port, () => {
    console.log(`Server is up and running on port ${port}`)
})