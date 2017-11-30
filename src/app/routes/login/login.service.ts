import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Injectable()
export class LoginService {
  validateFormReset: FormGroup;          //重置密码的表单校验
  validateFormNew: FormGroup;            //新密码的表单校验



  constructor(public router: Router, public fb: FormBuilder) {
    //重置密码的表单校验
    this.validateFormReset = this.fb.group({
      phone: ['', [this.phoneValidator]],//手机号的校验
      smsCode: ['', [this.samCodeValidator]],//验证码校验
    });

    //新密码的表单校验
    this.validateFormNew = this.fb.group({
      password: ['', [Validators.required]],//密码的校验
      passwordConfirmation: ['', [this.passwordConfirmationValidator]],//再次输入密码的校验
    });
  }

  /**
   * 验证码校验
   * @param control
   * @returns {any}
   */
  samCodeValidator = (control: FormControl): any => {
    const SMS = /\d{6}/;
    if (!control.value) {
      return {required: true}
    } else if (!SMS.test(control.value)) {
      return {smsCode: true, error: true}
    }
  };

  /**
   * 手机号的校验
   * @param control
   * @returns {any}
   */
  phoneValidator = (control: FormControl): any => {
    const PHONE = /^1[0-9]{10}$/;
    if (!control.value) {
      return {required: true}
    } else if (!PHONE.test(control.value)) {
      return {phone: true, error: true}
    }
  };

  /**
   * 输入密码的校验
   */
  validateConfirmPassword() {
    setTimeout(_ => {
      this.validateFormNew.controls['passwordConfirmation'].updateValueAndValidity();
    })
  }

  /**
   * 再次输入密码的校验
   * @param control
   * @returns {any}
   */
  passwordConfirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return {required: true};
    } else if (control.value !== this.validateFormNew.controls['password'].value) {
      return {confirm: true, error: true};
    }
  };

  /**
   * 根据操作步骤跳到相应页面
   * @param current （当前步骤）
   */
  routerSkip(current){
    switch (current) {
      case 0 :
        this.router.navigate(['/page/login/forget-password/reset-password'], {replaceUrl: true})
        break;
      case 1 :
        this.router.navigate(['/page/login/forget-password/new-password'], {replaceUrl: true})
        break;
      case 2 :
        this.router.navigate(['/page/login/forget-password/account-info-password'], {replaceUrl: true})
        break;
    }
  }
}
