import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReturnGoodsComponent } from './return-goods/return-goods.component';
import {SharedModule} from "../../shared/shared.module";
import {RouterModule, Routes} from "@angular/router";
import {RefundComponent} from "./refund/refund.component";
import { AfterDetailComponent } from './after-detail/after-detail.component';

const afterDetail: Routes = [
  {path: 'afterDetail', component: AfterDetailComponent},
]
const routes: Routes = [
  {path: 'refund', component: RefundComponent,children: afterDetail},
  {path: 'returnGoods', component:ReturnGoodsComponent,children: afterDetail},
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [ReturnGoodsComponent,RefundComponent, AfterDetailComponent]
})
export class ServiceModule { }
