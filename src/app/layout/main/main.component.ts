import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Setting} from "../../public/setting/setting";
import {Router} from "@angular/router";
import {SettingUrl} from "../../public/setting/setting_url";
import {HomeService} from "../../routes/home/home.service";
import {AjaxService} from "../../public/service/ajax.service";
import {CookieService} from "angular2-cookie/core";
import {Util} from "../../public/util/util";

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
    //菜单信息
    Setting.MENUS = [
      {
        menuName: "商品管理",
        menuIcon: "gift",
        subMenuList: [
          {
            menuName: "管理商品",
            menuIcon: "",
            menuUrl: SettingUrl.ROUTERLINK.store.goodsManage
          },
          {
            menuName: "商品发布",
            menuIcon: "",
            menuUrl: SettingUrl.ROUTERLINK.store.goodsPublish
          },
          {
            menuName: "品牌管理",
            menuIcon: "",
            menuUrl: SettingUrl.ROUTERLINK.store.brands
          },
          {
            menuName: "运费模板",
            menuIcon: "",
            menuUrl: SettingUrl.ROUTERLINK.store.goodsFreightTemplate
          }
        ]
      },
      {
        menuName: "订单管理",
        menuIcon: "book",
        subMenuList: [
          {
            menuName: "待付款",
            menuIcon: "",
            menuUrl: SettingUrl.ROUTERLINK.store.orderPayment
          },
          {
            menuName: "待发货",
            menuIcon: "",
            menuUrl: SettingUrl.ROUTERLINK.store.orderPendingShipment
          },
          {
            menuName: "已发货",
            menuIcon: "",
            menuUrl: SettingUrl.ROUTERLINK.store.orderBeenShipped
          },
          {
            menuName: "已完成",
            menuIcon: "",
            menuUrl: SettingUrl.ROUTERLINK.store.orderComplete
          },
          {
            menuName: "已取消",
            menuIcon: "",
            menuUrl: SettingUrl.ROUTERLINK.store.orderCancel
          }
        ]
      },
      {
        menuName: "售前售后",
        menuIcon: "customer-service",
        subMenuList: [
          {
            menuName: "退款",
            menuIcon: "",
            menuUrl: SettingUrl.ROUTERLINK.store.serviceRefund
          },
          {
            menuName: "退货",
            menuIcon: "",
            menuUrl: SettingUrl.ROUTERLINK.store.serviceReturnGoods
          }
        ]
      },
      {
        menuName: "红包",
        menuIcon: "red-envelope",
        subMenuList: [
          {
            menuName: "红包投放记录",
            menuIcon: "",
            menuUrl: SettingUrl.ROUTERLINK.store.redPacketPushOrder
          },
          {
            menuName: "红包统计",
            menuIcon: "",
            menuUrl: SettingUrl.ROUTERLINK.store.redPacketStatistics
          }
        ]
      },
      {
        menuName: "提现与结算",
        menuIcon: "pay-circle-o",
        menuUrl: SettingUrl.ROUTERLINK.store.cashSettle
      },
      {
        menuName: "员工管理",
        menuIcon: "usergroup-add",
        menuUrl: SettingUrl.ROUTERLINK.store.staff
      },
      {
        menuName: "店铺信息管理",
        menuIcon: "shop",
        menuUrl: SettingUrl.ROUTERLINK.basic.shops
      },
      {
        menuName: "企业信息（TODO）",
        menuIcon: "smile-o",
        menuUrl: SettingUrl.ROUTERLINK.basic.reg
      },
      {
        menuName: "登录页面（TODO）",
        menuIcon: "smile-o",
        menuUrl: SettingUrl.ROUTERLINK.pass.login
      },
    ]
  }

  ngOnInit() {
    const _this = this;
    _this.menus = Setting.MENUS; //菜单信息
    //设置消息通知
    _this.storeOrdCustomerStatistics();
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
