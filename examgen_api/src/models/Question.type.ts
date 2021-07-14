interface AnswerType {
    text: string,
    isCorrect: boolean
}

interface QuestionType {
    category: string,
    title: string,
    optionalSubContent: string | undefined,
    answerTypology: string
    answers: AnswerType[] | undefined
}

export {AnswerType, QuestionType}