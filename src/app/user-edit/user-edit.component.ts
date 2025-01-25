import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  userForm: FormGroup
  constructor(public dialogRef: MatDialogRef<UserEditComponent>, private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { user: any }) {
    this.userForm = this.fb.group({
      name: [data.user.name, Validators.required],
      email: [data.user.email, [Validators.required, Validators.email]],
      role: [data.user.role, Validators.required],
    });
  }

  ngOnInit(): void {
  }
  onSave() {
    if (this.userForm.valid) {
      this.dialogRef.close(this.userForm.value);
    }
  }
  onCancel() {
    this.dialogRef.close();
  }
}
