import { Component, OnInit } from '@angular/core';
import {SimplesService} from "../simples.service";
import {StepsComponent} from "../steps/steps.component";
import {NzNotificationService} from "ng-zorro-antd";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FileUploader} from "ng2-file-upload";
import {SettingUrl} from "../../../public/setting/setting_url";
import {MainService} from "../../../public/service/main.service";
import {Setting} from "../../../public/setting/setting";
import {Util} from "../../../public/util/util";

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
    this.steps.current = 1;
    this.simplesService.routerSkip(this.steps.current);
    this._options = this.simplesService.options;
    this.validateForm = this.fb.group({
      epName                              : ['', [Validators.required], [this.simplesService.userNameAsyncValidator]],//企业名称
      // epCode                              : ['', [this.simplesService.stringValidator]],//企业编码
      contactsName                        : ['', [Validators.required], [this.simplesService.userNameAsyncValidator]],//联系人姓名
      contactsPhone                       : ['', [Validators.required], [Util.phoneValidator]],//联系人手机号
      contactsEmail                       : ['', [Util.emailValidator]],//企业邮箱
      businessLicence                     : ['', [this.simplesService.stringValidator]],//营业执照注册号
      businessLicenceAddress              : [null, [this.simplesService.addressValidator]],//详细地址
      businessLicenceAreaCode             : [null, [this.simplesService.stringValidator]],//营业执照所在地区编码//TODO：选择器数组最后一个
      businessLicenceAreaName             : ['', [this.simplesService.stringValidator]],//营业执照所在地区名称//TODO：选择器数组最后一个
      businessLicenceSphere               : ['', [this.simplesService.stringValidator]],//法定经营范围
      businessLicenceStart                : ['', [this.simplesService.validateRequired]],//营业执照有效起始日期
      businessLicenceEnd                  : ['', [this.simplesService.validateRequired]],//营业执照有效结束日期
      businessRegisteredCapital           : ['', [this.simplesService.stringValidator]],//注册资本
      creditCode                          : ['', [this.simplesService.stringValidator]],//社会信用代码
      organizationCode                    : ['', [this.simplesService.stringValidator]],//组织机构代码
      legalPersonName                     : ['', [Validators.required], [this.simplesService.userNameAsyncValidator]],//法人姓名
      legalPersonIdcard                   : ['', [Validators.required], [Util.idCardNumValidator]],//法人身份证号
      idcardStartTime                     : [null, [this.simplesService.validateRequired]],//法人身份证有效起始日期
      idcardEndTime                       : [null, [this.simplesService.validateRequired]],//法人身份证有效结束日期
      taxRegistrationCertificate          : ['', [this.simplesService.stringValidator]],//税务登记证号
      taxRegistrationCertificateElectronic: [null, [this.simplesService.stringValidator]],//纳税登记证电子版
      // taxPayerId                          : ['', [this.simplesService.stringValidator]],//纳税人识别号
      // generalTaxPayer                     : [null, [this.simplesService.stringValidator]],//一般纳税人证明
      organizationCodeElectronic          : [null, [this.simplesService.stringValidator]],//组织机构代码电子版
      businessLicenceNumberElectronic     : [null, [this.simplesService.stringValidator]],//电子版营业执照
      idType                              : [null],//证件类型,默认三证合一
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
    console.log(formValue);
    this.simplesService.routerSkip(2);
    // this.simplesService.enterpris(formValue);
  };

  _console(value) {
    // console.log(value);
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
  } /**
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
