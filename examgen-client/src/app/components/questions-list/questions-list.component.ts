import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Title} from '@angular/platform-browser';
import {EndpointSharedService} from 'src/app/services/endpoint/shared/endpoint-shared.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {GenericDialogComponent} from '../dialogs/generic-dialog/generic-dialog.component';
import {LoadingDialogComponent} from '../dialogs/loading-dialog/loading-dialog.component';
import {MatSelect} from "@angular/material/select";
import {EndpointQuestionsService} from "../../services/endpoint/questions/endpoint-questions.service";
import {Question} from "../../models/question";
import {QuestionViewDialogComponent} from "../dialogs/question-view-dialog/question-view-dialog.component";
import {SubjectDescriptor} from "../../models/SubjectDescriptor";

@Component({
  selector: 'app-questions-list',
  templateUrl: './questions-list.component.html',
  styleUrls: ['./questions-list.component.scss']
})
export class QuestionsListComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('subjectSelector') subjectSelector!: MatSelect;
  @ViewChild('categorySelector') categorySelector!: MatSelect;

  private loadingSpinnerRef: MatDialogRef<LoadingDialogComponent> | null = null;
  public genericData: Question[] = [];
  public descriptors: SubjectDescriptor[] = [];
  displayedColumns: string[] = ['title', 'answerType', 'view', 'edit', 'delete'];
  dataSource: MatTableDataSource<Question> = new MatTableDataSource<Question>();

  constructor(
    private pageTitle: Title,
    private questionendpoint: EndpointQuestionsService,
    private matdialog: MatDialog,
    private helper: EndpointSharedService,
  ) {
  }

  ngOnInit(): void {
    this.pageTitle.setTitle("ExamGen - Questions Listing");
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
        let subjects: string[] = this.genericData.map(question => question.subject!)
          .filter((value, index, self) => self!.indexOf(value!) === index);
        subjects.forEach((sub) => {
          let tmp: SubjectDescriptor = {subject: sub, categories: []}
          tmp.categories = this.genericData.filter(question => question.subject == sub)
            .map(question => question.category!)
            .filter((value, index, self) => self!.indexOf((value!)) === index);
          this.descriptors.push(tmp);
        });
      },
      error => {
        this.loadingSpinnerRef!.close();
        this.helper.showServiceErrorDialog(error.status);
      }
    )
  }

  onSubjectChange(): void {
    this.categorySelector.value = "All";
    this.onCategoryChange();
  }

  onCategoryChange(): void {
    let questions: Question[] = this.genericData.filter(question => question.subject == this.subjectSelector.value);
    let cat: string = this.categorySelector.value!;
    if (cat !== "All") {
      questions = questions.filter(question => question.category == cat);
    }
    this.dataSource.data = questions;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  viewQuestion(id: string): void {
    this.loadingSpinnerRef = this.helper.openLoadingDialog();
    this.questionendpoint.getQuestionDetails(id).subscribe(
      data => {
        this.loadingSpinnerRef!.close();
        this.matdialog.open(QuestionViewDialogComponent, {
          data: {
            icon: "check",
            payload: <Question>data.result
          }
        });
      },
      error => {
        this.loadingSpinnerRef!.close();
        this.helper.showServiceErrorDialog(error.status);
      }
    );
  }

  getDescriptorBySubject(sub: string): SubjectDescriptor{
    return (this.descriptors.filter(desc => desc.subject == sub))[0];
  }

  deleteQuestion(title: string, id: string): void {
    this.matdialog.open(GenericDialogComponent, {
      data: {
        "icon": "warning",
        "title": "Deleting question",
        "desc": `Do you really want to delete '${title}'?`,
        "isYesNo": true
      }
    }).afterClosed().subscribe((result) => {
      if (result) {
        this.loadingSpinnerRef = this.helper.openLoadingDialog();
        this.questionendpoint.deleteQuestion(id).subscribe(
          data => {
            this.loadingSpinnerRef?.close();
            this.matdialog.open(GenericDialogComponent, {
              data: {
                "icon": "check",
                "title": "Question deleted",
                "desc": `The question has been deleted!`,
                "isYesNo": false
              }
            }).afterClosed().subscribe(() => {
              let deleted: Question = <Question>data.result;
              this.genericData = this.genericData.filter(question => question._id !== deleted._id);
              if (this.genericData.length == 0) {
                this.resetView();
              } else {
                let sub_check = this.genericData.filter(question => question.subject! === deleted.subject!);
                if (sub_check.length === 0) {
                  this.descriptors = this.descriptors.filter(desc => desc.subject != deleted.subject!);
                  this.subjectSelector.value = this.descriptors[0].subject;
                  this.onSubjectChange();
                } else {
                  let cat_check = sub_check.filter(question => question.category! === deleted.category!);
                  if (cat_check.length === 0) {
                    let selector = this.getDescriptorBySubject(deleted.subject!);
                    selector.categories = selector.categories.filter(cat => cat != deleted.category!);
                    this.categorySelector.value = "All";
                    this.onCategoryChange();
                  } else {
                    this.dataSource.data = this.dataSource.data.filter(question => question._id !== deleted._id);
                  }
                }
              }
            });
          },
          error => {
            this.loadingSpinnerRef?.close();
            this.helper.showServiceErrorDialog(error.status);
          });
      }
    });
  }

  private resetView(): void {
    this.descriptors = [];
    this.dataSource.data = [];
    this.categorySelector.value = undefined;
    this.subjectSelector.value = undefined;
  }

}
