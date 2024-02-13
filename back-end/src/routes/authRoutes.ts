import express, { Request, Response } from 'express';
import jwt, { Jwt } from 'jsonwebtoken';

const router = express.Router();

const jwtSecret: string | undefined = process.env.JWT_SECRET;


router.get('/createToken', (req: Request, res: Response) => {
    const data = {
        time: Date(),
        userId: 12,
    };
    if (jwtSecret) {
        const token = jwt.sign(data, jwtSecret);
        res.send({
            success: true,
            token: token,
        })
    } else {
        console.log("No JWT secrete key provided");
        res.status(500).send({
            success: true,
            msg: "Internal server ERror"
        });
    }
});

router.get('/validateToken', (req: Request, res: Response) => {
    const { token } = req.headers;
    if (token && typeof token === 'string' && jwtSecret) {
        const verified = jwt.verify(token, jwtSecret);
        if(verified) {
            res.send({
                success: true,
                msg: "Request is verified"
            });
        }
    } else {
        res.send({
            success: false,
            msg: "Token is not provided."
        })
    }

});


export default router;