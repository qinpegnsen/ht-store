import {Util} from "../util/util";
import {AjaxService} from "./ajax.service";
import {SettingUrl} from "../setting/setting_url";
import {isNullOrUndefined} from "util";
import {AREA_LEVEL_2_JSON} from "../util/area_level_2";

declare var $: any;

export class MainService {

  constructor() {
  }

  /**
   * 根据类型标示获取枚举信息
   * @param code 类型标示（如：1001、1002、1003....）
   * @returns {any}
   */
  public static getEnumData = function (code) {
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

  /**
   * 根据区域编码查询区域（2级）
   * @param code  12位区域编码
   * @returns {any}
   */
  public static getAreaByTwelveBitCode(code) {
    let areaList = AREA_LEVEL_2_JSON;
    let level = this.getLevelByCode(code);
    if (level == 1) {
      for (let levelOneItem of areaList) {
        if (levelOneItem.areaCode == code) {
          return levelOneItem;
        }
      }
    } else if (level == 2) {
      let parentCode = code.substring(0, 2) + '0000000000';
      for (let area of areaList) {
        if (area.areaCode === parentCode) {
          for (let levelTwoItem of area.children) {
            if (levelTwoItem.areaCode == code) return levelTwoItem;
          }
        }
      }
    } else {
      return null
    }

  }

  /**
   * 12位的区域编码根据code查询级别
   * @param areaCode
   * @returns {number}
   */
  public static getLevelByCode(areaCode) {
    let level = 0;
    if (isNullOrUndefined(areaCode)) {
      return level;
    }
    areaCode = areaCode.toString();
    if (areaCode.length != 12) return level;
    if (areaCode.substr(2, 4) == '0000') level = 1;
    else if (areaCode.substr(4, 2) == '00') level = 2;
    else if (areaCode.substr(6, 6) == '000000') level = 3;
    else level = 4;
    return level;
  }

  /**
   * 获取指定年月下的周集合
   * @param data
   * @returns {any<T>}
   */
  static getWeekListByMonth(data: any) {
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
