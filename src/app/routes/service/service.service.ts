import { Injectable } from '@angular/core';
import {AjaxService} from "../../public/service/ajax.service";
import {SettingUrl} from "../../public/setting/setting_url";
declare var $: any;

@Injectable()
export class ServiceService {

  constructor() { }

  /**
   * 查询退款订单列表
   * @param data
   * @returns {any<T>} （查询参数）
   */
  static queryRefundOrd(data:any){
    var defer = $.Deferred(); //封装异步请求结果
    //执行查询（异步）
    AjaxService.get({
      url: SettingUrl.URL.after.RefundOrd,
      data: data,
      success: (data) => {
        if (data.success) defer.resolve(data.data);
      }
    });
    return defer.promise(); //返回异步请求休息
  }

}
