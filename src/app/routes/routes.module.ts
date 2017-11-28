import { NgModule } from '@angular/core';
import {SharedModule} from "../shared/shared.module";
import {routes} from './routes';
import {RouterModule} from "@angular/router";
import { RefundComponent } from './service/refund/refund.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [],
  exports: [
    RouterModule
  ]
})
export class RoutesModule { }
