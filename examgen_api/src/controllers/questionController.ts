import Question from "../models/Question";
import {EnforceDocument} from "mongoose";
import {IQuestion} from "../interfaces/IQuestion";
import {QuestionType} from "../models/Question.type";

function getAllQuestions(): Promise<EnforceDocument<IQuestion, {}>[]> {
    return Question.find({}, '_id title category answerTypology')
        .exec();
}

function getQuestionContent(id: String): Promise<IQuestion | null> {
    return Question.findById(id)
        .exec();
}

function createQuestion(question: QuestionType) : Promise<IQuestion> {
    let q = new Question(question).save();
    return q;
}

function updateQuestion(id: String, data: QuestionType): Promise<IQuestion|null> {
    return Question.findByIdAndUpdate(id, data)
        .exec();
}

function deleteQuestion(id: String): Promise<IQuestion | null> {
    return Question.findByIdAndDelete(id)
        .exec();
}

function deleteAllQuestions(): Promise<any> {
    return Question.deleteMany({})
        .exec()
}

export {getAllQuestions, getQuestionContent, createQuestion, updateQuestion, deleteQuestion, deleteAllQuestions}