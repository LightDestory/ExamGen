import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Title} from '@angular/platform-browser';
import {SubjectNCategory} from 'src/app/models/sub_cat_model';
import {EndpointSharedService} from 'src/app/services/endpoint/shared/endpoint-shared.service';
import {EndpointSubjectsService} from 'src/app/services/endpoint/subjects/endpoint-subjects.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {GenericDialogComponent} from '../dialogs/generic-dialog/generic-dialog.component';
import {deletionResult} from 'src/app/models/deletionResult';
import {LoadingDialogComponent} from '../dialogs/loading-dialog/loading-dialog.component';
import {TextInputDialogComponent} from '../dialogs/text-input-dialog/text-input-dialog.component';
import {updateResult} from 'src/app/models/updateResult';
import {EndpointCategoriesService} from "../../services/endpoint/categories/endpoint-categories.service";
import {MatSelect} from "@angular/material/select";

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: []
})
export class CategoriesListComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatSelect) subjectSelector!: MatSelect;

  private loadingSpinnerRef: MatDialogRef<LoadingDialogComponent> | null = null;
  public subjects: string[] = [];
  displayedColumns: string[] = ['_id', 'count', 'rename', 'delete'];
  dataSource: MatTableDataSource<SubjectNCategory> = new MatTableDataSource<SubjectNCategory>();

  constructor(
    private pageTitle: Title,
    private subjectendpoint: EndpointSubjectsService,
    private categoryendpoint: EndpointCategoriesService,
    private matdialog: MatDialog,
    private helper: EndpointSharedService,
  ) {
  }

  ngOnInit(): void {
    this.pageTitle.setTitle("ExamGen - Categories Listing");
  }

  ngAfterViewInit() {
    this.loadSubjects();
  }

  private loadSubjects(): void {
    this.loadingSpinnerRef = this.helper.openLoadingDialog();
    this.subjectendpoint.getAllSubjects().subscribe(
      data => {
        this.loadingSpinnerRef!.close();
        this.subjects = (<SubjectNCategory[]>data.result).map(sub => sub._id);
      },
      error => {
        this.loadingSpinnerRef!.close();
        this.helper.showServiceErrorDialog(error.status);
      }
    )
  }

  onSubjectChange(): void {
    Promise.resolve(null).then(() => {
      this.loadingSpinnerRef = this.helper.openLoadingDialog();
      this.categoryendpoint.getAllCategoriesFromSubject(this.subjectSelector.value).subscribe(
        data => {
          this.loadingSpinnerRef!.close();
          this.dataSource.data = (<SubjectNCategory[]>data.result)
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error => {
          this.loadingSpinnerRef!.close();
          this.helper.showServiceErrorDialog(error.status);
        }
      );
    });
  }

  renameCategory(categoryName: string): void {
    this.matdialog.open(TextInputDialogComponent, {
      data: {
        "icon": "warning",
        "name": categoryName
      }
    }).afterClosed().subscribe(result => {
      if (result) {
        this.loadingSpinnerRef = this.helper.openLoadingDialog();
        this.categoryendpoint.renameCategoryFromSubject(this.subjectSelector.value, categoryName, result).subscribe(
          data => {
            this.loadingSpinnerRef?.close();
            this.matdialog.open(GenericDialogComponent, {
              data: {
                "icon": "check",
                "title": "Category renamed",
                "desc": `${(<updateResult>data.result).updates} questions has been updated!`,
                "isYesNo": false
              }
            }).afterClosed().subscribe(() => {
              this.dataSource.data.forEach(sub => {
                if (sub._id == categoryName) {
                  sub._id = result;
                }
              });
            });
          },
          error => {
            this.loadingSpinnerRef?.close();
            this.helper.showServiceErrorDialog(error.status);
          }
        )
      }
    })
  }

  deleteCategory(categoryName: string): void {
    this.matdialog.open(GenericDialogComponent, {
      data: {
        "icon": "warning",
        "title": "Deleting category",
        "desc": `Do you really want to delete '${categoryName}'?`,
        "isYesNo": true
      }
    }).afterClosed().subscribe((result) => {
      if (result) {
        this.loadingSpinnerRef = this.helper.openLoadingDialog();
        this.categoryendpoint.deleteCategoryFromSubject(this.subjectSelector.value, categoryName).subscribe(
          data => {
            this.loadingSpinnerRef?.close();
            this.matdialog.open(GenericDialogComponent, {
              data: {
                "icon": "check",
                "title": "Category deleted",
                "desc": `${(<deletionResult>data.result).deletions} questions has been deleted!`,
                "isYesNo": false
              }
            }).afterClosed().subscribe(() => {
              let tmp = this.dataSource.data.filter(cat => cat._id !== categoryName);
              if (tmp.length > 0) {
                this.dataSource.data = tmp;
                this.dataSource._updateChangeSubscription();
              } else {
                this.dataSource.data = [];
                this.loadSubjects();
              }
            });
          },
          error => {
            this.loadingSpinnerRef?.close();
            this.helper.showServiceErrorDialog(error.status);
          });
      }
    });
  }
}
