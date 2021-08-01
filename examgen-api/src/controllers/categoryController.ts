import {IQuestion, model as Questions} from "../models/Question";
import {EnforceDocument, UpdateWriteOpResult} from "mongoose";

function getAllCategories(subject: String): Promise<any[]> {
    return Questions.aggregate([
        { $match: {"subject": subject}},
        {"$group" : {_id:"$category", count:{$sum:1}}}])
        .exec();

}

function getCategoryContents(subject: String, category: String): Promise<EnforceDocument<IQuestion, {}>[]> {
    return Questions.find({"subject": subject, "category": category}, '_id title answerTypology')
        .exec();
}

function updateCategory(subject: String, currCategory: String, newCategory: String): Promise<UpdateWriteOpResult> {
    return Questions.updateMany({"subject": subject, "category": currCategory}, {"category": newCategory})
        .exec();
}

function deleteCategory(subject: String, category: String): Promise<any> {
    return Questions.deleteMany( {"subject": subject, "category": category})
        .exec();
}

export {getAllCategories, getCategoryContents, updateCategory, deleteCategory}