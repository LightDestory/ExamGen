import {IQuestion} from "./IQuestion";
import {Document} from "mongoose";

export default interface IExam extends Document {
    date: Date,
    title: String,
    questions: [
        {
            question: IQuestion
        }
    ]
}