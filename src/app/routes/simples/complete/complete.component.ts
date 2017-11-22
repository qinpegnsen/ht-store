import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SimplesService} from "../simples.service";
import {StepsComponent} from "../steps/steps.component";

@Component({
  selector: 'app-complete',
  templateUrl: './complete.component.html',
  styleUrls: ['./complete.component.css']
})
export class CompleteComponent implements OnInit {
  validateForm: FormGroup;
  _options: any;//三级联动区域数据

  constructor(public simplesService: SimplesService,
              public steps: StepsComponent,
              public fb: FormBuilder) {
    this.steps.current = 1;
    this.simplesService.routerSkip(this.steps.current);
    this._options = this.simplesService.options;
    this.validateForm = this.fb.group({
      epName                          : [ '', [ Validators.required ], [ this.simplesService.userNameAsyncValidator ] ],//企业名称
      epCode                          : [ '', [ this.simplesService.stringValidator ] ],//企业编码
      sellerAcct                      : [ '', [ this.simplesService.stringValidator ] ],//商家账户
      sellerCode                      : [ '', [ this.simplesService.stringValidator ] ],//商家编码
      contactsName                    : [ '', [ Validators.required ], [ this.simplesService.userNameAsyncValidator ] ],//联系人姓名
      contactsPhone                   : [ '', [ this.simplesService.phoneValidator ] ],//联系人手机号
      contactsEmail                   : [ '', [ this.simplesService.emailValidator ] ],//企业邮箱
      businessLicence                 : [ '', [ this.simplesService.stringValidator ] ],//营业执照注册号
      businessLicenceAddress          : [ [], [ this.simplesService.addressValidator ] ],//地址
      businessLicenceAreaCode         : [ '', [ this.simplesService.stringValidator ] ],//营业执照所在地区编码
      businessLicenceAreaName         : [ '', [ this.simplesService.stringValidator ] ],//营业执照所在地区名称
      businessLicenceSphere           : [ '', [ this.simplesService.stringValidator ] ],//法定经营范围
      businessLicenceStart            : [ '', [ this.simplesService.validateRequired ] ],//营业执照有效起始日期
      businessLicenceEnd              : [ '', [ this.simplesService.validateRequired ] ],//营业执照有效结束日期
      businessRegisteredCapital       : [ '', [ this.simplesService.stringValidator ] ],//注册资本
      creditCode                      : [ '', [ this.simplesService.stringValidator ] ],//社会信用代码
      organizationCode                : [ '', [ this.simplesService.stringValidator ] ],//组织机构代码
      legalPersonName                 : [ '', [ Validators.required ], [ this.simplesService.userNameAsyncValidator ] ],//法人姓名
      legalPersonIdcard               : [ '', [ Validators.required ], [ this.simplesService.idCardNumValidator ] ],//法人身份证号
      idcardStartTime                 : [ null, [ this.simplesService.validateRequired ] ],//法人身份证有效起始日期
      idcardEndTime                   : [ null, [ this.simplesService.validateRequired ] ],//法人身份证有效结束日期
      bankAccountName                 : [ '', [ Validators.required ], [ this.simplesService.userNameAsyncValidator ] ],//银行开户名
      bankAccountNumber               : [ '', [ this.simplesService.stringValidator ] ],//公司银行账号
      bankName                        : [ '', [ this.simplesService.stringValidator ] ],//开户行支行名称
      bankCode                        : [ '', [ this.simplesService.stringValidator ] ],//开户支行联行号
      bankAddress                     : [ '', [ this.simplesService.stringValidator ] ],//开户银行地址
      bankLicenceElectronic           : [ '', [ this.simplesService.stringValidator ] ],//组织机构代码
      isSettlementAccount             : [ '', [ this.simplesService.stringValidator ] ],//是否为结算账户
      settlementBankAccountName       : [ '', [ this.simplesService.stringValidator ] ],//结算银行开户名
      settlementBankAccountNumber     : [ '', [ this.simplesService.stringValidator ] ],//结算银行账号
      settlementBankName              : [ '', [ this.simplesService.stringValidator ] ],//结算账户开户行支行名称
      settlementBankCode              : [ '', [ this.simplesService.stringValidator ] ],//结算账户开户行支行联行号
      settlementBankAddress           : [ '', [ this.simplesService.addressValidator ] ],//结算账户开户行所在地
      taxRegistrationCertificate      : [ '', [ this.simplesService.stringValidator ] ],//税务登记证号
      generalTaxPayer                 : [ '', [ this.simplesService.stringValidator ] ],//一般纳税人证明
      taxPayerId                      : [ '', [ this.simplesService.stringValidator ] ],//纳税人识别号
      taxRegistrationCertificateElectronic: [ '', [ this.simplesService.stringValidator ] ],//纳税登记证电子版
      organizationCodeElectronic      : [ null ],//组织机构代码电子版
      businessLicenceNumberElectronic : [ null ],//电子版营业执照
      idType                          : [ 1 ],//证件类型
    });
  }

  ngOnInit() {
  }

  /**
   * 点击下一步按钮时会提交表单，成功后跳转下一步
   * @param $event
   * @param value
   */
  submitCompleteForm = ($event, value) => {
    $event.preventDefault();
    /*for (const key in this.validateForm.controls) {
     this.validateForm.controls[ key ].markAsDirty();
     }*/
    console.log(value);
    let formValue = value;
    this.simplesService.addSeller(formValue);
  };

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
    if (!startValue || !this.validateForm.controls[ 'idcardEndTime' ].value) {
      return false;
    }
    return startValue.getTime() >= this.validateForm.controls[ 'idcardEndTime' ].value.getTime();
  };

  /**
   * 排除不可选的身份证有效结束日期
   * @param endValue
   * @returns {boolean}
   * @private
   */
  _disabledIdCardEndDate = (endValue) => {
    if (!endValue || !this.validateForm.controls[ 'idcardStartTime' ].value) {
      return false;
    }
    return endValue.getTime() <= this.validateForm.controls[ 'idcardStartTime' ].value.getTime();
  };

  /**
   * 排除不可选的营业执照有效开始日期
   * @param startValue
   * @returns {boolean}
   * @private
   */
  _disabledBusinessLicenceStartDate = (startValue) => {
    if (!startValue || !this.validateForm.controls[ 'businessLicenceEnd' ].value) {
      return false;
    }
    return startValue.getTime() >= this.validateForm.controls[ 'businessLicenceEnd' ].value.getTime();
  };

  /**
   * 排除不可选的营业执照有效结束日期
   * @param endValue
   * @returns {boolean}
   * @private
   */
  _disabledBusinessLicenceEndDate = (endValue) => {
    if (!endValue || !this.validateForm.controls[ 'businessLicenceStart' ].value) {
      return false;
    }
    return endValue.getTime() <= this.validateForm.controls[ 'businessLicenceStart' ].value.getTime();
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
