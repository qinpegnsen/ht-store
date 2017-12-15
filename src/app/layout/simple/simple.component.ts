import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {Setting} from "../../public/setting/setting";
import {AjaxService} from "../../public/service/ajax.service";
import {SettingUrl} from "../../public/setting/setting_url";
import {Router} from "@angular/router";

@Component({
  selector: 'app-simple',
  templateUrl: './simple.component.html',
  styleUrls: ['./simple.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SimpleComponent implements OnInit {
  public app = Setting.APP; //平台信息

  constructor(public router:Router) { }

  ngOnInit() {
  }

  /**
   * 退出登录
   */
  logout() {
    localStorage.clear(); //清空所有storage
    //执行查询（异步）
    AjaxService.get({
      url: SettingUrl.URL.login.logout,
      success: (result) => {
        if (result.success) {
          this.router.navigate([SettingUrl.ROUTERLINK.pass.login])//跳到登录页面
        }
      }
    });
  }
}
