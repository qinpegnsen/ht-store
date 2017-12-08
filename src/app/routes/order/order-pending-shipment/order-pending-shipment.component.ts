import { Component, OnInit } from '@angular/core';
import {Page} from "../../../public/util/page";
import {OrderService} from "../order.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SettingUrl} from "../../../public/setting/setting_url";
import {Setting} from "../../../public/setting/setting";
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
    phone: '',//收货人手机号
    agentOrdno: ''//订单号
  }//查询条件
  isOrderPend = false;//设置发货弹窗
  isConfirm = false;
  validateForm: FormGroup;//设置发货的表单
  auditsDataList=[];  //物流信息
  showOrderList: boolean = true;//判断子组件的显示/隐藏
  orderDetail: string = SettingUrl.ROUTERLINK.store.orderDetailSimple; //订单详情页面
  getOrdno:string; //订单号
  expressNos:string; //快递号
  expressCode:string; //快递公司编码
  enum = Setting.ENUM;  // 订单状态类型

  constructor(public fb: FormBuilder,public orderService:OrderService) { }

  ngOnInit() {
    const me = this
    me.queryPending()//查询待发货订单列表

    me.validateForm = this.fb.group({
      email: [null, [Validators.required]],
      audits: [null, [Validators.required]],
    });
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
   * 查询待发货订单列表
   * @param event
   * @param curPage
   */
  public queryPending() {
    let me = this;
    me._loading = true; //锁屏
    me.orderList.params = { //查询参数
      curPage: me.orderList.curPage, //目标页码
      pageSize: me.orderList.pageSize, //每页条数
      phone: me.orderquery.phone,//收货人手机号
      ordno: me.orderquery.agentOrdno,//订单号
      ordState:'PREPARE'
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

  /**
   * 遮罩层显示
   */
  showOrderPend = (getOrdno) => {
    this.isOrderPend = true;
    this.queryAuditsDatas();//获取物流列表
    this.getOrdno = getOrdno;
  }

  /**
   * 确认关闭遮罩层
   * @param e
   */
  hideleOk = (e) => {
    let me = this;
    me.isConfirm = true;
    me.shipping();
    setTimeout(() => {
      this.isOrderPend = false;
      this.isConfirm = false;
    }, 500);
    me._loading = false //解除锁屏
  };

  /**
   * 取消关闭遮罩层
   * @param e
   */
  hideMask = (e) => {
    this.isOrderPend = false;
    this._loading = false //解除锁屏
  }

  //设置发货的表单
  getFormControl(name) {
    return this.validateForm.controls[ name ];
  }

  /**
   * 获取物流列表
   */
  queryAuditsDatas() {
    let me = this;
    me._loading = true; //锁屏
    $.when(OrderService.auditsList()).done(data => {
      me._loading = false //解除锁屏
      if (data) me.auditsDataList = data; //赋值
    })
  }

  /**
   * 设置发货
   */
  shipping() {
    let me = this;
    me._loading = true; //锁屏
    $.when(me.orderService.canceslOrder(this.getOrdno,this.expressNos,this.expressCode)).done(data => {
      me._loading = false //解除锁屏
      if (data) me.auditsDataList = data; //赋值
      me.queryPending()//查询待发货订单列表
    });

  }

}
