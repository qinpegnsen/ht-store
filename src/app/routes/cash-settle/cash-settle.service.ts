import {Injectable} from "@angular/core";
import {AjaxService} from "../../public/service/ajax.service";
import {SettingUrl} from "../../public/setting/setting_url";
import {NzNotificationService} from "ng-zorro-antd";
declare var $: any;

@Injectable()
export class CashSettleService {

  constructor(public _notification: NzNotificationService) {
  }

  /**
   * 查询结算信息列表
   * @param data （查询参数）
   */
  static cashSettleList(data:any){
    var defer = $.Deferred(); //封装异步请求结果
    //执行查询（异步）
    AjaxService.get({
      url: SettingUrl.URL.settle.plantSettle,
      data: data,
      success: (data) => {
        if (data.success) defer.resolve(data.data);
      }
    });
    return defer.promise(); //返回异步请求休息
  }

  /**
   * 查询提现信息列表
   * @param data （查询参数）
   */
  static settleList(data:any){
    var defer = $.Deferred(); //封装异步请求结果
    //执行查询（异步）
    AjaxService.get({
      url: SettingUrl.URL.settle.query,
      data: data,
      success: (data) => {
        if (data.success) defer.resolve(data.data);
      }
    });
    return defer.promise(); //返回异步请求休息
  }

  /**
   * 查询查询企业信息
   * @param data （查询参数）
   */
  static bankList(data:any){
    var defer = $.Deferred(); //封装异步请求结果
    //执行查询（异步）
    AjaxService.get({
      url: SettingUrl.URL.settle.bankCode,
      data: data,
      success: (data) => {
        if (data.success) defer.resolve(data.data);
      }
    });
    return defer.promise(); //返回异步请求休息
  }


  /**
   * 查询企业信息列表
   * @param data （查询参数）
   */
  static storeData(data:any){
    var defer = $.Deferred(); //封装异步请求结果
    //执行查询（异步）
    AjaxService.get({
      url: SettingUrl.URL.settle.agentBalance,
      data: data,
      success: (data) => {
        if (data.success) defer.resolve(data.data);
      }
    });
    return defer.promise(); //返回异步请求休息
  }

  /**
   * 提现信息
   * @param data （查询参数）
   */
  insertList(data:any){
    let  me = this;
    var defer = $.Deferred(); //封装异步请求结果
    //执行查询（异步）
    AjaxService.post({
      url: SettingUrl.URL.settle.insert,
      data: data,
      async:false,
      success: (data) => {
        if (data.success) me._notification.success('提现成功',data.info);
        else{me._notification.error('提现失败',data.info)}
      },
      error:(data) => {
        me._notification.error('提现失败', data.info)
      }
    });
    return defer.promise(); //返回异步请求休息
  }

}
