import getStream from "get-stream";
import {IExam} from "../models/Exam";
import {IQuestion} from "../models/Question";
const PDFDocument = require('pdfkit')

export default class PDFgen {

    private yOffset: number = 50;
    private examPDF: PDFKit.PDFDocument;
    readonly LEFT_MARGIN: number = 50;
    readonly Y_LIMIT: number = 785;
    readonly OPEN_LINES: number = 4;

    constructor() {
        this.examPDF = new PDFDocument({bufferPages: true, size: "A4"});
    }

    private insertHeader(data: IExam): void {
        this.examPDF.fontSize(18).text(`Esame di ${data.subject}: ${data.title}`,this.LEFT_MARGIN, this.yOffset, {align: "left"});
        this.examPDF.fontSize(14).text(`Data: ${data.date.toISOString().slice(0, 10)}`, 0, this.yOffset, {
            align: "right"
        });
        this.examPDF.moveDown();
        this.examPDF.fontSize(16)
        this.yOffset+=40;
        this.examPDF.text("Matricola: _________________", this.LEFT_MARGIN, this.yOffset, {
            align: "left"
        });
        this.examPDF.text("Firma: _________________", this.LEFT_MARGIN, this.yOffset, {
            align: "right",
        });
    }

    private insertQuestion(n: number, question: IQuestion): void {
        if(this.yOffset+135 < this.Y_LIMIT){
            this.examPDF.moveDown();
            this.yOffset+=40;
        } else {
            this.examPDF.addPage()
            this.yOffset=50;
        }
        let nq: string = `[ ${n+1} ]`;
        let nq_len: number = this.examPDF.widthOfString(nq, {align: "left"})
        this.examPDF.text(nq, this.LEFT_MARGIN, this.yOffset, {align: "left"});
        this.examPDF.text(`${question.title}`, this.LEFT_MARGIN+5+nq_len, this.yOffset, {align: "left"});
        if(typeof question.optionalSubContent !== "undefined") {
            this.examPDF.moveDown();
            this.yOffset+=20;
            this.examPDF.text(`${question.optionalSubContent}`, this.LEFT_MARGIN+5+nq_len, this.yOffset, {align: "left"});
        }
        this.examPDF.moveDown();
        if(question.answerTypology == "text") {
            this.insertOpenQuestionSpace()
        } else {
            this.insertMultipleAns(question)
        }
    }

    private insertMultipleAns(question: IQuestion) {
        for(let i = 0; i< question.answers!.length; i++){
            this.yOffset+=20;
            let ans: any = question.answers![i];
            this.examPDF.rect(this.LEFT_MARGIN, this.yOffset, 10, 10)
                .stroke()
            this.examPDF.text(<string>ans.text, this.LEFT_MARGIN+20, this.yOffset)
            this.examPDF.moveDown();
        }
    }

    private insertOpenQuestionSpace(){
        this.yOffset+=20;
        for(let i = 0; i< this.OPEN_LINES; i++){
            this.yOffset+=20;
            this.examPDF.moveTo(this.LEFT_MARGIN, this.yOffset)
                .lineTo(540,this.yOffset)
                .stroke();
            this.examPDF.moveDown();
        }
    }

    private insertMetadata(data: IExam) {
        this.examPDF.info.Title = `Exam: ${data.subject}-${data.title}`;
        this.examPDF.info.CreationDate = data.date
    }

    async generateStream(data: IExam): Promise<Buffer> {
        this.insertMetadata(data);
        this.insertHeader(data);
        this.examPDF.fontSize(14);
        for( let i = 0; i<data.questions.length; i++){
            this.insertQuestion(i, data.questions[i])
        }
        this.examPDF.end();
        return getStream.buffer(this.examPDF)
    }
}