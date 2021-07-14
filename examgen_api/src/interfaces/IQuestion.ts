interface IAnswer {
    text: String,
    isCorrect: Boolean
}

interface IQuestion {
    category: String,
    title: String,
    optionalSubContent: String,
    answerTypology: String
    answers: IAnswer[]
}

export {IAnswer, IQuestion}