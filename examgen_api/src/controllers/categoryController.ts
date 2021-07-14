import {Response} from "express";
import Question from "../models/Question";
import {EnforceDocument, UpdateWriteOpResult} from "mongoose";
import {IQuestion} from "../interfaces/IQuestion";
import {Sender} from "../utils/Sender";

function getAllCategories(res: Response): void {
    Question.distinct("category")
        .exec()
        .then((results: String[]) => {
            Sender.getInstance().sendResult(res, 200, results);
        })
}

function getCategoryContents(cat: String, res: Response) {
    Question.find({"category": cat}, {"title": true, "_id": true})
        .exec()
        .then((results: EnforceDocument<IQuestion, {}>[])=> {
            if(results.length == 0){
                Sender.getInstance().sendError(res, Sender.ERROR_TYPE_NOT_FOUND);
            } else {
                Sender.getInstance().sendResult(res, 200, results);
            }
        });
}

function updateCategory(currCat: String, newName: String, res: Response) {
    Question.updateMany({"category": currCat}, {"category": newName})
        .exec()
        .then((results: UpdateWriteOpResult) => {
            if(results.nModified == 0){
                Sender.getInstance().sendError(res, Sender.ERROR_TYPE_NOT_FOUND);
            } else {
                Sender.getInstance().sendResult(res, 200, {"updates": results.nModified});
            }
        });
}

function deleteCategory(cat: String, res: Response) {
    Question.deleteMany( {"category": cat})
        .exec()
        .then(results => {
            if(results.deletedCount == 0){
                Sender.getInstance().sendError(res, Sender.ERROR_TYPE_NOT_FOUND);
            } else {
                Sender.getInstance().sendResult(res, 200, {"updates": results.deletedCount});
            }
        });
}

export {getAllCategories, getCategoryContents, updateCategory, deleteCategory}