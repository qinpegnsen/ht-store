import {NgModule} from '@angular/core';
import {HomeComponent} from "./home/home.component";
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";
import {HomeService} from "./home.service";

const routes: Routes = [
  {path: '', component: HomeComponent}
];

@NgModule({
  imports: [
    SharedModule.forRoot(),
    RouterModule.forChild(routes)
  ],
  declarations: [HomeComponent],
  exports: [
    RouterModule
  ],
  providers: [
    HomeService
  ]
})
export class HomeModule {
}
