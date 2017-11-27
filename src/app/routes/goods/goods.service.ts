import {Injectable} from "@angular/core";
import {AjaxService} from "../../public/service/ajax.service";
import {SettingUrl} from "../../public/setting/setting_url";
import {NzMessageService, NzNotificationService} from "ng-zorro-antd";
import {isUndefined} from "util";

declare var $: any;

@Injectable()
export class GoodsService {

  constructor(public _notification: NzNotificationService,
              public _message: NzMessageService) {
  }

  /**
   * 查询商品列表
   */
  static queryGoodsList(data) {
    var defer = $.Deferred(); //封装异步请求结果
    AjaxService.get({
      url: SettingUrl.URL.goods.goodsQuery,
      data: data,
      success: (res) => {
        if (res.success) {
          defer.resolve(res.data);
        }
      }
    })
    return defer.promise(); //返回异步请求休息
  }

  /**
   * 获取分类列表
   */
  getKindList(parentId?: number) {
    let result;
    if (isUndefined(parentId)) parentId = 0;
    AjaxService.get({
      url: SettingUrl.URL.goods.getGoodsKinds,
      data: {kindParentId: parentId},
      async: false,//改成同步请求
      success: (res) => {
        if (res.success) {
          result = res.data;
        }
      }
    })
    return result; //返回异步请求信息
  }

  /**
   * 商品发布，获取基本数据
   */
  getPageDataAdd(kindId) {
    let result, me = this;
    AjaxService.get({
      url: SettingUrl.URL.goods.pageDataAdd,
      data: {kindId: kindId},
      success: (res) => {
        if (res.success) {
          result = res.data;
        } else {
          me._notification.error(res.info, res.info)
        }
      }
    })
    return result; //返回异步请求信息
  }

  /**
   * 商品发布，获取基本数据
   */
  getPageDataEdit(goodsBaseCode) {
    let result, me = this;
    AjaxService.get({
      url: SettingUrl.URL.goods.pageDataEdit,
      data: {goodsBaseCode: goodsBaseCode},
      success: (res) => {
        if (res.success) {
          result = res.data;
        } else {
          me._notification.error(res.info, res.info)
        }
      }
    })
    return result; //返回异步请求信息
  }

  /**
   * 将分类数据转成级联选择数据的格式
   * @param list
   */
  transKindsAsCascaderData(parentId?: number) {
    if (isUndefined(parentId)) parentId = 0;
    let list = this.getKindList(parentId);
    let option = {}, items = [];
    for (var i = 0; i < list.length; i++) {
      option = {
        label: list[i].kindName,
        value: list[i].id,
        isLeaf: !list[i].haveChildren
      }
      items.push(option);
    }
    return items;
  }

  /**
   * 修改商品状态
   */
  changeGoodsState(type: string, baseCode: string) {
    let me = this, requestUrl;
    switch (type) {
      case 'down':    // 下架
        requestUrl = SettingUrl.URL.goods.downGoods;
        break;
      case 'stop':    // 禁售
        requestUrl = SettingUrl.URL.goods.stopGoods;
        break;
      case 'normal':  // 申请上架
        requestUrl = SettingUrl.URL.goods.putAwayGoods;
        break;
      case 'relieve':     // 解除禁售
        requestUrl = SettingUrl.URL.goods.relieveGoods;
        break;
    }
    var defer = $.Deferred(); //封装异步请求结果
    AjaxService.put({
      url: requestUrl,
      data: {goodsBaseCode: baseCode},
      success: (res) => {
        if (res.success) {
          defer.resolve(res.success);
        } else {
          me._notification.error(res.info, res.info)
        }
      }
    })
    return defer.promise(); //返回异步请求信息
  }

  /**
   * 查看商品所有规格
   */
  loadSkuGoods(baseCode) {
    let defer = $.Deferred(); //封装异步请求结果
    AjaxService.get({
      url: SettingUrl.URL.goods.loadSkuGoods,
      data: {goodsBaseCode: baseCode},
      success: (res) => {
        if (res.success) {
          defer.resolve(res.data);
        }
      }
    })
    return defer.promise(); //返回异步请求信息
  }


  /**
   *更改商品是否可用重消币
   * @param type
   * @param baseCode
   * @param curPage
   */
  changeIsUseCoin(isUseCoin, baseCode) {
    let me = this, defer = $.Deferred(), //封装异步请求结果,
      requestData = {
        goodsBaseCode: baseCode,
        isUseCoin: isUseCoin
      };
    AjaxService.put({
      url: SettingUrl.URL.goods.updateIsUseCoin,
      data: requestData,
      success: (res) => {
        defer.resolve(res);
      },
      error: (res) => {
        me._notification.error(res.status, res.statusText)
      }
    })
    return defer.promise(); //返回异步请求信息
  }


  /**
   * 查询提现信息列表
   * @param data （查询参数）
   */
  static settleList(data:any){
    var defer = $.Deferred(); //封装异步请求结果
    //执行查询（异步）
    AjaxService.get({
      url: SettingUrl.URL.goods.commnetGoods,
      data: data,
      success: (data) => {
        if (data.success) defer.resolve(data.data);
      }
    });
    return defer.promise(); //返回异步请求休息
  }
}
