
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpRequestsService } from '../../services/http-requests.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data, private httpReq: HttpRequestsService) { }


  ngOnInit() { }

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
