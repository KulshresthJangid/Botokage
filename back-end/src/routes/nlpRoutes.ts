import express, { Request, Response } from 'express';
import Nlp from '../nlps/Nlp';

const router = express.Router();

const userNlps: Record<string, Nlp> = {};

router.post("/setLanguage/:userId", (req: Request, res: Response) => {

    let { languages }: { languages: string[] } = req.body;
    let userId: string = req.params.userId;

    console.log("req.body--------", req.body)

    let userNlp: Nlp;
    if (userNlps[userId]) {
        userNlp = userNlps[userId];
    } else {
        userNlps[userId] = new Nlp(languages);
    }

    console.log('languages------', languages)

    console.log("nlp we got is-------", userNlps);
    res.status(201).send({
        success: true,
        msg: "User NLP saved and created."
    });
})

export default router;
