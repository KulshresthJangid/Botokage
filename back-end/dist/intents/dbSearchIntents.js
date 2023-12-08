"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const dbManager = require('../nlps/dbNllp');
const trainForSearchIntent = () => __awaiter(void 0, void 0, void 0, function* () {
    dbManager.addAnswer('en', 'query.search', 'Sure, which table should I search?');
    dbManager.addDocument('en', 'search for all %table%', 'query.search');
    dbManager.addDocument('en', 'find all orders for %table% ', 'query.search');
    dbManager.addDocument('en', 'get all products that are out of stock', 'query.search');
    dbManager.addDocument('en', 'show all orders placed between 1st and 15th of this month', 'query.search');
    dbManager.addDocument('en', 'list all employees who work in the marketing department', 'query.search');
    dbManager.addDocument('en', 'create a search query', 'query.search');
    dbManager.addNamedEntityText('table', 'users', ['en'], ['Users']);
    yield dbManager.train();
    console.log("dbManager Trained successfully");
});
trainForSearchIntent();
