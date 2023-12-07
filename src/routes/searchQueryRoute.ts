import express from 'express';
import dbManager from '../nlps/dbNllp';
import connection from '../dbs/nlpBotDB';

const router = express.Router();

router.get('/search/:userQuery', async (req, res) => {
    console.log("something");
    const str = req.params.userQuery;
    const response = await dbManager.process(str);

    let intent = response.intent;

    if (intent === "query.search") {
        let tableEntity = response.entities[0].sourceText;

        // Assuming you have sanitized the tableEntity to prevent SQL injection
        await connection.query(`SELECT * FROM ${tableEntity.toLowerCase()}`, function (error: any, results: any, fields: any) {
            if (error) {
                console.log('-----error hil', error);
                res.status(500).send({ error: 'Internal Server Error' });
                return;
            }
            console.log('The solution is: ', results);
            res.send({
                results
            });
        });
    } else {
        res.send({
            message: "you entered a search intent"
        });
    }
    console.log(str);
});

router.post('/train', async (req, res) => {
    const { data } = req.body;
    data.forEach((element: any) => {
        dbManager.addDocument('en', element, 'query.search');
    });
    res.send({
        message: "Model is trained based on data that you provided"
    });
});

export default router;
