import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SimplesService} from "../simples.service";
import {StepsComponent} from "../steps/steps.component";
import {FileUploader} from "ng2-file-upload";
import {SettingUrl} from "../../../public/setting/setting_url";
import {MainService} from "../../../public/service/main.service";
import {NzNotificationService} from "ng-zorro-antd";

@Component({
  selector: 'app-complete',
  templateUrl: './complete.component.html',
  styleUrls: ['./complete.component.css']
})
export class CompleteComponent implements OnInit {
  validateForm: FormGroup;
  _options: any;//三级联动区域数据
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
  public bankLicenceUploader: FileUploader = new FileUploader({
    url: SettingUrl.URL.base.upload,
    itemAlias: "limitFile",
    allowedFileType: ["image"]
  }); //银行开户许可证电子版,初始化上传方法
  public taxRegistrationUploader: FileUploader = new FileUploader({
    url: SettingUrl.URL.base.upload,
    itemAlias: "limitFile",
    allowedFileType: ["image"]
  }); //纳税登记证电子版,初始化上传方法
  public generalTaxPayerUploader: FileUploader = new FileUploader({
    url: SettingUrl.URL.base.upload,
    itemAlias: "limitFile",
    allowedFileType: ["image"]
  }); //一般纳税人证明,初始化上传方法

  constructor(public simplesService: SimplesService,
              public steps: StepsComponent,
              public _notification: NzNotificationService,
              public fb: FormBuilder) {
    this.steps.current = 2;
    this.simplesService.routerSkip(this.steps.current);
    this._options = this.simplesService.options;
    this.validateForm = this.fb.group({
      epName                              : ['', [Validators.required], [this.simplesService.userNameAsyncValidator]],//企业名称
      // epCode                              : ['', [this.simplesService.stringValidator]],//企业编码
      // sellerAcct                          : ['', [this.simplesService.stringValidator]],//商家账户
      // sellerCode                          : ['', [this.simplesService.stringValidator]],//商家编码
      contactsName                        : ['', [Validators.required], [this.simplesService.userNameAsyncValidator]],//联系人姓名
      contactsPhone                       : ['', [Validators.required], [this.simplesService.phoneValidator]],//联系人手机号
      contactsEmail                       : ['', [this.simplesService.emailValidator]],//企业邮箱
      businessLicence                     : ['', [this.simplesService.stringValidator]],//营业执照注册号
      businessLicenceAddress              : [null, [this.simplesService.addressValidator]],//详细地址
      businessLicenceAreaCode             : ['', [this.simplesService.stringValidator]],//营业执照所在地区编码//TODO：选择器数组最后一个
      businessLicenceAreaName             : ['', [this.simplesService.stringValidator]],//营业执照所在地区名称//TODO：选择器数组最后一个
      businessLicenceSphere               : ['', [this.simplesService.stringValidator]],//法定经营范围
      businessLicenceStart                : ['', [this.simplesService.validateRequired]],//营业执照有效起始日期
      businessLicenceEnd                  : ['', [this.simplesService.validateRequired]],//营业执照有效结束日期
      businessRegisteredCapital           : ['', [this.simplesService.stringValidator]],//注册资本
      creditCode                          : ['', [this.simplesService.stringValidator]],//社会信用代码
      organizationCode                    : ['', [this.simplesService.stringValidator]],//组织机构代码
      legalPersonName                     : ['', [Validators.required], [this.simplesService.userNameAsyncValidator]],//法人姓名
      legalPersonIdcard                   : ['', [Validators.required], [this.simplesService.idCardNumValidator]],//法人身份证号
      idcardStartTime                     : [null, [this.simplesService.validateRequired]],//法人身份证有效起始日期
      idcardEndTime                       : [null, [this.simplesService.validateRequired]],//法人身份证有效结束日期
      bankAccountName                     : ['', [Validators.required], [this.simplesService.userNameAsyncValidator]],//银行开户名
      bankAccountNumber                   : ['', [this.simplesService.stringValidator]],//公司银行账号
      bankName                            : ['', [this.simplesService.stringValidator]],//开户行支行名称
      bankCode                            : ['', [this.simplesService.stringValidator]],//开户支行联行号
      bankAddress                         : [null, [this.simplesService.addressValidator]],//开户银行地址
      isSettlementAccount                 : [true, [this.simplesService.stringValidator]],//是否为结算账户
      settlementBankAccountName           : ['', [this.simplesService.stringValidator]],//结算银行开户名
      settlementBankAccountNumber         : ['', [this.simplesService.stringValidator]],//结算银行账号
      settlementBankName                  : ['', [this.simplesService.stringValidator]],//结算账户开户行支行名称
      settlementBankCode                  : ['', [this.simplesService.stringValidator]],//结算账户开户行支行联行号
      settlementBankAddress               : [null, [this.simplesService.addressValidator]],//结算账户开户行所在地
      taxRegistrationCertificate          : ['', [this.simplesService.stringValidator]],//税务登记证号
      taxPayerId                          : ['', [this.simplesService.stringValidator]],//纳税人识别号
      generalTaxPayer                     : [null, [this.simplesService.stringValidator]],//一般纳税人证明
      taxRegistrationCertificateElectronic: [null, [this.simplesService.stringValidator]],//纳税登记证电子版
      organizationCodeElectronic          : [null, [this.simplesService.stringValidator]],//组织机构代码电子版
      businessLicenceNumberElectronic     : [null, [this.simplesService.stringValidator]],//电子版营业执照
      bankLicenceElectronic               : [null, [this.simplesService.stringValidator]],//开户银行许可证电子版
      idType                              :  [1],//证件类型
    });
  }

  ngOnInit() {


  }

  addFormControls(event){
    /*let con = new FormControl();
    con.validator = this.simplesService.stringValidator;
    if(event){
      this.validateForm.addControl('adfdsgs',con);
    }*/
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

  bankLicenceFileChangeListener() {
    // 当选择了新的图片的时候，把老图片从待上传列表中移除
    if (this.bankLicenceUploader.queue.length > 1) this.bankLicenceUploader.queue[0].remove();
  }

  generalTaxPayerFileChangeListener() {
    // 当选择了新的图片的时候，把老图片从待上传列表中移除
    if (this.generalTaxPayerUploader.queue.length > 1) this.generalTaxPayerUploader.queue[0].remove();
  }

  taxRegistrationFileChangeListener() {
    // 当选择了新的图片的时候，把老图片从待上传列表中移除
    if (this.taxRegistrationUploader.queue.length > 1) this.taxRegistrationUploader.queue[0].remove();
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
      this.bankLicenceUploader,
      this.generalTaxPayerUploader,
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
        this.validateForm.patchValue({bankLicenceElectronic: uuid});
        break;
      case 3:
        this.validateForm.patchValue({generalTaxPayer: uuid});
        break;
      case 4:
        this.validateForm.patchValue({taxRegistrationCertificateElectronic: uuid});
        break;
    }
  }
  _console(value) {
    // console.log(value);
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
