/*公共JS库*/
import {Injectable} from "@angular/core";
import {isNullOrUndefined, isUndefined} from "util";
import {FormControl} from "@angular/forms";
import {Observable} from "rxjs/Observable";
import {PatternService} from "../service/pattern.service";
import {SettingUrl} from "../setting/setting_url";
import {AjaxService} from "../service/ajax.service";

declare var $: any;

@Injectable()
export class Util {
  public static enumData = {};

  /**
   * ***********************表单验证取值字符串定义**********************
   * 用于代替表单常用校验方法取错字段hasError(string)中的string
   * 请保证这些值与下面具体校验方法中的参数返回字段key相同
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
   *最近十年
   * @returns {Array}
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
   * ************************************表单验证方法**************************************
   * 请保证变量的状态参数与定义的validate中的字符串一致
   * eg:{error: true, phone: true}中phone等于Util.validate.isPhone;
   **/

  /**
   * 手机号异步校验
   * @param control
   * @returns {any}
   */
  public static phoneValidator = (control: FormControl): any => {
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
   * 密码异步校验
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
   * 身份证号校验
   * @param control
   * @returns {any}
   */
  public static idCardNumValidator = (control: FormControl): any => {
    return Util.asyncPatternsValidate(PatternService.IDCARD_REGEXP, control, {error: true, idCard: true});
  };

  /**
   * 输入延迟的异步正则校验方法封装
   * 用法（this.asyncPatternsValidate(this.patterns.IDCARD_REGEXP, control, { error: true, idCard: true })
   * @param exp （正则表达式）
   * @param value
   * @param obj （eg:{ error: true, idCard: true }）
   * @returns {any}
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


}
