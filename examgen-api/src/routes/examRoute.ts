import express, {Request, Response, Router} from 'express';
import {generateExam, deleteAllExams, deleteExam, getAllPastExams, getExamContent} from "../controllers/examController";
import {Sender} from "../utils/Sender";
import {EnforceDocument} from "mongoose";
import PDFgen from "../utils/PDFgen";
import {ExamRequest, IExam} from "../models/Exam";
import {getAllSubjects} from "../controllers/subjectController";

export const examRoute: Router = express.Router();

examRoute.get('/history', (req: Request, res: Response) => {
    getAllPastExams({}, '_id subject title date')
        .then((results: EnforceDocument<IExam, {}>[]) => {
            Sender.getInstance().sendResult(res, 200, results);
        });
});

examRoute.get('/history/:subject', (req: Request, res: Response) => {
    let subject: String = req.params.subject;
    getAllPastExams({"subject": `${subject}`}, '_id title date')
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

examRoute.get('/:id/file', (req: Request, res: Response) => {
    let id: String = req.params.id
    getExamContent(id)
        .then((result: IExam | null) => {
            if(!result) {
                Sender.getInstance().sendError(res, Sender.ERROR_TYPE_NOT_FOUND);
            }
            else{
                const pdg = new PDFgen();
                pdg.generateStream(result)
                    .then((stream) => {
                        Sender.getInstance().sendFile(res, 200, stream);
                    })
                    .catch(() => {
                        Sender.getInstance().sendError(res, Sender.ERROR_TYPE_PDF_GEN);
                    });
            }
        })
        .catch(() => {
            Sender.getInstance().sendError(res, Sender.ERROR_TYPE_PARAMETER);
        });
});

examRoute.post('/generate', async (req: Request, res: Response) => {
    let {subject, title, questions} = req.body;
    if((!subject || !title || !questions)){
        Sender.getInstance().sendError(res, Sender.ERROR_TYPE_PARAMETER)
        return
    }
    let e: ExamRequest = {subject, title, questions}
    let subjects: any[] = await getAllSubjects();
    subjects = subjects.map((sub: any) => sub._id);
    if(subjects.indexOf(e.subject) == -1) {
        Sender.getInstance().sendError(res, Sender.ERROR_TYPE_NOT_FOUND);
        return
    }
    e.questions.forEach((set) => {
        if(typeof set.category=='undefined' || !set.category ||
            typeof set.overallQta=='undefined' || !set.overallQta || set.overallQta == "0" || isNaN(parseInt(<string>set.overallQta)) ||
            typeof set.multiQta=='undefined' || !set.multiQta || isNaN(parseInt(<string>set.multiQta)) ||
            parseInt(<string>set.multiQta) > parseInt(<string>set.overallQta) ){
            Sender.getInstance().sendError(res, Sender.ERROR_TYPE_PARAMETER)
            return
        }
    });
    generateExam(e)
        .then((result) => {
            const pdg = new PDFgen();
            pdg.generateStream(result)
                .then((stream) => {
                    Sender.getInstance().sendFile(res, 200, stream);
                })
                .catch(() => {
                    Sender.getInstance().sendError(res, Sender.ERROR_TYPE_PDF_GEN);
                });
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