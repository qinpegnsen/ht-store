import {NgModule} from "@angular/core";
import {SharedModule} from "../../shared/shared.module";
import {RouterModule, Routes} from "@angular/router";
import {ManageComponent} from "./manage/manage.component";
import {GoodsService} from "./goods.service";
import { EvaluateComponent } from './evaluate/evaluate.component';
import {SkuGoodsComponent} from "./sku-goods/sku-goods.component";
import { PublishComponent } from './publish/publish.component';
import { OneComponent } from './publish/one/one.component';
import { TwoComponent } from './publish/two/two.component';
import { ThreeComponent } from './publish/three/three.component';
import { FreightTemplateComponent } from './freight-template/freight-template.component';

const routes: Routes = [
  {path: 'manage', component: ManageComponent},
  {path: 'eval', component: EvaluateComponent},
  {path: 'freightTemplate', component: FreightTemplateComponent},
  {path: 'publish', component: PublishComponent, children: [
    {path: '', redirectTo: 'one'},
    {path: 'one', component: OneComponent},
    {path: 'two', component: TwoComponent},
    {path: 'three', component: ThreeComponent},
  ]},
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    ManageComponent,
    EvaluateComponent,
    FreightTemplateComponent,
    SkuGoodsComponent,
    PublishComponent,
    OneComponent,
    TwoComponent,
    ThreeComponent
  ],
  providers: [
    GoodsService
  ],
  entryComponents: [ SkuGoodsComponent ]
})
export class GoodsModule {
}
