import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {MainService} from "../../../public/service/main.service";
import {Setting} from "../../../public/setting/setting";
import {Page} from "../../../public/util/page";
import {ServiceService} from "../service.service";
declare var $: any;

@Component({
  selector: 'app-refund',
  templateUrl: './refund.component.html',
  styleUrls: ['./refund.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RefundComponent implements OnInit {

  public refundOrderPage: Page = new Page();    //退款订单的数据
  public _loading: boolean=false;              //查询时锁屏,默认关闭
  public saleAfterStates: any;                  //售后单状态数据
  public isReceiveList: any;                     //是否收货数据
  public query = {
    saleAfterState: '',//当前的售后单的状态
    isReceive: '',     //是否收到货
    phone: null,
    ordno: null,
    afterNo: null,
    searchType: 'afterNo',
  }; // 查询条件
  constructor() { }

  ngOnInit() {
    let me = this;
    me.queryOrdList(); //查询商品列表
    me.saleAfterStates = MainService.getEnumDataList(Setting.ENUM.saleAfterState);  // 售后单状态数据
    me.isReceiveList = MainService.getEnumDataList(Setting.ENUM.yesOrNo);  // 是否收货数据
  }

  /**
   * 切换搜索条件时
   */
  changeSearchType(val) {
    if (val == 'afterNo') {
      this.query.phone = null;
      this.query.ordno = null;
    } else if (val == 'phone') {
      this.query.afterNo = null;
      this.query.ordno = null;
    } else if (val == 'ordno') {
      this.query.afterNo = null;
      this.query.phone = null;
    }
  }

  /**
   * 查询列表
   * @param event
   * @param curPage
   */
  public queryOrdList() {
    this._loading=true;//锁屏
    this.refundOrderPage.params = { //查询参数
      curPage: this.refundOrderPage.curPage, //目标页码
      pageSize: this.refundOrderPage.pageSize //每页条数
    };
    $.when(ServiceService.queryRefundOrd(this.refundOrderPage.params)).done(data => {
      this._loading = false ;//解除锁屏
      if(data) this.refundOrderPage = data; //赋值
    })
  }


}
