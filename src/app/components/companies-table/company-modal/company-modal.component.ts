import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { HttpRequestsService } from "../../../services/http-requests.service";

@Component({
  selector: "company-modal",
  templateUrl: "./company-modal.component.html",
  styleUrls: ["./company-modal.component.scss"]
})
export class CompanyModalComponent {
  branches;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private httpReq: HttpRequestsService
  ) {}

  ngOnInit() {
    //branches loads once
    this.branches = this.httpReq.branches;
  }

  
  addCompany(_id = "", name: string, branch: string) {
    //Add new Company
    this.httpReq.addCompany(name, branch).subscribe(
      result => this.httpReq.companiesSubject.next([result]),
      err => {
        //TODO: REMOVE THIS PUSH AND SET ERROR
        let companies = this.httpReq.companiesSubject.getValue();
        let _id = String(+new Date());
        companies.push({ _id , name, branch });
        this.httpReq.companiesSubject.next(companies);
      }
    );
  }

  editCompany(_id: string, name: string, branch: string) {
    //Edit Company
    this.httpReq.editCompany(_id, name, branch).subscribe(
      result => this.httpReq.companiesSubject.next(result),
      err => {
        //TODO: REMOVE THIS PUSH AND SET ERROR
        let companies = this.httpReq.companiesSubject.getValue().map(v => {
          if (v._id === _id) {
            v.name = name;
            v.branch = branch;
          }
          return v;
        });

        this.httpReq.companiesSubject.next(companies);
      }
    );
  }
  
  deleteCompany(_id: string) {
    this.httpReq.deleteCompany(_id).subscribe(
      result => this.httpReq.companiesSubject.next(result),
      err => {
        //TODO: REMOVE THIS PUSH AND SET ERROR
        let companies = this.httpReq.companiesSubject.getValue().filter(v => {
          return v._id !== _id;
        });
        this.httpReq.companiesSubject.next(companies);
      }
    );
  }

}
