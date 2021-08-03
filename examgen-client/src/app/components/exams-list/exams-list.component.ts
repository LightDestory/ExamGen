import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatSelect} from "@angular/material/select";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {LoadingDialogComponent} from "../dialogs/loading-dialog/loading-dialog.component";
import {MatTableDataSource} from "@angular/material/table";
import {Title} from "@angular/platform-browser";
import {EndpointSharedService} from "../../services/endpoint/shared/endpoint-shared.service";
import {GenericDialogComponent} from "../dialogs/generic-dialog/generic-dialog.component";
import {EndpointExamsService} from "../../services/endpoint/exams/endpoint-exams.service";
import {ExamOverview} from "../../models/examOverview";

@Component({
  selector: 'app-exams-list',
  templateUrl: './exams-list.component.html',
  styleUrls: []
})
export class ExamsListComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatSelect) subjectSelector!: MatSelect;

  private loadingSpinnerRef: MatDialogRef<LoadingDialogComponent> | null = null;
  private genericData: ExamOverview[] = []
  public subjects: string[] = [];
  displayedColumns: string[] = ['title', 'date', 'download', 'delete'];
  dataSource: MatTableDataSource<ExamOverview> = new MatTableDataSource<ExamOverview>();

  constructor(
    private pageTitle: Title,
    private examendpoint: EndpointExamsService,
    private matdialog: MatDialog,
    private helper: EndpointSharedService,
  ) {
  }

  ngOnInit(): void {
    this.pageTitle.setTitle("ExamGen - Past Exams Listing");
  }

  ngAfterViewInit() {
    this.loadSubjects();
  }

  private loadSubjects(): void {
    this.loadingSpinnerRef = this.helper.openLoadingDialog();
    this.examendpoint.getAllPastExams().subscribe(
      data => {
        this.loadingSpinnerRef!.close();
        this.genericData = <ExamOverview[]>data.result;
        this.subjects = this.genericData.map(e => e.subject)
          .filter((value, index, self) => self!.indexOf(value) === index);
      },
      error => {
        this.loadingSpinnerRef!.close();
        this.helper.showServiceErrorDialog(error.status);
      }
    )
  }

  onSubjectChange(): void {
    Promise.resolve(null).then(() => {
      this.dataSource.data = this.genericData.filter(exam => exam.subject == this.subjectSelector.value);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  downloadExam(id: string): void {
    this.loadingSpinnerRef = this.helper.openLoadingDialog();
    this.examendpoint.getExamFile(id).subscribe(
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
          }
        });
      },
      error => {
        this.loadingSpinnerRef?.close();
        this.helper.showServiceErrorDialog(error.status);
      }
    )
  }

  deleteExam(id: string): void {
    this.matdialog.open(GenericDialogComponent, {
      data: {
        "icon": "warning",
        "title": "Deleting exam's record",
        "desc": `Do you really want to delete the selected record?`,
        "isYesNo": true
      }
    }).afterClosed().subscribe((result) => {
      if (result) {
        this.loadingSpinnerRef = this.helper.openLoadingDialog();
        this.examendpoint.deletePastExam(id).subscribe(
          data => {
            this.loadingSpinnerRef?.close();
            this.matdialog.open(GenericDialogComponent, {
              data: {
                "icon": "check",
                "title": "Exam's record deleted",
                "desc": `The exam's record has been deleted!`,
                "isYesNo": false
              }
            }).afterClosed().subscribe(() => {
              let tmp = this.dataSource.data.filter(exam => exam._id !== id);
              if (tmp.length > 0) {
                this.dataSource.data = tmp;
                this.dataSource._updateChangeSubscription();
              } else {
                this.dataSource.data = [];
                this.loadSubjects();
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
}
