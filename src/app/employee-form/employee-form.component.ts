import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from '../models/employee.model';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css'],
})
export class EmployeeFormComponent {
  form: FormGroup;
  positions = ['โปรแกรมเมอร์', 'ดีไซเนอร์', 'ผู้จัดการโครงการ'];

  constructor(
    public dialogRef: MatDialogRef<EmployeeFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Employee,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      id: [data ? data.id : '', Validators.required],
      name: [data ? data.name : '', Validators.required],
      phone: [data ? data.phone : '', [Validators.required]],
      position: [data ? data.position : '', Validators.required],
    });
  }

  onSave(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
