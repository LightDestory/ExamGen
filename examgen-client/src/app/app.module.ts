import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialImportsModule } from './utility/material-imports/material-imports.module';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { GenericDialogComponent } from './components/dialogs/generic-dialog/generic-dialog.component';
import { HttpInterceptorService } from './interceptors/http/http-interceptor.service';
import { AboutComponent } from './components/about/about.component';
import { DashboardWelcomeComponent } from './components/dashboard-welcome/dashboard-welcome.component';
import { SubjectsListComponent } from './components/subjects-list/subjects-list.component';
import { SpinnerLoadingComponent } from './components/dialogs/spinner-loading/spinner-loading.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    GenericDialogComponent,
    AboutComponent,
    DashboardWelcomeComponent,
    SubjectsListComponent,
    SpinnerLoadingComponent
  ],
  entryComponents: [GenericDialogComponent, SpinnerLoadingComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialImportsModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    HttpClientModule
  ],
  providers: [
    {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpInterceptorService,
    multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
