import {EnforceDocument} from "mongoose";
import {IQuestion, model as Questions} from "../models/Question";

function getAllQuestions(): Promise<EnforceDocument<IQuestion, {}>[]> {
    return Questions.find({}, '_id subject title category answerTypology')
        .exec();
}

function getQuestionContent(id: String): Promise<IQuestion | null> {
    return Questions.findById(id)
        .exec();
}

function createQuestion(question: IQuestion) : Promise<IQuestion> {
    let q = new Questions(question).save();
    return q;
}

function updateQuestion(id: String, data: IQuestion): Promise<IQuestion|null> {
    return Questions.findByIdAndUpdate(id, data)
        .exec();
}

function deleteQuestion(id: String): Promise<IQuestion | null> {
    return Questions.findByIdAndDelete(id)
        .exec();
}

function deleteAllQuestions(): Promise<any> {
    return Questions.deleteMany({})
        .exec()
}

export {getAllQuestions, getQuestionContent, createQuestion, updateQuestion, deleteQuestion, deleteAllQuestions}