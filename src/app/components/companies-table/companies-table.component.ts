import { Component, OnInit, ViewChild } from "@angular/core";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { HttpRequestsService } from "../../services/http-requests.service";
import { MatDialog } from "@angular/material/dialog";
import { CompanyModalComponent } from "./company-modal/company-modal.component";
import { ICompany } from "../../shared/ICompany";
import { log } from "util";

@Component({
  selector: "app-companies-table",
  templateUrl: "./companies-table.component.html",
  styleUrls: ["./companies-table.component.scss"]
})
export class CompaniesTableComponent implements OnInit {
  displayedColumns: string[] = ["name", "branch", "actions"];
  dataSource = null;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private httpReq: HttpRequestsService, public dialog: MatDialog) {}

  ngOnInit() {

    this.httpReq.companiesSubject.subscribe(result => {
      this.dataSource = new MatTableDataSource(result);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
    this.httpReq
      .getCompanies()
      .toPromise()
      .then(result => {
        this.httpReq.companiesSubject.next(result);
        this.httpReq.companies = [
          ...new Set(
            this.httpReq.companiesSubject.getValue().map(v => v.name)
          )
        ];
      });
      this.httpReq.getSalaryTable().subscribe(salaryTable => {
        this.httpReq.branches = Object.keys( salaryTable )
      });
  }
  addCompany() {
    this.openDialog("", "", "", "Add");
  }

  editCompany(row: ICompany) {
    this.openDialog(row._id, row.name, row.branch, "Edit");
  }

  deleteCompany(row: ICompany) {
    this.openDialog(row._id, "", "", "Delete");
  }

  openDialog(_id: string, name: string, branch: string, action: string) {
    this.dialog.open(CompanyModalComponent, {
      data: {
        _id,
        name,
        branch,
        action
      }
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
