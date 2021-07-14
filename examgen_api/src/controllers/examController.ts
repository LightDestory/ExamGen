import {EnforceDocument, set} from "mongoose";
import {Sender} from "../utils/Sender";
import Exam from "../models/Exam";
import IExam from "../interfaces/IExam";
import ExamType from "../models/Exam.type";
import Question from "../models/Question";

function getAllPastExams(): Promise<EnforceDocument<IExam, {}>[]> {
    return Exam.find({}, '_id title date')
        .sort({"date": "desc"})
        .exec();
}

function getExamContent(id: String): Promise<IExam | null> {
    return Exam.findById(id)
        .populate("questions.question")
        .exec();
}

async function generateExam(data: ExamType): Promise<IExam> {
    let sets = data.questions;
    for (let i = 0; i < sets.length; i++) {
        let cat: String = sets[i].category;
        let q: Number = parseInt(sets[i].qta);
        let c = await Question.countDocuments({"category": cat});
        if (q > c) {
            throw 400
        }
    }
    let questions: any[] = []
    for (let i = 0; i < sets.length; i++) {
        let cat: String = sets[i].category;
        let q: Number = parseInt(sets[i].qta);
        let set = await Question.aggregate([{$match: {"category": cat}}, {$sample: {size: q}}, {
            $project: {
                _id: 0,
                "question": "$_id"
            }
        }])
        questions.push(...set)
    }
    return (await new Exam({
        date: data.date,
        title: data.title,
        questions: questions
    }).save())
        .populate("questions.question")
        .execPopulate()
}

function deleteExam(id: String): Promise<IExam | null> {
    return Exam.findByIdAndDelete(id)
        .exec();
}

function deleteAllExams(): Promise<any> {
    return Exam.deleteMany({})
        .exec()
}

export {getAllPastExams, getExamContent, generateExam, deleteExam, deleteAllExams}