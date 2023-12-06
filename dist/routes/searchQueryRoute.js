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
const express = require('express');
const { NlpManager } = require('node-nlp');
const dbManager = require('../nlps/dbNllp');
const Constants = require('../../Constants');
const connection = require('../dbs/nlpBotDB');
const router = express.Router();
let userObj = {};
router.get('/search/:userQuery', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const str = req.params.userQuery;
    const response = yield dbManager.process(str);
    let intent = response.intent;
    // if(intent == Constants.SEARCH_INTENT) {
    //     let tableEntity = response.entities[0].sourceText;
    //     // connection.query(`SELECT * FROM ${tableEntity}`, function(err,result) {
    //     //     if(err) console.log("-----error hil", err)
    //     //     console.log(result)
    //     //     res.send(result)
    //     //     return;
    //     // })
    //     res.send({
    //         message: "you enterd the search intent  "
    //     })
    // }
    let tableEntity = response.entities[0].sourceText;
    let result;
    yield connection.query(`select * from ${tableEntity.toLowerCase()}`, function (error, results, fields) {
        if (error)
            throw error;
        console.log('The solution is: ', results);
        res.send({
            results
        });
    });
    console.log(str);
}));
router.post('/train', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = req.body;
    yield data.forEach(element => {
        dbManager.addDocument('en', element, 'query.search');
    });
    res.send({
        message: "Model is trained based on data that you provided"
    });
}));
module.exports = router;
