import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";
import {SettleStepsComponent} from './settle-steps/settle-steps.component';
import {RegisterComponent} from "./register/register.component";
import {AccountInfoComponent} from './account-info/account-info.component';
import {DoneComponent} from './done/done.component';
import {SimplesService} from "./simples.service";
import {OpenShopComponent} from './open-shop/open-shop.component';
import {AuditingComponent} from './auditing/auditing.component';
import {FileUploadModule} from "ng2-file-upload";
import {BaseInfoComponent} from './base-info/base-info.component';
import {OpenStepsComponent} from './open-steps/open-steps.component';
import {StoreInfoComponent} from "./store-info/store-info.component";
import {MainService} from "../../public/service/main.service";
import {ShopInfoComponent} from "./shop-info/shop-info.component";


const routes: Routes = [
  {path: '', redirectTo: 'reg/register'},//一般不会出现，路由只有"/basic"时重定向到注册
  {
    path: 'reg', component: SettleStepsComponent, children: [
    {path: '', redirectTo: 'register'},
    {path: 'register', component: RegisterComponent},
    {path: 'baseInfo', component: BaseInfoComponent},
    {path: 'accountInfo', component: AccountInfoComponent},
    {path: 'auditing', component: AuditingComponent},
  ]
  },
  {
    path: 'shop', component: OpenStepsComponent, children: [
    {path: '', redirectTo: 'openShop'},
    {path: 'openShop', component: OpenShopComponent},
    {path: 'done', component: DoneComponent}
  ]
  },
  {
    path: 'company', component: StoreInfoComponent
  },
  {
    path: 'shops', component: ShopInfoComponent
  },
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    FileUploadModule
  ],
  declarations: [
    RegisterComponent,
    SettleStepsComponent,
    AccountInfoComponent,
    OpenShopComponent,
    DoneComponent,
    AuditingComponent,
    BaseInfoComponent,
    OpenStepsComponent,
    StoreInfoComponent,
    ShopInfoComponent,
  ],
  providers: [
    SettleStepsComponent,
    SimplesService,
    MainService
  ]
})
export class SimplesModule {
}
