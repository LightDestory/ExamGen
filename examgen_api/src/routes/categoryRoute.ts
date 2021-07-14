import express, {Request, Response, Router} from 'express';
import {getAllCategories, getCategoryContents, updateCategory, deleteCategory} from "../controllers/categoryController";
import {Sender} from "../utils/Sender";
import {EnforceDocument, UpdateWriteOpResult} from "mongoose";
import {IQuestion} from "../interfaces/IQuestion";

export const categoryRoute: Router = express.Router();

categoryRoute.get('/', (req: Request, res: Response) => {
    getAllCategories()
        .then((results: String[]) => {
            Sender.getInstance().sendResult(res, 200, results);
        });
});

categoryRoute.get('/:catName', (req: Request, res: Response) => {
    let cat: String = req.params.catName;
    getCategoryContents(cat, )
        .then((results: EnforceDocument<IQuestion, {}>[] )=> {
            if(results.length == 0){
                Sender.getInstance().sendError(res, Sender.ERROR_TYPE_NOT_FOUND);
            } else {
                Sender.getInstance().sendResult(res, 200, results);
            }
        });
});

categoryRoute.put("/:catName", (req: Request, res: Response) => {
    let currCat: String = req.params.catName;
    let newName: String | undefined = req.body.name;
    if(!newName){
        Sender.getInstance().sendError(res, Sender.ERROR_TYPE_PARAMETER);
        return;
    }
    updateCategory(currCat, newName!)
        .then((results: UpdateWriteOpResult) => {
            if(results.nModified == 0){
                Sender.getInstance().sendError(res, Sender.ERROR_TYPE_NOT_FOUND);
            } else {
                Sender.getInstance().sendResult(res, 200, {"updates": results.nModified});
            }
        });
});

categoryRoute.delete("/:catName", (req: Request, res: Response) => {
    let cat: String = req.params.catName;
    deleteCategory(cat)
        .then(results => {
            if(results.deletedCount == 0){
                Sender.getInstance().sendError(res, Sender.ERROR_TYPE_NOT_FOUND);
            } else {
                Sender.getInstance().sendResult(res, 200, {"deletions": results.deletedCount});
            }
        });
});