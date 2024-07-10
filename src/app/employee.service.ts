import { Injectable } from '@angular/core';
import { Employee } from './models/employee.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private employees: Employee[] = [
    {
      id: '1100316',
      name: 'สมชาย ใจดี',
      phone: '0952562026',
      position: 'โปรแกรมเมอร์',
    },
  ];

  getEmployees(): Employee[] {
    return this.employees;
  }

  addEmployee(employee: Employee): void {
    this.employees.push(employee);
  }

  updateEmployee(employee: Employee): void {
    const index = this.employees.findIndex((e) => e.id === employee.id);
    if (index !== -1) {
      this.employees[index] = employee;
    }
  }

  deleteEmployee(id: string): void {
    this.employees = this.employees.filter((employee) => employee.id !== id);
  }
}
