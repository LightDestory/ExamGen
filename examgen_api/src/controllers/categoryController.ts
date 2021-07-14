import Question from "../models/Question";
import {EnforceDocument, UpdateWriteOpResult} from "mongoose";
import {IQuestion} from "../interfaces/IQuestion";

function getAllCategories(): Promise<any[]> {
    return Question.distinct("category").exec();
}

function getCategoryContents(cat: String): Promise<EnforceDocument<IQuestion, {}>[]> {
    return Question.find({"category": cat}, {"title": true, "_id": true})
        .exec();
}

function updateCategory(currCat: String, newName: String): Promise<UpdateWriteOpResult> {
    return Question.updateMany({"category": currCat}, {"category": newName})
        .exec();
}

function deleteCategory(cat: String): Promise<any> {
    return Question.deleteMany( {"category": cat})
        .exec();
}

export {getAllCategories, getCategoryContents, updateCategory, deleteCategory}