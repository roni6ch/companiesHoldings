import { Component, OnInit, ViewChild } from "@angular/core";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { HttpRequestsService } from "../../services/http-requests.service";
import { MatDialog } from "@angular/material/dialog";
import { EmployeeModalComponent } from "./employee-modal/employee-modal.component";
import _ from 'lodash';

@Component({
  selector: "app-employees-table",
  templateUrl: "./employees-table.component.html",
  styleUrls: ["./employees-table.component.scss"]
})
export class EmployeesTableComponent implements OnInit {
  displayedColumns: string[] = [
    "first_name",
    "last_name",
    "tz_id",
    "company",
    "role",
    "manager",
    "experience",
    "salary",
    "actions"
  ];
  dataSource = null;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private httpReq: HttpRequestsService, public dialog: MatDialog) {}

  ngOnInit() {
    this.httpReq.employeesSubject.subscribe(result => {
      this.dataSource = new MatTableDataSource(result);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

    this.httpReq
      .getEmployees()
      .toPromise()
      .then(employees => {
        this.httpReq
          .getSalaryTable()
          .toPromise()
          .then(salaryTable => {
            let employeesWithSalary = this.calculateSalary(employees, salaryTable[0]);
            this.httpReq.roles = salaryTable;
            this.httpReq.employeesSubject.next(employeesWithSalary);
          });
      });
  }

  calculateSalary(employees, salaryTable) {
    //calculate salary
    employees.map(v => {
      if (salaryTable[v["role"]] !== "undefined") {
        let manager = v.manager ? 5 : 0;
        let role = salaryTable[v["role"]];
        let experience = (+v.experience / salaryTable[v["role"]]) * 10;
        v.salary = Math.round(role + manager + experience);
      } else v.salary = 0;
    });
    return employees;
  }
  addEmployee() {
    this.openDialog("", "", "", 0, "", "", false, 0, "Add");
  }
  editEmployee(row) {
    this.openDialog(
      row._id,
      row.first_name,
      row.last_name,
      row.tz_id,
      row.role,
      row.company,
      row.manager,
      row.experience,
      "Edit"
    );
  }
  deleteEmployee(row) {
    this.openDialog(
      row._id,
      row.first_name,
      row.last_name,
      0,
      "",
      "",
      false,
      0,
      "Delete"
    );
  }

  openDialog(
    _id: string,
    first_name: string,
    last_name: string,
    tz_id: number,
    role: string,
    company: string,
    manager: boolean,
    experience: 0,
    action: string
  ) {
    this.dialog.open(EmployeeModalComponent, {
      data: {
        _id,
        first_name,
        last_name,
        tz_id,
        role,
        company,
        manager,
        experience,
        action
      }
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
