import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StaffComponent} from './staff/staff.component';
import {SharedModule} from "../../shared/shared.module";
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [ //路由路径
  {path: '', component: StaffComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [StaffComponent]
})

export class StaffModule {
}
