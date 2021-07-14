import express, {Request, Response, Router} from 'express';
import {generateExam, deleteAllExams, deleteExam, getAllPastExams, getExamContent} from "../controllers/examController";
import {Sender} from "../utils/Sender";
import ExamType from "../models/Exam.type";
import {EnforceDocument} from "mongoose";
import IExam from "../interfaces/IExam";

export const examRoute: Router = express.Router();

examRoute.get('/history', (req: Request, res: Response) => {
    getAllPastExams()
        .then((results: EnforceDocument<IExam, {}>[]) => {
            Sender.getInstance().sendResult(res, 200, results);
        });
});

examRoute.get('/:id', (req: Request, res: Response) => {
    let id: String = req.params.id
    getExamContent(id)
        .then((result: IExam | null) => {
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

examRoute.post('/generate', (req: Request, res: Response) => {
    let {date, title, questions} = req.body;
    if((!date || !title || !questions)){
        Sender.getInstance().sendError(res, Sender.ERROR_TYPE_PARAMETER)
        return
    }
    let e: ExamType = {date, title, questions}
    e.questions.forEach((set) => {
        if(set.category == "" || set.category == null || set.qta == "" || set.qta == null || set.qta == "0" || isNaN(parseInt(set.qta))){
            Sender.getInstance().sendError(res, Sender.ERROR_TYPE_PARAMETER)
            return
        }
    })
    generateExam(e)
        .then((result) => {
            Sender.getInstance().sendResult(res, 201, result);
        })
        .catch(() => {
            Sender.getInstance().sendError(res, Sender.ERROR_TYPE_NOT_ENOUGH);
        })
});

examRoute.delete('/:id', (req: Request, res: Response) => {
    let id: String = req.params.id
    if(id == "all") {
        deleteAllExams()
            .then((result) => {
                Sender.getInstance().sendResult(res, 200, {"deletions": result.deletedCount});
            });
    }
    else {
        deleteExam(id)
            .then((result: IExam | null) => {
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