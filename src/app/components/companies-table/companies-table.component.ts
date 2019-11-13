import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { HttpRequestsService } from '../../services/http-requests.service';
import { MatDialog } from '@angular/material/dialog';
import { CompanyModalComponent } from './company-modal/company-modal.component';
import { ICompany } from '../../shared/ICompany';
import { log } from 'util';

@Component({
  selector: 'app-companies-table',
  templateUrl: './companies-table.component.html',
  styleUrls: ['./companies-table.component.scss']
})
export class CompaniesTableComponent implements OnInit {

  displayedColumns: string[] = ['name', 'branch', 'actions'];
  dataSource = null;
  companies = null;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private httpReq: HttpRequestsService, public dialog: MatDialog) { }

  ngOnInit() {
    this.httpReq.getCompanies().subscribe(companies => {
      console.table(companies);
      this.companies = companies;
      this.dataSource = new MatTableDataSource(companies);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
    this.httpReq.getSalaryTable().subscribe(salaryTable => {
      console.table(salaryTable);
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteDialog(id: number, name: string) {
    this.dialog.open(CompanyModalComponent, {
      data: {
        id,
        name,
        action: "Delete"
      }
    }).afterClosed().subscribe((result) => {
      if (result) {
        this.dataSource.data = this.dataSource.data.filter((val) => {
          return val._id !== id
        })
      }
    });
  }

  editDialog(row: ICompany) {
    this.dialog.open(CompanyModalComponent, {
      data: {
        _id: row._id,
        name: row.name,
        branch: row.branch,
        companies : this.companies,
        action: "Edit"
      }
    }).afterClosed().subscribe((result) => {
      if (result) {
        console.log(result);
      }
    });
  }

  addNew() {
    this.dialog.open(CompanyModalComponent, {
      data: {
        name: '',
        branch: '',
        companies : this.companies,
        action: "Add"
      }
    }).afterClosed().subscribe((result) => {
      if (result) {
        console.log(result);
      }
    });
  }
}
