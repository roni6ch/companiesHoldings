import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { IEmployees } from '../shared/IEmployees';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  private _url = "./assets/json/employees.json";
  constructor(private http : HttpClient) { }

  getCompanies(): Observable<IEmployees[]>{
    return this.http.get<IEmployees[]>(this._url);
  }
}
