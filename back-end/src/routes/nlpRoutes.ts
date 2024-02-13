import express, { Request, Response } from 'express';
import Nlp from '../nlps/Nlp';
import { NlpInfo } from '../nlps/NlpInfo';
import { IntentOperations } from '../enums/IntentOperations';
import BotokageSQL from '../startupProcess/BotoKageSQL';
import MySqlConnection from '../connectionRaw/SQLConnection';

const router = express.Router();

const userNlps: Record<string, NlpInfo> = {};

router.post("/setLanguage/:userId", (req: Request, res: Response) => {

    let { languages }: { languages: string[] } = req.body;
    let userId: string = req.params.userId;

    console.log("req.body--------", req.body)

    let userNlp: Nlp;
    let nlpInfo: NlpInfo;
    if (userNlps[userId]) {
        userNlp = userNlps[userId].Nlp;
    } else {
        userNlp = new Nlp(languages);
        nlpInfo = new NlpInfo(userNlp, undefined, undefined);
        userNlps[userId] = nlpInfo;
    }


    console.log('languages------', languages)

    console.log("nlp we got is-------", userNlps);
    res.status(201).send({
        success: true,
        msg: "User NLP saved and created."
    });
});

router.post("/setIntent/:userId", async (req: Request, res: Response) => {

    let { intentName, utterances, answer, entities, entityCategoryName, operationName, operationDetails }: 
    { intentName: string, utterances: string[], answer: string, entities: string[], 
        entityCategoryName: string, operationName: IntentOperations, operationDetails: string } 
    = req.body;

    
    let userId: string = req.params.userId;
    console.log(userId, operationDetails, operationName, intentName)
    await BotokageSQL.query('INSERT INTO user_operations (user_id, operation_type, operation_details, intent_name) VALUES (?, ?, ?, ?)', [userId, operationName, operationDetails, intentName], (err, res) => {
        if(err) {
            console.log("Error while inserting the data in to table", err);
        } else {
            console.log("Saved it", res)
        }
    });
    let userNlp: Nlp;
    if (userNlps[userId]) {
        userNlp = userNlps[userId].Nlp;
        await utterances.forEach((el: string) => {
            userNlp.createIntent(intentName, el, entities, entityCategoryName, answer);
        });
        res.send({
            success: true,
            msg: "Intents saved and added to NLP successfully."
        })
    } else {
        res.send({
            success: false,
            msg: "Error no NLP found for user."
        })
    }
});

router.get("/testIntent/:userId", async (req: Request, res: Response) => {
    let { userText }: { userText: string } = req.body;
    let userId: string = req.params.userId;
    let userNlp: Nlp = userNlps[userId].Nlp;

    if (userNlp) {
        try {
            let nlpResponse = await userNlp.processText(userText);
            let intentName = nlpResponse.intent;
            if(intentName) {
                await BotokageSQL.query(`SELECT * FROM user_operations WHERE intent_name = ?`, [intentName], (err, res) => {
                    if(err) {
                        console.log('Error while fetchging the data from the table', err);
                    } else {
                        console.log("found the entry", res)

                        if(res[0]['operation_type'] == 'DB_CONNECTION') {
                            console.log("NOt getting in")
                            try {
                                let tempDbObj = new MySqlConnection('localhost', 'root', 'root', res[0]['operation_details']);
                                tempDbObj.connect();
                                // res.status(200).send({
                                //     message: "DB Connection established",
                                // });
                                return;
                            } catch (e) {
                                // res.status(500).send({
                                //     message: "Internal Server Error",
                                //     error: e,                                    
                                // });
                                return;
                            }

                        }
                    }
                })
            }
            res.send({
                success: true,
                msg: nlpResponse.answers,
                entity: nlpResponse.entities[0],
                intent: nlpResponse.intent
            });
        } catch (error) {
            console.error("Error processing text:", error);
            res.status(500).send({
                success: false,
                msg: "Internal server error",
            });
        }
    } else {
        res.send({
            success: false,
            msg: "No NLP Found for user",
        });
    }
});


export default router;
