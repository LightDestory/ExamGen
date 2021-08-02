import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { GenericDialogComponent } from 'src/app/components/dialogs/generic-dialog/generic-dialog.component';
import { LoadingDialogComponent } from 'src/app/components/dialogs/loading-dialog/loading-dialog.component';
import { AuthStoreService } from '../../vault/auth-store.service';

@Injectable({
  providedIn: 'root'
})
export class EndpointSharedService {

  constructor(
    private authStore: AuthStoreService,
    private matdialog: MatDialog) { }

  getAPIRoute(routePath: string, unstored_endpoint?: string): string {
    let end_url = unstored_endpoint || this.authStore.endpoint
    return `${end_url}${routePath}`;
  }

  getGenericEndpointURL(url: string): string {
    return url[url.length - 1] == '/' ? url : `${url}/`;
  }

  showServiceErrorDialog(errorCode: number) {
    let title: string = "";
    let desc: string = "";
    switch (errorCode) {
      case 403:
        title = "Credentials Error";
        desc = "The entered key may be invalid or the entered endpoint is not the general one!";
        break;
      case 404:
        title = "Unknown Resource";
        desc = "The entered identifier doesn't match anything on the database!";
        break;
      case 409:
        title = "Rejected renaming";
        desc = "The new identifier is already used inside the database!";
        break;
      // error 0 => network error
      default:
        title = "Service Error";
        desc = "Unable to reach the specified endpoint!"
        break;
    }
    this.matdialog.open(GenericDialogComponent, {
      data: {
        "icon": "error",
        "title": title,
        "desc": desc,
        "isYesNo": false
      }});
  }

  openLoadingDialog(): MatDialogRef<LoadingDialogComponent> {
    return this.matdialog.open(LoadingDialogComponent)
  }
}
