import mongoose, {Model, Schema} from "mongoose";
import {IQuestion} from "./Question";

interface IExam {
    subject: String,
    date: Date,
    title: String,
    questions: IQuestion[]
}

interface ExamRequest {
    subject: String,
    title: String,
    questions: [
        {
            category: String,
            overallQta: String
            multiQta: String
        }
    ]
}

const ExamSchema: Schema<IExam> = new Schema<IExam>({
    subject: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    questions: [{_id: false, question: {type: Schema.Types.ObjectId, ref: 'Question'}}]

});
const model: Model<IExam> = mongoose.model<IExam>("Exam", ExamSchema);
export {IExam, ExamRequest, model}