import mongoose, {Schema} from "mongoose";
import IExam from "../interfaces/IExam";

const ExamSchema: Schema<IExam> = new Schema<IExam>({
    date: {
        type: Date,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    questions: [{_id: false, question: {type: Schema.Types.ObjectId, ref: 'Question' }}]
});
export default mongoose.model<IExam>("Exam", ExamSchema);