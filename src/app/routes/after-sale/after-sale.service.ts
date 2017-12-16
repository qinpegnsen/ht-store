import {Injectable} from '@angular/core';
import {AjaxService} from "../../public/service/ajax.service";
import {SettingUrl} from "../../public/setting/setting_url";
import {NzNotificationService} from "ng-zorro-antd";
import {Setting} from "../../public/setting/setting";
declare var $: any;

@Injectable()
export class AfterSaleService {

  constructor(public _notification: NzNotificationService) {
  }

  /**
   * 查询退款订单列表
   * @param data
   * @returns {any<T>} （查询参数）
   */
  queryRefundOrd(data: any) {
    var defer = $.Deferred(); //封装异步请求结果
    //执行查询（异步）
    AjaxService.get({
      url: SettingUrl.URL.after.RefundOrd,
      data: data,
      success: (res) => {
        if (res.success) {
          defer.resolve(res.data)
        }
      }
    });
    return defer.promise(); //返回异步请求消息
  }

  /**
   * 查询退货订单列表
   * @param data
   * @returns {any<T>} （查询参数）
   */
  queryReturnGoodsOrd(data: any) {
    var defer = $.Deferred(); //封装异步请求结果
    //执行查询（异步）
    AjaxService.get({
      url: SettingUrl.URL.after.RefundOrd,
      data: data,
      success: (res) => {
        if (res.success) {
          defer.resolve(res.data)
        }
      }
    });
    return defer.promise(); //返回异步请求消息
  }


  /**
   * 根据售后编号查询物流信息
   * @param data
   * @returns {any<T>} （查询参数）
   */
  loadAfterTail(data: any) {
    var defer = $.Deferred(); //封装异步请求结果
    //执行查询（异步）
    AjaxService.get({
      url: SettingUrl.URL.after.loadAfterTail,
      data: data,
      success: (res) => {
        if (res.success) {
          defer.resolve(res.data)
        }
      }
    });
    return defer.promise(); //返回异步请求消息
  }

  /**
   * 根据售后编码查询详情
   * @param data
   * @returns {any<T>} （查询参数）
   */
  loadReqByAfterNo(data: any) {
    var defer = $.Deferred(); //封装异步请求结果
    //执行查询（异步）
    AjaxService.get({
      url: SettingUrl.URL.after.loadReqByAfterNo,
      data: data,
      success: (res) => {
        if (res.success) {
          defer.resolve(res.data);
        }
      }
    });
    return defer.promise(); //返回异步请求消息
  }

  /**
   * 根据售后编号查询售后处理信息
   * @param data
   * @returns {any<T>} （查询参数）
   */
  loadAfterTailList(data: any) {
    var defer = $.Deferred(); //封装异步请求结果
    //执行查询（异步）
    AjaxService.get({
      url: SettingUrl.URL.after.loadAfterTailList,
      data: data,
      success: (res) => {
        if (res.success) {
          defer.resolve(res.data);
        }
      }
    });
    return defer.promise(); //返回异步请求消息
  }

  /**
   * 平台处理用户的退款申请(同意/驳回)
   * @param data
   * @returns {any<T>} （查询参数）
   */
  agreeRefundMoney(data: any) {
    let defer = $.Deferred(), me = this; //封装异步请求结果
    //执行查询（异步）
    AjaxService.post({
      url: SettingUrl.URL.after.agreeRefundMoney,
      data: data,
      success: (res) => {
        if (res.success) {
          defer.resolve(res.data);
        }else{
          if(Setting.AJAX.failText==res.info){
            me._notification.error(Setting.AJAX.errorTip,'');
          }else{
            me._notification.error(res.info,'');
          }
        }
      },
      error: () => {
        me._notification.error(Setting.AJAX.errorTip,'');
      }
    });
    return defer.promise(); //返回异步请求消息
  }

  /**
   * 平台处理用户的退货申请(同意/驳回)
   * @param data
   * @returns {any<T>} （查询参数）
   */
  dealReturnGoods(data: any) {
    let defer = $.Deferred(),me=this; //封装异步请求结果
    //执行查询（异步）
    AjaxService.post({
      url: SettingUrl.URL.after.dealReturnGoods,
      data: data,
      success: (res) => {
        if (res.success) {
          defer.resolve(res.data);
        }else{
          if(Setting.AJAX.failText==res.info){
            me._notification.error(Setting.AJAX.errorTip,'');
          }else{
            me._notification.error(res.info,'');
          }
        }
      },
      error: () => {
        me._notification.error(Setting.AJAX.errorTip,'');
      }
    });
    return defer.promise(); //返回异步请求消息
  }

  /**
   * 平台验收用户退货(通过/驳回)
   * @param data
   * @returns {any<T>} （查询参数）
   */
  checkRefundGoods(data: any) {
    let defer = $.Deferred(),me=this; //封装异步请求结果
    //执行查询（异步）
    AjaxService.post({
      url: SettingUrl.URL.after.checkRefundGoods,
      data: data,
      success: (res) => {
        if (res.success) {
          defer.resolve(res.data);
        }else{
          if(Setting.AJAX.failText==res.info){
            me._notification.error(Setting.AJAX.errorTip,'');
          }else{
            me._notification.error(res.info,'');
          }
        }
      },
      error: () => {
        me._notification.error(Setting.AJAX.errorTip,'');
      }
    });
    return defer.promise(); //返回异步请求消息
  }
}
