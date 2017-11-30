import { Component, OnInit } from '@angular/core';
import {SimplesService} from "../simples.service";
import {StepsComponent} from "../settle-steps/steps.component";
import {NzNotificationService} from "ng-zorro-antd";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {FileUploader} from "ng2-file-upload";
import {SettingUrl} from "../../../public/setting/setting_url";
import {MainService} from "../../../public/service/main.service";
import {Setting} from "../../../public/setting/setting";
import {Util} from "../../../public/util/util";
import {AREA_LEVEL_3_JSON} from "../../../public/util/area_level_3";

@Component({
  selector: 'app-base-info',
  templateUrl: './base-info.component.html',
  styleUrls: ['./base-info.component.css']
})
export class BaseInfoComponent implements OnInit {
  _options: any;//三级联动区域数据
  validateForm: FormGroup;
  papersTypes:any;     //证件类型
  valitate = Util.validate; //表单验证
  enumStates = Setting.ENUMSTATE; //枚举值

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
              public _notification: NzNotificationService,
              public fb: FormBuilder) {
    Util.transAreas(AREA_LEVEL_3_JSON);
    this._options = AREA_LEVEL_3_JSON;
    this.steps.current = 1;
    this.simplesService.routerSkip(this.steps.current);
    this.validateForm = this.fb.group({
      epName                              : ['', [Validators.required], [this.simplesService.userNameAsyncValidator]],//企业名称
      // epCode                              : ['', [this.simplesService.validateRequired]],//企业编码
      contactsName                        : [''],//联系人姓名
      contactsPhone                       : [''],//联系人手机号
      contactsEmail                       : ['', [Util.emailValidator]],//企业邮箱
      idType                              : [null],//证件类型
      businessLicence                     : ['', [this.simplesService.validateRequired]],//营业执照注册号
      businessLicenceAddress              : [null, [this.simplesService.addressValidator]],//详细地址
      businessLicenceAreaCode             : [null, [this.simplesService.validateRequired]],//营业执照所在地区编码//TODO：选择器数组最后一个
      businessLicenceAreaName             : ['', [this.simplesService.validateRequired]],//营业执照所在地区名称//TODO：选择器数组最后一个
      businessLicenceSphere               : ['', [this.simplesService.validateRequired]],//法定经营范围
      businessLicenceStart                : ['', [this.simplesService.validateRequired]],//营业执照有效起始日期
      businessLicenceEnd                  : ['', [this.simplesService.validateRequired]],//营业执照有效结束日期
      businessRegisteredCapital           : ['', [this.simplesService.validateRequired]],//注册资本
      creditCode                          : ['', [this.simplesService.validateRequired]],//社会信用代码
      organizationCode                    : ['', [this.simplesService.validateRequired]],//组织机构代码
      legalPersonName                     : ['', [Validators.required], [this.simplesService.userNameAsyncValidator]],//法人姓名
      legalPersonIdcard                   : ['', [Validators.required], [Util.idCardNumValidator]],//法人身份证号
      isForever                           : [false],//法人身份证是否长期有效
      idcardStartTime                     : [null, [this.simplesService.validateRequired]],//法人身份证有效起始日期
      idcardEndTime                       : [null],//法人身份证有效结束日期
      taxRegistrationCertificate          : ['', [this.simplesService.validateRequired]],//税务登记证号
      taxRegistrationCertificateElectronic: [null, [this.simplesService.validateRequired]],//纳税登记证电子版
      // taxPayerId                          : ['', [this.simplesService.validateRequired]],//纳税人识别号
      // generalTaxPayer                     : [null, [this.simplesService.validateRequired]],//一般纳税人证明
      organizationCodeElectronic          : [null, [this.simplesService.validateRequired]],//组织机构代码电子版
      businessLicenceNumberElectronic     : [null, [this.simplesService.validateRequired]],//电子版营业执照
    });
  }

  ngOnInit() {
    const me = this;
    me.papersTypes = MainService.getEnumDataList(Setting.ENUM.papersType);       // 证件类型
    // me.validateForm.patchValue({idType: Setting.ENUMSTATE.papersType.normal})

  }

  /**
   * 提交基本信息表单
   * @param $event
   */
  submitBaseInfoForm = ($event) => {
    $event.preventDefault();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
    }
    console.log("█ this.validateForm ►►►",  this.validateForm);
    let formValue = this.validateForm.value;
    if(formValue.isForever) formValue.isForever = 'Y';
    else formValue.isForever = 'N';
    console.log(formValue);
    this.simplesService.routerSkip(2);
    // this.simplesService.enterpris(formValue);
  };

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
      if(uploader.getNotUploadedItems().length == 0) uploadedNum += 1;
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
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
    }
    console.log("█ this.validateForm ►►►",  this.validateForm);
    let formValue = this.validateForm.value;
    //转换地址格式
    /* formValue.businessLicenceAddress = formValue.businessLicenceAddress[2];
     formValue.bankAddress = formValue.bankAddress[2];
     formValue.settlementBankAddress = formValue.settlementBankAddress[2];*/
    console.log(formValue);
    // this.simplesService.enterpris(formValue);
  };


  /**
   * 上传图片之后给表单元素赋值
   */
  patchValues(i, uuid) {
    switch (i) {
      case 0:
        this.validateForm.patchValue({organizationCodeElectronic: uuid});
        break;
      case 1:
        this.validateForm.patchValue({businessLicenceNumberElectronic: uuid});
        break;
      case 2:
        this.validateForm.patchValue({taxRegistrationCertificateElectronic: uuid});
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
    if (!startValue || !this.validateForm.controls['idcardEndTime'].value) {
      return false;
    }
    return startValue.getTime() >= this.validateForm.controls['idcardEndTime'].value.getTime();
  };

  /**
   * 排除不可选的身份证有效结束日期
   * @param endValue
   * @returns {boolean}
   * @private
   */
  _disabledIdCardEndDate = (endValue) => {
    if (!endValue || !this.validateForm.controls['idcardStartTime'].value) {
      return false;
    }
    return endValue.getTime() <= this.validateForm.controls['idcardStartTime'].value.getTime();
  };

  /**
   * 排除不可选的营业执照有效开始日期
   * @param startValue
   * @returns {boolean}
   * @private
   */
  _disabledBusinessLicenceStartDate = (startValue) => {
    if (!startValue || !this.validateForm.controls['businessLicenceEnd'].value) {
      return false;
    }
    return startValue.getTime() >= this.validateForm.controls['businessLicenceEnd'].value.getTime();
  };

  /**
   * 排除不可选的营业执照有效结束日期
   * @param endValue
   * @returns {boolean}
   * @private
   */
  _disabledBusinessLicenceEndDate = (endValue) => {
    if (!endValue || !this.validateForm.controls['businessLicenceStart'].value) {
      return false;
    }
    return endValue.getTime() <= this.validateForm.controls['businessLicenceStart'].value.getTime();
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

  /**
   * 回到前一步
   */
  pre() {
    this.steps.current -= 1;
    this.simplesService.routerSkip(this.steps.current);
  }

  getFormControl(name) {
    return this.validateForm.controls[name];
  }
}
