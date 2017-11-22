import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RedPackPushOrderComponent } from './red-pack-push-order/red-pack-push-order.component';
import { RedPackStatisticsComponent } from './red-pack-statistics/red-pack-statistics.component';
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";

const routes: Routes = [
  {path: 'statistics', component: RedPackStatisticsComponent},
  {path: 'pushOrder', component:RedPackPushOrderComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [RedPackPushOrderComponent, RedPackStatisticsComponent]
})
export class RedPacketModule { }
