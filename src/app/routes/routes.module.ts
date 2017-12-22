import { NgModule } from '@angular/core';
import {SharedModule} from "../shared/shared.module";
import {routes} from './routes';
import {RouterModule} from "@angular/router";

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forRoot(routes)
    // RouterModule.forRoot(routes,{useHash: true}) //路由锚点模式
  ],
  declarations: [],
  exports: [
    RouterModule
  ]
})
export class RoutesModule { }
