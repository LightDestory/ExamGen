import mongoose, {Schema} from "mongoose";
import {IQuestion} from "../interfaces/IQuestion";

const QuestionSchema: Schema = new Schema({
    category: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    optionalSubContent: {
        type: String
    },
    answerTypology: {
        type: String,
        enum: ["text", "multi"],
        required: true
    },
    answers: [
        {
            text: String,
            isCorrect: Boolean
        }
    ]
});
export default mongoose.model<IQuestion>("Question", QuestionSchema);