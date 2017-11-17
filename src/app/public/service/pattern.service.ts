import {Injectable} from '@angular/core';

/**
 * 用来定义表单验证的正则表达式
 */
@Injectable()
export class PatternService {
  public num: string; //数字
  public letter: string; //字母
  public phone: string; //手机号
  public idcard: string; //身份证
  public telephone: string; //固话
  public buno: string; //营业执照
  public backcard: string; //银行卡
  public chinese: string; //中文
  public tel: string;//手机号和固话
  public decimals: string;  // 0-1小数
  public doubleDigit: string; // 两位为整数（0-99）
  public _URL: string; //网址
  public twodecimal: string;//两位小数
  public integer: string;//正整数
  public EMAIL_REGEXP: RegExp;//邮箱
  public PWD: RegExp;//密码
  public SMS: RegExp;//短信验证码
  public PHONE: RegExp;//手机号

  constructor() {
    this.num = '^[0-9]*$'; //数字正则
    this.letter = '^[A-Za-z]*$'; //字母正则
    this.phone = '^1[0-9]{10}$'; //手机号正则
    this.idcard = '^(^[1-9][0-9]{7}((0[0-9])|(1[0-2]))(([0|1|2][0-9])|3[0-1])[0-9]{3}$)|(^[1-9][0-9]{5}[1-9][0-9]{3}((0[0-9])|(1[0-2]))(([0|1|2][0-9])|3[0-1])(([0-9]{4})|[0-9]{3}[Xx])$)$'; //身份证正则
    this.telephone = '^((^[0-9]{3,4}-[0-9]{7,8}$)|(^[0-9]{7,8}$))$'; //固话正则（支持带区号和不带区号）
    this.buno = '^(([a-zA-Z0-9]{8}-[a-zA-Z0-9])|([a-zA-Z0-9]{18})|([a-zA-Z0-9]{15}))$'; //营业执照正则（三网合一）
    this.backcard = '^([0-9]{16}|[0-9]{19})$'; //银行卡正则（三网合一）
    this.chinese = '^[\u4e00-\u9fa5]{0,}$'; //中文正则（三网合一），除中文的任何数字包括字符
    this.tel = '(^1[0-9]{10}$)|(^((^[0-9]{3,4}-[0-9]{7,8}$)|(^[0-9]{7,8}$))$)';//手机号和固话同时验证
    this._URL = '^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$'; //网址
    this.decimals = '^(0\.[0-9]*[1-9]$)|^0$';　　//0-1小数，包含0,不包含1
    this.twodecimal = '^[0-9]+(.[0-9]{1,2})?$';    //两位小数
    this.doubleDigit = '^[0-9]{1,2}$';      // 两位整数（0-99）
    this.integer = '^[0-9]*[1-9][0-9]*$';   //只能正整数

    this.EMAIL_REGEXP = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
    this.PWD = /[A-Za-z0-9]{6,}/;//密码
    this.SMS = /\d{6}/;//短信验证码
    this.PHONE = /^1[0-9]{10}$/;//手机号

  }

}
