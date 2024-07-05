import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import {
  NbActionsModule, NbButtonGroupModule,
  NbButtonModule,
  NbCardModule, NbDatepickerModule,
  NbDialogModule,
  NbFormFieldModule, NbIconModule,
  NbInputModule,
  NbLayoutModule, NbListModule, NbSelectModule
} from "@nebular/theme";
import {LogoComponent} from "../../components/logo/logo.component";
import {DashboardRoutingModule} from "./dashboard-routing.module";
import { AddTransactionDialogComponent } from './components/add-transaction-dialog/add-transaction-dialog.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { TransactionChartComponent } from './components/transaction-chart/transaction-chart.component';
import { TransactionListComponent } from './components/transaction-list/transaction-list.component';
import { EditCategoriesDialogComponent } from './components/edit-categories-dialog/edit-categories-dialog.component';

@NgModule({
  declarations: [
    DashboardComponent,
    AddTransactionDialogComponent,
    TransactionChartComponent,
    TransactionListComponent,
    EditCategoriesDialogComponent,
  ],
  imports: [
    CommonModule,
    NbLayoutModule,
    LogoComponent,
    DashboardRoutingModule,
    NbActionsModule,
    NbCardModule,
    NbDialogModule.forChild(),
    NbButtonModule,
    NbFormFieldModule,
    NbInputModule,
    FormsModule,
    ReactiveFormsModule,
    NbIconModule,
    NbListModule,
    NbDatepickerModule,
    NbSelectModule,
    NbButtonGroupModule,
  ],
})
export class DashboardModule { }
