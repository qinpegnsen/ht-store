import {Component, OnInit} from "@angular/core";
import {PublishComponent} from "../publish.component";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {GoodsService} from "../../goods.service";
import {isNull, isNullOrUndefined, isUndefined} from "util";
import {FileUploader} from "ng2-file-upload";
import {PatternService} from "../../../../public/service/pattern.service";
import {Util} from "../../../../public/util/util";
import {SettingUrl} from "../../../../public/setting/setting_url";
import {Setting} from "../../../../public/setting/setting";
import {NzNotificationService} from "ng-zorro-antd";
declare var $: any;

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  public ngValidateStatus = Util.ngValidateStatus;
  public ngValidateErrorMsg = Util.ngValidateErrorMsg;
  public valitateState: any = Setting.valitateState;//表单验证状态
  public enumState = Setting.ENUMSTATE;   //枚举
  public path: string;                  // 当前路径
  public changed: boolean = false;      // 是否有修改商品内容
  public brandsList: any;               // 品牌列表
  public unitList: any;                 // 计量单位列表
  public goodsBaseCode: string;         //商品基本编码
  public baseAttrList: any;             // 商品基本属性列表
  public saleAttrList: any;             // 所有规格数据,商品销售属性列表
  public skuAttr: Array<any> = new Array();//属性列表
  public logistics: any;                  // 物流规则列表
  public tplVals: any;                    // 运费模板内容
  public unit: string = '件';             // 运费价格单位
  public skuImg: any = {                  // 图片属性
    vals: []
  };
  public goodsImgList: any = {};          // 商品上传图片列表
  public oldImgs: any = {};               // 商品已经有的图片列表
  public mblItemList: Array<any> = new Array();//手机端上传后的图片集合
  public set: any = {};                   //批量设置
  public goodsEditData: any;           // 修改商品时商品的原有数据
  public publishData: any = {};         // 商品发布数据
  public patterns: any;  //正则
  public maxFixedFreight = Setting.maxFixedFreight;
  public ckEditerConfig = {
    toolbarGroups: [
      {name: 'links'},
      {name: 'insert'},
      {name: 'tools'},
      {name: 'basicstyles', groups: ['basicstyles']}
    ],
    height: 420,//编辑器高度
    removeButtons: 'Anchor,SpecialChar,Subscript,Superscript',
    contentsCss: 'body img{max-width: 100%;}'
  }

  constructor(public publishComponent: PublishComponent,
              public location: Location,
              public goodsService: GoodsService,
              public patternService: PatternService,
              public _notification: NzNotificationService,
              public route: ActivatedRoute,
              public router: Router) {
    this.publishComponent.step = 1;
    this.patterns = this.patternService;
    const me = this;
    me.route.url.subscribe(paths => {
      me.path = paths[0].path;
      switch (me.path) {
        case "edit":  //编辑商品详情
          me.publishData.kindId = me.route.snapshot.queryParams['kindId'];
          me.publishData.kindSelectName = me.route.snapshot.queryParams['choosedKind'];
          if (me.publishData.kindId) me.getPageData();
          else me.location.back();
          break;
        case "update":  //修改商品详情
          me.goodsBaseCode = me.route.snapshot.queryParams['baseCode'];
          if (me.goodsBaseCode) me.getPageData();
          break;
      }
    })
  }

  ngOnInit() {
    const me = this;
    $(function () {
      //当点击批量修改价格的按钮时
      $('.sku-table').on('click', '.s-menu', function () {
        $(this).next().slideToggle(50)
      });
    })
  }

  /**
   * 获取发布页面所需数据
   */
  public getPageData() {
    let me = this, pageData;
    if (me.path == 'edit') {
      $.when(this.goodsService.getPageDataAdd(me.publishData.kindId)).done(data => {
        if (data) {
          me.allotPageData(data); //分配获取的页面数据
          /*设置默认值*/
          me.publishData.goodsBaseCode = data.goodsBaseCode;  // 商品基本编码
          me.publishData.isFreight = me.enumState.no;
          me.publishData.haveGift = me.enumState.yes;
          me.publishData.isJoinLimitime = me.enumState.yes;
          me.publishData.goodsExpressInfo = {
            freightType: Setting.ENUMSTATE.freightType.fixed,
            fixedFreight: null,
            expressTplId: null,
            weight: 1.00,
            volume: 1.00
          }
        }
      })
    } else if (me.path == 'update') {
      me.getExpressTpl();// 获取运费模板
      $.when(this.goodsService.getPageDataEdit(me.goodsBaseCode)).done(data => {
        if (data) {
          me.allotPageData(data); //分配获取的页面数据
          me.goodsEditData = data.goodsSave;//赋值
          me.publishData = data.goodsSave;//赋值
          me.checkedBaseAttr();           //已选中的基本属性
          if (isNullOrUndefined(me.publishData.goodsExpressInfo)) {
            me.publishData.goodsExpressInfo = {
              freightType: null,
              fixedFreight: null,
              expressTplId: null,
              weight: 1.00,
              volume: 1.00
            };
          } else if (!isNullOrUndefined(me.publishData.goodsExpressInfo.expressTplId)) {
            me.getTplValById(); //根据物流模板ID获取模板值
          }
          me.genClearArray(me.goodsEditData.goodsSkuList);    // 生成所选属性组合
          me.genImgSku();       //已选中属性的图片组
          me.genTempGoodsImgsList();  // 将商品的图片组生成me.goodsImgList一样的数据，方便后续追加图片
        }
      })
    }
  }

  /**
   * 分配获取的页面数据
   * @param pageData
   */
  public allotPageData(pageData) {
    let me = this;
    me.baseAttrList = pageData.baseAttrList;      // 商品基本属性
    me.unitList = pageData.unitList;              // 计量单位
    me.brandsList = pageData.brandList;           // 品牌列表
    me.saleAttrList = pageData.saleAttrList;      // 规格
  }

  /**
   * update 修改时 选中已选中的基本属性
   */
  checkedBaseAttr() {
    let me = this;
    me.goodsEditData.goodsBaseAttrList.forEach(val => {
      me.baseAttrList.forEach(item => {
        item.goodsEnumValList.forEach(attr => {
          if (attr.id == val.value) item.checkedId = attr.id;
        })
      })
    })
  }

//添加物流模板
  addLogisticsModule() {
    window.open(SettingUrl.ROUTERLINK.goods.addTpl);
  }

//查看物流模板
  lookLogisticsModule() {
    window.open(SettingUrl.ROUTERLINK.goods.lookTpl);
  }

  /**
   * 获取运费模板
   */
  getExpressTpl() {
    let me = this;
    $.when(GoodsService.freightList()).done(res => {
      if (res) me.logistics = res; //赋值
    })
  }

  /**
   * 根据运费模板ID获取模板内容
   * @param tplId
   */
  getTplValById() {
    let me = this, tplId = me.publishData.goodsExpressInfo.expressTplId;
    let result = me.getTplVal(tplId);
    if (!isNullOrUndefined(result)) me.tplVals = result;
    if (!isNullOrUndefined(me.tplVals)) {
      if (me.tplVals.valuationType == Setting.ENUMSTATE.valuationType.weight) {
        me.unit = 'm³'
      } else if (me.tplVals.valuationType == Setting.ENUMSTATE.valuationType.volume) {
        me.unit = 'kg'
      } else {
        me.unit = '件'
      }
    } else {
      me.publishData.isFreight = Setting.ENUMSTATE.no;
      me.publishData.goodsExpressInfo = {
        freightType: null,
        fixedFreight: null,
        expressTplId: null,
        weight: 1.00,
        volume: 1.00
      };
    }
  }

  /**
   * 根据运费模板ID获取运费模板值
   * @param tplId   运费模板ID
   * @returns {any}   运费模板值
   */
  public getTplVal(tplId) {
    let me = this;
    for (let tpl of me.logistics) {
      if (tpl.id == tplId) {
        return tpl;
      }
    }
  }

  /**
   * update将商品的图片组生成me.goodsImgList一样的数据，方便后续追加图片
   * 同时生成一个老图片对象，用于显示与修改老图片
   */
  public genTempGoodsImgsList() {
    let me = this, list = me.goodsEditData.goodsImagesList;
    list.forEach((item) => {
      if (isUndefined(me.oldImgs[item.valCode])) me.oldImgs[item.valCode] = new Array();            // 检测对象中是否已经有了这个属性值对象，如果没有，给它一个空数组
      if (isUndefined(me.goodsImgList[item.valCode])) me.goodsImgList[item.valCode] = new Array();  // 检测对象中是否已经有了这个属性值对象，如果没有，给它一个空数组
      me.oldImgs[item.valCode].push(item.goodsImage);       // 往老图片组中添加这个图片
      me.goodsImgList[item.valCode].push(item.goodsImage);  // 往总图片组中添加这个图片
    });
  }

  /**
   * 改变/选择规格属性与值时生成新的sku
   * @param obj DOM节点
   */
  changeSpecVal(index) {
    let me = this;
    me.genObject(index);           //生成选中的数据对象
    if (index == 0) me.genImgSku();  // 如果是第一个规格，则改变图片列表的选值数组
  }

  /**
   * 如果是第一个规格，则改变图片列表的选值数组
   * @param $obj
   */
  public genImgSku() {
    let me = this, checkedAttrNum: number = 0;
    let curCheckedAttr = me.saleAttrList[0];
    for (let i = 0; i < curCheckedAttr.goodsEnumValList.length; i++) {
      let checkedEnumItem = curCheckedAttr.goodsEnumValList[i];
      if (checkedEnumItem.checked) {
        checkedAttrNum += 1;
        if (me.checkImgListIfHadGroup(1 + '' + (i + 1)).isHad) {
          let groupId = me.checkImgListIfHadGroup(1 + '' + (i + 1)).groupId;
          me.skuImg.vals[groupId].valName = checkedEnumItem.enumValue;
        } else {
          let obj = {
            attrCode: 1,
            valCode: 1 + '' + (i + 1),
            valName: checkedEnumItem.enumValue,
            idx: checkedEnumItem.idx,
            uploader: new FileUploader({
              url: SettingUrl.URL.goods.goodsUploadRetUrl,
              itemAlias: "limitFile",
              allowedFileType: ["image"]
            })
          };
          me.skuImg.vals.push(obj);
        }
      } else {      // 取消选中
        let skuImgAry = me.skuImg.vals;
        for (let k = 0; k < skuImgAry.length; k++) {
          if (skuImgAry[k].valCode === 1 + '' + (i + 1)) {
            me.skuImg.vals.splice(k, 1);
            if (!isUndefined(me.oldImgs[1 + '' + (i + 1)])) delete me.oldImgs[1 + '' + (i + 1)];            //在老图片组中将该图片组删除
            if (!isUndefined(me.goodsImgList[1 + '' + (i + 1)])) delete me.goodsImgList[1 + '' + (i + 1)];  //在总图片组中将该图片组删除
          }
        }
      }
    }
    if (checkedAttrNum > 0) {     //选择的规格属大于0时，获取所选属性的名和值
      me.skuImg.attrName = curCheckedAttr.name;
      curCheckedAttr.used = true;
    } else curCheckedAttr.used = false;
    me.skuImg.vals.sort(me.compare('valCode'));   //根据某个属性值（valCode）排序
  }

  /**
   * 检测图片属性列表中是否已经有了这个属性
   * @param compareVal 用来比较的值
   * @returns {{groupId: number, isHad: boolean}}
   */
  public checkImgListIfHadGroup(compareVal) {
    let me = this, groupId: number, isHad = false;
    me.skuImg.vals.forEach((item, i) => {
      if (item.valCode == compareVal) {
        groupId = i;
        isHad = true;
      }
    })
    return {
      groupId: groupId,
      isHad: isHad
    };
  }

  /**
   * 根据某个属性值排序方法
   * @param property
   * @returns {(a:any, b:any)=>number}
   */
  public compare(property) {
    return function (a, b) {
      var value1 = a[property];
      var value2 = b[property];
      return value1 - value2;
    }
  }

  /**
   * 将所选规格生成一个对象
   * @param spec
   */
  public genObject(index) {
    let me = this, enums: any = {}, attrsList: Array<any> = new Array(), checkedNum: number = 0;
    let curCheckedAttr = this.saleAttrList[index];
    for (let i = 0; i < curCheckedAttr.goodsEnumValList.length; i++) {
      let checkedEnumItem = curCheckedAttr.goodsEnumValList[i];
      if (checkedEnumItem.checked) {
        let attrTemp = {
          attrName: curCheckedAttr.name,
          attrCode: index + 1,
          valCode: (index + 1) + '' + (i + 1),
          value: checkedEnumItem.enumValue,
          idx: checkedEnumItem.idx,
          enumValId: checkedEnumItem.id,
        };
        attrsList.push(attrTemp);
        checkedNum += 1;
      }
    }
    if (checkedNum > 0) curCheckedAttr.used = true;
    else curCheckedAttr.used = false;
    enums = {
      attrsList: attrsList,
      type: index + 1,
      goodsBaseCode: me.publishData.goodsBaseCode,
    };
    if (!isNullOrUndefined(me.publishData.goodsSkuList) && me.judgeSkuListHasInputVal()) enums.skuList = me.publishData.goodsSkuList;    // 当表格中已经输入了价格则将带价格的skuList传过去保存

    $.when(me.goodsService.getSkuData(enums)).done(data => {
      if (data && data.length > 0) {
        me.publishData.goodsSkuList = data;
        me.skuAttr = data[0].attrsList;
      } else {
        me.publishData.goodsSkuList = new Array()
      }   // 将数据生成易解析的新数组
    })
  }

  /**
   * 判断skuList中是否输入框中已经有了值
   * @returns {boolean}
   */
  public judgeSkuListHasInputVal() {
    let me = this, hasVal: boolean = false;
    me.publishData.goodsSkuList.forEach((item) => {
      let noValObj: number = 0;
      for (var i in item) {
        if (isNullOrUndefined(item[i])) noValObj++
      }
      if (noValObj < 4) hasVal = true;// 当对象中为空的属性的数量<4时，说明有值；
    })
    return hasVal;
  }

  /**
   * 将数据生成易解析的新数组
   * @param skuData
   */
  public genClearArray(skuData) {
    let me = this;
    me.skuAttr = new Array();
    if (skuData.length > 0) {
      me.publishData.goodsSkuList = skuData;
      let tempSkuAttr = skuData[0].attrsList;
      tempSkuAttr.forEach((attr) => {
        let obj = {
          attrCode: attr.attrCode,
          attrName: attr.attrName,
          idx: attr.idx
        };
        me.skuAttr.push(obj);
      });
    } else {
      me.publishData.goodsSkuList = new Array();
    }
  }

  /**
   * 比较两个数字的大小
   * @param arg1
   * @param arg2
   * @returns {boolean}
   */
  compareNumber(arg1: string, arg2: string) {
    let num1 = Number(arg1), num2 = Number(arg2);
    if (num1 < num2 || num1 == num2) return true;
  }

  /**
   * edit将商品原有的图片删除
   * @param groupId  图片组序列
   * @param index    图片组中图片的序列
   */
  removeImgSrc(groupId, index) {
    let me = this;
    me.oldImgs[groupId].splice(index, 1);      //删除老图片组中的这个图片
    me.goodsImgList[groupId].splice(index, 1); //删除总图片组中的这个图片
  }

  /**
   * 取消批量设置窗口
   * @param obj
   */
  onCancel(obj) {
    $(obj).slideUp(50)
  }

  /**
   * 批量设置规格时
   * @param target
   */
  setPrice(type, value, target) {
    let me = this;
    if (!isNullOrUndefined(value) && value !== '') {
      me.publishData.goodsSkuList.forEach((sku) => {
        sku[type] = value
      });
      $(target).slideUp(50);
    }
  }

  /**
   * 审核input框的value合不合要求
   */
  auditInputValueForNum(value, type?: string) {
    let val = value, reg;
    if (type == 'int') reg = val.match(/^[1-9]{1}[0-9]*/);
    else reg = val.match(/\d+(\.\d{1,2})?/);
    if (!isNull(reg)) {
      val = reg[0];
    } else {
      val = val.substring(0, val.length - 1)
    }
    if (Number(value) > 10000) value = this.maxFixedFreight
  }

  /**
   * 上传图片,第一步，集成所有需要上传的uploader到一个集合里
   */
  public togetherAllUploaders() {
    let me = this, allUploaders: Array<any> = new Array();
    // 当选择了规格时,不上传默认的图片
    if (me.skuImg.vals.length > 0) {
      allUploaders = new Array();
      me.skuImg.vals.forEach((item) => {
        allUploaders.push(item.uploader);
      });
    }
    return allUploaders;
  }

  /**
   * 商品规格图片上传
   */
  public uploadImgs() {
    let me = this, uploadedNum = 0;
    let allUploaders = me.togetherAllUploaders();
    allUploaders.forEach((uploader, i) => {
      uploader.uploadAll();//全部上传
      if (uploader.getNotUploadedItems().length == 0) uploadedNum += 1;  //如果该组不需要上传图片则uploadedNum+1
      uploader.queue.forEach((item, index) => {
        item.onSuccess = function (response, status, headers) {
          if (!isNullOrUndefined(response)) {
            response = JSON.parse(response);
            if (response.success && !isNullOrUndefined(response.data)) {
              // 图片上传成功的时候，检测图片组里该属性值对象是否已存在，不存在则添加对象
              if (isUndefined(me.goodsImgList[me.skuImg.vals[i].valCode])) {
                me.goodsImgList[me.skuImg.vals[i].valCode] = new Array();
              }
              // 将图片存入该属性值对应的对象图片数组中
              me.goodsImgList[me.skuImg.vals[i].valCode].push(response.data);
            }
          }
        }
      })
      uploader.onCompleteAll = function () {
        uploadedNum += 1;     // 该组上传完之后uploadedNum+1；
        if (uploadedNum == allUploaders.length) {  // 当有图片上传，并且是图片组的最后一个时
          me.genPublishDataAndPublish()     //整理数据并且发布商品
        }
      }
      // 每张图片上传结束后，判断如果是最后一组图片则发布商品，不是最后一组会进入下一个循环
      if (uploadedNum == allUploaders.length) {  // 当有图片上传，并且是图片组的最后一个时
        me.genPublishDataAndPublish()     //整理数据并且发布商品
      }
    })
  }

  /**
   * 生成商品基本属性列表
   */
  public genGoodsBaseAttrList() {
    let me = this;
    me.publishData.goodsBaseAttrList = new Array(); // 先置空
    me.baseAttrList.forEach(val => {
      if (!isNullOrUndefined(val.checkedId)) {
        val.goodsEnumValList.forEach(attr => {
          if (attr.id == val.checkedId) {
            let obj = {
              name: attr.enumValue,
              value: attr.id,
              idx: attr.idx
            }
            me.publishData.goodsBaseAttrList.push(obj)
          }
        })
      }
    })
  }

  /**
   * 生成商品图片列表，整合图片并排序
   */
  public genGoodsImgList() {
    let me = this, goodsImgList: Array<any> = new Array(), item: any;
    //当选择了商品规格时
    if (me.skuImg.vals.length > 0) {
      for (var i = 0; i < me.skuImg.vals.length; i++) {
        item = me.skuImg.vals[i];
        let itemImgSrcs = me.goodsImgList[item.valCode];
        if (isNullOrUndefined(itemImgSrcs)) {
          me._notification.warning('缺少图片', '请上传规格为' + item.valName + '的商品的图片');
          return null;// 当某个规格没有图片时，提示必须上传
        } else {
          for (let k = 0; k < itemImgSrcs.length; k++) {
            const temp: any = {attrCode: '', valCode: '', valName: '', idx: '', goodsImage: ''};
            Object.assign(temp, item);
            temp.idx = k + 1;
            temp.goodsImage = itemImgSrcs[k];
            delete(temp.uploader);
            goodsImgList.push(temp);
          }
        }
      }
    }
    me.publishData.goodsImagesList = goodsImgList;
  }

  /**
   * 移动端详情
   * @returns {string}
   */
  public genMblDetailHtml() {
    let me = this, mblHtml = '';
    me.mblItemList.forEach((item) => {
      if (item.type == 'img') {
        mblHtml += '<img width="100%" src="' + item.value + '">';
      } else if (item.type == 'text') {
        mblHtml += '<p class="text">' + item.value + '</p>';
      }
    });
    return mblHtml;
  }

  /**
   * 返回事件，由于富文本编辑器是一个iframe窗口，所以单纯的back可能不能一次性返回，因此直接指定了返回路径
   */
  back() {
    if (this.path == 'update') this.router.navigate([SettingUrl.ROUTERLINK.store.goodsManage], {replaceUrl: true});
    else if (this.path == 'edit') this.router.navigate([SettingUrl.ROUTERLINK.store.goodsPublish], {replaceUrl: true});
    else this.location.back();
  }

  /**
   * 发布商品
   */
  publishGoods() {
    let me = this;
    if (me.judgeSkuPrices() && me.judgeGoodsImgs() && me.judgeDetailInfo() && me.judgeLogistics()) me.uploadImgs();// 如果没有空项则上传图片
  }

  /**
   * 判断商品详情是否编辑
   */
  judgeDetailInfo() {
    let me = this;
    if (isNullOrUndefined(me.publishData.goodsBody) || me.publishData.goodsBody == '') {
      me._notification.warning('数据不完整', '请编辑PC端商品详情');
      return false
    } else {
      if (isNullOrUndefined(me.publishData.mobileBody) || me.publishData.mobileBody == '') {
        me._notification.warning('数据不完整', '请编辑移动端商品详情');
        return false
      }
    }
    return true
  }

  /**
   * 判断商品图片是否上传
   * @returns {boolean}
   */
  judgeGoodsImgs() {
    let me = this, targets = me.skuImg.vals;
    // 当商品发布时，如果选了规格，但没有选择图片
    if (me.path == 'edit') {
      if (targets.length > 0) {
        for (let i = 0; i < targets.length; i++) {
          if (targets[i].uploader.queue.length == 0) {
            me._notification.warning('数据不完整', '请上传' + me.skuImg.attrName + '为' + targets[i].valName + '的商品的图片');
            return false
          }
        }
      } else {
        me._notification.warning('数据不完整', '请选择商品规格');
        return false
      }
    }
    return true
  }

  /**
   * 判断物流规则是否正确
   * @returns {boolean}
   */
  judgeLogistics() {
    let me = this;
    if (me.publishData.isFreight == me.enumState.yes) {
      let obj = me.publishData.goodsExpressInfo;
      if (!isNullOrUndefined(obj.freightType)) {
        //如果使用物流模板
        if (obj.freightType == me.enumState.freightType.tpl) {
          if (obj.expressTplId == '' || isNullOrUndefined(obj.expressTplId)) {
            me._notification.warning('数据不完整', '请选择物流模板');
            return false;
          }
        } else {
          if (obj.fixedFreight == '' || isNullOrUndefined(obj.fixedFreight)) {
            me._notification.warning('数据不完整', '请设置固定运费');
            return false;
          }
        }
      } else {
        me._notification.warning('数据不完整', '请设置运费');
        return false;
      }
    }
    return true;
  }

  /**
   * 判断价格或库存是否符合要求
   * @returns {boolean}
   */
  judgeSkuPrices() {
    let me = this;
    if (me.skuImg.vals.length > 0) {
      let target = me.publishData.goodsSkuList;
      for (let item of target) {
        if (Number(item.marketPrice) == 0) {
          me._notification.warning('数据不完整', '请输入商品的市场价');
          return false;
        } else if (Number(item.price) == 0) {
          me._notification.warning('数据不完整', '请输入商品价格');
          return false;
        } else if (Number(item.memberPrice) == 0) {
          me._notification.warning('数据不完整', '请输入商品的会员价');
          return false;
        } else if (Number(item.price) > Number(item.marketPrice)) {
          me._notification.warning('数据不正确', '商品价格应小于市场价');
          return false;
        } else if (Number(item.memberPrice) > Number(item.price)) {
          me._notification.warning('数据不正确', '会员价应小于商品价格');
          return false;
        } else if (Number(item.storageNum) < 10) {
          me._notification.warning('数据不正确', '商品库存必须大于10');
          return false;
        } else {
          return true
        }
      }
    } else {
      me._notification.warning('数据不完整', '请选择商品规格');
    }
  }

  /**
   * 同步PC端详情
   */
  syncGoodsBody() {
    this.publishData.mobileBody = this.publishData.goodsBody;
  }

  /**
   * 整理数据并且发布商品
   */
  public genPublishDataAndPublish() {
    let me = this;
    me.genGoodsImgList();                                              // 商品图片列表
    me.genGoodsBaseAttrList();                                          // 商品基本属性
    $.when(this.goodsService.saveGoods(me.publishData)).done(data => {
      if (data) {
        if (me.path == 'edit') me.router.navigate([SettingUrl.ROUTERLINK.store.goodsPublished], {queryParams: {baseCode: data}});
        if (me.path == 'update') me.changed = true, me.location.back();
      }
    })
  }

}
