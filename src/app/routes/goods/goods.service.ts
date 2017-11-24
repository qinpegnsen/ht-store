import {Injectable} from "@angular/core";
import {AjaxService} from "../../public/service/ajax.service";
import {SettingUrl} from "../../public/setting/setting_url";
import {NzNotificationService} from "ng-zorro-antd";
import {isUndefined} from "util";

declare var $: any;

@Injectable()
export class GoodsService {

  constructor(public _notification: NzNotificationService) {
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
  changeGoodsState(type, baseCode) {
    let result: boolean = false, me = this, requestUrl;
    switch (type) {
      case 'DOWN':    // 下架
        requestUrl = SettingUrl.URL.goods.downGoods;
        break;
      case 'STOP':    // 禁售
        requestUrl = SettingUrl.URL.goods.banGoods;
        break;
      case 'NORMAL':  // 申请上架
        requestUrl = SettingUrl.URL.goods.putAwayGoods;
        break;
      case 'BAN':     // 解除禁售
        requestUrl = SettingUrl.URL.goods.relieveBanGoods;
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

}
