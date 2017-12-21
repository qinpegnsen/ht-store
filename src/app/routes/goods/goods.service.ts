import {Injectable} from "@angular/core";
import {AjaxService} from "../../public/service/ajax.service";
import {SettingUrl} from "../../public/setting/setting_url";
import {NzNotificationService} from "ng-zorro-antd";
import {isNullOrUndefined, isUndefined} from "util";

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
      dataType: 'json',
      complete: (res) => {
        defer.resolve(res.responseJSON);
      }
    });
    return defer.promise(); //返回异步请求休息
  }

  /**
   * 查询品牌列表
   */
  static queryBrandsList(data) {
    var defer = $.Deferred(); //封装异步请求结果
    AjaxService.get({
      url: SettingUrl.URL.goods.brandsList,
      data: data,
      complete: (res) => {
        defer.resolve(res.responseJSON);
      }
    });
    return defer.promise(); //返回异步请求休息
  }

  /**
   * 查询品牌数据
   */
  static loadBrandDataById(brandId) {
    var defer = $.Deferred(); //封装异步请求结果
    AjaxService.get({
      url: SettingUrl.URL.goods.loadBrand,
      data: {applyCode: brandId},
      success: (res) => {
        if (res.success) {
          defer.resolve(res.data);
        }
      }
    });
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
    let me = this, defer = $.Deferred(); //封装异步请求结果
    AjaxService.get({
      url: SettingUrl.URL.goods.pageDataAdd,
      data: {kindId: kindId},
      success: (res) => {
        if (res.success) {
          defer.resolve(res.data);
        } else {
          me._notification.error(res.info, res.info)
        }
      }
    })
    return defer.promise(); //返回异步请求信息
  }

  /**
   * 商品修改，获取基本数据
   */
  getPageDataEdit(goodsBaseCode) {
    let me = this, defer = $.Deferred(); //封装异步请求结果
    AjaxService.get({
      url: SettingUrl.URL.goods.pageDataEdit,
      data: {goodsBaseCode: goodsBaseCode},
      success: (res) => {
        if (res.success) {
          defer.resolve(res.data);
        } else {
          me._notification.error(res.info, res.info)
        }
      }
    })
    return defer.promise(); //返回异步请求信息
  }

  /**
   * 将分类数据转成级联选择数据的格式
   * @param list
   */
  transKindsAsCascaderData(parentId?: number) {
    if (isUndefined(parentId)) parentId = 0;
    let list = this.getKindList(parentId);
    let option = {}, items = [];
    for (let i = 0; i < list.length; i++) {
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
    let defer = $.Deferred(); //封装异步请求结果
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
   * 根据所选商品规格获得规格组合
   * @param requestData
   * @returns {any<T>}
   */
  getSkuData(requestData: any) {
    let me = this, defer = $.Deferred(); //封装异步请求结果
    AjaxService.post({
      url: SettingUrl.URL.goods.geneSku,
      data: JSON.stringify(requestData),
      contentType: "application/json",
      success: (res) => {
        if (res.success) {
          defer.resolve(res.data);
        } else {
          me._notification.error(res.status, res.statusText)
        }
      },
      error: (res) => {
        me._notification.error(res.status, res.statusText)
      }
    });
    return defer.promise(); //返回异步请求信息
  }


  /**
   *更改商品是否可用重消币
   * @param type
   * @param baseCode
   * @param curPage
   */
  changeIsUseCoin(requestData) {
    let me = this, defer = $.Deferred(); //封装异步请求结果,
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
   * 查商品评价信息列表
   * @param data （查询参数）
   */
  static commnetGoodsList(data: any) {
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

  /**
   * 上传文章编辑器图片
   * @param file
   */
  uploadImg = function (file: any) {
    let _this = this, ret: string, data: any = new FormData();
    data.append("limitFile", file);
    AjaxService.post({
      url: SettingUrl.URL.base.uploadHttpURL,
      data: data,
      async: false,
      cache: false,
      contentType: false,
      processData: false,
      success: (response) => {
        if (!isNullOrUndefined(response) && response.success) {
          ret = response.data;
        }
        if (!response.success) _this._notification.error(response.info, file.name + '上传失败')
      },
      error: (response) => {
        _this._notification.error(file.name + '上传失败', '')
      }
    });
    return ret;
  }


  /**
   * 查询模板/模板值列表
   * @param data
   * @returns {any<T>}
   */
  static freightList(data: any) {
    let defer = $.Deferred(); //封装异步请求结果
    //执行查询（异步）
    AjaxService.get({
      url: SettingUrl.URL.template.expressTpl,
      data: data,
      success: (data) => {
        if (data.success) defer.resolve(data.data);
      }
    });
    return defer.promise(); //返回异步请求休息
  }

  /**
   * 提交商品数据
   * @param requestData
   * @returns {any<T>}
   */
  saveGoods(requestData: any) {
    let me = this, defer = $.Deferred(); //封装异步请求结果
    AjaxService.post({
      url: SettingUrl.URL.goods.goodsSave,
      data: JSON.stringify(requestData),
      contentType: "application/json",
      success: (res) => {
        if (res.success) {
          defer.resolve(res.data);
        } else {
          me._notification.error(res.status, res.statusText)
        }
      },
      error: (res) => {
        me._notification.error(res.status, res.statusText)
      }
    });
    return defer.promise(); //返回异步请求信息
  }

  /**
   * 提交商品数据
   * @param requestData
   * @returns {any<T>}
   */
  addBrand(requestData: any) {
    let me = this, defer = $.Deferred(); //封装异步请求结果
    AjaxService.post({
      url: SettingUrl.URL.goods.addBrand,
      data: requestData,
      success: (res) => {
        if (res.success) {
          defer.resolve(res.success);
          me._notification.success('提交成功','申请已提交，请等待审核通过')
        } else {
          me._notification.error(res.status, res.statusText)
        }
      },
      error: (res) => {
        me._notification.error(res.status, res.statusText)
      }
    });
    return defer.promise(); //返回异步请求信息
  }

  /**
   * 删除品牌
   * @param data （查询参数）
   */
  static delBrand(data:any){
    let  me = this;
    var defer = $.Deferred(); //封装异步请求结果
    //执行查询（异步）
    AjaxService.del({
      url: SettingUrl.URL.goods.delBrand,
      data: data,
      async:false,
      success: (data) => {
        defer.resolve(data);
      },
      error:(data) => {
        defer.resolve(false);
      }
    });
    return defer.promise(); //返回异步请求休息
  }

  /**
   * 修改品牌
   */
 updateBrand(requestData: any) {
    let me = this, defer = $.Deferred(); //封装异步请求结果
    AjaxService.put({
      url: SettingUrl.URL.goods.upBrand,
      data: requestData,
      success: (res) => {
        if (res.success) {
          defer.resolve(res.success);
          me._notification.success('提交成功','申请已提交，请等待审核通过')
        } else {
          me._notification.error(res.status, res.statusText)
        }
      },
      error: (res) => {
        me._notification.error(res.status, res.statusText)
      }
    });
    return defer.promise(); //返回异步请求信息
  }
}
