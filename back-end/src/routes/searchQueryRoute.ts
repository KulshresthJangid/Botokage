import express from 'express';
import dbManager from '../nlps/dbNllp';

const router = express.Router();

router.get('/search/:userQuery', async (req, res) => {
    res.send({
        msg: "Not working Under development"
    })
});

router.post('/train', async (req, res) => {
    res.send({
        msg: "Not Working Under development"
    })
});

export default router;
