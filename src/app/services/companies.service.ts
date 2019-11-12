import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { ICompany } from '../shared/ICompany';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {

  private _url = "./assets/json/companies.json";
  constructor(private http : HttpClient) { }

  getCompanies(): Observable<ICompany[]>{
    return this.http.get<ICompany[]>(this._url);
  }
}
