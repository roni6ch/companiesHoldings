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
  private _server_url = "/deleteCompany";
  private employeesSubject = new BehaviorSubject<IEmployee[]>([]);
  private companiesSubject = new BehaviorSubject<ICompany[]>([]);


  constructor(private http: HttpClient) { }

  getSalaryTable(): Observable<ISalaryTable[]> {
    return this.http.get<ISalaryTable[]>(this._salary_url);
  }
  /* Employee */
  getEmployees(): Observable<IEmployee[]> {
    this.http.get<IEmployee[]>(this._employees_url).subscribe(res => {console.log(res); this.employeesSubject.next(res)}); return this.employeesSubject;
  }
  addEmployee(first_name:string, last_name:string,tz_id:number,role:string, company:string, manager:boolean,experience:number ): Observable<IEmployee[]> {
    this.http.post<IEmployee[]>(this._server_url + '/addEmployee', {first_name, last_name,tz_id, manager,experience, company}).toPromise().then(res => {
      if (res){
        let employees = this.employeesSubject.getValue();
        employees.push({first_name,last_name,tz_id,role,manager,experience,company});
        this.employeesSubject.next(employees);
      }
    });
    return this.employeesSubject;
  }
   /* Company */
  getCompanies(): Observable<ICompany[]> {
    this.http.get<ICompany[]>(this._companies_url).subscribe(res => {console.log(res); this.companiesSubject.next(res)}); return this.companiesSubject;
  }
  addCompany(name: string,branch: string): Observable<ICompany[]> {
    this.http.post<ICompany>(this._server_url + '/addCompany', {name,branch}).toPromise().then(res => {
      if (res){
        //TODO - get the actual _id returned
        let companies = this.companiesSubject.getValue();
        companies.push({_id:"",name,branch});
        this.companiesSubject.next(companies);
      }
    });
    //todo - remove this and write error on screen
    let companies = this.companiesSubject.getValue();
        companies.push({_id:"",name,branch});
        this.companiesSubject.next(companies);
    return this.companiesSubject;
  }
  deleteCompany(id: string): Observable<boolean> {
    return this.http.post<boolean>(this._server_url + '/deleteCompany', id);
  }
  editCompany(id: string,name: string,branch: string): Observable<boolean> {
    return this.http.post<boolean>(this._server_url + '/editCompany', {id,name,branch});
  }

  handleError(arg0: string): any {
    throw new Error("Method not implemented.");
  }

}
