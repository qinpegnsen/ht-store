import {Component, OnInit} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {Setting} from "../../../public/setting/setting";
import {LoginService} from "../login.service";
import {SettingUrl} from "../../../public/setting/setting_url";
import {Util} from "../../../public/util/util";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  validateForm: FormGroup;//修改密码表单
  app = Setting.APP; //平台基本信息
  storeHome: string = SettingUrl.ROUTERLINK.store.home; //首页
  progressCheck: any = Util.validate; //表单验证

  constructor(public loginService: LoginService) {
    this.validateForm = this.loginService.changePassword;//新密码的表单
  }

  ngOnInit() {

  }
  /**
   * from表单
   * @param name
   * @returns {AbstractControl}
   */
  getFormControl(name) {
    return this.validateForm.controls[name];
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
    console.log(value);
    let formValue = value;
    this.loginService.updateSellerPwd(formValue);
    this.loginService.changeForm();
  };
}
