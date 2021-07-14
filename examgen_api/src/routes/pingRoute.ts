import express, {Request, Response, Router} from 'express';
import {Sender} from "../utils/Sender";

export const pingRoute: Router = express.Router();

pingRoute.post('/', (req: Request, res: Response) => {
    Sender.getInstance().sendResult(res, 200, "pong");
});