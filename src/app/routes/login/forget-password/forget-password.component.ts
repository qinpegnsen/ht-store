import {Component, OnInit} from '@angular/core';
import {Setting} from "../../../public/setting/setting";
import {LoginService} from "../login.service";
import {NzMessageService} from "ng-zorro-antd";
import {SettingUrl} from "../../../public/setting/setting_url";
import {Router} from "@angular/router";

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  current = 0;//步骤条，第一步（重置密码）
  app = Setting.APP; //平台基本信息


  constructor(public loginService: LoginService, public router:Router) {
  }

  ngOnInit() {
    const _this = this;
    _this.loginService.routerSkip(_this.current);//根据操作步骤跳到相应页面
  }

  /**
   * 回到上一步
   */
  pre() {
    this.current -= 1;
    this.loginService.routerSkip(this.current);
  }

  /**
   * 下一步
   */
  next() {
    this.current += 1;
    this.loginService.routerSkip(this.current);
  }
  back(){
    this.router.navigate([SettingUrl.ROUTERLINK.pass.login])
  }
}
