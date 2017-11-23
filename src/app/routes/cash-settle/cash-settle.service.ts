import {Injectable} from "@angular/core";
import {AjaxService} from "../../public/service/ajax.service";

@Injectable()
export class CashSettleService {

  constructor() {
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
