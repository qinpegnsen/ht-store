import {Injectable} from '@angular/core';
import {AjaxService} from "../../public/service/ajax.service";
import {SettingUrl} from "../../public/setting/setting_url";

@Injectable()
export class HomeService {

  constructor() {
  }

  /**
   * 呼吸孔消息提示，用于首页顶部呼吸孔提示（待发货、申请退款、申请退货）
   * 查询正确时，返回结果格式：{deliverGoods: ?, refundGoods: ?, refund: ?}
   * 查询异常时，返回结果格式：{deliverGoods: 0, refundGoods: 0, refund: 0}
   */
  static storeOrdCustomerStatistics() {
    let ret = {deliverGoods: 0, refundGoods: 0, refund: 0};
    //执行查询
    AjaxService.get({
      url: SettingUrl.URL.home.storeOrdCustomerStatistics,
      async: false,
      success: (res) => {
        if (res.success) ret = res.data;
      }
    });
    return ret; //返回请求信息
  }

  /**
   * 首页信息汇总提示（商品数、待发货订单数、已完成订单数，红包广告投放次数，红包广告总点击数，账户余额）
   * 查询正确时，返回结果格式：{goods: ?, deliverGoods: ?, redPackClick: ?, staff: ?, completedGoods: ?, redPack: ?}
   * 查询异常时，返回结果格式：{goods: 0, deliverGoods: 0, redPackClick: 0, staff: 0, completedGoods: 0, redPack: 0}
   */
  static storeStatistics() {
    let ret = {goods: 0, deliverGoods: 0, redPackClick: 0, money: 0, completedGoods: 0, redPack: 0};
    //执行查询
    AjaxService.get({
      url: SettingUrl.URL.home.storeStatistics,
      async: false,
      success: (res) => {
        if (res.success) ret = res.data;
      }
    });
    return ret; //返回请求信息
  }

  /**
   * 查询近一周订单的信息统计（已完成、退款、退货）
   * 查询正确时，返回结果格式：
   {
    "orders": {
      "keys": [
        "12-06",
        "12-07",
        "12-08",
        "12-09",
        "12-10",
        "12-11",
        "12-12"
      ],
      "yaxis": [
        "7",
        "7",
        "25",
        "14",
        "0",
        "22",
        "0"
      ]
    }，
    "refund": {
      "keys": [
        "12-06",
        "12-07",
        "12-08",
        "12-09",
        "12-10",
        "12-11",
        "12-12"
      ],
      "yaxis": [
        "7",
        "7",
        "25",
        "14",
        "0",
        "22",
        "0"
      ]
    }，
    "returnGoods": {
      "keys": [
        "12-06",
        "12-07",
        "12-08",
        "12-09",
        "12-10",
        "12-11",
        "12-12"
      ],
      "yaxis": [
        "7",
        "7",
        "25",
        "14",
        "0",
        "22",
        "0"
      ]
    }
  }
   * 查询异常时，返回结果格式：null
   */
  static storeTreeGraphStatistics() {
    let ret = null;
    //执行查询
    AjaxService.get({
      url: SettingUrl.URL.home.storeTreeGraphStatistics,
      async: false,
      success: (res) => {
        if (res.success) ret = res.data;
      }
    });
    return ret; //返回请求信息
  }

  /**
   * 获取企业基础信息
   * @param {string} code
   * @returns {any}
   */
  static loadInfoByCode(code: string) {
    let ret = null;
    //执行查询
    AjaxService.get({
      url: SettingUrl.URL.home.storeInfo,
      data: {code: code},
      async: false,
      success: (res) => {
        if (res.success) ret = res.data;
      }
    });
    return ret; //返回请求信息
  }

}
