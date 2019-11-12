
import {Component, OnInit, ViewChild} from '@angular/core';
import { EmployeesService } from '../../services/employees.service';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { CompaniesService } from '../../services/companies.service';

@Component({
  selector: 'app-employees-table',
  templateUrl: './employees-table.component.html',
  styleUrls: ['./employees-table.component.scss']
})
export class EmployeesTableComponent implements OnInit {


  displayedColumns: string[] = ['first_name', 'last_name','id','role','company','manager','experience'];
  dataSource = null;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private employeesService: EmployeesService) { }

  ngOnInit() {
    this.employeesService.getCompanies().subscribe(companies => {
      console.table(companies);
      this.dataSource = new MatTableDataSource(companies);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
