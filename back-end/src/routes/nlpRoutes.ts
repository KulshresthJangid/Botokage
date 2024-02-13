import express, { Request, Response } from 'express';
import Nlp from '../nlps/Nlp';
import { NlpInfo } from '../nlps/NlpInfo';
import { IntentOperations } from '../enums/IntentOperations';
import BotokageSQL from '../startupProcess/BotoKageSQL';

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

    let { intentName, utterances, answer, entities, categoryName, operationName, operation }: 
    { intentName: string, utterances: string[], answer: string, entities: string[], 
    categoryName: string, operationName: IntentOperations, operation: string } 
    = req.body;

    
    let userId: string = req.params.userId;
    BotokageSQL.query('INSERT INTO user_operations (user_id, operation_type, operation, intent_name) VALUES (?, ?, ?, ?)', [userId, operationName, operation, intentName], () => {console.log('user operations saved successfylly')});
    let userNlp: Nlp;
    if (userNlps[userId]) {
        userNlp = userNlps[userId].Nlp;
        await utterances.forEach((el: string) => {
            userNlp.createIntent(intentName, el, entities, categoryName, answer);
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
            res.send({
                success: true,
                msg: nlpResponse.answers,
                entity: nlpResponse.entities[0]
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
