import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Setting} from "../../../public/setting/setting";
import {NzNotificationService} from "ng-zorro-antd";
import {AjaxService} from "../../../public/service/ajax.service";
import {SettingUrl} from "../../../public/setting/setting_url";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  array = ['../../../assets/img/bak/1.png'];//广告banner
  validateForm: FormGroup;//登录的表单
  app = Setting.APP; //平台基本信息
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

  constructor(public fb: FormBuilder,public _notification: NzNotificationService) {
  }

  ngOnInit() {
    let _this = this;
    /**
     *广告banner定时器
     */
    setTimeout(_ => {
      _this.array = ['../../../assets/img/bak/1.png', '../../../assets/img/bak/2.png'];
    }, 5000);

    /**
     * 用于登录时的表单验证
     * @type {FormGroup}
     */
    _this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true],
    });
  }

  // 用户登录
  public login() {
    const _this = this;
    AjaxService.post({
      // url: SettingUrl.URL.seller.add,
      data: {
        'account': _this.userName,
        'pwd': _this.userPassword
      },
      success: (res) => {
        _this._notification.error(`登陆成功`, '登陆成功，成功了成功了成功了成功了')

      },
      error: (res) => {
        _this._notification.error(`接口出错了`, '接口出错了接口出错了接口出错了')
      }
    });
  }


}
