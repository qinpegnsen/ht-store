import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "../login.service";
import {ForgetPasswordComponent} from "../forget-password/forget-password.component";
import {NzNotificationService} from "ng-zorro-antd";
import {Util} from "../../../public/util/util";

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css']
})
export class NewPasswordComponent implements OnInit {

  validateForm: FormGroup;//新密码的表单
  valitatete: any = Util.validate; //表单验证

  constructor(public loginService: LoginService, public forgetPwd: ForgetPasswordComponent,public _notification: NzNotificationService) {
    this.validateForm = this.loginService.validateFormReset;//新密码的表单
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
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[ key ].markAsDirty();
    }
    //console.log(value);
    if(!value.newPwd||!value.confirmPwd){
      this._notification.error("请填密码", "请填写密码");
      return;
    }else{
      let formValue = value;
      this.loginService.resetPassword(formValue);
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
   * 回到前一步
   */
  pre() {
    this.forgetPwd.current -= 1;
    this.loginService.routerSkip(this.forgetPwd.current);
  }

}
