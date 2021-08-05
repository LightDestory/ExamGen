import {NextFunction, Request, Response} from "express";
const configuration = require('dotenv').config();
import {Sender} from "../utils/Sender";

export function authCheck(req: Request, res: Response, next: NextFunction) {
    if(req.originalUrl.indexOf("/api/") == -1){
        next();
        return;
    }
    let auth: string | undefined = req.headers.authorization;
    let local_key = process.env.SECRET_KEY || "capybara";
    if (!auth || auth != local_key) {
        Sender.getInstance().sendError(res, Sender.ERROR_TYPE_UNAUTH);
        return;
    }
    next()
}