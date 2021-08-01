import {IQuestion, model as Questions} from "../models/Question";
import {EnforceDocument, UpdateWriteOpResult} from "mongoose";

function getAllSubjects(): Promise<any[]> {
    return Questions.aggregate([{"$group" : {_id:"$subject", count:{$sum:1}}}]).exec();
}

function getSubjectContents(subject: String): Promise<EnforceDocument<IQuestion, {}>[]> {
    return Questions.find({"subject": subject}, '_id title category answerTypology')
        .exec();
}

function updateSubject(currSubject: String, newSubject: String): Promise<UpdateWriteOpResult> {
    return Questions.updateMany({"subject": currSubject}, {"subject": newSubject})
        .exec();
}

function deleteSubject(subject: String): Promise<any> {
    return Questions.deleteMany( {"subject": subject})
        .exec();
}

export {getAllSubjects, getSubjectContents, updateSubject, deleteSubject}