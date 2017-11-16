import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";
import {StepsComponent} from './steps/steps.component';
import {RegisterComponent} from "./register/register.component";
import {CompleteComponent} from './complete/complete.component';
import {DoneComponent} from './done/done.component';
import {SimplesService} from "./simples.service";
import {DredgeComponent} from './dredge/dredge.component';

const routes: Routes = [
  {
    path: '', component: StepsComponent, children: [
    {path: 'register', component: RegisterComponent},
    {path: 'complete', component: CompleteComponent},
    {path: 'dredge', component: DredgeComponent},
    {path: 'done', component: DoneComponent},
  ]
  },
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    RegisterComponent,
    StepsComponent,
    CompleteComponent,
    DredgeComponent,
    DoneComponent
  ],
  providers: [
    SimplesService
  ]
})
export class SimplesModule {
}
