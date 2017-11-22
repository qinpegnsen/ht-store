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

  constructor(public router: Router) {
    //菜单信息
    Setting.MENUS = [
      {
        name: "商品管理",
        icon: "gift",
        children: [
          {
            name: "商品发布",
            icon: ""
          },
          {
            name: "订单管理",
            icon: ""
          },
          {
            name: "购物车",
            icon: ""
          }
        ]
      },
      {
        name: "文章管理",
        icon: "file-text",
        children: [
          {
            name: "文章发布",
            icon: ""
          },
          {
            name: "文章审核",
            icon: ""
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
            url: "/store/order/complete",
          },
          {
            name: "已取消",
            icon: "",
            url: "/store/order/cancel",
          }
        ]
      },
      {
        name: "smile布局",
        icon: "smile-o",
        url: "/simple/reg"
      },
      {
        name: "page布局",
        icon: "smile-o",
        url: "/page/login"
      }
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
