import { Component, OnInit } from '@angular/core';
import {OrderService} from "../order.service";
import {Page} from "../../../public/util/page";
declare var $: any;

@Component({
  selector: 'app-order-cancel',
  templateUrl: './order-cancel.component.html',
  styleUrls: ['./order-cancel.component.css']
})
export class OrderCancelComponent implements OnInit {

  orderList: Page = new Page();  //待收货订单信息
  _loading = false;             //查询时锁屏
  orderquery = {
    agentAcct: '',//代理商账号
    agentOrdno: ''//订单号
  }//查询条件

  constructor() { }

  ngOnInit() {
    const me = this
    me.queryCancel()
  }

  /**
   * 查询待发货订单列表
   * @param event
   * @param curPage
   */
  public queryCancel() {
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

  /**
   * 鼠标放在图片上时大图随之移动
   */
  showImg(event) {
    let target = event.target.nextElementSibling;
    target.style.display = 'block';
    target.style.top = (event.clientY + 20) + 'px';
    target.style.left = (event.clientX + 30) + 'px';
  }

  /**
   * 隐藏大图
   * @param event
   */
  hideImg(event) {
    let target = event.target.nextElementSibling;
    target.style.display = 'none';
  }
  /**
   * 显示买家信息
   * @param event
   * @param i
   */
  showUserInfo(t) {
    t.style.display = 'block';
  }

  /**
   * 隐藏买家信息
   * @param i
   */
  hideBuyerInfo(t) {
    t.style.display = 'none';
  }

}
