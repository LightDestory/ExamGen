import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { Subject } from 'src/app/models/subject';
import { EndpointSharedService } from 'src/app/services/endpoint/shared/endpoint-shared.service';
import { EndpointSubjectsService } from 'src/app/services/endpoint/subjects/endpoint-subjects.service';
import { SpinnerLoadingComponent } from '../dialogs/spinner-loading/spinner-loading.component';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { GenericDialogComponent } from '../dialogs/generic-dialog/generic-dialog.component';

@Component({
  selector: 'app-subjects-list',
  templateUrl: './subjects-list.component.html',
  styleUrls: ['./subjects-list.component.scss']
})

export class SubjectsListComponent implements OnInit, AfterViewInit  {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private loadingSpinnerRef: MatDialogRef<SpinnerLoadingComponent>|null = null;
  private subjects: Subject[] = [];
  displayedColumns: string[] = ['_id', 'count', 'rename', 'delete'];
  dataSource: MatTableDataSource<Subject> = new MatTableDataSource<Subject>();

  constructor(
    private pageTitle: Title,
    private endpoint: EndpointSubjectsService,
    private matdialog: MatDialog,
    private helper: EndpointSharedService) {}

  ngOnInit(): void {
    this.pageTitle.setTitle("ExamGen - Subjects Listing");
    this.loadingSpinnerRef = this.helper.openLoadingDialog();
  }

  ngAfterViewInit() {
    this.getData();
  }

  private getData(): void {
    this.endpoint.getAllSubjects().subscribe(
      data => {
        this.loadingSpinnerRef!.close();
        this.subjects = (<Subject[]>data.result);
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
    alert(subjectName);
  }

  deleteSubject(subjectName: string): void {
    this.matdialog.open(GenericDialogComponent, {
      data: {
        "icon": "warning",
        "title": "Deleting subject",
        "desc": `Do you really want to delete '${subjectName}'?`,
        "isYesNo": true
      },
      disableClose: true
    }).afterClosed().subscribe((result) => {
      if (result) {
        this.endpoint.
      }
    });
  }
}
