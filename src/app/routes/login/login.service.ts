import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AjaxService} from "../../public/service/ajax.service";
import {SettingUrl} from "../../public/setting/setting_url";
import {NzNotificationService} from "ng-zorro-antd";

@Injectable()
export class LoginService {
  validateFormReset: FormGroup;          //重置密码的表单校验



  constructor(public router: Router, public fb: FormBuilder,public _notification: NzNotificationService) {
    //重置密码的表单校验
    this.validateFormReset = this.fb.group({
      phone: ['', [this.phoneValidator]],//手机号的校验
      code: ['', [this.samCodeValidator]],//验证码校验
      newPwd: ['', [Validators.required]],//密码的校验
      confirmPwd: ['', [this.passwordConfirmationValidator]],//再次输入密码的校验
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
      this.validateFormReset.controls['confirmPwd'].updateValueAndValidity();
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
    } else if (control.value !== this.validateFormReset.controls['newPwd'].value) {
      return {confirm: true, error: true};
    }
  };


  /**
   * 登录
   * @param requestDate
   * @param callback
   */
  loginStore(requestDate: any) {
    const me = this;
    AjaxService.post({
      url: SettingUrl.URL.login.storeLogin,
      data: requestDate,
      success: (res) => {
        if (res.success) {
          me.routerSkip('baseInfo');
        } else {
          me._notification.error(`失败`, '登录失败了');
        }
      },
      error: (res) => {
        me._notification.error(`接口出错了`, '注册接口出错了接口出错了接口出错了')
      }
    });
  }


  /**
   * 根据操作步骤跳到相应页面
   * @param current （当前步骤）
   */
  routerSkip(current){
    switch (current) {
      case 0 :
        this.router.navigate([SettingUrl.ROUTERLINK.pass.resetPwd], {replaceUrl: true})
        break;
      case 1 :
        this.router.navigate([SettingUrl.ROUTERLINK.pass.newPwd], {replaceUrl: true})
        break;
      case 2 :
        this.router.navigate([SettingUrl.ROUTERLINK.pass.accountPwd], {replaceUrl: true})
        break;
    }
  }


  /**
   * 商家忘记密码
   * @param requestDate
   * @param callback
   */
  resetPassword(requestDate: any) {
    const me = this;
    AjaxService.post({
      url: SettingUrl.URL.login.resetPassword,
      data: requestDate,
      success: (res) => {
        if (res.success) {
          me._notification.success('成功',res.info);
        } else {
          me._notification.error(`出错了`, res.info)
        }
      },
      error: (res) => {
        me._notification.error(`出错了`, '接口调用失败')
      }
    });
  }

  /**
   * 修改密码获取验证码
   * @param requestDate
   */
    getSmsCode(phone: string) {
    const me = this;
    let _success: boolean = false;
    AjaxService.put({
      url: SettingUrl.URL.login.getSms,
      data: {phone: phone},
      async: false,
      success: (res) => {
        if (res.success) {
          _success = true;
        } else {
          me._notification.error(`出错了`, res.info)
        }
      },
      error: (res) => {
        me._notification.error(`接口出错了`, '接口调用失败')
      }
    });
    return _success;
  }


}
