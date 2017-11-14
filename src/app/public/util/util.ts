/*公共JS库*/
import {Injectable} from "@angular/core";
import {isUndefined} from "util";

declare var $: any;

@Injectable()
export class Util {
  public static enumData = {};

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

}
