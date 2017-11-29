import { Injectable } from '@angular/core';
declare var $: any;
import {AjaxService} from "../../public/service/ajax.service";
import {SettingUrl} from "../../public/setting/setting_url";

@Injectable()
export class OrderService {

  constructor() { }

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

}
