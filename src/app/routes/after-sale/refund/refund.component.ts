import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MainService} from "../../../public/service/main.service";
import {Setting} from "../../../public/setting/setting";
import {Page} from "../../../public/util/page";
import {SettingUrl} from "../../../public/setting/setting_url";
import {AfterSaleService} from "../after-sale.service";
declare var $: any;

@Component({
  selector: 'app-refund',
  templateUrl: './refund.component.html',
  styleUrls: ['./refund.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RefundComponent implements OnInit {

  public refundOrderPage: Page = new Page();          //退款订单的数据
  public showList: boolean = true;                   //是否显示父组件
  public _loading: boolean = false;                  //查询时锁屏,默认关闭
  public saleAfterStates: any;                        //售后单状态数据
  public isReceiveList: any;                          //是否收货数据
  public enumState:any = Setting.ENUMSTATE;           //定义枚举状态
  public routerLink:any = SettingUrl.ROUTERLINK;      //定义路由
  public app :any= Setting.APP;                       //定义出错时加载的图片
  public guideLang: any = Setting.PAGEMSG;//引导语
  public enums :any= Setting.ENUM;                     //枚举
  public query: any = {
    searchType:this.enumState.afterSearchType.afterNo
  };// 查询条件
  public afterDetail: string = SettingUrl.ROUTERLINK.store.afterDetail; //退款信息详情

  constructor(public afterSaleService: AfterSaleService) {
  }

  /**
   * 查询商品列表
   */
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
    if (val == this.enumState.afterSearchType.afterNo) {
      this.query.phone = '';
      this.query.ordno = '';
    } else if (val == this.enumState.afterSearchType.phone) {
      this.query.afterNo = '';
      this.query.ordno = '';
    } else if (val == this.enumState.afterSearchType.ordno) {
      this.query.afterNo = '';
      this.query.phone = '';
    }
  }

  /**
   * 点击待审核退款直接更改售后单的状态，查询待审核退款列表
   */
  changeSaleAfterState() {
    this.query.state = this.enumState.afterService.wait;
    this.queryOrdList();
  }

  /**
   * 重置搜索条件
   *
   */
  resetSearch() {
    this.query = {};
    this.query.searchType=this.enumState.afterSearchType.afterNo;
    this.refundOrderPage.curPage = 1;
    this.queryOrdList();
  }

  /**
   * 查询列表
   * @param event
   * @param curPage
   */
  public queryOrdList() {
    this._loading = true;//锁屏
    this.refundOrderPage.params = {
      state: this.query.state,//当前的售后单的状态
      isReceive: this.query.isReceive,     //是否收到货
      phone: this.query.phone,
      ordno: this.query.ordno,
      afterNo: this.query.afterNo,
      searchType: this.query.searchType,
      returnType: this.enumState.afterType.refund,
      storeCode:'667095608928403456',
      curPage: this.refundOrderPage.curPage, //目标页码
      pageSize: this.refundOrderPage.pageSize //每页条数
    };
    $.when(this.afterSaleService.queryRefundOrd(this.refundOrderPage.params)).done(data => {
      this._loading = false;//解除锁屏
      if (data) this.refundOrderPage = data; //赋值
    })
  }

  /**
   * 子组件加载时
   * @param event
   */
  activate() {
    this.showList = false;
  }

  /**
   * 子组件注销时
   * @param event
   */
  onDeactivate() {
    this.showList = true;
    this.queryOrdList();
  }
}
