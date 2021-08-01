import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { Subject } from 'src/app/models/subject';
import { EndpointSharedService } from 'src/app/services/endpoint/shared/endpoint-shared.service';
import { EndpointSubjectsService } from 'src/app/services/endpoint/subjects/endpoint-subjects.service';
import { SpinnerLoadingComponent } from '../dialogs/spinner-loading/spinner-loading.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-subjects-list',
  templateUrl: './subjects-list.component.html',
  styleUrls: ['./subjects-list.component.scss']
})

export class SubjectsListComponent implements OnInit, AfterViewInit  {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
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
      },
      error => {
        this.loadingSpinnerRef!.close();
        this.helper.showServiceErrorDialog(error.status);
      }
    )
  }

  public renameSubject(subjectName: string): void {
    alert(subjectName);
  }

}
