import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {FormControl} from "@angular/forms";
import {Observable} from "rxjs/Observable";
import {PatternService} from "../../public/service/pattern.service";
import {AjaxService} from "../../public/service/ajax.service";
import {SettingUrl} from "../../public/setting/setting_url";
import {NzNotificationService} from "ng-zorro-antd";
import {StepsComponent} from "./settle-steps/steps.component";

@Injectable()
export class SimplesService {

  constructor(public router: Router,
              public patterns: PatternService,
              public steps: StepsComponent,
              public _notification: NzNotificationService) {
  }


  /**
   * 根据入驻步骤跳到相应页面
   * @param current （当前步骤）
   */
  routerSkip(step) {
    switch (step) {
      case 0 :
        this.router.navigate(['/simple/reg/register'], {replaceUrl: true})
        break;
      case 1 :
        this.router.navigate(['/simple/reg/baseInfo'], {replaceUrl: true})
        break;
      case 2 :
        this.router.navigate(['/simple/reg/accountInfo'], {replaceUrl: true})
        break;
      case 3 :
        this.router.navigate(['/simple/reg/auditing'], {replaceUrl: true})
        break;
      case 3.1 :
        this.router.navigate(['/simple/reg/settlePass'], {replaceUrl: true})
        break;
      case 3.2 :
        this.router.navigate(['/simple/reg/settleReject'], {replaceUrl: true})
        break;
      case 4 :
        this.router.navigate(['/simple/reg/shop/dredge'], {replaceUrl: true})
        break;
      case 5 :
        this.router.navigate(['/simple/reg/shop/done'], {replaceUrl: true})
        break;
      case 5.1 :
        this.router.navigate(['/simple/reg/shop/dredgeReject'], {replaceUrl: true})
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
    me.routerSkip(1);
    AjaxService.post({
      url: SettingUrl.URL.seller.add,
      data: requestDate,
      success: (res) => {
        // me.routerSkip(1);
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
   * 企业入驻
   * @param data
   */
  enterpris(data) {
    const me = this;
    AjaxService.post({
      url: SettingUrl.URL.enterpris.save,
      data: data,
      mask: true,
      contentType: "application/json",
      success: (res) => {
        if (res.success) {
          me.routerSkip(1.5);
        } else {
          me._notification.error(`出错了`, '入驻接口出错了接口出错了接口出错了')
        }
      },
      error: (res) => {
        me._notification.error(`接口出错了`, '入驻接口出错了接口出错了接口出错了')
      }
    });
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
   * 仅仅检测必填项
   * @param control
   * @returns {any}
   */
  validateRequired = (control: FormControl): any => {
    if (!control.value) {
      return {required: true};
    }
  };


}
