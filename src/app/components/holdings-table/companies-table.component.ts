import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { CompaniesService } from '../../services/companies.service';
import { log } from 'util';

@Component({
  selector: 'app-companies-table',
  templateUrl: './companies-table.component.html',
  styleUrls: ['./companies-table.component.scss']
})
export class CompaniesTableComponent implements OnInit {

  displayedColumns: string[] = ['name', 'branch', 'actions'];
  dataSource = null;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private companiesService: CompaniesService) { }

  ngOnInit() {
    this.companiesService.getCompanies().subscribe(companies => {
      console.table(companies);
      this.dataSource = new MatTableDataSource(companies);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  addNew() {
    console.log("new");
  }
  startEdit(name) {
    console.log("edit" , name);}
    deleteItem() {
      console.log("deleteItem");}
}
