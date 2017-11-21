import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {LoginService} from "../login.service";
import {ForgetPasswordComponent} from "../forget-password/forget-password.component";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  validateForm: FormGroup;//重置密码的表单

  constructor(public loginService: LoginService, public forgetPwd: ForgetPasswordComponent) {
    this.validateForm = this.loginService.validateFormReset;////重置密码的表单
  }

  ngOnInit() {

  }

  /**
   * 提交表单（点击下一步按钮时会提交表单，成功后跳转下一步）
   * @param $event
   * @param value
   */
  submitForm = ($event, value) => {
    $event.preventDefault();
    // for (const key in this.validateForm.controls) {
    //   this.validateForm.controls[key].markAsDirty();
    // }
    console.log(value);
    this.forgetPwd.current += 1;
    this.loginService.routerSkip(this.forgetPwd.current);
  };


  getFormControl(name) {
    return this.validateForm.controls[name];
  }




  /**
   * 获取验证码
   * @param e
   */
  getCaptcha(e: MouseEvent) {
    e.preventDefault();
    alert('获取验证码')
  }

}
