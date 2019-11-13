/*  MODULES */
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  MatPaginatorModule,
  MatInputModule,
  MatDialogModule,
  MatSortModule,
  MatTableModule,
  MatIconModule,
  MatToolbarModule,
  MatRippleModule,
  MatButtonModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatFormFieldModule,
} from "@angular/material";

/*  LIBRERIES */
import "hammerjs";

/*  COMPONENTS */
import { AppComponent } from "./app.component";
import { CompaniesTableComponent } from "./components/companies-table/companies-table.component";
import { EmployeesTableComponent } from "./components/employees-table/employees-table.component";
import { CompanyModalComponent } from './components/companies-table/company-modal/company-modal.component';
import { EmployeeModalComponent } from './components/employees-table/employee-modal/employee-modal.component';


/* SERVICE */
/* PIPES */

@NgModule({
  declarations: [
    AppComponent,
    CompaniesTableComponent,
    EmployeesTableComponent,
    CompanyModalComponent,
    EmployeeModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatDialogModule,
    MatInputModule,
    MatIconModule,
    MatRippleModule,
    MatButtonModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatFormFieldModule,
  ],
  entryComponents: [CompanyModalComponent,EmployeeModalComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
