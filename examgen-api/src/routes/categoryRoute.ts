import express, { Request, Response, Router } from 'express';
import { getAllCategories, getCategoryContents, updateCategory, deleteCategory } from "../controllers/categoryController";
import { Sender } from "../utils/Sender";
import { EnforceDocument, UpdateWriteOpResult } from "mongoose";
import { IQuestion } from "../models/Question";

export const categoryRoute: Router = express.Router({ mergeParams: true });

categoryRoute.get('/', (req: Request, res: Response) => {
    let subject: String = req.params.subjectName;
    getAllCategories(subject)
        .then((results: String[]) => {
            if (results.length > 0) {
                Sender.getInstance().sendResult(res, 200, results);
            }
            else {
                Sender.getInstance().sendError(res, Sender.ERROR_TYPE_NOT_FOUND);
            }
        });
});

categoryRoute.get('/:categoryName', (req: Request, res: Response) => {
    let category: String = req.params.categoryName;
    let subject: String = req.params.subjectName;
    getCategoryContents(subject, category)
        .then((results: EnforceDocument<IQuestion, {}>[]) => {
            if (results.length == 0) {
                Sender.getInstance().sendError(res, Sender.ERROR_TYPE_NOT_FOUND);
            } else {
                Sender.getInstance().sendResult(res, 200, results);
            }
        });
});

categoryRoute.put("/:categoryName", (req: Request, res: Response) => {
    let subject: String = req.params.subjectName;
    let currCategory: String = req.params.categoryName;
    let newName: String | undefined = req.body.name;
    if (!newName) {
        Sender.getInstance().sendError(res, Sender.ERROR_TYPE_PARAMETER);
        return;
    }
    getCategoryContents(subject, newName)
        .then((results: EnforceDocument<IQuestion, {}>[]) => {
            if (results.length == 0) {
                updateCategory(subject, currCategory, newName!)
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

categoryRoute.delete("/:categoryName", (req: Request, res: Response) => {
    let subject: String = req.params.subjectName;
    let category: String = req.params.categoryName;
    deleteCategory(subject, category)
        .then(results => {
            if (results.deletedCount == 0) {
                Sender.getInstance().sendError(res, Sender.ERROR_TYPE_NOT_FOUND);
            } else {
                Sender.getInstance().sendResult(res, 200, { "deletions": results.deletedCount });
            }
        });
});