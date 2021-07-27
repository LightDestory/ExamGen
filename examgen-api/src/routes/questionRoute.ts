import express, {Request, Response, Router} from 'express';
import {
    createQuestion, deleteAllQuestions,
    deleteQuestion,
    getAllQuestions,
    getQuestionContent,
    updateQuestion
} from "../controllers/questionController";
import {Sender} from "../utils/Sender";
import {EnforceDocument} from "mongoose";
import {IQuestion} from "../models/Question";

export const questionRoute: Router = express.Router();

questionRoute.get('/', (req: Request, res: Response) => {
    getAllQuestions()
        .then((results: EnforceDocument<IQuestion, {}>[]) => {
            Sender.getInstance().sendResult(res, 200, results);
        });
});

questionRoute.get('/:id', (req: Request, res: Response) => {
    let id = req.params.id;
    getQuestionContent(id)
        .then((result: IQuestion | null) => {
            if(!result) {
                Sender.getInstance().sendError(res, Sender.ERROR_TYPE_NOT_FOUND);
            }
            else{
                Sender.getInstance().sendResult(res, 200, result);
            }
        })
        .catch(() => {
            Sender.getInstance().sendError(res, Sender.ERROR_TYPE_PARAMETER);
        });
});

questionRoute.post('/', (req: Request, res: Response) => {
    let {subject, category, title, optionalSubContent, answerTypology, answers} = req.body;
    if((!subject || !category || !title || !answerTypology)
    || answerTypology == "multi" && (!answers || answers.length <= 1) ){
        Sender.getInstance().sendError(res, Sender.ERROR_TYPE_PARAMETER)
        return
    }
    let q: IQuestion = {subject, category, title, optionalSubContent, answerTypology, answers}
    createQuestion(q)
        .then((result: IQuestion) => {
            Sender.getInstance().sendResult(res, 201, result);
        })
});

questionRoute.put('/:id', (req: Request, res: Response) => {
    let {subject, category, title, optionalSubContent, answerTypology, answers} = req.body;
    let id = req.params.id;
    if((!subject || !category || !title || !answerTypology) ||
        answerTypology == "multi" && (!answers || answers.length <= 1) ){
        Sender.getInstance().sendError(res, Sender.ERROR_TYPE_PARAMETER)
        return
    }
    let q: IQuestion = {subject, category, title, optionalSubContent, answerTypology, answers}
    updateQuestion(id, q)
        .then(result => {
            if(!result) {
                Sender.getInstance().sendError(res, Sender.ERROR_TYPE_NOT_FOUND);
            }
            else{
                Sender.getInstance().sendResult(res, 200, result);
            }
        })
        .catch(() => {
            Sender.getInstance().sendError(res, Sender.ERROR_TYPE_PARAMETER);
        });
});

questionRoute.delete('/:id', (req: Request, res: Response) => {
    let id = req.params.id;
    if(id == "all") {
        deleteAllQuestions()
            .then((result) => {
                Sender.getInstance().sendResult(res, 200, {"deletions": result.deletedCount});
            });
    }
    else {
        deleteQuestion(id)
            .then((result: IQuestion | null) => {
                if(!result) {
                    Sender.getInstance().sendError(res, Sender.ERROR_TYPE_NOT_FOUND);
                }
                else{
                    Sender.getInstance().sendResult(res, 200, result);
                }
            })
            .catch(() => {
                Sender.getInstance().sendError(res, Sender.ERROR_TYPE_PARAMETER);
            });
    }
});