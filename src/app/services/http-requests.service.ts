import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { ISalaryTable } from '../shared/ISalaryTable';
import { IEmployee } from '../shared/IEmployee';
import { ICompany } from '../shared/ICompany';
import { of } from 'rxjs/internal/observable/of';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestsService {

  private _salary_url = "./assets/json/salary_table.json";
  private _employees_url = "./assets/json/employees.json";
  private _companies_url = "./assets/json/companies.json";
  private _server_url = "";
  public companiesSubject = new BehaviorSubject<ICompany[]>([]);
  public employeesSubject = new BehaviorSubject<IEmployee[]>([]); 
  branches = []; companies = []; roles = [];
  constructor(private http: HttpClient) { }

   /* Company */
  getCompanies() {
    return this.http.get<ICompany[]>(this._companies_url);
  }
  addCompany(name: string,branch: string): Observable<ICompany> {
    return this.http.post<ICompany>(this._server_url + '/addCompany', {name,branch});
  }
  editCompany(id: string,name: string,branch: string): Observable<ICompany[]>{
    return this.http.post<ICompany[]>(this._server_url + '/editCompany', {id,name,branch});
  }
  deleteCompany(id: string): Observable<ICompany[]> {
    return this.http.post<ICompany[]>(this._server_url + '/deleteCompany', id);
  }

  /* Employee */
  getEmployees() {
    return this.http.get<IEmployee[]>(this._employees_url);
  }
  addEmployee(first_name:string, last_name:string,tz_id:number,role:string,  manager:boolean,experience:number,company:string ): Observable<IEmployee> {
    return this.http.post<IEmployee>(this._server_url + '/addEmployee', {first_name, last_name,tz_id, role,manager,experience,company});
  }
  editEmployee(_id:string,first_name:string, last_name:string,tz_id:number,role:string, manager:boolean,experience:number,company:string ): Observable<IEmployee[]> {
    return this.http.post<IEmployee[]>(this._server_url + '/editEmployee', {_id,first_name, last_name,tz_id, role, manager,experience, company});
  }
  deleteEmployee(_id: string): Observable<IEmployee[]> {
    return this.http.post<IEmployee[]>(this._server_url + '/deleteEmployee', _id);
  }

  getSalaryTable(): Observable<ISalaryTable[]> {
    return this.http.get<ISalaryTable[]>(this._salary_url);
  }

  handleError(arg0: string): any {
    throw new Error("Method not implemented.");
  }

}
