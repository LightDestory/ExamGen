import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Title} from '@angular/platform-browser';
import {LoadingDialogComponent} from "../dialogs/loading-dialog/loading-dialog.component";
import {EndpointSharedService} from "../../services/endpoint/shared/endpoint-shared.service";
import {EndpointQuestionsService} from "../../services/endpoint/questions/endpoint-questions.service";
import {Answer, Question} from "../../models/question";
import {Observable} from "rxjs";
import {endpointResponse} from "../../models/endpointResponse";
import {GenericDialogComponent} from "../dialogs/generic-dialog/generic-dialog.component";
import {deletionResult} from "../../models/deletionResult";

@Component({
  selector: 'app-questions-editor',
  templateUrl: './questions-editor.component.html',
  styleUrls: ['./questions-editor.component.scss']
})
export class QuestionsEditorComponent implements OnInit {

  questionID: string | null;
  questionForm: FormGroup;
  private loadingSpinnerRef: MatDialogRef<LoadingDialogComponent> | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private pageTitle: Title,
    private helper: EndpointSharedService,
    private questionendpoint: EndpointQuestionsService,
    private matdialog: MatDialog
  ) {
    this.questionID = route.snapshot.paramMap.get('id');
    this.questionForm = fb.group({
      subject: new FormControl("", Validators.required),
      category: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
      subtitle: new FormControl(''),
      type: new FormControl('', Validators.required),
      answer1:new FormControl(''),
      answer2:new FormControl(''),
      answer3:new FormControl(''),
      answer4:new FormControl('')
    });
    if(this.questionID !== null){
      this.loadQuestion();
    }
  }

  ngOnInit(): void {
    this.pageTitle.setTitle('ExamGen - Editor');
  }

  private generateQuestion(): Question {
    let question: Question = {answerTypology: "", title: ""}
    question.subject = this.questionForm.get('subject')!.value;
    question.category = this.questionForm.get('category')!.value;
    question.title = this.questionForm.get('title')!.value;
    question.optionalSubContent = this.questionForm.get('subtitle')?.value;
    question.answerTypology = this.questionForm.get('type')!.value;
    if(question.answerTypology == "multi") {
      let answers: Answer[] = [];
      for (let i = 1; i<= 4; i++){
        answers[i-1] = { "text": this.questionForm.get(`answer${i}`)?.value}
      }
      question.answers = answers;
    }
    return question;
  }

  execute() {
    let question: Question = this.generateQuestion();
    let endpointAction: Observable<endpointResponse> = this.questionID !== null ? this.questionendpoint.updateQuestions(this.questionID, question) : this.questionendpoint.createQuestions(question);
    this.loadingSpinnerRef = this.helper.openLoadingDialog();
    endpointAction.subscribe(
      data => {
        this.loadingSpinnerRef!.close();
        this.matdialog.open(GenericDialogComponent, {
          data: {
            "icon": "check",
            "title": `Question ${this.questionID !== null ? 'updated' : 'created'}`,
            "desc": `The has been ${this.questionID !== null ? 'updated' : 'created'}!`,
            "isYesNo": false
          }}).afterClosed().subscribe(() => this.router.navigate(['dashboard']));
      },
      error => {
        this.loadingSpinnerRef!.close();
        this.helper.showServiceErrorDialog(error.status);
      }
    );
  }

  refreshValidators() {
    let validator: ValidatorFn|null = this.questionForm.get('type')?.value == "multi" ? Validators.required : null;
    for (let i = 1; i<= 4; i++){
      this.questionForm.get(`answer${i}`)?.setValidators(validator);
      this.questionForm.get(`answer${i}`)?.updateValueAndValidity();
    }
  }

  private loadQuestion() {
    this.loadingSpinnerRef = this.helper.openLoadingDialog();
    this.questionendpoint.getQuestionDetails(this.questionID!).subscribe(
      data => {
        this.loadingSpinnerRef!.close();
        let questionDetails: Question = <Question>data.result;
        this.questionForm.get('subject')?.setValue(questionDetails.subject);
        this.questionForm.get('category')?.setValue(questionDetails.category);
        this.questionForm.get('title')?.setValue(questionDetails.title);
        this.questionForm.get('subtitle')?.setValue(questionDetails.optionalSubContent);
        this.questionForm.get('type')?.setValue(questionDetails.answerTypology);
        if(questionDetails.answerTypology == "multi"){
          for (let i = 1; i<= 4; i++){
            this.questionForm.get(`answer${i}`)?.setValue(questionDetails.answers![i-1].text);
          }
          this.refreshValidators();
        }
      },
      error => {
        this.loadingSpinnerRef!.close();
        this.helper.showServiceErrorDialog(error.status).afterClosed().subscribe(() => {
          this.router.navigateByUrl("/dashboard");
        })
      }
    );
  }

}
