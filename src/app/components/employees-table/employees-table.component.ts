
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { HttpRequestsService } from '../../services/http-requests.service';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeModalComponent } from './employee-modal/employee-modal.component';

@Component({
  selector: 'app-employees-table',
  templateUrl: './employees-table.component.html',
  styleUrls: ['./employees-table.component.scss']
})
export class EmployeesTableComponent implements OnInit {

  displayedColumns: string[] = ['first_name', 'last_name', 'tz_id', 'company', 'role', 'manager', 'experience' ,'actions'];
  dataSource = null;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private httpReq: HttpRequestsService, public dialog: MatDialog) { }

  ngOnInit() {
    this.httpReq.getEmployees().subscribe(employees => {
      console.table(employees);
      this.dataSource = new MatTableDataSource(employees);
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

  addEmployeeDialog() {
    this.dialog.open(EmployeeModalComponent, {
      data: {
        first_name: '',
        last_name : '',
        tz_id: '',
        role:'',
        company:'',
        manager:false,
        experience:0,
        branch: '',
        action: "Add"
      }
    }).afterClosed().subscribe((result) => {
      if (result) {
        console.log(result);
      }
    });
  }

  editEmployeeDialog
  deleteEmployeeDialog
}
