import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {FormControl} from "@angular/forms";
import {Observable} from "rxjs/Observable";
import {PatternService} from "../../public/service/pattern.service";
import {AjaxService} from "../../public/service/ajax.service";
import {SettingUrl} from "../../public/setting/setting_url";
import {NzNotificationService} from "ng-zorro-antd";
import {StepsComponent} from "./settle-steps/steps.component";
declare var $: any;

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
      case 'register' :
        this.router.navigate(['/simple/reg/register'], {replaceUrl: true})
        break;
      case 'baseInfo' :
        this.router.navigate(['/simple/reg/baseInfo'], {replaceUrl: true})
        break;
      case 'accountInfo' :
        this.router.navigate(['/simple/reg/accountInfo'], {replaceUrl: true})
        break;
      case 'auditing' :
        this.router.navigate(['/simple/reg/auditing'], {replaceUrl: true})
        break;
      case 'settlePass' :
        this.router.navigate(['/simple/reg/settlePass'], {replaceUrl: true})
        break;
      case 'settleReject' :
        this.router.navigate(['/simple/reg/settleReject'], {replaceUrl: true})
        break;
      case 'dredge' :
        this.router.navigate(['/simple/reg/shop/dredge'], {replaceUrl: true})
        break;
      case 'done' :
        this.router.navigate(['/simple/reg/shop/done'], {replaceUrl: true})
        break;
      case 'dredgeReject' :
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
    AjaxService.post({
      url: SettingUrl.URL.seller.add,
      data: requestDate,
      success: (res) => {
        if (res.success) {
          me.routerSkip('baseInfo');
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
          me._notification.error(`出错了`, '注册接口出错了')
        }
      },
      error: (res) => {
        me._notification.error(`接口出错了`, '注册接口出错了')
      }
    });
    return _success;
  }

  /**
   * 企业入驻——保存基本信息
   * @param data
   */
  enterpriseBase(data) {
    const me = this;
    AjaxService.post({
      url: SettingUrl.URL.enterprise.save,
      data: JSON.stringify(data),
      mask: true,
      contentType: "application/json",
      success: (res) => {
        if (res.success) {
          me.routerSkip('accountInfo');
        } else {
          me._notification.error(`错误提示`, res.info)
        }
      },
      error: (res) => {
        me._notification.error(`错误提示`, res.info)
      }
    });
  }

  /**
   * 企业入驻——保存银行账户信息
   * @param data
   */
  enterpriseSaveAccount(data) {
    const me = this;
    AjaxService.post({
      url: SettingUrl.URL.enterprise.save2,
      data: JSON.stringify(data),
      mask: true,
      contentType: "application/json",
      success: (res) => {
        if (res.success) {
          me.routerSkip('accountInfo');
        } else {
          me._notification.error(`错误提示`, res.info)
        }
      },
      error: (res) => {
        me._notification.error(`错误提示`, res.info)
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

  /**
   * 查询结算信息列表
   * @param data （查询参数）
   */
   static cashSettleList(data:any){
    const me = this;
    var defer = $.Deferred(); //封装异步请求结果
    //执行查询（异步）
    AjaxService.post({
      url: SettingUrl.URL.store.company,
      data: data,
      async: false,
      success: (data) => {
        console.log("█ 456545 ►►►",  456545);
        if (data.success) defer.resolve(data.data);
      }
    });
    return defer.promise(); //返回异步请求休息
  }

}
