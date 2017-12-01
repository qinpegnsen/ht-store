import { Component, OnInit } from '@angular/core';
import {OrderService} from "../order.service";
import {Page} from "../../../public/util/page";
import {SettingUrl} from "../../../public/setting/setting_url";
declare var $: any;

@Component({
  selector: 'app-order-cancel',
  templateUrl: './order-cancel.component.html',
  styleUrls: ['./order-cancel.component.css']
})
export class OrderCancelComponent implements OnInit {

  orderList: Page = new Page();  //已取消订单信息
  _loading = false;             //查询时锁屏
  orderquery = {
    phone: '',//会员手机号
    agentOrdno: ''//订单号
  }//查询条件
  showOrderList: boolean = true;//判断子组件的显示/隐藏
  orderDetail:string = SettingUrl.ROUTERLINK.store.orderDetailSimple; //订单详情页

  constructor() { }

  ngOnInit() {
    const me = this
    me.queryCancel()//查询待发货订单列表
  }

  /**
   * 子组件加载时
   * @param event
   */
  isactivate(event) {
    this.showOrderList = false;
  }

  /**
   * 子组件注销时
   * @param event
   */
  isDeactivate(event) {
    this.showOrderList = true;
  }

  /**
   * 查询已取消订单列表
   * @param event
   * @param curPage
   */
  public queryCancel() {
    let me = this;
    me._loading = true; //锁屏
    me.orderList.params = { //查询参数
      curPage: me.orderList.curPage, //目标页码
      pageSize: me.orderList.pageSize, //每页条数
      custPhone: me.orderquery.phone,//会员手机号
      ordno: me.orderquery.agentOrdno,//订单号
      ordState:'CLOSE'
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
