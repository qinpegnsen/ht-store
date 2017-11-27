import { Injectable } from '@angular/core';
import {AjaxService} from "../../public/service/ajax.service";
import {SettingUrl} from "../../public/setting/setting_url";
declare var $: any;

@Injectable()
export class RedPacketService {

  constructor() { }

  /**
   * 查询投放记录列表
   * @param data
   * @returns {any<T>} （查询参数）
   */
   static pushOrDerList(data:any){
    var defer = $.Deferred(); //封装异步请求结果
    //执行查询（异步）
    AjaxService.get({
      url: SettingUrl.URL.rpAccountRec.queryRec,
      data: data,
      success: (data) => {
        if (data.success) defer.resolve(data.data);
      }
    });
    return defer.promise(); //返回异步请求休息
  }

  /**
   * 获取指定年月下的周集合
   * @param data
   * @returns {any<T>}
   */
  static getWeekListByMonth(data:any) {
    var defer = $.Deferred(); //封装异步请求结果
    //执行查询（异步）
    AjaxService.get({
      url: SettingUrl.URL.statistical.getWeekList,
      data: data,
      success: (data) => {
        if (data.success) defer.resolve(data.data);
      }
    });
    return defer.promise(); //返回异步请求休息
  }

}
