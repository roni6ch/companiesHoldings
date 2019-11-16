import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { HttpRequestsService } from "../../../services/http-requests.service";

@Component({
  selector: "app-employee-modal",
  templateUrl: "./employee-modal.component.html",
  styleUrls: ["./employee-modal.component.scss"]
})
export class EmployeeModalComponent implements OnInit {
  companies;
  roles;
  submitted = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private httpReq: HttpRequestsService
  ) {}
  ngOnInit() {
    this.httpReq
      .getCompanies()
      .toPromise()
      .then(result => {
        this.companies = [
          ...new Set(this.httpReq.companiesSubject.getValue().map(v => v.name))
        ];
      });

    this.roles = Object.keys(this.httpReq.roles);
  }

  onSubmit(e) {
    this.submitted = true;
    if (this.data.action === "Add") 
      this.addEmployee(e);
    else this.editEmployee(e);
  }
  addEmployee(employee) {
    let salary = this.calculateSalary(
      employee.role,
      employee.manager,
      employee.experience,
      this.httpReq.roles
    );
    employee.salary = salary;
    //Add new Employee
    this.httpReq.addEmployee(employee).subscribe(
      result => this.httpReq.employeesSubject.next([result]),
      err => {
        //TODO: REMOVE THIS PUSH AND SET ERROR
        let employees = this.httpReq.employeesSubject.getValue();
        let _id = String(+new Date());
        employee._id = _id;
        employees.push(employee);
        this.httpReq.employeesSubject.next(employees);
      }
    );
  }

  editEmployee(employee) {
    let salary = this.calculateSalary(
      employee.role,
      employee.manager,
      employee.experience,
      this.httpReq.roles
    );
    employee.salary = employee;
    //Edit Company
    this.httpReq.editEmployee(employee).subscribe(
      result => this.httpReq.employeesSubject.next(result),
      err => {
        //TODO: REMOVE THIS PUSH AND SET ERROR
        let employees = this.httpReq.employeesSubject.getValue().map(v => {
          if (v._id === employee._id) {
            v.first_name = employee.first_name;
            v.last_name = employee.last_name;
            v.tz_id = employee.tz_id;
            v.role = employee.role;
            v.manager = employee.manager;
            v.experience = employee.experience;
            v.company = employee.company;
            v.salary = salary;
          }
          return v;
        });

        this.httpReq.employeesSubject.next(employees);
      }
    );
  }

  deleteEmployee(_id: string) {
    this.httpReq.deleteEmployee(_id).subscribe(
      result => this.httpReq.employeesSubject.next(result),
      err => {
        //TODO: REMOVE THIS PUSH AND SET ERROR
        let employees = this.httpReq.employeesSubject.getValue().filter(v => {
          return v._id !== _id;
        });
        this.httpReq.employeesSubject.next(employees);
      }
    );
  }

  calculateSalary(role, manager, experience, salaryTable) {
    //calculate salary
    let salary = 0;
    if (salaryTable[role] !== "undefined") {
      let isManager = manager ? 5 : 0;
      let employeeRole = salaryTable[role];
      let experienceYears = (+experience / salaryTable[role]) * 10;
      salary = Math.round(employeeRole + isManager + experienceYears);
    }
    return salary;
  }
}
