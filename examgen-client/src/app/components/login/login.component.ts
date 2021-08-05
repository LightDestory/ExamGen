import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {Title} from '@angular/platform-browser';
import {Router} from '@angular/router';
import {EndpointAuthService} from 'src/app/services/endpoint/auth/endpoint-auth.service';
import {EndpointSharedService} from 'src/app/services/endpoint/shared/endpoint-shared.service';
import {AuthStoreService} from 'src/app/services/vault/auth-store.service';
import {GenericDialogComponent} from '../dialogs/generic-dialog/generic-dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading: boolean;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private pageTitle: Title,
    private endAuth: EndpointAuthService,
    private helper: EndpointSharedService,
    private authStore: AuthStoreService,
    private matdialog: MatDialog
  ) {
    this.loading = false;
    this.loginForm = fb.group({
      secretKey: new FormControl("", Validators.required),
      endpoint: new FormControl('http://localhost:5000', Validators.required)
    });
  }

  ngOnInit(): void {
    this.pageTitle.setTitle('ExamGen - Login');
  }

  login() {
    const userData: string[] = [
      this.loginForm.get("secretKey")?.value,
      this.helper.getGenericEndpointURL(this.loginForm.get('endpoint')?.value)
    ]
    this.loading = true;
    this.endAuth.checkService(userData)
      .subscribe(
        data => {
          this.matdialog.open(GenericDialogComponent, {
            data: {
              "icon": "check",
              "title": "Authorized Service Found",
              "desc": "A authroized service has been found. Do you want to log-in?",
              "isYesNo": true
            }
          }).afterClosed().subscribe((result) => {
            this.loading = false;
            if (result) {
              this.authStore.performLogin(userData);
            }
          });
          this.loading = false;
        },
        error => {
          this.helper.showServiceErrorDialog(error.status);
          this.loading = false;
        }
      );
  }
}
