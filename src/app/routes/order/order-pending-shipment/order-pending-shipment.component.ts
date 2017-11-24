import { Component, OnInit } from '@angular/core';
import {Page} from "../../../public/util/page";
import {OrderService} from "../order.service";
declare var $: any;

@Component({
  selector: 'app-order-pending-shipment',
  templateUrl: './order-pending-shipment.component.html',
  styleUrls: ['./order-pending-shipment.component.css']
})
export class OrderPendingShipmentComponent implements OnInit {
  orderList: Page = new Page();  //待收货订单信息
  _loading = false;             //查询时锁屏
  orderquery = {
    agentAcct: '',//代理商账号
    agentOrdno: ''//订单号
  }//查询条件

  constructor() { }

  ngOnInit() {
    const me = this
    me.queryAgentOrdAdmin()
  }

  /**
   * 查询待发货订单列表
   * @param event
   * @param curPage
   */
  public queryAgentOrdAdmin() {
    let me = this;
    me._loading = true; //锁屏
    me.orderList.params = { //查询参数
      curPage: me.orderList.curPage, //目标页码
      pageSize: me.orderList.pageSize, //每页条数
      agentAcct: me.orderquery.agentAcct,//代理商账号
      agentOrdno: me.orderquery.agentOrdno,//订单号
    }
    $.when(OrderService.queryOrderList(me.orderList.params)).done(data => {
      me._loading = false //解除锁屏
      if(data) me.orderList = data; //赋值
    })
  }
}
