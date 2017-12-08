import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Setting} from "../../public/setting/setting";
import {Router} from "@angular/router";
import {SettingUrl} from "../../public/setting/setting_url";

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
  public home:string = SettingUrl.ROUTERLINK.store.home; //首页路由
  public company:string = SettingUrl.ROUTERLINK.basic.company; //企业信息路由

  constructor(public router: Router) {
    //菜单信息
    Setting.MENUS = [
      {
        name: "商品管理",
        icon: "gift",
        children: [
          {
            name: "管理商品",
            icon: "",
            url: SettingUrl.ROUTERLINK.store.goodsManage
          },
          {
            name: "商品发布",
            icon: "",
            url: SettingUrl.ROUTERLINK.store.goodsPublish
          },
          {
            name: "运费模板",
            icon: "",
            url: SettingUrl.ROUTERLINK.store.goodsFreightTemplate
          }
        ]
      },
      {
        name: "订单管理",
        icon: "book",
        children: [
          {
            name: "待付款",
            icon: "",
            url: SettingUrl.ROUTERLINK.store.orderPayment
          },
          {
            name: "待发货",
            icon: "",
            url: SettingUrl.ROUTERLINK.store.orderPendingShipment
          },
          {
            name: "已发货",
            icon: "",
            url: SettingUrl.ROUTERLINK.store.orderBeenShipped
          },
          {
            name: "已完成",
            icon: "",
            url: SettingUrl.ROUTERLINK.store.orderComplete
          },
          {
            name: "已取消",
            icon: "",
            url: SettingUrl.ROUTERLINK.store.orderCancel
          }
        ]
      },
      {
        name: "售前售后",
        icon: "customer-service",
        children: [
          {
            name: "退款",
            icon: "",
            url: SettingUrl.ROUTERLINK.store.serviceRefund
          },
          {
            name: "退货",
            icon: "",
            url: SettingUrl.ROUTERLINK.store.serviceReturnGoods
          }
        ]
      },
      {
        name: "红包",
        icon: "red-envelope",
        children: [
          {
            name: "红包投放记录",
            icon: "",
            url: SettingUrl.ROUTERLINK.store.redPacketPushOrder
          },
          {
            name: "红包统计",
            icon: "",
            url: SettingUrl.ROUTERLINK.store.redPacketStatistics
          }
        ]
      },
      {
        name: "提现与结算",
        icon: "pay-circle-o",
        url: SettingUrl.ROUTERLINK.store.cashSettle
      },
      {
        name: "员工管理",
        icon: "usergroup-add",
        url: ""
      },
      {
        name: "企业信息（TODO）",
        icon: "smile-o",
        url: SettingUrl.ROUTERLINK.basic.reg
      },
      {
        name: "登录页面（TODO）",
        icon: "smile-o",
        url: SettingUrl.ROUTERLINK.pass.login
      },
    ]
  }

  ngOnInit() {
    const _this = this;
    _this.menus = Setting.MENUS; //菜单信息
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
