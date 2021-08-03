import {Component, OnInit, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-generic-dialog',
  templateUrl: './generic-dialog.component.html',
  styleUrls: []
})
export class GenericDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: { icon: string, title: string, desc: string, isYesNo: boolean }) {
  }

  ngOnInit(): void {
  }

}
