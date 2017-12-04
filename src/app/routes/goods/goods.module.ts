import {NgModule} from "@angular/core";
import {SharedModule} from "../../shared/shared.module";
import {RouterModule, Routes} from "@angular/router";
import {ManageComponent} from "./manage/manage.component";
import {GoodsService} from "./goods.service";
import {EvaluateComponent} from './evaluate/evaluate.component';
import {SkuGoodsComponent} from "./sku-goods/sku-goods.component";
import {PublishComponent} from './publish/publish.component';
import {ChooseKindComponent} from './publish/choose-kind/choose-kind.component';
import {EditComponent} from './publish/edit/edit.component';
import {PublishedComponent} from './publish/published/published.component';
import {FreightTemplateComponent} from './freight-template/freight-template.component';
import {AddTemplateComponent} from './add-template/add-template.component';
import {SessionService} from "./session.service";
import {FileUploadModule} from "ng2-file-upload";

const routes: Routes = [
  {
    path: 'manage', component: ManageComponent, children: [
    {path: 'update', component: EditComponent},
    {path: 'eval', component: EvaluateComponent}
  ]
  },
  {
    path: 'freightTemplate', component: FreightTemplateComponent, children: [
    {path: 'addTemplate', component: AddTemplateComponent}
  ]
  },
  {
    path: 'publish', component: PublishComponent, children: [
    {path: '', redirectTo: 'chooseKind'},
    {path: 'chooseKind', component: ChooseKindComponent},
    {path: 'edit', component: EditComponent},
    {path: 'published', component: PublishedComponent},
  ]
  }
]

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    FileUploadModule
  ],
  declarations: [
    ManageComponent,
    EvaluateComponent,
    FreightTemplateComponent,
    SkuGoodsComponent,
    PublishComponent,
    ChooseKindComponent,
    EditComponent,
    PublishedComponent,
    AddTemplateComponent
  ],
  providers: [
    GoodsService,
    SessionService,
    PublishComponent
  ],
  entryComponents: [SkuGoodsComponent]//模态框注入
})
export class GoodsModule {
}
