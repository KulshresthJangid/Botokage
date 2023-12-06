const dbManager = require('../nlps/dbNllp')

const trainForSearchIntent = async () => {
    dbManager.addAnswer('en', 'query.search', 'Sure, which table should I search?');


    dbManager.addDocument('en', 'search for all %table%', 'query.search');
    dbManager.addDocument('en', 'find all orders for %table% ', 'query.search');
    dbManager.addDocument('en', 'get all products that are out of stock', 'query.search');
    dbManager.addDocument('en', 'show all orders placed between 1st and 15th of this month', 'query.search');
    dbManager.addDocument('en', 'list all employees who work in the marketing department', 'query.search');
    dbManager.addDocument('en', 'create a search query', 'query.search');

    dbManager.addNamedEntityText('table', 'users', ['en'], ['Users']);

    await dbManager.train();
    console.log("dbManager Trained successfully")
}

trainForSearchIntent();