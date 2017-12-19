import {Component, OnInit} from '@angular/core';
import {Util} from "../../../public/util/util";
import {Setting} from "../../../public/setting/setting";
import {SettingUrl} from "../../../public/setting/setting_url";
import {FileUploader} from "ng2-file-upload";
import {MainService} from "../../../public/service/main.service";
import {isNullOrUndefined} from "util";
import {NzModalService, NzNotificationService} from "ng-zorro-antd";
import {GoodsService} from "../goods.service";
import {Location} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import {BrandsComponent} from "../brands/brands.component";
import {PatternService} from "../../../public/service/pattern.service";
declare var $: any;

@Component({
  selector: 'app-add-brand',
  templateUrl: './add-brand.component.html',
  styleUrls: ['./add-brand.component.css']
})
export class AddBrandComponent implements OnInit {
  public ngValidateStatus: any = Util.ngValidateStatus;//表单项状态
  public ngValidateErrorMsg: any = Util.ngValidateErrorMsg;//表单项提示状态
  public valitateState: any = Setting.valitateState;//表单验证状态
  public enums: any = Setting.ENUM;               //枚举编码
  public enumState: any = Setting.ENUMSTATE;               //枚举编码
  public path: string; //当前路由
  public kindList: Array<any> = new Array(); //分类列表
  public showTypes: any;   //品牌展示类型
  public brandStates: any; // 品牌状态
  public uuid: any;       //图片暗码
  public validateForm: any = {};//表单
  public brandId: any;//修改品牌时传参
  public brandLogoUploader: FileUploader = new FileUploader({
    url: SettingUrl.URL.goods.goodsUpload,
    itemAlias: "limitFile",
    allowedFileType: ["image"]
  }); //品牌logo,初始化上传方法
  public brandRegCardUploader: FileUploader = new FileUploader({
    url: SettingUrl.URL.goods.goodsUpload,
    itemAlias: "limitFile",
    queueLimit: 2,
    allowedFileType: ["image"]
  }); //品牌logo,初始化上传方法

  constructor(public _notification: NzNotificationService,
              public confirmServ: NzModalService,
              public pattern: PatternService,
              public location: Location,
              public route: ActivatedRoute,
              public brands: BrandsComponent,
              public goodsService: GoodsService) {
  }

  ngOnInit() {
    let me = this, brandId = me.route.snapshot.queryParams['applyCode'];
    me.route.url.subscribe(urls => {
      me.path = urls[0].path;
      switch (me.path) {
        //新增品牌
        case "addBrand":
          me.brands.pageTitle = '添加品牌';
          me.getAddBrandData();//获取添加或修改品牌所需数据
          break;
        //修改品牌
        case "edit":
          me.brands.pageTitle = '修改品牌';
          me.getAddBrandData();//获取添加或修改品牌所需数据
          if (brandId) me.loadBrandDataById(brandId);//获取当前品牌的数据
          break;
        //查看品牌详情
        case "detail":
          me.brands.pageTitle = '品牌详情';
          if (brandId) me.loadBrandDataById(brandId);//获取当前品牌的数据
          break;
      }
    });
  }

  /**
   * 加载品牌详情
   * @param brandId
   */
  loadBrandDataById(brandId) {
    let me = this;
    $.when(GoodsService.loadBrandDataById(brandId)).done(data => {
      if (data) me.validateForm = data;
    })
  }

  /**
   * 获取添加或修改品牌所需数据
   */
  getAddBrandData() {
    let me = this;
    // me.showTypes = MainService.getEnumDataList(Setting.ENUM.showType);       // 品牌展示类型
    // me.brandStates = MainService.getEnumDataList(Setting.ENUM.brandState);       // 品牌状态
    me.kindList = me.goodsService.getKindList(); //获取分类列表 //获取当前路由
  }

  /**
   * 监听图片选择
   * @param $event
   */
  brandLogoChangeListener() {
    // 当选择了新的图片的时候，把老图片从待上传列表中移除
    if (this.brandLogoUploader.queue.length > 1) this.brandLogoUploader.queue[0].remove();
  }

  /**
   * 提交表单
   */
  submitAddBrandForm() {
    let me = this;
    if (me.brandLogoUploader.queue[0]) me.uploadImg();
    else me.addBrand();
  }
  /**
   * 上传图片之后给表单元素赋值
   */
  patchValues(i, uuid) {
    switch (i) {
      case 0:
        this.validateForm.brandLogo = uuid;
        break;
      case 1:
        this.validateForm.storeAvatar = uuid;
        break;
    }
  }


  /**
   * 上传图片
   */

   uploadImg() {
    let me = this, uploadedNum = 0, allUploaders = [
      me.brandLogoUploader,
      me.brandRegCardUploader
    ];
    allUploaders.forEach((uploader, i) => {
      let uuid = '';//置空暗码

      //如果该组不需要上传图片则uploadedNum+1
      //需要上传图片的则在图片上传完成后uploadedNum+1
      if (uploader.getNotUploadedItems().length == 0) uploadedNum += 1;
      //上传之前，获取暗码
      uploader.onBuildItemForm = function (fileItem, form) {
        uuid = MainService.uploadUid();
        form.append('uuid', uuid);
      };
      uploader.uploadAll();//执行上传
      // 上传成功
      uploader.onSuccessItem = function (item, response, status, headers) {
        let res = JSON.parse(response);
        if (res.success) {
          if (uuid) me.patchValues(i, uuid);
        } else {
          me._notification.error(`上传失败`, '图片' + item._file.name + res.info)
        }
      }
      // 上传失败
      uploader.onErrorItem = function (item, response, status, headers) {
        let res = JSON.parse(response);
        me._notification.error(`上传失败`, '图片' + uploader.queue[0]._file.name + res.info)
      };
      // 完成上传
      uploader.onCompleteAll = function () {
        uploadedNum += 1;     // 该组上传完之后uploadedNum+1；
        if (uploadedNum == allUploaders.length) {  // 当有图片上传，并且是图片组的最后一个时
          me.addBrand()
          // me.submitFormData()     //整理数据并且发布商品
        }
      }
      // 每张图片上传结束后，判断如果是最后一组图片则发布商品，不是最后一组会进入下一个循环
      if (uploadedNum == allUploaders.length) {  // 当有图片上传，并且是图片组的最后一个时
        // me.submitFormData()     //整理数据并且发布商品
        me.addBrand()
      }
    })
  }

  uploadImag() {
    let me = this;
    Util.showMask();//上传图片比较慢，显示遮罩层
    //上传之前
    me.brandLogoUploader.onBuildItemForm = function (fileItem, form) {
      me.uuid = MainService.uploadUid();
      form.append('uuid', me.uuid);
    };
    //执行上传
    me.brandLogoUploader.uploadAll();
    //上传成功
    me.brandLogoUploader.onSuccessItem = function (item, response, status, headers) {
      let res = JSON.parse(response);
      if (res.success) {
        if (!isNullOrUndefined(me.uuid)) me.validateForm.brandImageuuid = me.uuid;
      } else {
        me._notification.error(`上传失败`, '图片' + item._file.name + res.info)
      }
    }
    // 上传失败
    me.brandLogoUploader.onErrorItem = function (item, response, status, headers) {
      let res = JSON.parse(response);
      me._notification.error(`上传失败`, '图片' + item._file.name + res.info)
    };
    //上传完成，不管成功还是失败
    me.brandLogoUploader.onCompleteAll = function () {
      me.addBrand()
    }

    //如果没有选择图片则直接提交
    if (!me.brandLogoUploader.isUploading) {   // 图片已经传过了，但是数据提交失败了，改过之后可以直接提交
      if (!isNullOrUndefined(me.uuid)) me.validateForm.brandImageuuid = me.uuid;
      me.addBrand();
    }
  }

  /**
   * 监听图片选择
   * @param $event
   */
  storeAvatarFileChangeListener() {
    // 当选择了新的图片的时候，把老图片从待上传列表中移除
    if (this.brandLogoUploader.queue.length > 1) this.brandLogoUploader.queue[0].remove();
  }

  storeLabelFileChangeListener() {
    // 当选择了新的图片的时候，把老图片从待上传列表中移除
    if (this.brandRegCardUploader.queue.length > 1) this.brandRegCardUploader.queue[0].remove();
  }

  /**
   * 提交表单
   */
  addBrand() {
    let me = this;
    // let formValue = Object.assign({}, this.validateForm);
    $.when(this.goodsService.addBrand(me.validateForm)).done(res => {
      Util.hideMask();//去掉遮罩层
      if (res) {
        this.confirmServ.success({
          title: '提交成功',
          content: '申请已提交，请等待审核通过'
        });
      }
      ;
    });
    // me.location.back();//返回上个页面
  }

  /**
   * 提交表单
   */
  updateBrand() {
    let me = this;
    me.validateForm.brandId = me.brandId;
    $.when(this.goodsService.updateBrand(me.validateForm)).done(res => {
      Util.hideMask();//去掉遮罩层
      if (res) {
        this.confirmServ.success({
          title: '提交成功',
          content: '申请已提交，请等待审核通过'
        });
      }
      ;
    });
    // me.location.back();//返回上个页面
  }

  /**
   * 修改品牌
   */
  updateBrandForm() {
    let me = this;
    if (me.brandLogoUploader.queue[0]) me.uploadImg();
    else me.updateBrand();
  }

  /**
   * 返回上个页面
   */
  back() {
    let me = this;
    me.location.back();//返回上个页面
    me.brands.queryBrandsList();//刷新品牌查询列表
  }

}
