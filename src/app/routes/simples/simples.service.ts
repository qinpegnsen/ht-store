import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs/Observable";

@Injectable()
export class SimplesService {
  validateForm: FormGroup;

  constructor(public router: Router,
              public fb: FormBuilder) {
    this.validateForm = this.fb.group({
      epName              : [ '', [ Validators.required ], [ this.userNameAsyncValidator ] ],
      sellerAcct          : [ '', [ Validators.required ], [ this.userNameAsyncValidator ] ],
      shopCode            : [ '', [ Validators.required ], [ this.userNameAsyncValidator ] ],
      phone               : [ '', [ this.phoneValidator ] ],
      smsCode             : [ '', [ this.smsCodeValidator ] ],
      password            : [ '', [ this.pwdValidator] ],
      passwordConfirmation: [ '', [ this.passwordConfirmationValidator ] ],
      email               : [ '', [ this.emailValidator ] ],
      isBoss              : [ true ]
    });
  }


  /**
   * 根据入驻步骤跳到相应页面
   * @param current （当前步骤）
   */
  routerSkip(current){
    switch (current) {
      case 0 :
        this.router.navigate(['/simple/reg/register'], {replaceUrl: true})
        break;
      case 1 :
        this.router.navigate(['/simple/reg/complete'], {replaceUrl: true})
        break;
      case 2 :
        this.router.navigate(['/simple/reg/dredge'], {replaceUrl: true})
        break;
      case 3 :
        this.router.navigate(['/simple/reg/done'], {replaceUrl: true})
        break;
    }
  }

  /**
   * 用户名异步校验
   * @param control
   * @returns {any}
   */
  userNameAsyncValidator = (control: FormControl): any => {
    return Observable.create(function (observer) {
      if (control.value === 'JasonWood') {
        observer.next({ error: true, duplicated: true });
      } else {
        observer.next(null);
      }
      observer.complete();
    });
  };

  /**
   * 手机号异步校验
   * @param control
   * @returns {any}
   */
  phoneValidator = (control: FormControl): any => {
    const PHONE = /^1[0-9]{10}$/;
    if (!control.value) {
      return { required: true }
    } else if (!PHONE.test(control.value)) {
      return { phone: true, error: true }
    }
  };

  /**
   * 短信验证码异步校验
   * @param control
   * @returns {any}
   */
  smsCodeValidator = (control: FormControl): any => {
    const SMS = /\d{6}/;
    if (!control.value) {
      return { required: true }
    } else if (!SMS.test(control.value)) {
      return { smsCode: true, error: true }
    }
  };

  /**
   * 密码异步校验
   * @param control
   * @returns {any}
   */
  pwdValidator = (control: FormControl): any => {
    const PWD = /[A-Za-z0-9]{6,}/;
    if (!control.value) {
      return { required: true }
    } else if (!PWD.test(control.value)) {
      return { smsCode: true, error: true }
    }
  };

  /**
   * 输入确认密码时校验
   */
  validateConfirmPassword() {
    setTimeout(_ => {
      this.validateForm.controls[ 'passwordConfirmation' ].updateValueAndValidity();
    })
  }

  /**
   * 密码异步校验
   * @param control
   * @returns {any}
   */
  passwordConfirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls[ 'password' ].value) {
      return { confirm: true, error: true };
    }
  };

  /**
   * 邮箱校验
   * @param control
   * @returns {any}
   */
  emailValidator = (control: FormControl): { [s: string]: boolean } => {
    const EMAIL_REGEXP = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
    if (!control.value) {
      return { required: true }
    } else if (!EMAIL_REGEXP.test(control.value)) {
      return { error: true, email: true };
    }
  };

}
