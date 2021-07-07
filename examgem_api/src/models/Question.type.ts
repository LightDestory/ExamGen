interface AnswerType {
    text: String,
    isCorrect: Boolean
}

interface QuestionType {
    category: String,
    title: String,
    optionalSubContent: String | undefined,
    answerTypology: String
    answers: AnswerType[] | undefined
}

export {AnswerType, QuestionType}