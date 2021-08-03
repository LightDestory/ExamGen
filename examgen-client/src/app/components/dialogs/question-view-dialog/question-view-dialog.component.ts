import {Component, OnInit, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Question} from "../../../models/question";

@Component({
  selector: 'app-question-view-dialog',
  templateUrl: './question-view-dialog.component.html',
  styleUrls: ['./question-view-dialog.component.scss']
})
export class QuestionViewDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { icon: string, payload: Question }) {
  }

  ngOnInit(): void {
  }

}
