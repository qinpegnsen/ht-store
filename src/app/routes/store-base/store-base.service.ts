import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {PatternService} from "../../public/service/pattern.service";
import {AjaxService} from "../../public/service/ajax.service";
import {SettingUrl} from "../../public/setting/setting_url";
import {NzNotificationService} from "ng-zorro-antd";
import {SettleStepsComponent} from "./settle-steps/settle-steps.component";
declare var $: any;

@Injectable()
export class StoreBaseService {

  constructor(public router: Router,
              public patterns: PatternService,
              public steps: SettleStepsComponent,
              public _notification: NzNotificationService) {
  }


  /**
   * 根据入驻步骤跳到相应页面
   * step （步骤名称）
   * param，路由参数，对象形式，如{code: '1243355'}
   */
  routerSkip(step, param?: any) {
    switch (step) {
      case 'register' ://注册
        this.router.navigate([SettingUrl.ROUTERLINK.basic.register], {replaceUrl: true})
        break;
      case 'baseInfo' ://企业基本信息
        //添加: queryParams: {sellerCode:611111111111111111}
        //修改: epCode: {epCode:649255483008294912}
        this.router.navigate([SettingUrl.ROUTERLINK.basic.baseInfo], {replaceUrl: true, queryParams: param})
        break;
      case 'accountInfo' ://企业银行账户信息
        //添加/修改: queryParams: {epCode:649255483008294912}
        this.router.navigate([SettingUrl.ROUTERLINK.basic.accountInfo], {replaceUrl: true, queryParams: param})
        break;
      case 'auditing' ://企业入驻已提交，待审核，审核通过，驳回
        //queryParams: {epCode:649255483008294912}
        this.router.navigate([SettingUrl.ROUTERLINK.basic.auditing], {replaceUrl: true, queryParams: param})
        break;
      case 'openShop' ://企业开通店铺
        //开通: queryParams: {epCode:649255483008294912,sellerCode:611111111111111111}
        //修改: queryParams: {storeCode:649530532714012672}
        this.router.navigate([SettingUrl.ROUTERLINK.basic.openShop], {replaceUrl: true, queryParams: param})
        break;
      case 'done' ://开店申请已提交，待审核，驳回
        //queryParams: {storeCode:649530532714012672}
        this.router.navigate([SettingUrl.ROUTERLINK.basic.done], {replaceUrl: true, queryParams: param})
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
          me.routerSkip('baseInfo',{sellerCode:res.data.sellerCode});
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
          me._notification.error(`出错了`, res.info)
        }
      },
      error: (res) => {
        me._notification.error(`接口出错了`, '接口调用失败')
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
          me.routerSkip('accountInfo', {epCode: res.data.epCode});
        } else {
          me._notification.error(`错误提示`, res.info)
        }
      },
      error: (res) => {
        me._notification.error(`错误提示`, '接口调用失败')
      }
    });
  }

  /**
   * 企业入驻——保存银行账户信息
   * @param data
   */
  enterpriseAccount(data) {
    const me = this;
    AjaxService.post({
      url: SettingUrl.URL.enterprise.save2,
      data: JSON.stringify(data),
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
        me._notification.error(`错误提示`, '接口调用失败')
      }
    });
  }

  /**
   * 企业入驻——保存银行账户信息
   * @param data
   */
  dredgeShop(data) {
    const me = this;
    AjaxService.post({
      url: SettingUrl.URL.store.saveStore,
      data: JSON.stringify(data),
      mask: true,
      contentType: "application/json",
      success: (res) => {
        if (res.success) {
          me.routerSkip('done');
        } else {
          me._notification.error(`错误提示`, res.info)
        }
      },
      error: (res) => {
        me._notification.error(`错误提示`, '接口调用失败')
      }
    });
  }

  /**
   * 查询企业信息
   * @param data （查询参数）
   */
  static loadStoreInfo(data: any) {
    var defer = $.Deferred(); //封装异步请求结果
    //执行查询（异步）
    AjaxService.get({
      url: SettingUrl.URL.enterprise.load,
      data: data,
      async: false,
      success: (data) => {
        if (data.success) defer.resolve(data.data);
      }
    });
    return defer.promise(); //返回异步请求休息
  }

  /**
   * 查询店铺信息
   * @param data （查询参数）
   */
  static loadShopInfo(data: any) {
    var defer = $.Deferred(); //封装异步请求结果
    //执行查询（异步）
    AjaxService.get({
      url: SettingUrl.URL.store.loadShop,
      data: data,
      success: (data) => {
        if (data.success) defer.resolve(data.data);
      }
    });
    return defer.promise(); //返回异步请求休息
  }

  /**
   * 查询企业入驻状态
   * @param data （查询参数）
   */
  static loadStoreState(data: any) {
    var defer = $.Deferred(); //封装异步请求结果
    //执行查询（异步）
    AjaxService.get({
      url: SettingUrl.URL.enterprise.loadState,
      data: data,
      async: false,
      success: (data) => {
        if (data.success) defer.resolve(data.data);
      }
    });
    return defer.promise(); //返回异步请求休息
  }

  /**
   * 查询店铺状态
   * @param data （查询参数）
   */
  static loadShopState(data: any) {
    var defer = $.Deferred(); //封装异步请求结果
    //执行查询（异步）
    AjaxService.get({
      url: SettingUrl.URL.store.loadState,
      data: data,
      async: false,
      success: (data) => {
        if (data.success) defer.resolve(data.data);
      }
    });
    return defer.promise(); //返回异步请求休息
  }

}
