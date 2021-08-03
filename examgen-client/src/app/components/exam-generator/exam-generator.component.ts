import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatSelect} from "@angular/material/select";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {LoadingDialogComponent} from "../dialogs/loading-dialog/loading-dialog.component";
import {Question} from "../../models/question";
import {MatTableDataSource} from "@angular/material/table";
import {Title} from "@angular/platform-browser";
import {EndpointQuestionsService} from "../../services/endpoint/questions/endpoint-questions.service";
import {EndpointSharedService} from "../../services/endpoint/shared/endpoint-shared.service";
import {QuestionViewDialogComponent} from "../dialogs/question-view-dialog/question-view-dialog.component";
import {GenericDialogComponent} from "../dialogs/generic-dialog/generic-dialog.component";
import {EndpointExamsService} from "../../services/endpoint/exams/endpoint-exams.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CategoryRequest, ExamRequest} from "../../models/examRequest";

@Component({
  selector: 'app-exam-generator',
  templateUrl: './exam-generator.component.html',
  styleUrls: ['./exam-generator.component.scss']
})
export class ExamGeneratorComponent implements OnInit, AfterViewInit {
  @ViewChild('subjectSelector') subjectSelector!: MatSelect;

  private loadingSpinnerRef: MatDialogRef<LoadingDialogComponent> | null = null;
  examForm: FormGroup;
  public genericData: Question[] = [];
  public subjects: string[] = [];
  public subject_categories: string[] = []

  constructor(
    private pageTitle: Title,
    private questionendpoint: EndpointQuestionsService,
    private examendpoint: EndpointExamsService,
    private matdialog: MatDialog,
    private helper: EndpointSharedService,
    private fb: FormBuilder,
  ) {
    this.examForm = fb.group({
      title: new FormControl("", Validators.required)
    });
  }

  ngOnInit(): void {
    this.pageTitle.setTitle("ExamGen - Exam Generating");
  }

  ngAfterViewInit() {
    this.loadGenericData();
  }

  private loadGenericData(): void {
    this.loadingSpinnerRef = this.helper.openLoadingDialog();
    this.questionendpoint.getAllQuestions().subscribe(
      data => {
        this.loadingSpinnerRef!.close();
        this.genericData = (<Question[]>data.result);
        this.subjects = this.genericData.map(question => question.subject!)
          .filter((value, index, self) => self!.indexOf(value!) === index);
      },
      error => {
        this.loadingSpinnerRef!.close();
        this.helper.showServiceErrorDialog(error.status);
      }
    )
  }

  onSubjectChange(): void {
    this.subject_categories = this.genericData.filter(question => question.subject == this.subjectSelector.value)
      .map(question => question.category!)
      .filter((value, index, self) => self!.indexOf((value!)) === index);
    this.examForm = this.fb.group({
      title: new FormControl("", Validators.required)
    });
    this.subject_categories.forEach(cat => {
      this.examForm.addControl(`${cat}overall`, new FormControl("0", Validators.required));
      this.examForm.addControl(`${cat}multi`, new FormControl("-1", Validators.required));
    });
  }

  generateRequest(): ExamRequest | null {
    let catArr: CategoryRequest[] = [];
    this.subject_categories.forEach(cat => {
      let overall = this.examForm.get(`${cat}overall`)?.value!;
      let multi = this.examForm.get(`${cat}multi`)?.value!;
      if (overall > 0 && (multi <= overall)) {
        catArr.push({category: cat, overallQta: overall, multiQta: multi});
      }
    });
    if (catArr.length == 0) {
      return null;
    }
    let subject: string = this.subjectSelector.value;
    let title: string = this.examForm.get('title')?.value;
    return {subject: subject, title: title, questions: catArr}
  }

  generate(): void {
    let request: ExamRequest | null = this.generateRequest();
    if (request == null) {
      this.showInvalidRequestDialog();
      return;
    }
    this.loadingSpinnerRef = this.helper.openLoadingDialog();
    this.examendpoint.generateExam(request).subscribe(
      data => {
        let file = new Blob([data], {type: 'application/pdf'})
        let downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(file);
        downloadLink.setAttribute('download', 'exam.pdf');
        downloadLink.click();
        this.loadingSpinnerRef?.close();
        this.matdialog.open(GenericDialogComponent, {
          data: {
            "icon": "check",
            "title": "Successful Generation",
            "desc": `The selected exam has been successful generated and your browser downloaded it!`,
            "isYesNo": false
          },
        });
      },
      error => {
        this.loadingSpinnerRef?.close();
        if(error.status !== 404){
          this.helper.showServiceErrorDialog(error.status);
        }
        this.showInvalidRequestDialog();
      }
    );
  }

  private showInvalidRequestDialog(): void {
    this.matdialog.open(GenericDialogComponent, {
      data: {
        "icon": "error",
        "title": 'Invalid Generation Set',
        "desc": 'Your generation set does not contains any valid pair of questions!',
        "isYesNo": false
      }
    });
  }
}
