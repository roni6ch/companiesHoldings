import { Component, OnInit , Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpRequestsService } from '../../../services/http-requests.service';

@Component({
  selector: 'app-employee-modal',
  templateUrl: './employee-modal.component.html',
  styleUrls: ['./employee-modal.component.scss']
})
export class EmployeeModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data, private httpReq: HttpRequestsService) { }
  companies;
  ngOnInit() {
    //TODO: CHANGE IT TO COMPANIS FROM CACHE
    this.httpReq.getCompanies().subscribe(result => {
      this.companies = result;
    });
  }

  AddEmployee(first_name, last_name,tz_id, manager,experience, company){
    this.httpReq.addEmployee(first_name, last_name,tz_id, manager,experience, company).subscribe(result => {
      console.table(result);
      return result;
    });
  }

  deleteCompany(id: String) {
    this.httpReq.deleteCompany(id).subscribe(result => {
      console.table(result);
      return result;
    });
  }

  editCompany(_id = '', name: String, branch: String) {
    if (_id !== '') {
      //Edit Company
      this.httpReq.editCompany(_id, name, branch).subscribe(result => {
        console.table(result);
        return result;
      });
    } else {
      //Add new Company
      this.httpReq.addCompany(name, branch).subscribe(result => {
        console.table(result);
        return result;
      });
    }
  }
}
