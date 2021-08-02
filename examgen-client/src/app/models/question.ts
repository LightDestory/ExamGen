export interface Answer {
  text: string
}

export enum AnswerType {
  multiAnswer = "multi",
  openAnswer = "text"

}

export interface Question {
  _id: string,
  subject?: string,
  category?: string,
  title: string,
  optionalSubContent?: string,
  answerTypology:AnswerType,
  answers?: Answer[],
  __v: number
}
