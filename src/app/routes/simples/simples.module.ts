import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";
import {StepsComponent} from './steps/steps.component';
import {RegisterComponent} from "./register/register.component";
import {CompleteComponent} from './complete/complete.component';
import {DoneComponent} from './done/done.component';
import {SimplesService} from "./simples.service";
import {DredgeComponent} from './dredge/dredge.component';
import { AuditingComponent } from './auditing/auditing.component';
import {FileUploadModule} from "ng2-file-upload";
import { BaseInfoComponent } from './base-info/base-info.component';

const routes: Routes = [
  {
    path: '', component: StepsComponent, children: [
    {path: 'register', component: RegisterComponent},
    {path: 'baseInfo', component: BaseInfoComponent},
    {path: 'complete', component: CompleteComponent},
    {path: 'auditing', component: AuditingComponent},
    {path: 'dredge', component: DredgeComponent},
    {path: 'done', component: DoneComponent},
  ]
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
    CompleteComponent,
    DredgeComponent,
    DoneComponent,
    AuditingComponent,
    BaseInfoComponent
  ],
  providers: [
    StepsComponent,
    SimplesService
  ]
})
export class SimplesModule {
}
