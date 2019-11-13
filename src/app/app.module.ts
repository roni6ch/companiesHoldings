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
} from "@angular/material";

/*  LIBRERIES */
import "hammerjs";

/*  COMPONENTS */
import { AppComponent } from "./app.component";
import { CompaniesTableComponent } from "./components/companies-table/companies-table.component";
import { EmployeesTableComponent } from "./components/employees-table/employees-table.component";
import { ModalComponent } from './components/modal/modal.component';


/* SERVICE */
/* PIPES */

@NgModule({
  declarations: [
    AppComponent,
    CompaniesTableComponent,
    EmployeesTableComponent,
    ModalComponent
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
    MatSelectModule
  ],
  entryComponents: [ModalComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
