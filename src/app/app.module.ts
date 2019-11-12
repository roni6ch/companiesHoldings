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
  MatRippleModule
} from "@angular/material";

/*  COMPONENTS */
import { AppComponent } from "./app.component";
import { CompaniesTableComponent } from "./components/holdings-table/companies-table.component";

/*  LIBRERIES */
import "hammerjs";
import { EmployeesTableComponent } from "./components/employees-table/employees-table.component";

/* SERVICE */
/* PIPES */

@NgModule({
  declarations: [
    AppComponent,
    CompaniesTableComponent,
    EmployeesTableComponent
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
    MatRippleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
