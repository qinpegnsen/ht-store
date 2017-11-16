import { Component, OnInit } from '@angular/core';
import {Setting} from "../../../public/setting/setting";
import {LoginService} from "../login.service";
import {NzMessageService} from "ng-zorro-antd";

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  current = 0;//步骤条，第一步（重置密码）
  app = Setting.APP; //平台基本信息


  constructor(public loginService: LoginService, public _message: NzMessageService) { }

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

  /**
   * 完成
   */
  done() {
    this._message.success('done');
  }
}
