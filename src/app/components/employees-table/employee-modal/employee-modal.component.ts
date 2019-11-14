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

  addEmployee(first_name, last_name,tz_id, role,manager,experience, company){
    this.httpReq.addEmployee(first_name, last_name,tz_id,role, manager,experience, company).subscribe(result => {
      console.table(result);
      return result;
    });
  }
}
