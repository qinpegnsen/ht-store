import {NgModule} from "@angular/core";
import {SharedModule} from "../../shared/shared.module";
import {RouterModule, Routes} from "@angular/router";
import {ManageComponent} from "./manage/manage.component";
import {GoodsService} from "./goods.service";
import { EvaluateComponent } from './evaluate/evaluate.component';
import {SkuGoodsComponent} from "./sku-goods/sku-goods.component";

const routes: Routes = [
  {path: 'manage', component: ManageComponent},
  {path: 'eval', component: EvaluateComponent},
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    ManageComponent,
    EvaluateComponent,
    SkuGoodsComponent
  ],
  providers: [
    GoodsService
  ],
  entryComponents: [ SkuGoodsComponent ]
})
export class GoodsModule {
}
