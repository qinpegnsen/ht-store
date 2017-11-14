import {Util} from "../util/util";
import {AjaxService} from "./ajax.service";
import {SettingUrl} from "../setting/setting_url";
import {isNullOrUndefined} from "util";

export class MainService {

  constructor() {
  }

  /**
   * 根据类型标示获取枚举信息
   * @param code 类型标示（如：1001、1002、1003....）
   * @returns {any}
   */
  public static getEnumData = function (code) {
    let _this = this;
    if (!Util.enumData.hasOwnProperty(code)) {
      AjaxService.get({
        async: false,
        url: SettingUrl.URL.base.enum + code,
        success: function (result) {
          if (isNullOrUndefined(result)) return ''; else Util.enumData[code] = result;
        }
      });
    }
    return Util.enumData[code];
  }

  /**
   * 根据类型标示获取枚举list信息
   * code 类型标示（如：1001、1002、1003....）
   * @param code
   * @returns {Array<any>}
   */
  public static getEnumDataList = function (code) {
    let list: Array<any> = new Array<any>();
    let enumInfo = this.getEnumData(code);
    for (let prop in enumInfo) {
      if (enumInfo.hasOwnProperty(prop)) {
        list.push({'key': prop, 'val': enumInfo[prop]});
      }
    }
    return list;
  }

  /**
   * 根据类型标示和key获取信息值
   * @param code （如：1001、1002、1003....）
   * @param key （如：ILLNESSCASE、TYPELESS、NURSING....）
   * @returns {any}
   */
  public static getEnumDataValByKey = function (code, key) {
    let enumData = this.getEnumData(code);
    if (enumData != null && enumData !== '' && enumData !== undefined) {
      if (enumData[key] != null && enumData[key] !== '' && enumData[key] !== undefined) {
        return enumData[key];
      } else {
        return '';
      }
    } else {
      return '';
    }
  };

  /**
   * 获取上传文件的uid
   * @returns {any}
   */
  public static uploadUid = function () {
    let _this = this, uid;
    AjaxService.get({
      url: SettingUrl.URL.base.uuid,
      async: false,
      success: (res) => {
        if (res.success) uid = res.data;
      }
    });
    return uid;
  }
}
