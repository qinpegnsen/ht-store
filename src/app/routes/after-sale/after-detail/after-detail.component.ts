import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Location}from '@angular/common';
import {isNullOrUndefined} from "util";
import {MainService} from "../../../public/service/main.service";
import {Setting} from "../../../public/setting/setting";
import {AfterSaleService} from "../after-sale.service";
declare var $: any;

@Component({
  selector: 'app-after-detail',
  templateUrl: './after-detail.component.html',
  styleUrls: ['./after-detail.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AfterDetailComponent implements OnInit {

  public enumState = Setting.ENUMSTATE;               //定义枚举状态
  public type: string;             //类型,处理/查看详情
  public parentPath: string;       //类型,处理/查看详情
  public afterNo: string;          //售后编码
  public LogisticsData: any;       //退货物流信息
  public afterData: any;           //售后详情数据
  public afterTailList: any;       //查看售后单跟踪信息
  public opinion: string;          //审核意见
  public goodsAudits: any;         //商品审核是否通过枚举
  public isPass: string = this.enumState.yes;     //是否同意退货
  public isAgree: string = this.enumState.yes;    //是否同意退货
  public expressData: any;          //获取快递的公司和单号


  constructor(public router: Router,
              public location: Location,
              public afterSaleService:AfterSaleService,
              public route: ActivatedRoute) {
  }

  ngOnInit() {
    let me = this;
    me.type = me.route.snapshot.queryParams['type'];
    me.afterNo = me.route.snapshot.queryParams['afterNo'];
    let data = {afterNo: me.afterNo};
    $.when(this.afterSaleService.loadAfterTail(data)).done(data => {
      if (data) me.LogisticsData = data;
    });
    me.goodsAudits = MainService.getEnumDataList('1001');  // 商品审核是否通过
    $.when(this.afterSaleService.loadReqByAfterNo(data)).done(data => {
      if (data) me.afterData = data;
    });
    $.when(this.afterSaleService.loadAfterTailList(data)).done(data => {
      if (data) me.afterTailList = data;
    });
    if (isNullOrUndefined(me.afterData)) me.afterData = null;
  }

  /**
   * 审核退款申请
   */
  auditRefund() {
    let me = this;
    let data = {
      afterNo: me.afterData.afterNo,
      opinion: me.opinion,
      isAgree: me.isAgree
    };
    this.afterSaleService.agreeRefundMoney(data);
    this.back();
  }

  /**
   * 审核退货申请
   */
  auditReturn() {
    let me = this;
    let data = {
      afterNo: me.afterData.afterNo,
      opinion: me.opinion,
      isAgree: me.isAgree
    };
    this.afterSaleService.dealReturnGoods(data);
    this.back();
  }

  /**
   * 审核退货商品
   */
  auditReturnGoods() {
    let me = this;
    let data = {
      afterNo: me.afterData.afterNo,
      opinion: me.opinion,
      isPass: me.isPass
    };
    this.afterSaleService.checkRefundGoods(data);
    this.back();
  }

  /**
   * 鼠标放在图片上时大图随之移动
   */
  showImg(event) {
    let target = event.target.nextElementSibling;
    target.style.display = 'block';
    target.style.top = (event.clientY + 15) + 'px';
    target.style.left = (event.clientX + 25) + 'px';
  }

  /**
   * 鼠标离开时大图随之隐藏
   */
  hideImg(event) {
    let target = event.target.nextElementSibling;
    target.style.display = 'none';
  }

  /**
   * 点击返回执行方法
   */
  back() {
    this.location.back();
  }
}
