import express, {Request, Response, Router} from 'express';
import {
    createQuestion,
    deleteQuestion,
    getAllQuestions,
    getQuestionContent,
    updateQuestion
} from "../controllers/questionController";
import {Sender} from "../utils/Sender";
import {QuestionType} from "../models/Question.type";

export const questionRoute: Router = express.Router();

questionRoute.get('/', (req: Request, res: Response) => {
    getAllQuestions(res);
});

questionRoute.get('/:id', (req: Request, res: Response) => {
    let id = req.params.id;
    getQuestionContent(id, res);
});

questionRoute.post('/', (req: Request, res: Response) => {
    let {category, title, optionalSubContent, answerTypology, answers} = req.body;
    if((!category || !title || !answerTypology)
    || answerTypology == "multi" && !answers ){
        Sender.getInstance().sendError(res, Sender.ERROR_TYPE_PARAMETER)
        return
    }
    let q: QuestionType = {category, title, optionalSubContent, answerTypology, answers}
    createQuestion(q, res);
});

questionRoute.put('/:id', (req: Request, res: Response) => {
    let {category, title, optionalSubContent, answerTypology, answers} = req.body;
    let id = req.params.id;
    if((!category || !title || !answerTypology) ||
        answerTypology == "multi" && !answers ){
        Sender.getInstance().sendError(res, Sender.ERROR_TYPE_PARAMETER)
        return
    }
    let q: QuestionType = {category, title, optionalSubContent, answerTypology, answers}
    updateQuestion(id, q, res);
});

questionRoute.delete('/:id', (req: Request, res: Response) => {
    let id = req.params.id;
    deleteQuestion(id, res);
});