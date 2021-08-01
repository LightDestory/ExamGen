import express, { Request, Response, Router } from 'express';
import { Sender } from "../utils/Sender";
import { EnforceDocument, UpdateWriteOpResult } from "mongoose";
import { IQuestion } from "../models/Question";
import { deleteSubject, getAllSubjects, getSubjectContents, updateSubject } from "../controllers/subjectController";

export const subjectRoute: Router = express.Router();

subjectRoute.get('/', (req: Request, res: Response) => {
    getAllSubjects()
        .then((results: String[]) => {
            Sender.getInstance().sendResult(res, 200, results);
        });
});

subjectRoute.get('/:subjectName', (req: Request, res: Response) => {
    let subject: String = req.params.subjectName;
    getSubjectContents(subject)
        .then((results: EnforceDocument<IQuestion, {}>[]) => {
            if (results.length == 0) {
                Sender.getInstance().sendError(res, Sender.ERROR_TYPE_NOT_FOUND);
            } else {
                Sender.getInstance().sendResult(res, 200, results);
            }
        });
});

subjectRoute.put("/:subjectName", (req: Request, res: Response) => {
    let currSubject: String = req.params.subjectName;
    let newName: String | undefined = req.body.name;
    if (!newName) {
        Sender.getInstance().sendError(res, Sender.ERROR_TYPE_PARAMETER);
        return;
    }
    getSubjectContents(newName)
        .then((results: EnforceDocument<IQuestion, {}>[]) => {
            if (results.length == 0) {
                updateSubject(currSubject, newName!)
                    .then((results: UpdateWriteOpResult) => {
                        if (results.nModified == 0) {
                            Sender.getInstance().sendError(res, Sender.ERROR_TYPE_NOT_FOUND);
                        } else {
                            Sender.getInstance().sendResult(res, 200, { "updates": results.nModified });
                        }
                    });
            }
            else {
                Sender.getInstance().sendError(res, Sender.ERROR_TYPE_RENAME);
            }
        });
});

subjectRoute.delete("/:subjectName", (req: Request, res: Response) => {
    let subject: String = req.params.subjectName;
    deleteSubject(subject)
        .then(results => {
            if (results.deletedCount == 0) {
                Sender.getInstance().sendError(res, Sender.ERROR_TYPE_NOT_FOUND);
            } else {
                Sender.getInstance().sendResult(res, 200, { "deletions": results.deletedCount });
            }
        });
});