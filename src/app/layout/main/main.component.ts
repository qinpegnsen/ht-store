import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Setting} from "../../public/setting/setting";
import {NavigationEnd, Router} from "@angular/router";
import {SettingUrl} from "../../public/setting/setting_url";
import {HomeService} from "../../routes/home/home.service";
import {AjaxService} from "../../public/service/ajax.service";
import {Util} from "../../public/util/util";
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

declare var $: any;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MainComponent implements OnInit {
  public isCollapsed = false; //menu折叠
  public app = Setting.APP; //平台信息
  public menus: Array<any> = new Array(); //菜单信息
  public msg: Array<any> = new Array(); //消息通知
  public msgNum: number = 0; //消息通知总条数
  public home: string = SettingUrl.ROUTERLINK.store.home; //首页路由
  public changePassword: string = SettingUrl.ROUTERLINK.pass.updateSellerPwd; //修改密码路由

  constructor(public router: Router) {
  }

  ngOnInit() {
    const _this = this;
    _this.menus = Setting.MENUS; //菜单信息
    //设置消息通知
    _this.storeOrdCustomerStatistics();
    //监听路由变化，反选menu信息
    this.router.events.filter(event => event instanceof NavigationEnd).subscribe((event) => {
      _this.selMenu(_this.menus, event["url"]);
    });
  }

  /**
   * 反选中menu
   * @param {string} url
   */
  selMenu(menuList: Array<any>, url: string) {
    let _this = this;
    menuList.forEach(ret => {
      if (ret.menuUrl == url) ret.isSel = true;
      else ret.isSel = false;
      if (ret.subMenuList && ret.subMenuList.length > 0) {
        _this.selMenu(ret.subMenuList, url);
      }
    })
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

  /**
   * 消息通知（待发货订单、申请退款信息、申请退货信息、密码过于简单提示等）
   */
  storeOrdCustomerStatistics() {
    let me = this, infos: any = HomeService.storeOrdCustomerStatistics();
    me.msg = [
      {
        icon: "anticon anticon-export",
        info: "待发货商品",
        url: SettingUrl.ROUTERLINK.store.orderPendingShipment,
        num: infos.deliverGoods,
        isShow: Util.haveJurisdiction(me.menus, SettingUrl.ROUTERLINK.store.orderPendingShipment)
      },
      {
        icon: "anticon anticon-pay-circle-o",
        info: "申请退款",
        url: SettingUrl.ROUTERLINK.store.serviceRefund,
        num: infos.refund,
        isShow: Util.haveJurisdiction(me.menus, SettingUrl.ROUTERLINK.store.serviceRefund)
      },
      {
        icon: "icon icon-tuihuo",
        info: "申请退货",
        url: SettingUrl.ROUTERLINK.store.serviceReturnGoods,
        num: infos.refundGoods,
        isShow: Util.haveJurisdiction(me.menus, SettingUrl.ROUTERLINK.store.serviceReturnGoods)
      }
    ];
    //设置消息通知总条数
    me.msg.forEach(res => {
      if (res.isShow) me.msgNum += res.num;
    })
  }

  /**
   * 前往指定页面
   * @param {string} url
   */
  goUrl(url: string) {
    const _this = this;
    if (url) _this.router.navigate([url]);
  }
}
