import {Injectable} from '@angular/core';
import {AjaxService} from "../../public/service/ajax.service";
import {SettingUrl} from "../../public/setting/setting_url";
import {NzNotificationService} from "ng-zorro-antd";
import {isNullOrUndefined, isUndefined} from "util";

@Injectable()
export class GoodsService {

  constructor(public _notification: NzNotificationService) {
  }

  /**
   * 查询商品列表
   */
  queryGoodsList(data) {
    let result, me = this;
    AjaxService.get({
      url: SettingUrl.URL.goods.goodsQuery,
      data: data,
      async: false,
      success: (res) => {
        if (res.success) {
          result = res.data;
        } else {
          me._notification.error(res.info, res.info)
        }
      },
      error: (res) => {
        me._notification.error(res.status, res.statusText)
      }
    })
    return result;
  }


  /**
   * 获取分类列表
   */
  getKindList(parentId?: number) {
    let result = [], me = this;
    if (isUndefined(parentId)) parentId = 0;
    AjaxService.get({
      url: SettingUrl.URL.goods.getGoodsKinds,
      data: {kindParentId: parentId},
      async: false,
      success: (res) => {
        if (res.success) {
          result = res.data;
        } else {
          me._notification.error(res.info, res.info)
        }
      },
      error: (res) => {
        me._notification.error(res.status, res.statusText)
      }
    })
    return result;
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
  changeGoodsState(myUrl, baseCode) {
    let result: boolean = false, me = this;
    AjaxService.put({
      url: myUrl,
      data: {goodsBaseCode: baseCode},
      async: false,
      success: (res) => {
        if (res.success) {
          result = true;
        } else {
          me._notification.error(res.info, res.info)
        }
      },
      error: (res) => {
        me._notification.error(res.status, res.statusText)
      }
    })
    return result;
  }

}
