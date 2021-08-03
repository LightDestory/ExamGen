import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Title} from '@angular/platform-browser';
import {SubjectNCategory} from 'src/app/models/sub_cat_model';
import {EndpointSharedService} from 'src/app/services/endpoint/shared/endpoint-shared.service';
import {EndpointSubjectsService} from 'src/app/services/endpoint/subjects/endpoint-subjects.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {GenericDialogComponent} from '../dialogs/generic-dialog/generic-dialog.component';
import {deletionResult} from 'src/app/models/deletionResult';
import {LoadingDialogComponent} from '../dialogs/loading-dialog/loading-dialog.component';
import {TextInputDialogComponent} from '../dialogs/text-input-dialog/text-input-dialog.component';
import {updateResult} from 'src/app/models/updateResult';

@Component({
  selector: 'app-subjects-list',
  templateUrl: './subjects-list.component.html',
  styleUrls: []
})

export class SubjectsListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private loadingSpinnerRef: MatDialogRef<LoadingDialogComponent> | null = null;
  private subjects: SubjectNCategory[] = [];
  displayedColumns: string[] = ['_id', 'count', 'rename', 'delete'];
  dataSource: MatTableDataSource<SubjectNCategory> = new MatTableDataSource<SubjectNCategory>();

  constructor(
    private pageTitle: Title,
    private endpoint: EndpointSubjectsService,
    private matdialog: MatDialog,
    private helper: EndpointSharedService) {
  }

  ngOnInit(): void {
    this.pageTitle.setTitle("ExamGen - Subjects Listing");
  }

  ngAfterViewInit() {
    this.getData();
  }

  private getData(): void {
    this.loadingSpinnerRef = this.helper.openLoadingDialog();
    this.endpoint.getAllSubjects().subscribe(
      data => {
        this.loadingSpinnerRef!.close();
        this.subjects = (<SubjectNCategory[]>data.result);
        this.dataSource.data.push(...this.subjects);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => {
        this.loadingSpinnerRef!.close();
        this.helper.showServiceErrorDialog(error.status);
      }
    )
  }

  renameSubject(subjectName: string): void {
    this.matdialog.open(TextInputDialogComponent, {
      data: {
        "icon": "warning",
        "name": subjectName
      }
    }).afterClosed().subscribe(result => {
      if (result) {
        this.loadingSpinnerRef = this.helper.openLoadingDialog();
        this.endpoint.renameSubject(subjectName, result).subscribe(
          data => {
            this.loadingSpinnerRef?.close();
            this.matdialog.open(GenericDialogComponent, {
              data: {
                "icon": "check",
                "title": "Subject renamed",
                "desc": `${(<updateResult>data.result).updates} questions has been updated!`,
                "isYesNo": false
              }
            }).afterClosed().subscribe(() => {
              this.dataSource.data.forEach(sub => {
                if (sub._id == subjectName) {
                  sub._id = result;
                }
              });
            });
          },
          error => {
            this.loadingSpinnerRef?.close();
            this.helper.showServiceErrorDialog(error.status);
          }
        )
      }
    })
  }

  deleteSubject(subjectName: string): void {
    this.matdialog.open(GenericDialogComponent, {
      data: {
        "icon": "warning",
        "title": "Deleting subject",
        "desc": `Do you really want to delete '${subjectName}'?`,
        "isYesNo": true
      }
    }).afterClosed().subscribe((result) => {
      if (result) {
        this.loadingSpinnerRef = this.helper.openLoadingDialog();
        this.endpoint.deleteSubject(subjectName).subscribe(
          data => {
            this.loadingSpinnerRef?.close();
            this.matdialog.open(GenericDialogComponent, {
              data: {
                "icon": "check",
                "title": "Subject deleted",
                "desc": `${(<deletionResult>data.result).deletions} questions has been deleted!`,
                "isYesNo": false
              }
            }).afterClosed().subscribe(() => {
              this.dataSource.data = this.dataSource.data.filter(sub => sub._id !== subjectName);
              this.dataSource._updateChangeSubscription();
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
