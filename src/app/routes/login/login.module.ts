import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import {LoginService} from "./login.service";
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { NewPasswordComponent } from './new-password/new-password.component';
import { CompletePasswordComponent } from './complete-password/complete-password.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'forgetPwd', component: ForgetPasswordComponent, children: [
    {path: 'resetPwd', component: ResetPasswordComponent},
    {path: 'newPwd', component: NewPasswordComponent},
    {path: 'accountPwd', component: CompletePasswordComponent},
  ]}
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule.forRoot(),
    RouterModule.forChild(routes)
  ],
  declarations: [LoginComponent, ForgetPasswordComponent, ResetPasswordComponent, NewPasswordComponent, CompletePasswordComponent],
  exports: [
    RouterModule
  ],
  providers: [
    LoginService
  ]
})
export class LoginModule { }
