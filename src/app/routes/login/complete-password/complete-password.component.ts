import { Component, OnInit } from '@angular/core';
import {SettingUrl} from "../../../public/setting/setting_url";

@Component({
  selector: 'app-complete-password',
  templateUrl: './complete-password.component.html',
  styleUrls: ['./complete-password.component.css']
})
export class CompletePasswordComponent implements OnInit {
  loginUrl:string = SettingUrl.ROUTERLINK.pass.login; //登录页面路由
  constructor() { }

  ngOnInit() {
  }

}
