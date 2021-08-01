import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { GenericDialogComponent } from '../dialogs/generic-dialog/generic-dialog.component';
import { AuthStoreService } from 'src/app/services/vault/auth-store.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { EndpointSubjectsService } from 'src/app/services/endpoint/subjects/endpoint-subjects.service';
import { EndpointSharedService } from 'src/app/services/endpoint/shared/endpoint-shared.service';
import { deletionResult } from 'src/app/models/deletionResult';
import { LoadingDialogComponent } from '../dialogs/loading-dialog/loading-dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  loadingSpinnerRef: MatDialogRef<LoadingDialogComponent> | null = null;

  constructor(
    private observer: BreakpointObserver,
    private matdialog: MatDialog,
    private pageTitle: Title,
    private authStore: AuthStoreService,
    private router: Router,
    private endpointSubject: EndpointSubjectsService,
    private helper: EndpointSharedService) { }

  ngOnInit(): void {
    this.pageTitle.setTitle("ExamGen - Dashboard");
  }

  ngAfterViewInit() {
    Promise.resolve(null).then(() => {
      this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });
    });
  }

  deleteAllSubjectsOnClick(): void {
    this.matdialog.open(GenericDialogComponent, {
      data: {
        "icon": "warning",
        "title": "Deleting ALL subjects",
        "desc": "Do you really want to delete all the subjects?",
        "isYesNo": true
      },
      disableClose: true
    }).afterClosed().subscribe((result) => {
      if (result) {
        this.loadingSpinnerRef = this.helper.openLoadingDialog();
        this.endpointSubject.deleteAllSubjects().subscribe(
          data => {
            this.loadingSpinnerRef!.close();
            this.matdialog.open(GenericDialogComponent, {
              disableClose: true,
              data: {
                "icon": "check",
                "title": "Subjects deleted",
                "desc": `${(<deletionResult>data.result).deletions} questions has been deleted!`,
                "isYesNo": false
              }
            }).afterClosed().subscribe(() => this.router.navigate(['dashboard']));
          },
          error => {
            this.loadingSpinnerRef!.close();
            this.helper.showServiceErrorDialog(error.status);
          }
        )
      }
    });
  }

  logoutOnClick(): void {
    this.matdialog.open(GenericDialogComponent, {
      data: {
        "icon": "warning",
        "title": "Logging out",
        "desc": "Do you really want to log out from this service?",
        "isYesNo": true
      },
      disableClose: true
    }).afterClosed().subscribe((result) => {
      if (result) {
        this.authStore.performLogOut();
      }
    });
  }

  isExpanded(menuName: string): boolean {
    return this.router.url.indexOf(menuName) !== -1;
  }
}
