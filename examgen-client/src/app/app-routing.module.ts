import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { DashboardWelcomeComponent } from './components/dashboard-welcome/dashboard-welcome.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { SubjectsListComponent } from './components/subjects-list/subjects-list.component';
import { AuthGuard } from './guards/auth/auth.guard';
import {CategoriesListComponent} from "./components/categories-list/categories-list.component";
import {QuestionsListComponent} from "./components/questions-list/questions-list.component";
import {QuestionsEditorComponent} from "./components/questions-editor/questions-editor.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: "dashboard",
    pathMatch: 'prefix'
  },
  {
    path: 'login',
    canActivate: [AuthGuard],
    component: LoginComponent
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    component: DashboardComponent,
    children: [
      {
        path:'',
        component:DashboardWelcomeComponent
      },
      {
        path: 'subjects',
        component: SubjectsListComponent
      },
      {
        path: 'categories',
        component: CategoriesListComponent
      },
      {
        path: 'questions',
        component: QuestionsListComponent,
      },
      {
        path: 'editor',
        component: QuestionsEditorComponent,
      },
      {
        path: 'editor/:id',
        component: QuestionsEditorComponent,
        pathMatch: 'full'
      },
      {
        path: 'exams',
        component: AboutComponent
      },
      {
        path: 'about',
        component: AboutComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: "dashboard"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
