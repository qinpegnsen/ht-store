import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {AjaxService} from "../../public/service/ajax.service";
import {SettingUrl} from "../../public/setting/setting_url";
import {NzNotificationService} from "ng-zorro-antd";
import {SettleStepsComponent} from "./settle-steps/settle-steps.component";
import {Setting} from "../../public/setting/setting";
declare var $: any;

@Injectable()
export class StoreBaseService {

  constructor(public router: Router,
              public steps: SettleStepsComponent,
              public _notification: NzNotificationService) {
  }


  /**
   * 根据入驻步骤跳到相应页面
   * step （步骤名称）
   */
  routerSkip(step) {
    switch (step) {
      case 'register' ://注册
        this.router.navigate([SettingUrl.ROUTERLINK.basic.register], {replaceUrl: true})
        break;
      case 'baseInfo' ://企业基本信息
        this.router.navigate([SettingUrl.ROUTERLINK.basic.baseInfo], {replaceUrl: true})
        break;
      case 'accountInfo' ://企业银行账户信息
        this.router.navigate([SettingUrl.ROUTERLINK.basic.accountInfo], {replaceUrl: true})
        break;
      case 'auditing' ://企业入驻已提交，待审核，审核通过，驳回
        this.router.navigate([SettingUrl.ROUTERLINK.basic.auditing], {replaceUrl: true})
        break;
      case 'openShop' ://企业开通店铺
        this.router.navigate([SettingUrl.ROUTERLINK.basic.openShop], {replaceUrl: true})
        break;
      case 'done' ://开店申请已提交，待审核，驳回
        this.router.navigate([SettingUrl.ROUTERLINK.basic.done], {replaceUrl: true})
        break;
    }
  }

  /**
   * 注册商户
   * @param requestDate
   * @param callback
   */
  addSeller(requestDate: any) {
    let me = this, defer = $.Deferred(); //封装异步请求结果
    AjaxService.post({
      url: SettingUrl.URL.seller.add,
      data: requestDate,
      success: (res) => {
        if (res.success) {
          defer.resolve(true);
        } else {
          me._notification.error(`出错了`, res.info)
        }
      },
      error: (res) => {
        me._notification.error(`出错了`, '失败，请稍后重试')
      }
    });
    return defer.promise();
  }

  /**
   * 企业注册获取验证码
   * @param phone（手机号）
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
          me._notification.error(`出错了`, res.info)
        }
      },
      error: (res) => {
        me._notification.error(Setting.AJAX.errorTip,'')
      }
    });
    return _success;
  }

  /**
   * 获取验证码时验证手机号是否被注册，未被注册返回true，已被注册返回false
   * @param phone（手机号）
   */
  checkPhone(phone: string) {
    let me = this, _success: boolean = false;
    AjaxService.post({
      url: SettingUrl.URL.seller.checkPhone,
      data: {phone: phone},
      async: false,
      success: (res) => {
        if (res.success) {
          _success = true;
        } else {
          me._notification.error(`提示`, res.info)
        }
      },
      error: (res) => {
        me._notification.error(Setting.AJAX.errorTip,'')
      }
    });
    return _success;
  }

  /**
   * 企业入驻——保存基本信息
   * @param data
   */
  enterpriseBase(formValue) {
    const me = this;
    AjaxService.post({
      url: SettingUrl.URL.enterprise.save,
      data: JSON.stringify(formValue),
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
        me._notification.error(`错误提示`, '失败，请稍后重试')
      }
    });
  }

  /**
   * 企业入驻——保存银行账户信息
   * @param data
   */
  enterpriseAccount(formValue) {
    const me = this;
    AjaxService.post({
      url: SettingUrl.URL.enterprise.save2,
      data: JSON.stringify(formValue),
      mask: true,
      contentType: "application/json",
      success: (res) => {
        if (res.success) {
          me.routerSkip('auditing');
        } else {
          me._notification.error(`错误提示`, res.info)
        }
      },
      error: (res) => {
        me._notification.error(`错误提示`, '失败，请稍后重试')
      }
    });
  }

  /**
   * 企业入驻——开通店铺
   * @param data
   * update 是否是修改店铺
   */
  dredgeShop(data, update?: boolean) {
    const me = this;
    AjaxService.post({
      url: SettingUrl.URL.store.saveStore,
      data: JSON.stringify(data),
      mask: true,
      contentType: "application/json",
      success: (res) => {
        if (res.success) {
          if (update) me._notification.success(`成功提示`, res.info)
          if (!update) me.routerSkip('done');
        } else {
          me._notification.error(`错误提示`, res.info)
        }
      },
      error: (res) => {
        me._notification.error(`错误提示`, '失败，请稍后重试')
      }
    });
  }

  /**
   * 修改店铺信息
   */

  updateStore(requestData: any) {
    let me = this, defer = $.Deferred(); //封装异步请求结果
    AjaxService.get({
      url: SettingUrl.URL.store.updateStore,
      data: requestData,
      success: (res) => {
        if (res.success) {
          defer.resolve(res.success);
          me._notification.success('提交成功', '修改店铺信息成功')
        } else {
          me._notification.error('提交失败', res.info)
        }
      },
      error: (res) => {
        me._notification.error('提交失败', res.info)
      }
    });
    return defer.promise(); //返回异步请求信息
  }

  /**
   * 查询企业信息
   * @param data （查询参数）
   */
  static loadStoreInfo() {
    var defer = $.Deferred(); //封装异步请求结果
    //执行查询（异步）
    AjaxService.get({
      url: SettingUrl.URL.enterprise.load,
      async: false,
      success: (data) => {
        defer.resolve(data.data);
      }
    });
    return defer.promise(); //返回异步请求休息
  }

  /**
   * 查询店铺信息
   * @param data （查询参数）
   */
  static loadShopInfo() {
    var defer = $.Deferred(); //封装异步请求结果
    //执行查询（异步）
    AjaxService.get({
      url: SettingUrl.URL.store.loadShop,
      success: (data) => {
        defer.resolve(data.data);
      }
    });
    return defer.promise(); //返回异步请求休息
  }

  /**
   * 查询企业入驻状态
   * @param data （查询参数）
   */
  static loadStoreState() {
    var defer = $.Deferred(); //封装异步请求结果
    //执行查询（异步）
    AjaxService.get({
      url: SettingUrl.URL.enterprise.loadState,
      success: (data) => {
        defer.resolve(data.data);
      }
    });
    return defer.promise(); //返回异步请求休息
  }

  /**
   * 查询店铺状态
   * @param data （查询参数）
   */
  static loadShopState() {
    var defer = $.Deferred(); //封装异步请求结果
    //执行查询（异步）
    AjaxService.get({
      url: SettingUrl.URL.store.loadState,
      success: (data) => {
        defer.resolve(data.data);
      }
    });
    return defer.promise(); //返回异步请求休息
  }

}
