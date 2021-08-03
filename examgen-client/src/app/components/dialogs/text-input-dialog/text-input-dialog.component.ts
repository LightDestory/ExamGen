import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-text-input-dialog',
  templateUrl: './text-input-dialog.component.html',
  styles: [
  ]
})
export class TextInputDialogComponent implements OnInit {

  inputForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { icon: string, name: string },
    public dialogRef: MatDialogRef<TextInputDialogComponent>,
    private fb: FormBuilder) {
      this.inputForm = fb.group({
        inputText: new FormControl("", [Validators.required])
      });
     }


  ngOnInit(): void {
  }

  sendData() {
    const newName: string = this.inputForm.get("inputText")?.value;
    this.dialogRef.close(newName);
  }
}
