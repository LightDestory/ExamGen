import mongoose, {Model, Schema} from "mongoose";

interface IQuestion {
    subject?: String,
    category: String,
    title: String,
    optionalSubContent?: String,
    answerTypology: String
    answers?: String[]
}

const QuestionSchema: Schema<IQuestion> = new Schema<IQuestion>({
    subject: {
        type: String,
        required: true
    },
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
            text: {
                type: String,
                required: true
            }
        }
    ]
});

const model: Model<IQuestion> = mongoose.model<IQuestion>("Question", QuestionSchema);

export {QuestionSchema, IQuestion, model}