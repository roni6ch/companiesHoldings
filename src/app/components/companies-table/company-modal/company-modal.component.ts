
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpRequestsService } from '../../../services/http-requests.service';

@Component({
  selector: 'company-modal',
  templateUrl: './company-modal.component.html',
  styleUrls: ['./company-modal.component.scss']
})
export class CompanyModalComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data, private httpReq: HttpRequestsService) { }


  ngOnInit() { }

  deleteCompany(id: string) {
    this.httpReq.deleteCompany(id).subscribe(result => {
      return result;
    });
  }

  editCompany(_id = '', name: string, branch: string) {
    if (_id !== '') {
      //Edit Company
      this.httpReq.editCompany(_id, name, branch).subscribe(result => {
        return result;
      });
    } else {
      //Add new Company
      this.httpReq.addCompany(name, branch).subscribe(result => {
        return result;
      });
    }
  }

}
