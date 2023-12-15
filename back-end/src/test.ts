// const demo = async () => {
//     const {NlpManager} = require('node-nlp');

//     const nlp = new NlpManager({ languages: ['en'] });
    
//     nlp.addAnswer('en', 'query.search', 'Sure, which table should I search?');
    
//     nlp.addDocument('en', 'search for all %table%', 'query.search');
//     nlp.addDocument('en', 'find all orders for %table%', 'query.search');
//     nlp.addDocument('en', 'get all products that are out of stock', 'query.search');
//     nlp.addDocument('en', 'show all orders placed between 1st and 15th of this month', 'query.search');
//     nlp.addDocument('en', 'list all employees who work in the marketing department', 'query.search');
//     nlp.addDocument('en', 'create a search query', 'query.search');
    
//     nlp.addNamedEntityText('table', 'users', ['en'], ['Users']);
    
//     await nlp.train();
    
//     let something= await nlp.process('en', 'get all products that are out of stock')
//     console.log("dbManager Trained successfully");
    
//     console.log(something)
// }

// export default demo;
