import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialImportsModule} from './utility/material-imports/material-imports.module';
import {LoginComponent} from './components/login/login.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {GenericDialogComponent} from './components/dialogs/generic-dialog/generic-dialog.component';
import {HttpInterceptorService} from './interceptors/http/http-interceptor.service';
import {AboutComponent} from './components/about/about.component';
import {DashboardWelcomeComponent} from './components/dashboard-welcome/dashboard-welcome.component';
import {SubjectsListComponent} from './components/subjects-list/subjects-list.component';
import {TextInputDialogComponent} from './components/dialogs/text-input-dialog/text-input-dialog.component';
import {LoadingDialogComponent} from './components/dialogs/loading-dialog/loading-dialog.component';
import {MAT_DIALOG_DEFAULT_OPTIONS} from '@angular/material/dialog';
import {CategoriesListComponent} from './components/categories-list/categories-list.component';
import {QuestionsListComponent} from './components/questions-list/questions-list.component';
import {QuestionViewDialogComponent} from './components/dialogs/question-view-dialog/question-view-dialog.component';
import {QuestionsEditorComponent} from './components/questions-editor/questions-editor.component';
import {ExamsListComponent} from './components/exams-list/exams-list.component';
import {ExamGeneratorComponent} from './components/exam-generator/exam-generator.component';
import {EasterEggComponent} from './components/extra/easter-egg/easter-egg.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    GenericDialogComponent,
    AboutComponent,
    DashboardWelcomeComponent,
    SubjectsListComponent,
    LoadingDialogComponent,
    TextInputDialogComponent,
    LoadingDialogComponent,
    CategoriesListComponent,
    QuestionsListComponent,
    QuestionViewDialogComponent,
    QuestionsEditorComponent,
    ExamsListComponent,
    ExamGeneratorComponent,
    EasterEggComponent
  ],
  entryComponents: [GenericDialogComponent, LoadingDialogComponent, TextInputDialogComponent, QuestionViewDialogComponent],
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
      multi: true
    },
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {disableClose: true, hasBackdrop: true}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
