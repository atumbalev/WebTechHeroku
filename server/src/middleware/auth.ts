import { NextFunction, Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
const jwt = require('jsonwebtoken')

export function verifyTokenMiddleware(req: Request, res: Response, next: NextFunction) {
    const bearerHeader = req.headers['authorization'];
	if(typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        if (!bearerToken) {
            return res.sendStatus(401);
        }
	    const user = jwt.verify(bearerToken, process.env.TOKEN_SECRET);//true or false ??
        if (!user) {
            return res.sendStatus(403);
        }
        res.locals.user = user; //we have to try that
        next();
    }else {
        return res.sendStatus(401);
    }
}