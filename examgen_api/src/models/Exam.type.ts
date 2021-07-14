export default interface ExamType {
    date: Date,
    title: string,
    questions: [
        {
            "category": string,
            "qta": string
        }
    ]
}