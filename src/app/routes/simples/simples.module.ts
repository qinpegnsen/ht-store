import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";
import {StepsComponent} from './settle-steps/steps.component';
import {RegisterComponent} from "./register/register.component";
import {AccountInfoComponent} from './account-info/account-info.component';
import {DoneComponent} from './done/done.component';
import {SimplesService} from "./simples.service";
import {DredgeComponent} from './dredge/dredge.component';
import { AuditingComponent } from './auditing/auditing.component';
import {FileUploadModule} from "ng2-file-upload";
import { BaseInfoComponent } from './base-info/base-info.component';
import { DreageStepsComponent } from './dreage-steps/dreage-steps.component';
import {StoreInfoComponent} from "./store-info/store-info.component";


const routes: Routes = [
  {
    path: '', component: StepsComponent, children: [
    {path: 'register', component: RegisterComponent},
    {path: 'baseInfo', component: BaseInfoComponent},
    {path: 'accountInfo', component: AccountInfoComponent},
    {path: 'auditing', component: AuditingComponent},
    {path: 'settlePass', component: AuditingComponent},
    {path: 'settleReject', component: AuditingComponent}
  ]
  },
  {
    path: 'shop', component: DreageStepsComponent, children: [
    {path: 'dredge', component: DredgeComponent},
    {path: 'done', component: DoneComponent},
    {path: 'dredgeReject', component: DoneComponent}
  ]
  },
  {
    path: 'company', component: StoreInfoComponent
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
    StepsComponent,
    AccountInfoComponent,
    DredgeComponent,
    DoneComponent,
    AuditingComponent,
    BaseInfoComponent,
    DreageStepsComponent,
    StoreInfoComponent,
  ],
  providers: [
    StepsComponent,
    SimplesService
  ]
})
export class SimplesModule {
}
