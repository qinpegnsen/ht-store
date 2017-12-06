import {Injectable} from '@angular/core';
import {AjaxService} from "../../public/service/ajax.service";
import {SettingUrl} from "../../public/setting/setting_url";
import {NzNotificationService} from "ng-zorro-antd";
declare var $: any;

@Injectable()
export class RedPacketService {

  constructor(public _notification: NzNotificationService) {
  }

  /**
   * 查询投放记录列表
   * @param data
   * @returns {any<T>} （查询参数）
   */
  pushOrDerList(data: any) {
    var defer = $.Deferred(); //封装异步请求结果
    //执行查询（异步）
    AjaxService.get({
      url: SettingUrl.URL.rpAccountRec.queryRec,
      data: data,
      success: (data) => {
        if (data.success) {
          defer.resolve(data.data);
        } else {
          this._notification.error(data.info, data.info);
        }
      }
    });
    return defer.promise(); //返回异步请求休息
  }


  /**
   * 企业红包的统计
   * @param data
   * @returns {any<T>} （查询参数）
   */
  rpStatistics(data: any) {
    var defer = $.Deferred(); //封装异步请求结果
    //执行查询（异步）
    AjaxService.get({
      url: SettingUrl.URL.rpAccountRec.querySta,
      data: data,
      success: (data) => {
        if (data.success) {
          defer.resolve(data.data);
        } else {
          this._notification.error(data.info, data.info);
        }
      }
    });
    return defer.promise(); //返回异步请求休息
  }

}
