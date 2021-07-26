import {EnforceDocument, Schema, set} from "mongoose";
import {ExamRequest, IExam, model as Exams} from "../models/Exam";
import {IQuestion, model as Questions} from "../models/Question"

function getAllPastExams(filter: any, projection: String): Promise<EnforceDocument<IExam, {}>[]> {
    return Exams.find(filter, projection)
        .sort({"date": "desc"})
        .exec();
}

function getExamContent(id: String): Promise<IExam | null> {
    return Exams.findById(id)
        .exec();
}

async function generateExam(data: ExamRequest): Promise<IExam> {
    let isCorrect: Boolean = await checkCollectionDataset(data);
    if(!isCorrect){
        throw 400;
    }
    let questions = await generateQuestions(data);
    let today: String = new Date().toISOString().slice(0, 10)
    let tmp = await new Exams({
        subject: data.subject,
        date: today,
        title: data.title,
        questions: []
    })
    tmp.questions.push(...questions)
    return tmp.save()
}

function deleteExam(id: String): Promise<IExam | null> {
    return Exams.findByIdAndDelete(id)
        .exec();
}

function deleteAllExams(): Promise<any> {
    return Exams.deleteMany({})
        .exec()
}

async function checkCollectionDataset(data: ExamRequest): Promise<Boolean> {
    let sets = data.questions;
    for (let i = 0; i < sets.length; i++) {
        let cat: String = sets[i].category;
        let overallQta: number = parseInt(<string>sets[i].overallQta);
        let multiQta: number = parseInt(<string>sets[i].multiQta);
        if(multiQta == -1){
            let overall = await Questions.countDocuments({"subject": data.subject, "category": cat});
            if(overallQta > overall){
                return false;
            }
        } else {
            let overallText = await Questions.countDocuments({"subject": data.subject, "category": cat, "answerTypology":"text"});
            overallQta-=multiQta;
            let multi = await Questions.countDocuments({"subject": data.subject, "category": cat, "answerTypology":"multi"});
            if (overallQta > overallText || multiQta > multi) {
                return false;
            }
        }
    }
    return true;
}

async function generateQuestions(data: ExamRequest): Promise<any[]> {
    let sets = data.questions;
    let questions: any[] = []
    for (let i = 0; i < sets.length; i++) {
        let cat: String = sets[i].category;
        let multiQta: number = parseInt(<string>sets[i].multiQta);
        let overallQta: number = parseInt(<string>sets[i].overallQta);
        let fetch = []
        let multiFetch = []
        if(multiQta == -1) {
            fetch = await Questions.aggregate([{
                $match: {
                    "subject": data.subject,
                    "category": cat
                }
            }, {$sample: {size: overallQta}}, {$project: {__v: 0}}]);
        } else {
            overallQta-= multiQta;
            if(overallQta > 0) {
                fetch = await Questions.aggregate([{
                    $match: {
                        "subject": data.subject,
                        "category": cat,
                        "answerTypology": "text"
                    }
                }, {$sample: {size: overallQta}}, {$project: {__v: 0}}]);
            }
            if(multiQta > 0) {
                multiFetch = await Questions.aggregate([{
                    $match: {
                        "subject": data.subject,
                        "category": cat,
                        "answerTypology": "multi"
                    }
                }, {$sample: {size: multiQta}}, {$project: {__v: 0}}]);
            }
        }
        questions.push(...fetch)
        questions.push(...multiFetch)
        for (let i = questions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [questions[i], questions[j]] = [questions[j], questions[i]];
        }
    }
    return questions;
}

export {getAllPastExams, getExamContent, generateExam, deleteExam, deleteAllExams}