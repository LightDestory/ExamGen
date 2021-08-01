import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { Subject } from 'src/app/models/subject';
import { EndpointSharedService } from 'src/app/services/endpoint/shared/endpoint-shared.service';
import { EndpointSubjectsService } from 'src/app/services/endpoint/subjects/endpoint-subjects.service';
import { SpinnerLoadingComponent } from '../dialogs/spinner-loading/spinner-loading.component';

@Component({
  selector: 'app-subjects-list',
  templateUrl: './subjects-list.component.html',
  styleUrls: ['./subjects-list.component.scss']
})
export class SubjectsListComponent implements OnInit {

  subjects: Subject[];
  private loadingSpinnerRef: MatDialogRef<SpinnerLoadingComponent>|null = null;

  constructor(
    private pageTitle: Title,
    private endpoint: EndpointSubjectsService,
    private matdialog: MatDialog,
    private helper: EndpointSharedService) {
    this.subjects = [];
   }

  ngOnInit(): void {
    this.pageTitle.setTitle("ExamGen - Subjects Listing");
    this.loadingSpinnerRef = this.helper.openLoadingDialog();
    this.getData();
  }

  private getData(): void {
    this.endpoint.getAllSubjects().subscribe(
      data => {
        this.loadingSpinnerRef!.close();
        this.subjects = (<Subject[]>data.result);
      },
      error => {
        this.loadingSpinnerRef!.close();
        this.helper.showServiceErrorDialog(error.status);
      }
    )
  }

}
