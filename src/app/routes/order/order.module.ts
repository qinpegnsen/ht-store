import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderPendingShipmentComponent } from './order-pending-shipment/order-pending-shipment.component';
import { OrderBeenShippedComponent } from './order-been-shipped/order-been-shipped.component';
import { OrderCancelComponent } from './order-cancel/order-cancel.component';
import { OrderCompleteComponent } from './order-complete/order-complete.component';
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";


const routes: Routes = [
  {path: 'pendingShipment', component: OrderPendingShipmentComponent},
  {path: 'beenShipped', component:OrderBeenShippedComponent },
  {path: 'cancel', component:OrderCancelComponent },
  {path: 'complete', component:OrderCompleteComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [OrderPendingShipmentComponent, OrderBeenShippedComponent, OrderCancelComponent, OrderCompleteComponent]
})
export class OrderModule { }
