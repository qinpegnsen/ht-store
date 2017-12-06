import {NgModule} from '@angular/core';
import {HomeComponent} from "./home/home.component";
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";
import { DemoComponent } from './demo/demo.component';

const routes: Routes = [
  // {path: '', component: HomeComponent},
  {path: '', component: DemoComponent}
];

@NgModule({
  imports: [
    SharedModule.forRoot(),
    RouterModule.forChild(routes)
  ],
  declarations: [HomeComponent, DemoComponent],
  exports: [
    RouterModule
  ]
})
export class HomeModule {
}
