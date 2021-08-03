export interface Answer {
  text: string
}

export interface Question {
  _id?: string,
  subject?: string,
  category?: string,
  title: string,
  optionalSubContent?: string,
  answerTypology: string,
  answers?: Answer[]
}
