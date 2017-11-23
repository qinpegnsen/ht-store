import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CashSettleComponent } from './cash-settle/cash-settle.component';
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";
import { CashComponent } from './cash/cash.component';

const routes: Routes = [
  {path: 'cash-settle', component: CashSettleComponent},
  {path: 'cash', component: CashComponent},

];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [CashSettleComponent, CashComponent]
})
export class CashSettleModule { }
