import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SettingUrl} from "../../../public/setting/setting_url";
import {OrderService} from "../order.service";
import {Setting} from "../../../public/setting/setting";
declare var $: any;

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  //current = 0;                   //步骤条
  _loading:boolean = false;             //查询时锁屏
  ordno:string;                        //订单号
  orderData: any;              //订单的数据
  enum = Setting.ENUM;      // 订单付款类型
  orderState :any= Setting.ENUMSTATE;               //定义枚举状态
  states: string = this.orderState.ordState.cr;     //待付款状态的订单

  constructor(public router: Router, public routeInfo:ActivatedRoute) { }

  ngOnInit() {
    let me = this;
    me.ordno = me.routeInfo.snapshot.queryParams['ordno'];//获取订单的详细数据传过来的订单号
    me.queryOrder();//获取订单的详细数据
  }
  /**
   * 返回上一级页面
   */
  backOrderList() {
    this.router.navigate([SettingUrl.ROUTERLINK.store.orderPendingShipment])
  }

  /**
   * 获取订单的详细数据
   */
  public queryOrder() {
    let me = this;
    me._loading = true; //锁屏
    let data1= { //查询参数
      ordno: me.ordno
    }
    $.when(OrderService.queryOrderordSmg(data1)).done(data => {
      me._loading = false //解除锁屏
       if(data) me.orderData = data; //赋值
      console.log("█  me.orderData ►►►",   me.orderData);

    })
  }
}
