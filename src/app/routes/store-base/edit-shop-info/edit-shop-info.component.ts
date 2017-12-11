import {Component, OnInit} from "@angular/core";
import {MainService} from "../../../public/service/main.service";
import {StoreBaseService} from "../store-base.service";
import {AREA_LEVEL_3_JSON} from "../../../public/util/area_level_3";
import {PatternService} from "../../../public/service/pattern.service";
import {NzNotificationService} from "ng-zorro-antd";
import {ActivatedRoute} from "@angular/router";
import {Util} from "../../../public/util/util";
import {FileUploader} from "ng2-file-upload";
import {Setting} from "../../../public/setting/setting";
import {SettingUrl} from "../../../public/setting/setting_url";
import {Location} from "@angular/common";
declare var $: any;
@Component({
  selector: 'app-edit-shop-info',
  templateUrl: './edit-shop-info.component.html',
  styleUrls: ['./edit-shop-info.component.css']
})
export class EditShopInfoComponent implements OnInit {
  public validateForm: any = {};//表单
  public _options: any;//三级联动区域数据
  public ngValidateStatus = Util.ngValidateStatus;//判断输入框是否为空
  public ngValidateErrorMsg = Util.ngValidateErrorMsg;//判断输入框内容是否符合格式
  public valitateState: any = Setting.valitateState;//表单验证状态
  public storeLabelUploader: FileUploader = new FileUploader({
    url: SettingUrl.URL.enterprise.upload,
    itemAlias: "limitFile",
    allowedFileType: ["image"]
  }); //店铺Logo,初始化上传方法

  public storeAvatarUploader: FileUploader = new FileUploader({
    url: SettingUrl.URL.enterprise.upload,
    itemAlias: "limitFile",
    allowedFileType: ["image"]
  }); //店铺头像,初始化上传方法
  constructor(public storeBaseService: StoreBaseService,
              public patternService: PatternService,
              public _notification: NzNotificationService,
              public route: ActivatedRoute,
              public location: Location) {
    Util.transAreas(AREA_LEVEL_3_JSON);
    this._options = AREA_LEVEL_3_JSON;
  }

  ngOnInit() {
    this.loadShopData();//查询店铺信息
  }

  /**
   * 查询店铺信息
   * @param data
   */
  loadShopData (){
    let me = this,param = {storeCode:'649518214747807744'};
    $.when(StoreBaseService.loadShopInfo(param)).done(data => {
      if (data) me.validateForm = data //店铺信息
    })
  }

  /**
   * 点击下一步按钮时会提交表单，成功后跳转下一步
   * 1.先上传图片，获得图片暗码
   * 2.将图片暗码付给表单值对象
   * 3.提交表单数据
   * @param $event
   * @param value
   */
  public submitShopForm($event) {
    $event.preventDefault();
    let me = this, uploadedNum = 0, allUploaders = [
      this.storeLabelUploader,
      this.storeAvatarUploader
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
          me.submitFormData()     //整理数据并且发布商品
        }
      }
      // 每张图片上传结束后，判断如果是最后一组图片则发布商品，不是最后一组会进入下一个循环
      if (uploadedNum == allUploaders.length) {  // 当有图片上传，并且是图片组的最后一个时
        me.submitFormData()     //整理数据并且发布商品
      }
    })
  }

  /**
   * 提交上传图片之后的表单数据
   * @param $event
   * @param value
   */
  submitFormData = () => {
    let formValue = this.validateForm;
    if (typeof formValue.areaCode == 'object') { //如果是数组形式则取数组的第三个
      formValue.areaCode = formValue.areaCode[2];//取第三级编码
    }
    console.log(JSON.stringify(formValue));
    this.storeBaseService.dredgeShop(formValue);
  };

  /**
   * 上传图片之后给表单元素赋值
   */
  patchValues(i, uuid) {
    switch (i) {
      case 0:
        this.validateForm.storeLabel = uuid;
        break;
      case 1:
        this.validateForm.storeAvatar = uuid;
        break;
    }
  }

  /**
   * 监听图片选择
   * @param $event
   */
  storeAvatarFileChangeListener() {
    // 当选择了新的图片的时候，把老图片从待上传列表中移除
    if (this.storeAvatarUploader.queue.length > 1) this.storeAvatarUploader.queue[0].remove();
  }

  storeLabelFileChangeListener() {
    // 当选择了新的图片的时候，把老图片从待上传列表中移除
    if (this.storeLabelUploader.queue.length > 1) this.storeLabelUploader.queue[0].remove();
  }


  /**
   * 返回上一页
   */
  back() {
    let me=this;
    me.location.back();
  }
}
