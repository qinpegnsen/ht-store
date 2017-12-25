import {Component, OnInit} from "@angular/core";
import { FormGroup} from "@angular/forms";
import {LoginService} from "../login.service";
import {ForgetPasswordComponent} from "../forget-password/forget-password.component";
import {NzNotificationService} from "ng-zorro-antd";
import {Util} from "../../../public/util/util";
declare var $: any;
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  validateForm: FormGroup;//重置密码的表单
  msgCode: string = '获取验证码';
  isSending: boolean = false;//判断获取验证码的按钮，如果已经点击过了，就变禁用
  phoneState: string;//获取验证码时判断手机号是否输入
  phone:string; //订单号
  code:string; //快递号
  valitateCheck: any = Util.validate; //表单验证

  constructor(public loginService: LoginService, public forgetPwd: ForgetPasswordComponent,public _notification: NzNotificationService) {
    this.validateForm = this.loginService.validateFormReset;////重置密码的表单
    this.forgetPwd.current = 0;
  }

  ngOnInit() {

  }

  /**
   * 提交表单（点击下一步按钮时会提交表单，成功后跳转下一步）
   * @param $event
   * @param value
   */
  submitForm() {
    let me = this;
    //console.log(value);
    /*if(!value.phone||!value.code){
      this._notification.error("请填写手机号", "请填写手机号或者验证码");
      return;
    }else{
      this.forgetPwd.current += 1;
      this.loginService.routerSkip(this.forgetPwd.current);
    }*/
    if(me.loginService.checkSmsCode(this.phone,this.code)){
      this.forgetPwd.current += 1;
      this.loginService.routerSkip(this.forgetPwd.current);
      this.loginService.validateForm();
    }
  };

  /**
   * from表单
   * @param name
   * @returns {AbstractControl}
   */
  getFormControl(name) {
    return this.validateForm.controls[name];
  }


  /**
   * 忘记密码时获取验证码
   * @param requestDate
   */
  getCaptcha(){
    let me = this, phone = me.validateForm.controls[ 'phone' ].value;
    if(!me.isSending && /^1[0-9]{10}$/.test(phone)){
      let res = me.loginService.getSmsCode(phone);
      if(res){
        me.isSending = true;
        let second = 60;
        let timer = setInterval(() => {
          if(second >= 1) {
            second -= 1;
            me.msgCode = `已发送${second}秒`;
          }
          if(second < 1) {
            me.msgCode = `重新获取`;
            me.isSending = false;
            clearInterval(timer);
          }
        },1000);
      }
    }else if(phone == ''){
      me.phoneState = 'empty';
    }else{
      me.phoneState = 'error';
    }
  }

}
