import {Component, OnInit} from "@angular/core";
import {PublishComponent} from "../publish.component";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {FormGroup} from "@angular/forms";
import {GoodsService} from "../../goods.service";
import {isNullOrUndefined, isUndefined} from "util";
import {FileUploader} from "ng2-file-upload";
import {PatternService} from "../../../../public/service/pattern.service";
import {Util} from "../../../../public/util/util";
declare var $: any;

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  ngValidateStatus = Util.ngValidateStatus;
  ngValidateErrorMsg = Util.ngValidateErrorMsg;
  public validateForm: FormGroup;
  public path: string;           // 当前路径
  public kindId: string;         //商品分类id
  public kindSelectName: string;  //商品分类
  public unitList: any;           // 计量单位列表
  public baseAttrList: any;      // 商品基本属性列表
  public goodsBaseCode: string;  //商品基本编码
  public skuAttr = [];           //属性列表
  public skuImg: any = {
    vals: []
  };        // 图片属性
  public goodsImgList = {};       // 商品上传图片列表
  public oldImgs: any = {};        // 商品已经有的图片列表
  public mblItemList = [];         //手机端上传后的图片集合
  public set = {
    marketPrice: 0,
    salePrice: 0,
    memberPrice: 0,
    storageNum: 10
  }

  public publishData: any = {
    goodsExpressInfo: {
      freightType: null,
      fixedFreight: null,
      expressTplId: null,
      weight: 1.00,
      volume: 1.00,
    },
    isFreight: null,
    goodsImagesList: [],
    goodsBaseAttrList: [],
    goodsSkuList: []
  };// 商品发布数据，所有数据

  constructor(public publishComponent: PublishComponent,
              public location: Location,
              public goodsService: GoodsService,
              public patterns: PatternService,
              public route: ActivatedRoute,
              public router: Router) {
    this.publishComponent.step = 1;
  }

  ngOnInit() {
    const me = this;
    me.route.url.subscribe(paths => {
      me.path = paths[0].path;
    })
    me.kindId = me.route.snapshot.queryParams['kindId'];
    me.kindSelectName = me.route.snapshot.queryParams['choosedKind'];
    if (me.kindId) me.getPageData();
    else me.location.back();

    me.jqueryEvent();
  }

  jqueryEvent() {
    setTimeout(_ => {
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
      pageData = me.goodsService.getPageDataAdd(me.kindId);
      if (!isNullOrUndefined(pageData)) me.publishData = pageData;
    } else if (me.path == 'update') {
      me.goodsService.getPageDataEdit('');
    }
  }

  /**
   * 改变规格属性与值时生成新的sku
   * @param obj DOM节点
   */
  changeSpecVal(index) {
    let me = this;
    me.genObject(index);           //生成选中的数据对象
    if (index == 0) me.genImgSku(index);  // 如果是第一个规格，则改变图片列表的选值数组
  }

  /**
   * 选择规格值的方法
   * @param obj
   */
  checkSpecVal(event, index) {
    let obj = event.target;
    let me = this, $obj = $(obj) || obj;
    me.genObject(index);//生成选中的数据对象
    if (index == 0) me.genImgSku(index);  // 如果是第一个规格，则改变图片列表的选值数组
  }

  /**
   * 如果是第一个规格，则改变图片列表的选值数组
   * @param $obj
   */
  public genImgSku(index) {
    let me = this, checkedAttrNum: number = 0;
    let curCheckedAttr = this.publishData.saleAttrList[index];
    for (let i = 0; i < curCheckedAttr.goodsEnumValList.length; i++) {
      let checkedEnumItem = curCheckedAttr.goodsEnumValList[i];
      if (checkedEnumItem.checked) {
        checkedAttrNum += 1;
        if (me.checkImgListIfHadGroup((index + 1) + '' + (i + 1)).isHad) {
          let groupId = me.checkImgListIfHadGroup((index + 1) + '' + (i + 1)).groupId;
          me.skuImg.vals[groupId].valName = checkedEnumItem.enumValue;
        } else {
          let obj = {
            attrCode: index + 1,
            valCode: (index + 1) + '' + (i + 1),
            valName: checkedEnumItem.enumValue,
            idx: checkedEnumItem.idx,
            uploader: new FileUploader({
              url: '/goodsEdit/uploadGoodsImage',
              itemAlias: "limitFile",
              allowedFileType: ["image"]
            })
          };
          me.skuImg.vals.push(obj);
        }
      } else {      // 取消选中
        let skuImgAry = me.skuImg.vals;
        for (let k = 0; k < skuImgAry.length; k++) {
          if (skuImgAry[k].valCode === (index + 1) + '' + (i + 1)) {
            me.skuImg.vals.splice(k, 1);
            if (!isUndefined(me.oldImgs[(index + 1) + '' + (i + 1)])) delete me.oldImgs[(index + 1) + '' + (i + 1)];            //在老图片组中将该图片组删除
            if (!isUndefined(me.goodsImgList[(index + 1) + '' + (i + 1)])) delete me.goodsImgList[(index + 1) + '' + (i + 1)];  //在总图片组中将该图片组删除
          }
        }
      }
    }
    if (checkedAttrNum > 0) {     //选择的规格属大于0时，获取所选属性的名和值
      me.skuImg.attrName = curCheckedAttr.name;
    }
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
    let me = this, enums: any = {}, attrsList = [], checkedNum: number = 0;
    let curCheckedAttr = this.publishData.saleAttrList[index];
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
      }else{
        me.publishData.goodsSkuList = []
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
    me.skuAttr = [];
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
      me.publishData.goodsSkuList = [];
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

}
