import express, {Request, Response, Router} from 'express';
import {getAllCategories, getCategoryContents, updateCategory, deleteCategory} from "../controllers/categoryController";
import {Sender} from "../utils/Sender";

export const categoryRoute: Router = express.Router();

categoryRoute.get('/', (req: Request, res: Response) => {
    getAllCategories(res);
});

categoryRoute.get('/:catName', (req: Request, res: Response) => {
    let cat: String = req.params.catName;
    getCategoryContents(cat, res);
});

categoryRoute.put("/:catName", (req: Request, res: Response) => {
    let currCat: String = req.params.catName;
    let newName: String | undefined = req.body.name;
    if(!newName){
        Sender.getInstance().sendError(res, Sender.ERROR_TYPE_PARAMETER);
        return;
    }
    updateCategory(currCat, newName!, res);
});

categoryRoute.delete("/:catName", (req: Request, res: Response) => {
    let cat: String = req.params.catName;
    deleteCategory(cat, res);
});