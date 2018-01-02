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
  _loading:boolean = false;             //查询时锁屏
  orderquery = {
    phone: '',//收货人手机号
    agentOrdno: ''//订单号
  }//查询条件
  isOrderPend:boolean = false;//设置发货弹窗
  isConfirm:boolean = false;
  validateForm: FormGroup;//设置发货的表单
  auditsDataList:any = new Array;  //物流信息
  showOrderList: boolean = true;//判断子组件的显示/隐藏
  orderDetail: string = SettingUrl.ROUTERLINK.store.orderDetailSimple; //订单详情页面
  getOrdno:string; //订单号
  expressNos:string; //快递号
  expressCode:string; //快递公司编码
  enum = Setting.ENUM;  // 订单状态类型
  orderState :any= Setting.ENUMSTATE;               //定义枚举状态
  state: string = this.orderState.ordState.paid;     //待发货状态的订单
  refund: string = Setting.APP.refundImg; //已退货的图片

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
      ordState:me.state,//待发货状态的订单
    }
    $.when(OrderService.queryOrderList(me.orderList.params)).done(data => {
      me._loading = false //解除锁屏
      if(data) me.orderList = data; //赋值
    })
  }

  /**
   * 重置搜索条件
   */
  public resetQuery(){
    this.orderquery = {
      phone: '',//收货人手机号
      agentOrdno: ''//订单号
    }
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
      me.queryPending()//查询待发货订单列表
    }, 500);
    me._loading = false //解除锁屏
    me.validateForm = this.fb.group({
      email: [null, [Validators.required]],
      audits: [null, [Validators.required]],
    });
  };

  /**
   * 取消关闭遮罩层
   * @param e
   */
  hideMask = (e) => {
    this.isOrderPend = false;
    this._loading = false //解除锁屏
    this.validateForm = this.fb.group({
      email: [null, [Validators.required]],
      audits: [null, [Validators.required]],
    });
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
