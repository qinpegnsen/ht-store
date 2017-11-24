import {Injectable} from "@angular/core";
import {AjaxService} from "../../public/service/ajax.service";
import {SettingUrl} from "../../public/setting/setting_url";
declare var $: any;

@Injectable()
export class CashSettleService {

  constructor() {
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
   * get方法
   * @param url
   * @param data
   */
  public static getSettle(url, data) {
    let result;
    AjaxService.get({
      url: url,
      data: data,
      async: false,
      success: (data) => {
        let info = data.info;
        if (data.success) {
          result = data.data;
          console.log("result---",result);
        } else {
        }
      },
      error: (res) => {
        console.log("█ \"这里出错了，请注意了！！！！\" ►►►", "这里出错了，请注意了！！！！");
      }
    });
    return result;
  }

  /**
   * post方法
   * @param url
   * @param data
   * @returns {any}
   */
  public static getInsert(url, data) {
    let me = this, result;
    AjaxService.post({
      url: url,
      data: data,
      async: false,
      success: (res) => {
        if (res.success) {
          result = res.data;
        } else {
        }
      },
      error: (res) => {
        console.log("█ \"这里出错了，请注意了！！！！\" ►►►", "这里出错了，请注意了！！！！");
      }
    })
    return result;
  }
}
