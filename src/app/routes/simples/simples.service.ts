import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {FormControl} from "@angular/forms";
import {Observable} from "rxjs/Observable";
import {PatternService} from "../../public/service/pattern.service";
import {isNullOrUndefined} from "util";
import {AjaxService} from "../../public/service/ajax.service";
import {SettingUrl} from "../../public/setting/setting_url";
import {NzMessageService, NzNotificationService} from "ng-zorro-antd";
import {StepsComponent} from "./steps/steps.component";


const options = [{
  value: 'zhejiang',
  label: 'Zhejiang',
  children: [{
    value: 'hangzhou',
    label: 'Hangzhou',
    children: [{
      value: 'xihu',
      label: 'West Lake',
      isLeaf: true
    }],
  }, {
    value: 'ningbo',
    label: 'Ningbo',
    isLeaf: true
  }],
}, {
  value: 'jiangsu',
  label: 'Jiangsu',
  children: [{
    value: 'nanjing',
    label: 'Nanjing',
    children: [{
      value: 'zhonghuamen',
      label: 'Zhong Hua Men',
      isLeaf: true
    }],
  }],
}];

@Injectable()
export class SimplesService {
  options: any;

  constructor(public router: Router,
              public patterns: PatternService,
              public steps: StepsComponent,
              public _message: NzMessageService,
              public _notification: NzNotificationService) {
    this.options = options
  }


  /**
   * 根据入驻步骤跳到相应页面
   * @param current （当前步骤）
   */
  routerSkip(current) {
    switch (current) {
      case 0 :
        this.router.navigate(['/simple/reg/register'], {replaceUrl: true})
        break;
      case 1 :
        this.router.navigate(['/simple/reg/complete'], {replaceUrl: true})
        break;
      case 1.5 :
        this.router.navigate(['/simple/reg/auditing'], {replaceUrl: true})
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
   * 注册商户
   * @param requestDate
   * @param callback
   */
  addSeller(requestDate: any) {
    const me = this;
    AjaxService.post({
      url: SettingUrl.URL.seller.add,
      data: requestDate,
      success: (res) => {
        me.routerSkip(1);
        if (res.success) {
          // me.routerSkip(1)
        } else {
          me._notification.error(`出错了`, '注册接口出错了接口出错了接口出错了')
        }
      },
      error: (res) => {
        me._notification.error(`接口出错了`, '注册接口出错了接口出错了接口出错了')
      }
    });
  }

  /**
   * 企业注册获取验证码
   * @param requestDate
   */
  getSmsCode(phone: string) {
    const me = this;
    let _success: boolean = false;
    AjaxService.get({
      url: SettingUrl.URL.base.getRegSms,
      data: {phone: phone},
      async: false,
      success: (res) => {
        if (res.success) {
          _success = true;
        } else {
          me._notification.error(`出错了`, '接口出错了接口出错了接口出错了')
        }
      },
      error: (res) => {
        me._notification.error(`接口出错了`, '接口出错了接口出错了接口出错了')
      }
    });
    return _success;
  }

  /**
   * 用户名异步校验
   * @param control
   * @returns {any}
   */
  userNameAsyncValidator = (control: FormControl): any => {
    return Observable.create(function (observer) {
      setTimeout(() => {
        if (control.value === 'any') {
          observer.next({error: true, duplicated: true});
        } else {
          observer.next(null);
        }
        observer.complete();
      }, 600);
    });
  };

  /**
   * 手机号异步校验
   * @param control
   * @returns {any}
   */
  phoneValidator = (control: FormControl): any => {
    return this.asyncPatternsValidate(this.patterns.PHONE_REGEXP, control, {error: true, phone: true});
  };

  /**
   * 短信验证码异步校验
   * @param control
   * @returns {any}
   */
  smsCodeValidator = (control: FormControl): any => {
    return this.asyncPatternsValidate(this.patterns.SMS_REGEXP, control, {error: true, smsCode: true});
  };

  /**
   * 字符串
   * @param control
   * @returns {any}
   */
  stringValidator = (control: FormControl): any => {
    if (!control.value) {
      return {required: true}
    }
  };

  /**
   * 邮箱校验
   * @param control
   * @returns {any}
   */
  emailValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return {required: true}
    } else if (!this.patterns.EMAIL_REGEXP.test(control.value)) {
      return {error: true, email: true};
    }
  };

  /**
   * 地址校验（地址级别对应数组长度）
   * @param control
   * @returns {any}
   */
  addressValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return {required: true}
    } else if (control.value.length < 3) {
      return {error: true, address: true};
    }
  };

  /**
   * 身份证号校验
   * @param control
   * @returns {any}
   */
  idCardNumValidator = (control: FormControl): any => {
    return this.asyncPatternsValidate(this.patterns.IDCARD_REGEXP, control, {error: true, idCard: true});
  };

  /**
   * 仅仅检测必填项
   * @param control
   * @returns {any}
   */
  validateRequired = (control: FormControl): any => {
    if (!control.value) {
      return {required: true};
    }
  };

  /**
   * 输入延迟的异步正则校验方法封装
   * 用法（this.asyncPatternsValidate(this.patterns.IDCARD_REGEXP, control, { error: true, idCard: true })
   * @param exp （正则表达式）
   * @param value
   * @param obj （eg:{ error: true, idCard: true }）
   * @returns {any}
   */
  asyncPatternsValidate = (exp: RegExp, control: FormControl, obj?: any) => {
    return Observable.create(function (observer) {
      setTimeout(() => {
        if (!exp.test(control.value)) {
          if (isNullOrUndefined(obj)) obj = {error: true};
          observer.next(obj);
        } else {
          observer.next(null);
        }
        observer.complete();
      }, 1000);
    });
  }


}
