import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { MatDialog } from '@angular/material/dialog';
import { GenericDialogComponent } from '../dialogs/generic-dialog/generic-dialog.component';
import { AuthStoreService } from 'src/app/services/vault/auth-store.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  buttonsPanelToggle: boolean = true;


  constructor(
    private observer: BreakpointObserver,
    private matdialog: MatDialog,
    private authStore: AuthStoreService) {}

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
  }

  logoutOnClick() {
    this.matdialog.open(GenericDialogComponent, {
      data: {
        "icon": "warning",
        "title": "Logging out",
        "desc": "Do you really want to log out from this service?",
        "isYesNo": true
      },
      disableClose: true
    }).afterClosed().subscribe((result) => {
      if(result){
        this.authStore.performLogOut();
      }
    });
  }

}
