import {Response} from "express";
import Question from "../models/Question";
import {EnforceDocument} from "mongoose";
import {IQuestion} from "../interfaces/IQuestion";
import {Sender} from "../utils/Sender";
import {QuestionType} from "../models/Question.type";

function getAllQuestions(res: Response): void {
    Question.find({})
        .exec()
        .then((results: EnforceDocument<IQuestion, {}>[]) => {
            Sender.getInstance().sendResult(res, 200, results);
        });
}

function getQuestionContent(id: String, res: Response) {
    Question.findById(id)
        .exec()
        .then((result: IQuestion | null) => {
            if(!result) {
                Sender.getInstance().sendError(res, Sender.ERROR_TYPE_NOT_FOUND);
            }
            else{
                Sender.getInstance().sendResult(res, 200, result);
            }
        });
}

function createQuestion(question: QuestionType, res: Response) {
    new Question(question).save()
        .then((result: IQuestion) => {
            Sender.getInstance().sendResult(res, 201, result);
        })
}

function updateQuestion(id: String, data: QuestionType, res: Response) {
    Question.findByIdAndUpdate(id, data)
        .exec()
        .then(result => {
            if(!result) {
                Sender.getInstance().sendError(res, Sender.ERROR_TYPE_NOT_FOUND);
            }
            else{
                Sender.getInstance().sendResult(res, 200, result);
            }
        });
}

function deleteQuestion(id: String, res: Response) {
    Question.findByIdAndDelete( id)
        .exec()
        .then((result: IQuestion | null) => {
            if(!result) {
                Sender.getInstance().sendError(res, Sender.ERROR_TYPE_NOT_FOUND);
            }
            else{
                Sender.getInstance().sendResult(res, 200, result);
            }
        });
}

export {getAllQuestions, getQuestionContent, createQuestion, updateQuestion, deleteQuestion}