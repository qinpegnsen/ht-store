import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs/Observable";
import {PatternService} from "../../public/service/pattern.service";
import {isNullOrUndefined} from "util";
import {AjaxService} from "../../public/service/ajax.service";
import {SettingUrl} from "../../public/setting/setting_url";
import {NzMessageService, NzNotificationService} from "ng-zorro-antd";


const options = [{
  value: 'zhejiang',
  label: 'Zhejiang',
  children: [{
    value: 'hangzhou',
    label: 'Hangzhou',
    children: [{
      value: 'xihu',
      label: 'West Lake',
      isLeaf: true
    }],
  }, {
    value: 'ningbo',
    label: 'Ningbo',
    isLeaf: true
  }],
}, {
  value: 'jiangsu',
  label: 'Jiangsu',
  children: [{
    value: 'nanjing',
    label: 'Nanjing',
    children: [{
      value: 'zhonghuamen',
      label: 'Zhong Hua Men',
      isLeaf: true
    }],
  }],
}];

@Injectable()
export class SimplesService {
  validateForm: FormGroup;          //企业注册表单
  validateFormComplete: FormGroup;  //企业入驻表单
  validateFormDredge: FormGroup;    //企业开通店铺表单
  options:any;
  current:number = 0;

  constructor(public router: Router,
              public patterns: PatternService,
              public _message: NzMessageService,
              public _notification: NzNotificationService,
              public fb: FormBuilder) {
    this.options = options

    //企业注册表单项校验
    this.validateForm = this.fb.group({
      sellerAcct          : [ '', [ Validators.required ], [ this.userNameAsyncValidator ] ],
      phone               : [ '', [ Validators.required ], [ this.phoneValidator ] ],
      smsCode             : [ '', [ Validators.required ], [ this.smsCodeValidator ] ],
      sellerPwd           : [ '', [ this.pwdValidator] ],
      rePwd               : [ '', [ this.passwordConfirmationValidator ] ],
      // email               : [ '', [ this.emailValidator ] ],
      isBoss              : [ true ]
    });

    //企业入驻表单项校验
    this.validateFormComplete = this.fb.group({
      epName                          : [ '', [ Validators.required ], [ this.userNameAsyncValidator ] ],//企业名称
      epCode                          : [ '', [ this.stringValidator ] ],//企业编码
      sellerAcct                      : [ '', [ this.stringValidator ] ],//商家账户
      sellerCode                      : [ '', [ this.stringValidator ] ],//商家编码
      contactsName                    : [ '', [ Validators.required ], [ this.userNameAsyncValidator ] ],//联系人姓名
      contactsPhone                   : [ '', [ this.phoneValidator ] ],//联系人手机号
      contactsEmail                   : [ '', [ this.emailValidator ] ],//企业邮箱
      businessLicence                 : [ '', [ this.stringValidator ] ],//营业执照注册号
      businessLicenceAddress          : [ [], [ this.addressValidator ] ],//地址
      businessLicenceAreaCode         : [ '', [ this.stringValidator ] ],//营业执照所在地区编码
      businessLicenceAreaName         : [ '', [ this.stringValidator ] ],//营业执照所在地区名称
      businessLicenceSphere           : [ '', [ this.stringValidator ] ],//法定经营范围
      businessLicenceStart            : [ '', [ this.validateTime ] ],//营业执照有效起始日期
      businessLicenceEnd              : [ '', [ this.validateTime ] ],//营业执照有效结束日期
      businessRegisteredCapital       : [ '', [ this.stringValidator ] ],//注册资本
      creditCode                      : [ '', [ this.stringValidator ] ],//社会信用代码
      organizationCode                : [ '', [ this.stringValidator ] ],//组织机构代码
      legalPersonName                 : [ '', [ Validators.required ], [ this.userNameAsyncValidator ] ],//法人姓名
      legalPersonIdcard               : [ '', [ Validators.required ], [ this.idCardNumValidator ] ],//法人身份证号
      idcardStartTime                 : [ null, [ this.validateTime ] ],//法人身份证有效起始日期
      idcardEndTime                   : [ null, [ this.validateTime ] ],//法人身份证有效结束日期
      bankAccountName                 : [ '', [ Validators.required ], [ this.userNameAsyncValidator ] ],//银行开户名
      bankAccountNumber               : [ '', [ this.stringValidator ] ],//公司银行账号
      bankName                        : [ '', [ this.stringValidator ] ],//开户行支行名称
      bankCode                        : [ '', [ this.stringValidator ] ],//开户支行联行号
      bankAddress                     : [ '', [ this.stringValidator ] ],//开户银行地址
      bankLicenceElectronic           : [ '', [ this.stringValidator ] ],//组织机构代码
      isSettlementAccount             : [ '', [ this.stringValidator ] ],//是否为结算账户
      settlementBankAccountName       : [ '', [ this.stringValidator ] ],//结算银行开户名
      settlementBankAccountNumber     : [ '', [ this.stringValidator ] ],//结算银行账号
      settlementBankName              : [ '', [ this.stringValidator ] ],//结算账户开户行支行名称
      settlementBankCode              : [ '', [ this.stringValidator ] ],//结算账户开户行支行联行号
      settlementBankAddress           : [ '', [ this.addressValidator ] ],//结算账户开户行所在地
      taxRegistrationCertificate      : [ '', [ this.stringValidator ] ],//税务登记证号
      generalTaxPayer                 : [ '', [ this.stringValidator ] ],//一般纳税人证明
      taxPayerId                      : [ '', [ this.stringValidator ] ],//纳税人识别号
      taxRegistrationCertificateElectronic: [ '', [ this.stringValidator ] ],//纳税登记证电子版
      organizationCodeElectronic      : [ null ],//组织机构代码电子版
      businessLicenceNumberElectronic : [ null ],//电子版营业执照
      idType                          : [ 1 ],//证件类型
    });

    //企业开通店铺表单项校验
    this.validateFormDredge = this.fb.group({
      storeName            : [ '', [ this.stringValidator ] ],//店铺名称
      areaName             : [ '', [ this.addressValidator ] ],//店铺所在地区
      areaCode             : [ '', [ this.stringValidator ] ],//店铺所在区域编码
      areaFullName         : [ '', [ this.stringValidator ] ],//店铺所在区域全称
      address              : [ '', [ this.stringValidator ] ],//详细地址
      storeZip             : [ '', [ this.stringValidator ] ],//邮政编码
      storeLabel           : [ '', [ this.stringValidator ] ],//店铺logo
      storeAvatar          : [ '', [ this.stringValidator ] ],//店铺头像
      storeQQ              : [ '', [ this.stringValidator ] ],//QQ
      storeWW              : [ '', [ this.stringValidator ] ],//阿里旺旺
      storePhone           : [ '', [ this.stringValidator ] ]//商家电话
    });
  }


  /**
   * 根据入驻步骤跳到相应页面
   * @param current （当前步骤）
   */
  routerSkip(){
    switch (this.current) {
      case 0 :
        this.router.navigate(['/simple/reg/register'], {replaceUrl: true})
        break;
      case 1 :
        this.router.navigate(['/simple/reg/complete'], {replaceUrl: true})
        break;
      case 2 :
        this.router.navigate(['/simple/reg/dredge'], {replaceUrl: true})
        break;
      case 3 :
        this.router.navigate(['/simple/reg/done'], {replaceUrl: true})
        break;
    }
  }

  /**
   * 注册商户
   * @param requestDate
   * @param callback
   */
  addSeller(requestDate:any){
    const me = this;
    AjaxService.post({
      url: SettingUrl.URL.seller.add,
      data: requestDate,
      success: (res) => {
        if (res.success) {
          me.afterSubmit();
        } else {
          me._message.create('error', `出错了`)
        }
      },
      error: (res) => {
        me._notification.create('error', `接口出错了`, '接口出错了接口出错了接口出错了')
      }
    });
  }

  /**
   * 表单提交成功之后执行的方法
   */
  afterSubmit(){
    this.current += 1;
    this.routerSkip();
  }

  /**
   * 回到前一步
   */
  pre() {
    this.current -= 1;
    this.routerSkip();
  }

  /**
   * 用户名异步校验
   * @param control
   * @returns {any}
   */
  userNameAsyncValidator = (control: FormControl): any => {
    return Observable.create(function (observer) {
      setTimeout(() => {
        if (control.value === 'JasonWood') {
          observer.next({ error: true, duplicated: true });
        } else {
          observer.next(null);
        }
        observer.complete();
      }, 500);
    });
  };

  /**
   * 手机号异步校验
   * @param control
   * @returns {any}
   */
  phoneValidator = (control: FormControl): any => {
    return this.asyncPatternsValidate(this.patterns.PHONE_REGEXP, control, { error: true, phone: true });
  };

  /**
   * 短信验证码异步校验
   * @param control
   * @returns {any}
   */
  smsCodeValidator = (control: FormControl): any => {
    return this.asyncPatternsValidate(this.patterns.SMS_REGEXP, control, { error: true, smsCode: true });
  };

  /**
   * 密码异步校验
   * @param control
   * @returns {any}
   */
  pwdValidator = (control: FormControl): any => {
    if (!control.value) {
      return { required: true }
    } else if (!this.patterns.PWD_REGEXP.test(control.value)) {
      return { pwd: true, error: true }
    }
  };

  /**
   * 字符串
   * @param control
   * @returns {any}
   */
  stringValidator = (control: FormControl): any => {
    if (!control.value) {
      return { required: true }
    }
  };

  /**
   * 输入确认密码时校验
   */
  validateConfirmPassword() {
    setTimeout(_ => {
      this.validateForm.controls[ 'rePwd' ].updateValueAndValidity();
    })
  }

  /**
   * 密码异步校验
   * @param control
   * @returns {any}
   */
  passwordConfirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls[ 'sellerPwd' ].value) {
      return { confirm: true, error: true };
    }
  };

  /**
   * 邮箱校验
   * @param control
   * @returns {any}
   */
  emailValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true }
    } else if (!this.patterns.EMAIL_REGEXP.test(control.value)) {
      return { error: true, email: true };
    }
  };

  /**
   * 地址校验（地址级别对应数组长度）
   * @param control
   * @returns {any}
   */
  addressValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true }
    } else if (control.value.length < 3) {
      return { error: true, address: true };
    }
  };

  /**
   * 身份证号校验
   * @param control
   * @returns {any}
   */
  idCardNumValidator = (control: FormControl): any => {
    return this.asyncPatternsValidate(this.patterns.IDCARD_REGEXP, control, { error: true, idCard: true });
  };

  /**
   * 日期
   * @param control
   * @returns {any}
   */
  validateTime = (control: FormControl): any => {
    if (!control.value) {
      return { required: true };
    }
  };

  /**
   * 排除不可选的身份证有效开始日期
   * @param startValue
   * @returns {boolean}
   * @private
   */
  _disabledIdCardStartDate = (startValue) => {
    if (!startValue || !this.validateFormComplete.controls[ 'idcardEndTime' ].value) {
      return false;
    }
    return startValue.getTime() >= this.validateFormComplete.controls[ 'idcardEndTime' ].value.getTime();
  };

  /**
   * 排除不可选的身份证有效结束日期
   * @param endValue
   * @returns {boolean}
   * @private
   */
  _disabledIdCardEndDate = (endValue) => {
    if (!endValue || !this.validateFormComplete.controls[ 'idcardStartTime' ].value) {
      return false;
    }
    return endValue.getTime() <= this.validateFormComplete.controls[ 'idcardStartTime' ].value.getTime();
  };

  /**
   * 排除不可选的营业执照有效开始日期
   * @param startValue
   * @returns {boolean}
   * @private
   */
  _disabledBusinessLicenceStartDate = (startValue) => {
    if (!startValue || !this.validateFormComplete.controls[ 'businessLicenceEnd' ].value) {
      return false;
    }
    return startValue.getTime() >= this.validateFormComplete.controls[ 'businessLicenceEnd' ].value.getTime();
  };

  /**
   * 排除不可选的营业执照有效结束日期
   * @param endValue
   * @returns {boolean}
   * @private
   */
  _disabledBusinessLicenceEndDate = (endValue) => {
    if (!endValue || !this.validateFormComplete.controls[ 'businessLicenceStart' ].value) {
      return false;
    }
    return endValue.getTime() <= this.validateFormComplete.controls[ 'businessLicenceStart' ].value.getTime();
  };

  /**
   * 输入延迟的异步正则校验方法封装
   * 用法（this.asyncPatternsValidate(this.patterns.IDCARD_REGEXP, control, { error: true, idCard: true })
   * @param exp
   * @param value
   * @param obj
   * @returns {any}
   */
  asyncPatternsValidate = (exp: RegExp,control: FormControl, obj?: any) => {
    return Observable.create(function (observer) {
      setTimeout(() => {
        if (!exp.test(control.value)) {
          if(isNullOrUndefined(obj)) obj = {error: true};
          observer.next(obj);
        } else {
          observer.next(null);
        }
        observer.complete();
      }, 1000);
    });
  }

}
