import mongoose, {Schema} from "mongoose";
import {IQuestion} from "../interfaces/IQuestion";

const QuestionSchema: Schema<IQuestion> = new Schema<IQuestion>({
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
            _id: false,
            text: String,
            isCorrect: Boolean
        }
    ]
});
export default mongoose.model<IQuestion>("Question", QuestionSchema);