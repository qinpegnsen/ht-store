import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Setting} from "../../public/setting/setting";
import {Router} from "@angular/router";

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
            url: "/store/goods/manage"
          },
          {
            name: "商品发布",
            icon: "",
            url: "/store/goods/publish"
          }
        ]
      },
      {
        name: "订单管理",
        icon: "book",
        url: "/store/order",
        children: [
          {
            name: "待发货",
            icon: "",
            url: "/store/order/pendingShipment",
          },
          {
            name: "已发货",
            icon: "",
            url: "/store/order/beenShipped",
          },
          {
            name: "已完成",
            icon: "",
            url: "/store/order/account-info",
          },
          {
            name: "已取消",
            icon: "",
            url: "/store/order/cancel",
          }
        ]
      },
      {
        name: "售前售后",
        icon: "customer-service",
        url: "/store/service",
        children: [
          {
            name: "退款",
            icon: "",
            url: "/store/service/refund",
          },
          {
            name: "退货",
            icon: "",
            url: "/store/service/returnGoods",
          }
        ]
      },
      {
        name: "红包",
        icon: "red-envelope",
        url: "/store/redPacket",
        children: [
          {
            name: "红包投放记录",
            icon: "",
            url: "/store/redPacket/pushOrder",
          },
          {
            name: "红包统计",
            icon: "",
            url: "/store/redPacket/statistics",
          }
        ]
      },
      {
        name: "提现与结算",
        icon: "pay-circle-o",
        url: "/store/cashSettle/cashSettle"
      },
      {
        name: "员工管理",
        icon: "usergroup-add",
        url: ""
      },
      {
        name: "企业信息（TODO）",
        icon: "smile-o",
        url: "/simple/reg"
      },
      {
        name: "登录页面（TODO）",
        icon: "smile-o",
        url: "/page/login"
      },
    ]
  }

  ngOnInit() {
    const _this = this;
    _this.menus = Setting.MENUS; //菜单信息
    //设置消息通知
    _this.msg = [
      {
        icon: "anticon anticon-edit",
        info: "建议修改密码",
        num: 1
      },
      {
        icon: "anticon anticon-export",
        info: "待发货商品",
        num: 4
      },
      {
        icon: "anticon anticon-pay-circle-o",
        info: "申请退款",
        num: 2
      },
      {
        icon: "icon icon-tuihuo",
        info: "申请退货",
        num: 3
      }
    ]
    //设置消息通知总条数
    _this.msg.forEach(res => {
      _this.msgNum += res.num;
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
