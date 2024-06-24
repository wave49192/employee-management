import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Employee } from '../models/employee.model';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  displayedColumns: string[] = [
    'รหัสพนักงาน',
    'ชื่อ-นามสกุล',
    'เบอร์โทร',
    'ตำแหน่ง',
  ];
  constructor(
    private employeeService: EmployeeService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.employees = this.employeeService.getEmployees();
  }

  openDialog(employee?: Employee): void {
    const dialogRef = this.dialog.open(EmployeeFormComponent, {
      width: '300px',
      data: employee ? { ...employee } : null,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (employee) {
          this.employeeService.updateEmployee(result);
        } else {
          this.employeeService.addEmployee(result);
        }
        this.employees = this.employeeService.getEmployees();
      }
    });
  }

  deleteEmployee(id: string): void {
    if (confirm('คุณแน่ใจหรือไม่ว่าต้องการลบพนักงานคนนี้?')) {
      this.employeeService.deleteEmployee(id);
      this.employees = this.employeeService.getEmployees();
    }
  }
}
