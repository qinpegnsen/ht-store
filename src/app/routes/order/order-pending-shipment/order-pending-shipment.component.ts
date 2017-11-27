import { Component, OnInit } from '@angular/core';
import {Page} from "../../../public/util/page";
import {OrderService} from "../order.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
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
  isOrderPend = false;//设置发货弹窗
  isConfirm = false;
  pendingData:any={};  //申请提现信息
  validateForm: FormGroup;//设置发货的表单
  auditsDataList=[];  //物流信息
  showOrderList: boolean = true;//判断子组件的显示/隐藏


  constructor(public fb: FormBuilder) { }

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
      agentAcct: me.orderquery.agentAcct,//代理商账号
      ordno: me.orderquery.agentOrdno,//订单号
      state:'PREPARE'
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
  showOrderPend = () => {
    this.isOrderPend = true;
    this.queryAuditsDatas();//获取物流列表
  }

  /**
   * 确认关闭遮罩层
   * @param e
   */
  hideleOk = (e) => {
    let me = this;
    me.pendingData= { //查询参数

    }
    me.isConfirm = true;
    setTimeout(() => {
      this.isOrderPend = false;
      this.isConfirm = false;
    }, 500);
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

}
