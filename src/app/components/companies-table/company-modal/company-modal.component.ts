import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { HttpRequestsService } from "../../../services/http-requests.service";

@Component({
  selector: "company-modal",
  templateUrl: "./company-modal.component.html",
  styleUrls: ["./company-modal.component.scss"]
})
export class CompanyModalComponent {
  branches = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private httpReq: HttpRequestsService
  ) {}

  ngOnInit() {
    //branches loads once
    this.branches = this.httpReq.branches;
  }

  onSubmit(e) {
    if (this.data.action === "Add") 
      this.addCompany(e);
    else 
      this.editCompany(e);
  }

  addCompany(company) {
    //Add new Company
    this.httpReq.addCompany(company).subscribe(
      result => {
        result.name = company.name;
        result.branch = company.branch;
        this.httpReq.companiesSubject.next(this.httpReq.companiesSubject.getValue().concat([result]));
      },
      err => {
       console.log(err);
      }
    );
  }

  editCompany(company) {
    //Edit Company
    this.httpReq.editCompany(company).subscribe(
      result => {
        if (result) {
          let companies = this.httpReq.companiesSubject.getValue().map(v => {
            if (v._id === company._id) {
              v.name = company.name;
              v.branch = company.branch;
            }
            return v;
          });
  
          this.httpReq.companiesSubject.next(companies);
         }
       },
      err => {
        console.log(err);
      }
    );
  }

  deleteCompany(_id: string) {
    this.httpReq.deleteCompany(_id).subscribe(
      result => {
        let companies = this.httpReq.companiesSubject.getValue().filter(v => {
          return v._id !== _id;
        });
        this.httpReq.companiesSubject.next(companies);
      },
      err => {
        console.log(err);
      }
    );
  }
}
