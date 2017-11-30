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


  /**
   * 根据售后编号查询物流信息
   * @param data
   * @returns {any<T>} （查询参数）
   */
  static loadAfterTail(data:any) {
    var defer = $.Deferred(); //封装异步请求结果
    //执行查询（异步）
    AjaxService.get({
      url: SettingUrl.URL.after.loadAfterTail,
      data: data,
      success: (data) => {
        if (data.success) defer.resolve(data.data);
      }
    });
    return defer.promise(); //返回异步请求休息
  }

  /**
   * 根据售后编码查询详情
   * @param data
   * @returns {any<T>} （查询参数）
   */
  static loadReqByAfterNo(data:any) {
    var defer = $.Deferred(); //封装异步请求结果
    //执行查询（异步）
    AjaxService.get({
      url: SettingUrl.URL.after.loadReqByAfterNo,
      data: data,
      success: (data) => {
        if (data.success) defer.resolve(data.data);
      }
    });
    return defer.promise(); //返回异步请求休息
  }

  /**
   * 根据售后编号查询售后处理信息
   * @param data
   * @returns {any<T>} （查询参数）
   */
  static loadAfterTailList(data:any) {
    var defer = $.Deferred(); //封装异步请求结果
    //执行查询（异步）
    AjaxService.get({
      url: SettingUrl.URL.after.loadAfterTailList,
      data: data,
      success: (data) => {
        if (data.success) defer.resolve(data.data);
      }
    });
    return defer.promise(); //返回异步请求休息
  }

  /**
   * 平台处理用户的退款申请(同意/驳回)
   * @param data
   * @returns {any<T>} （查询参数）
   */
  static agreeRefundMoney(data:any) {
    var defer = $.Deferred(); //封装异步请求结果
    //执行查询（异步）
    AjaxService.post({
      url: SettingUrl.URL.after.agreeRefundMoney,
      data: data,
      success: (data) => {
        if (data.success) defer.resolve(data.data);
      }
    });
    return defer.promise(); //返回异步请求休息
  }

  /**
   * 平台处理用户的退货申请(同意/驳回)
   * @param data
   * @returns {any<T>} （查询参数）
   */
  static dealReturnGoods(data:any) {
    var defer = $.Deferred(); //封装异步请求结果
    //执行查询（异步）
    AjaxService.post({
      url: SettingUrl.URL.after.dealReturnGoods,
      data: data,
      success: (data) => {
        if (data.success) defer.resolve(data.data);
      }
    });
    return defer.promise(); //返回异步请求休息
  }

  /**
   * 平台验收用户退货(通过/驳回)
   * @param data
   * @returns {any<T>} （查询参数）
   */
  static checkRefundGoods(data:any) {
    var defer = $.Deferred(); //封装异步请求结果
    //执行查询（异步）
    AjaxService.post({
      url: SettingUrl.URL.after.checkRefundGoods,
      data: data,
      success: (data) => {
        if (data.success) defer.resolve(data.data);
      }
    });
    return defer.promise(); //返回异步请求休息
  }

}
