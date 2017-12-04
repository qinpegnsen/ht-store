import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Setting} from "../../../public/setting/setting";
import {NzNotificationService} from "ng-zorro-antd";
import {AjaxService} from "../../../public/service/ajax.service";
import {SettingUrl} from "../../../public/setting/setting_url";
import {LoginService} from "../login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  array = ['../../../assets/img/bak/1.png'];//广告banner
  validateForm: FormGroup;//登录的表单
  app = Setting.APP; //平台基本信息
  account: string;//登录时的用户名称
  userName: string;//登录时的用户名称
  userPassword: string;//登录时的用户密码
  registerUrl:string = SettingUrl.ROUTERLINK.basic.reg;
  resetPwdUrl:string = SettingUrl.ROUTERLINK.pass.resetPwd;

  //用于登录时的表单
  _submitForm() {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
    }
  }

  constructor(public fb: FormBuilder,public loginService:LoginService) {
  }

  ngOnInit() {
    let me = this;
    /**
     *广告banner定时器
     */
    setTimeout(_ => {
      me.array = ['../../../assets/img/bak/1.png', '../../../assets/img/bak/2.png'];
    }, 5000);

    /**
     * 用于登录时的表单验证
     * @type {FormGroup}
     */
    me.validateForm = this.fb.group({
      account: [null, [Validators.required]],
      pwd: [null, [Validators.required]],
      remember: [true],
    });
  }

  /**
   * 登录
   * @param $event
   * @param value
   */

  login = ($event, value) => {
    $event.preventDefault();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[ key ].markAsDirty();
    }
    console.log(value);
    let formValue = value;
    this.loginService.loginStore(formValue);
  };


}
