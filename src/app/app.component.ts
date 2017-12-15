import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import {Setting} from "./public/setting/setting";
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(public router: Router, public location: Location) {
  }

  ngOnInit() {
    // 若cookie里存在登录信息，将信息设置到setting 对应变量中，防止刷新时信息丢失
    let storeInfo: any = localStorage.getItem(Setting.cookie.storeInfo); //localStorage中取出店铺信息
    if (storeInfo) Setting.STOREINFO = JSON.parse(storeInfo); //设置店铺信息
    let businessInfo: any = localStorage.getItem(Setting.cookie.enterpriseInfo); //localStorage中取出店铺信息
    if (businessInfo) Setting.ENTERPTISE = JSON.parse(businessInfo); //设置店铺信息
    let menusInfo: any = localStorage.getItem(Setting.cookie.menusInfo); //localStorage中取出menu菜单
    if (menusInfo) Setting.MENUS = JSON.parse(menusInfo); //menu菜单
  }

}
