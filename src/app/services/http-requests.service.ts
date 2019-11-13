import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { ISalaryTable } from '../shared/ISalaryTable';
import { IEmployee } from '../shared/IEmployee';
import { ICompany } from '../shared/ICompany';
import { of } from 'rxjs/internal/observable/of';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestsService {

  private _salary_url = "./assets/json/salary_table.json";
  private _employees_url = "./assets/json/employees.json";
  private _companies_url = "./assets/json/companies.json";
  private _server_url = "/deleteCompany";
  //private companiesSubject = new ReplaySubject<ICompany[]>(); companies: Observable<ICompany[]> = this.companiesSubject.asObservable();


  constructor(private http: HttpClient) { }

  getSalaryTable(): Observable<ISalaryTable[]> {
    return this.http.get<ISalaryTable[]>(this._salary_url);
  }
  getEmployees(): Observable<IEmployee[]> {
    return this.http.get<IEmployee[]>(this._employees_url);
  }
  getCompanies(): Observable<ICompany[]> {
    //this.http.get<ICompany[]>(this._companies_url).subscribe(res => this.companiesSubject.next(res)); return this.companiesSubject;
    return this.http.get<ICompany[]>(this._companies_url)
  }
  deleteCompany(id: String): Observable<boolean> {
    return this.http.post<boolean>(this._server_url + '/deleteCompany', id);
  }
  editCompany(id: String,name: String,branch: String): Observable<boolean> {
    return this.http.post<boolean>(this._server_url + '/editCompany', {id,name,branch});
  }
  addCompany(name: String,branch: String): Observable<boolean> {
    return this.http.post<boolean>(this._server_url + '/addCompany', {name,branch});
  }

  handleError(arg0: string): any {
    throw new Error("Method not implemented.");
  }

}
