import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReturnGoodsComponent } from './return-goods/return-goods.component';
import {SharedModule} from "../../shared/shared.module";
import {RouterModule, Routes} from "@angular/router";
import {RefundComponent} from "./refund/refund.component";

const routes: Routes = [
  {path: 'refund', component: RefundComponent},
  {path: 'returnGoods', component:ReturnGoodsComponent },
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [ReturnGoodsComponent,RefundComponent]
})
export class ServiceModule { }
