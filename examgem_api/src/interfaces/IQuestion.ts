import {Document} from "mongoose";

interface IAnswer extends Document {
    text: String,
    isCorrect: Boolean
}

interface IQuestion extends Document {
    category: String,
    title: String,
    optionalSubContent: String,
    answerTypology: String
    answers: IAnswer[]
}

export {IAnswer, IQuestion}