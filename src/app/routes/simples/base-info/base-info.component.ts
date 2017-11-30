import {Component, OnInit} from "@angular/core";
import {SimplesService} from "../simples.service";
import {StepsComponent} from "../settle-steps/steps.component";
import {NzNotificationService} from "ng-zorro-antd";
import {FormBuilder} from "@angular/forms";
import {FileUploader} from "ng2-file-upload";
import {SettingUrl} from "../../../public/setting/setting_url";
import {MainService} from "../../../public/service/main.service";
import {Setting} from "../../../public/setting/setting";
import {Util} from "../../../public/util/util";
import {AREA_LEVEL_3_JSON} from "../../../public/util/area_level_3";
import {PatternService} from "../../../public/service/pattern.service";

@Component({
  selector: 'app-base-info',
  templateUrl: './base-info.component.html',
  styleUrls: ['./base-info.component.css']
})
export class BaseInfoComponent implements OnInit {
  _options: any;//三级联动区域数据
  validateForm: any = {};
  papersTypes: any;     //证件类型
  enumStates = Setting.ENUMSTATE; //枚举值
  ngValidateStatus = Util.ngValidateStatus;
  ngValidateErrorMsg = Util.ngValidateErrorMsg;

  public organizationCodeUploader: FileUploader = new FileUploader({
    url: SettingUrl.URL.base.upload,
    itemAlias: "limitFile",
    allowedFileType: ["image"]
  }); //组织机构代码电子版,初始化上传方法
  public businessLicenceUploader: FileUploader = new FileUploader({
    url: SettingUrl.URL.base.upload,
    itemAlias: "limitFile",
    allowedFileType: ["image"]
  }); //电子版营业执照,初始化上传方法
  public taxRegistrationUploader: FileUploader = new FileUploader({
    url: SettingUrl.URL.base.upload,
    itemAlias: "limitFile",
    allowedFileType: ["image"]
  }); //纳税登记证电子版,初始化上传方法

  constructor(public simplesService: SimplesService,
              public steps: StepsComponent,
              public patterns: PatternService,
              public _notification: NzNotificationService,
              public fb: FormBuilder) {
    Util.transAreas(AREA_LEVEL_3_JSON);
    this._options = AREA_LEVEL_3_JSON;
    this.steps.current = 1;
    this.validateForm = {
      sellerCode: 'dmkfjkldjfoipe',//商家编码
      idType: this.enumStates.papersType.unity,//证件类型
      isForever: false,//法人身份证是否长期有效
    };
  }

  ngOnInit() {
    const me = this;
    me.papersTypes = MainService.getEnumDataList(Setting.ENUM.papersType);       // 证件类型
    this.validateForm = {"idType":"UNITY","sellerCode":"dmkfjkldjfoipe","isForever":"Y","contactsPhone":"15737198859","contactsName":"sd","epName":"as的地方","contactsEmail":"123@qq.com","creditCode":"sdfdsffgsdaf","legalPersonName":"df","legalPersonIdcard":"210302199901012498","idcardStartTime":new Date("2017-11-30T10:23:55.669Z"),"businessRegisteredCapital":"1000000","businessSphere":"食品粮油","businessLicenceAreaCode":"110101000000","businessLicenceAddress":"秩序的说法","businessLicenceStart":new Date("2017-11-30T10:23:55.669Z"),"businessLicenceEnd":new Date(),"businessLicenceNumberElectronic":"1C06792U12CNUA1"}
  }

  /**
   * 点击下一步按钮时会提交表单，成功后跳转下一步
   * 1.先上传图片，获得图片暗码
   * 2.将图片暗码付给表单值对象
   * 3.提交表单数据
   * @param $event
   * @param value
   */
  public submitCompleteForm($event) {
    $event.preventDefault();
    let me = this, uploadedNum = 0, allUploaders = [
      this.organizationCodeUploader,
      this.businessLicenceUploader,
      this.taxRegistrationUploader
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
    //转换布尔值
    if (formValue.isForever) formValue.isForever = 'Y';
    else formValue.isForever = 'N';
    if (formValue.businessLicenceAreaCode) formValue.businessLicenceAreaCode = formValue.businessLicenceAreaCode[2];//取第三级编码
    // console.log(JSON.stringify(formValue));
    this.simplesService.enterpriseBase(formValue);
  };

  /**
   * 上传图片之后给表单元素赋值
   */
  patchValues(i, uuid) {
    switch (i) {
      case 0:
        this.validateForm.organizationCodeElectronic = uuid;
        break;
      case 1:
        this.validateForm.businessLicenceNumberElectronic = uuid;
        break;
      case 2:
        this.validateForm.taxRegistrationCertificateElectronic = uuid;
        break;
    }
  }

  /**
   * 监听图片选择
   * @param $event
   */
  organizationCodeFileChangeListener() {
    // 当选择了新的图片的时候，把老图片从待上传列表中移除
    if (this.organizationCodeUploader.queue.length > 1) this.organizationCodeUploader.queue[0].remove();
  }

  businessLicenceFileChangeListener() {
    // 当选择了新的图片的时候，把老图片从待上传列表中移除
    if (this.businessLicenceUploader.queue.length > 1) this.businessLicenceUploader.queue[0].remove();
  }

  taxRegistrationFileChangeListener() {
    // 当选择了新的图片的时候，把老图片从待上传列表中移除
    if (this.taxRegistrationUploader.queue.length > 1) this.taxRegistrationUploader.queue[0].remove();
  }

  /**
   * 排除不可选的身份证有效开始日期
   * @param startValue
   * @returns {boolean}
   * @private
   */
  _disabledIdCardStartDate = (startValue) => {
    if (!startValue || !this.validateForm.idcardEndTime) return false;
    return startValue.getTime() >= this.validateForm.idcardEndTime.getTime();
  };

  /**
   * 排除不可选的身份证有效结束日期
   * @param endValue
   * @returns {boolean}
   * @private
   */
  _disabledIdCardEndDate = (endValue) => {
    if (!endValue || !this.validateForm.idcardStartTime) return false;
    return endValue.getTime() <= this.validateForm.idcardStartTime.getTime();
  };

  /**
   * 排除不可选的营业执照有效开始日期
   * @param startValue
   * @returns {boolean}
   * @private
   */
  _disabledBusinessLicenceStartDate = (startValue) => {
    if (!startValue || !this.validateForm.businessLicenceEnd) return false;
    return startValue.getTime() >= this.validateForm.businessLicenceEnd.getTime();
  };

  /**
   * 排除不可选的营业执照有效结束日期
   * @param endValue
   * @returns {boolean}
   * @private
   */
  _disabledBusinessLicenceEndDate = (endValue) => {
    if (!endValue || !this.validateForm.businessLicenceStart) return false;
    return endValue.getTime() <= this.validateForm.businessLicenceStart.getTime();
  };

  /**
   * 鼠标放在图片上时大图随之移动
   */
  showImg(event) {
    let target = event.target.nextElementSibling;
    target.style.display = 'block';
    target.style.top = (event.clientY + 20) + 'px';
    target.style.left = (event.clientX + 30) + 'px';
  }

  /**
   * 隐藏大图
   * @param event
   */
  hideImg(event) {
    let target = event.target.nextElementSibling;
    target.style.display = 'none';
  }

  getFormControl(name) {
    return this.validateForm.controls[name];
  }
}
