import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Setting} from "../../../public/setting/setting";
import {SettingUrl} from "../../../public/setting/setting_url";
import {LoginService} from "../login.service";
import {Router} from "@angular/router";

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
  registerUrl:string = SettingUrl.ROUTERLINK.basic.reg;
  resetPwdUrl:string = SettingUrl.ROUTERLINK.pass.resetPwd;
  isloginState:string;//判断用户是否已经登录了

  //用于登录时的表单
  _submitForm() {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
    }
  }

  constructor(public fb: FormBuilder,public loginService:LoginService,public router: Router) {
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

    /**
     * islogin判断用户是否已经登录了存储到localStorage里
     * 登录过后不能再跳到登录页面
     */
    me.isloginState = localStorage.getItem('islogin');
    console.log("█ me.isloginState ►►►",  me.isloginState);
    if(me.isloginState){
      this.router.navigate([SettingUrl.ROUTERLINK.store.home])
    }
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
    //console.log(value);
    let formValue = value;
    this.loginService.loginStore(formValue);
  };


}
