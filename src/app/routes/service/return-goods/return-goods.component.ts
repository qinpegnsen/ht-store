import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Page} from "../../../public/util/page";
import {MainService} from "../../../public/service/main.service";
import {Setting} from "../../../public/setting/setting";
import {ServiceService} from "../service.service";
declare var $: any;

@Component({
  selector: 'app-return-goods',
  templateUrl: './return-goods.component.html',
  styleUrls: ['./return-goods.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ReturnGoodsComponent implements OnInit {
  public refundOrderPage: Page = new Page();                //退款订单的数据
  public showList: boolean = true;                          //是否显示父组件
  public detail = [];                                       //tr 的详情,
  public _loading: boolean = false;                           //查询时锁屏,默认关闭
  public saleAfterStates: any;                              //售后单状态数据
  public isReceiveList: any;                                //是否收货数据
  public guideLang: any = Setting.PAGEMSG.service.returnGoods;//引导语
  public query = {
    saleAfterState: '',//当前的售后单的状态
    isReceive: '',     //是否收到货
    phone: null,
    ordno: null,
    afterNo: null,
    searchType: 'afterNo',
  }; // 查询条件
  constructor() {
  }

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
   * 当点击tr的时候，让隐藏的tr出来
   */
  showDetail(index) {
    if (this.detail[index]) this.detail[index] = false;
    else this.detail[index] = true;
  }

  /**
   * 查询列表
   * @param event
   * @param curPage
   */
  public queryOrdList() {
    this._loading = true;//锁屏
    this.refundOrderPage.params = { //查询参数
      curPage: this.refundOrderPage.curPage, //目标页码
      pageSize: this.refundOrderPage.pageSize //每页条数
    };
    $.when(ServiceService.queryRefundOrd(this.refundOrderPage.params)).done(data => {
      this._loading = false;//解除锁屏
      if (data) this.refundOrderPage = data; //赋值
    })
  }

  /**
   * 鼠标放在图片上时大图随之移动
   */
  showImg(event) {
    let target = event.target.nextElementSibling;
    target.style.display = 'block';
    target.style.top = (event.clientY + 15) + 'px';
    target.style.left = (event.clientX + 20) + 'px';
  }

  /**
   * 鼠标离开时大图随之隐藏
   */
  hideImg(event) {
    let target = event.target.nextElementSibling;
    target.style.display = 'none';
  }

  /**
   * 子组件加载时
   * @param event
   */
  activate(event) {
    this.showList = false;
  }

  /**
   * 子组件注销时
   * @param event
   */
  onDeactivate(event) {
    this.showList = true;
    if (event.refresh) this.queryOrdList();
  }
}
