export interface CategoryRequest {
  category: string,
  overallQta: string | number;
  multiQta: string | number;
}

export interface ExamRequest {
  subject: string,
  title: string,
  questions: CategoryRequest[]
}
