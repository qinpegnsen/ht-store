/*公共JS库*/
import {Injectable} from "@angular/core";
import {isNull, isNullOrUndefined, isUndefined} from "util";
import {FormControl} from "@angular/forms";
import {Observable} from "rxjs/Observable";
import {PatternService} from "../service/pattern.service";

declare var $: any;

@Injectable()
export class Util {
  public static enumData = {};

  /**
   * ***********************表单验证取值字符串定义**********************
   * 用于代替表单常用校验方法取错字段hasError(string)中的string
   * 请保证这些value值与下面具体校验方法中的返回字段key相同
   * using： <div nz-form-explain
   *ngIf="getFormControl('idCard').dirty&&getFormControl('idCard').hasError(valitate.isIdCard)">
   请输入6位以上含数字、字母组成的密码！
   </div>
   **/
  public static validate = {
    isPhone: 'phone',
    isEmail: 'email',
    isPwd: 'pwd',
    isSmsCode: 'smsCode',
    isIdCard: 'idCard',
  }

  constructor(public patterns: PatternService) {
  }

  /**
   * 格式化日期
   * @param date 日期对象
   * @param fmt  格式化形式
   * @returns {any}
   */
  public static dataFormat = function (date: Date, fmt) {
    var o = {
      "M+": date.getMonth() + 1, //月份
      "d+": date.getDate(), //日
      "H+": date.getHours(), //小时
      "m+": date.getMinutes(), //分
      "s+": date.getSeconds(), //秒
      "q+": Math.floor((date.getMonth() + 3) / 3), //季度
      "S": date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
  }

  /**
   * 根据指定日期，获取其前后日期
   * @param date 指定日期
   * @param num  时间 （1代表后一天，2代表后两天，-1代表前一天......等等）
   */
  public static getAroundDateByDate = function (date: Date, num: number) {
    return new Date(date.getTime() + (1000 * 60 * 60 * 24) * num);
  }

  /**
   * 根据指定时间，获取其前后日期
   * @param date 指定日期
   * @param num  时间 （1代表后一小时，2代表后两小时，-1代表前一小时......等等）
   */
  public static getAroundDateByHour = function (date: Date, num: number) {
    return new Date(date.getTime() + (1000 * 60 * 60) * num);
  }

  /**
   *
   * 根据日期获取是星期几
   * @param date 日期
   * @param lan 语言（'cn':中文，'en':英语）默认中文
   * @returns {string}
   */
  public static getWeek = function (date: Date, lan?) {
    let today = new Array('周日', '周一', '周二', '周三', '周四', '周五', '周六');
    if (!isUndefined(lan) && lan == 'en') today = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');
    let week = today[date.getDay()];
    return week;
  }

  /**
   * 获取日期时间戳
   * @param string 日期：2017-08-14 或 2017-08-14 15:30:00
   * @returns {number}
   * @constructor
   */
  public static dateToUnix = function (string) {
    var f = string.split(' ', 2);
    var d = (f[0] ? f[0] : '').split('-', 3);
    var t = (f[1] ? f[1] : '').split(':', 3);
    return (new Date(
      parseInt(d[0], 10) || null,
      (parseInt(d[1], 10) || 1) - 1,
      parseInt(d[2], 10) || null,
      parseInt(t[0], 10) || null,
      parseInt(t[1], 10) || null,
      parseInt(t[2], 10) || null
    )).getTime();
  }

  /**
   * 显示遮罩层（全局）
   */
  static showMask() {
    setTimeout(() => {
      $(".main-mask").show();
    });
  }

  /**
   * 隐藏遮罩层（全局）
   */
  static hideMask() {
    setTimeout(() => {
      $(".main-mask").hide();
    });
  }

  /**
   *最近十年 (已当前的年份为起点，获取之前十年的信息)
   * @returns {Array} ["2017", "2016", "2015", "2014", "2013", "2012", "2011", "2010", "2009", "2008"]
   */
  public static tenYear = function () {
    let nowYear: number = new Date().getFullYear(), tenYearArr: Array<string> = new Array();
    for (let i = 0; i < 10; i++) {
      tenYearArr.push(nowYear.toString());
      nowYear--;
    }
    return tenYearArr;
  }

  /**
   * 获取月份
   * @returns {Array} 如：["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
   */
  public static getMonth = function () {
    let monthArr: Array<string> = new Array();
    for (let i = 0; i < 12; i++) {
      if (i < 9) monthArr.push("0" + (i + 1).toString());
      else monthArr.push((i + 1).toString());
    }
    return monthArr;
  }

  /**
   * 转换区域数据格式，用于级联选择组件
   */
  public static transAreas(areas: Array<any>) {
    areas.forEach(res => {
      if (res.value) return;
      res.value = res.areaCode;
      res.label = res.areaName;
      if (res.children) this.transAreas(res.children); else res.isLeaf = true;
    })
  }

  /**
   * ************************************佐罗框架的表单验证方法**************************************
   * 请保证变量的状态参数与定义的validate中的字符串一致
   * eg:{error: true, phone: true}中phone等于Util.validate.isPhone;
   **/

  /*========================== 非FormGroup的表单验证 start ==============================
   * 非FormGroup下使用ngModel绑定模板变量的形式下使用
   */
  /**
   * 输入值状态信息判断
   * @param templateParam ：输入框ngModel模板变量
   * @returns 返回nzValidateStatus的几个状态，这里只给到'success' ,'error'
   *  <div nz-col [nzSpan]="10" nz-form-control nzHasFeedback [nzValidateStatus]="ngValidateStatus(ngPhone)">
   <nz-input name="phone" [(ngModel)]="phone" required [nzType]="'text'" [nzPlaceHolder]="'企业名称'"
   #ngPhone="ngModel" pattern='^1[0-9]{10}$'>
   </nz-input>
   </div>
   */
  public static ngValidateStatus(templateParam) {
    return templateParam.pristine ? null ://未输入状态不返回状态值
      templateParam.valid ? 'success' : 'error';//输入正确返回success，否则error
  }

  /**
   * 错误提示信息的提示状态
   * @param templateParam ：输入框ngModel模板变量
   * @returns 返回输入值的状态（输入正确:'success'，输入后清空:'empty',输入值不符合要求:'error',未输入：null）
   * 使用上面的输入模板：
   * eg1: <div nz-form-explain *ngIf="ngValidateErrorMsg(ngPhone) == 'empty'">请输入手机号！</div>
   * eg2: <div nz-form-explain *ngIf="ngValidateErrorMsg(ngPhone) == 'empty'">请输入正确的手机号！</div>
   */
  public static ngValidateErrorMsg(templateParam) {
    return templateParam.pristine ? null ://未输入状态不返回状态值
      templateParam.valid ? 'success' : //输入正确返回success
        templateParam.invalid && (isNullOrUndefined(templateParam.value) || templateParam.value == '') ? 'empty' :// 输入后如果不正确，判断是否是值为空，空则返回'empty'
          'error';
  }

  /*========================== 非FormGroup的表单验证 end ==============================*/


  /*========================== FormGroup的表单验证 start ===============================*/
  /**
   * 手机号校验
   * @param control
   * @returns {any}
   */
  public static phoneValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!PatternService.PHONE_REGEXP.test(control.value)) {
      return {error: true, phone: true};
    }
  };

  /**
   * 邮箱校验
   * @param control
   * @returns {any}
   */
  public static emailValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return {required: true}
    } else if (!PatternService.EMAIL_REGEXP.test(control.value)) {
      return {error: true, email: true};
    }
  };

  /**
   * 密码校验
   * @param control
   * @returns {any}
   */
  public static pwdValidator = (control: FormControl): any => {
    if (!control.value) {
      return {required: true}
    } else if (!PatternService.PWD_REGEXP.test(control.value)) {
      return {pwd: true, error: true}
    }
  };


  /**
   以下方法会显示输入中状态，一定时间（eg:500ms）后不输入才会反馈校验结果;
   用法：this.validateForm = this.fb.group({
      phone ：[null, [ Validators.required ], [ Util.requiredPhoneValidator ]
    });//此种方式[ Validators.required ]是必要的

   * 必填的手机号异步校验
   * @param control
   * @returns {any}
   */
  public static requiredPhoneValidator = (control: FormControl): any => {
    return Util.asyncPatternsValidate(PatternService.PHONE_REGEXP, control, {error: true, phone: true});
  };

  /**
   * 短信验证码异步校验
   * @param control
   * @returns {any}
   */
  public static smsCodeValidator = (control: FormControl): any => {
    return Util.asyncPatternsValidate(PatternService.SMS_REGEXP, control, {error: true, smsCode: true});
  };

  /**
   * 身份证号校验
   * @param control
   * @returns {any}
   */
  public static idCardNumValidator = (control: FormControl): any => {
    return Util.asyncPatternsValidate(PatternService.IDCARD_REGEXP, control, {error: true, idCard: true});
  };

  /**
   * 有输入中状态的需要正则校验的异步校验方法封装，
   * 用法（Util.asyncPatternsValidate(PatternService.IDCARD_REGEXP, control, { error: true, idCard: true })
   * @param exp （需要匹配的正则表达式）
   * @param control （FormGroup的表单项）
   * @param obj （需要的返回对象，eg:{ error: true, idCard: true }）
   */
  public static asyncPatternsValidate = (exp: RegExp, control: FormControl, obj?: any) => {
    return Observable.create(function (observer) {
      setTimeout(() => {
        if (!exp.test(control.value)) {
          if (isNullOrUndefined(obj)) obj = {error: true};
          observer.next(obj);
        } else {
          observer.next(null);
        }
        observer.complete();
      }, 1000);
    });
  }


  /**
   * 审核input框的value合不合要求，只能输入整数或两位小数的限制方法
   * @param target 在HTML里的($event.targets，或模板变量)
   * @param type ('int':整数，其他默认两位小数)
   */
  public static auditInputValueForNum(target,type?:string){
    let val = target.value, reg;
    if(type == 'int') reg = val.match(/^[1-9]{1}[0-9]*/);
    else reg = val.match(/\d+(\.\d{1,2})?/);
    if (!isNull(reg)){
      target.value = reg[0];
    }else {
      target.value = val.substring(0,val.length-1)
    }
  }


}
