const express = require('express');
const { NlpManager } = require('node-nlp');


const dbManager = require('../nlps/dbNllp')
const Constants = require('../../Constants')
const connection = require('../dbs/nlpBotDB')



const router = express.Router();

let userObj = {}

router.get('/search/:userQuery',async (req, res) => {
    const str = req.params.userQuery;
    const response = await dbManager.process(str);

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
    await connection.query(`select * from ${tableEntity.toLowerCase()}`, function (error, results, fields) {
        if (error) throw error;
        console.log('The solution is: ', results);
        res.send({
            results
        })
      });
    console.log(str)
})

router.post('/train',async (req, res) => {
    const { data } = req.body;
    await data.forEach(element => {
        dbManager.addDocument('en', element,'query.search');
    });
    res.send({
        message: "Model is trained based on data that you provided"
    })
})

module.exports = router;
