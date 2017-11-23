import {NgModule} from "@angular/core";
import {SharedModule} from "../../shared/shared.module";
import {RouterModule, Routes} from "@angular/router";
import {ManageComponent} from "./manage/manage.component";
import {GoodsService} from "./goods.service";

const routes: Routes = [
  {path: 'manage', component: ManageComponent},
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    ManageComponent
  ],
  providers: [
    GoodsService
  ]
})
export class GoodsModule {
}
