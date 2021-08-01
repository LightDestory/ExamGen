import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { GenericDialogComponent } from 'src/app/components/dialogs/generic-dialog/generic-dialog.component';
import { SpinnerLoadingComponent } from 'src/app/components/dialogs/spinner-loading/spinner-loading.component';
import { AuthStoreService } from '../../vault/auth-store.service';

@Injectable({
  providedIn: 'root'
})
export class EndpointSharedService {

  constructor(
    private authStore: AuthStoreService,
    private matdialog: MatDialog ) { }

  getAPIRoute(routePath: string, unstored_endpoint?: string): string {
    let end_url = unstored_endpoint || this.authStore.endpoint
    return `${end_url}${routePath}`;
  }

  getGenericEndpointURL(url: string): string {
    return url[url.length-1] == '/' ? url : `${url}/`;
  }

  showServiceErrorDialog(errorCode: number) {
    let title: string = errorCode == 403 ? "Credentials Error" : "Service Error";
    let desc: string = errorCode == 403 ? "The entered key may be invalid or the entered endpoint is not the general one!" : "Unable to reach the specified endpoint!";
    this.matdialog.open(GenericDialogComponent, {
      data: {
        "icon": "error",
        "title": title,
        "desc": desc,
        "isYesNo": false
      },
      disableClose: true
    });
  }

  openLoadingDialog(): MatDialogRef<SpinnerLoadingComponent> {
    return this.matdialog.open(SpinnerLoadingComponent, { disableClose: true })
  }
}
