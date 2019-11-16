import { Component, OnInit , Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpRequestsService } from '../../../services/http-requests.service';

@Component({
  selector: 'app-employee-modal',
  templateUrl: './employee-modal.component.html',
  styleUrls: ['./employee-modal.component.scss']
})
export class EmployeeModalComponent implements OnInit {
  companies;
  roles;
  constructor(@Inject(MAT_DIALOG_DATA) public data, private httpReq: HttpRequestsService) { }
  ngOnInit() {
    this.httpReq
      .getCompanies()
      .toPromise()
      .then(result => {
        this.companies = [
          ...new Set(this.httpReq.companiesSubject.getValue().map(v => v.name) )
        ];
      });
      
    this.roles = this.httpReq.roles;
  }

  addEmployee(first_name, last_name,tz_id, role,manager,experience, company){
    //Add new Employee
    this.httpReq.addEmployee(first_name, last_name,tz_id,role, manager,experience, company).subscribe(
      result => this.httpReq.employeesSubject.next([result]),
      err => {
        //TODO: REMOVE THIS PUSH AND SET ERROR
        let employees = this.httpReq.employeesSubject.getValue();
        let _id = String(+new Date());
        employees.push({ _id, first_name, last_name,tz_id,role, company,manager,experience });
        this.httpReq.employeesSubject.next(employees);
      }
    );
  }

  editEmployee(_id,first_name, last_name,tz_id, role,manager,experience, company) {
    //Edit Company
    this.httpReq.editEmployee(_id,first_name, last_name,tz_id, role,manager,experience, company).subscribe(
      result => this.httpReq.employeesSubject.next(result),
      err => {
        //TODO: REMOVE THIS PUSH AND SET ERROR
        let employees = this.httpReq.employeesSubject.getValue().map(v => {
          if (v._id === _id) {
            v.first_name = first_name;
            v.last_name = last_name;
            v.tz_id = tz_id;
            v.role = role;
            v.manager = manager;
            v.experience = experience;
            v.company = company;
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

}
