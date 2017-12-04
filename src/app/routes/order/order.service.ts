import { Injectable } from '@angular/core';
declare var $: any;
import {AjaxService} from "../../public/service/ajax.service";
import {SettingUrl} from "../../public/setting/setting_url";
import {NzNotificationService} from "ng-zorro-antd";

@Injectable()
export class OrderService {

  constructor(public _notification: NzNotificationService) { }

  /**
   * 查询订单列表
   * @param data
   * @returns {any<T>}
   */
  static queryOrderList(data:any) {
    var defer = $.Deferred(); //封装异步请求结果
    //执行查询（异步）
    AjaxService.get({
      url: SettingUrl.URL.order.queryOrdAdmin,
      data: data,
      success: (data) => {
        if (data.success) defer.resolve(data.data);
      }
    });
    return defer.promise(); //返回异步请求休息
  }

  /**
   * 查询获取物流gon列表
   * @param data （查询参数）
   */
  static auditsList(){
    var defer = $.Deferred(); //封装异步请求结果
    //执行查询（异步）
    AjaxService.get({
      url: SettingUrl.URL.order.getKeywords,
      data: '',
      success: (data) => {
        if (data.success) defer.resolve(data.data);
      }
    });
    return defer.promise(); //返回异步请求休息
  }

  /**
   * 查询获取物流gon列表
   * @param data （查询参数）
   */
  canceslOrder(getOrdno,expressNos,expressCode) {
    let me = this, defer = $.Deferred(), //封装异步请求结果,
      requestData = {
        'ordno': getOrdno,
        'expressNo': expressNos,
        'expressCode': expressCode
      };
    AjaxService.put({
      url: SettingUrl.URL.order.storeDelivery,
      data: requestData,
      success: (res) => {
        defer.resolve(res);
      },
      error: (res) => {
        me._notification.error(`失败`, '发货失败');
      }
    })
    return defer.promise(); //返回异步请求信息
  }
}
