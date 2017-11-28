import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {RedPacketService} from "../red-packet.service";
import {Page} from "../../../public/util/page";
declare var $: any;

@Component({
  selector: 'app-red-pack-push-order',
  templateUrl: './red-pack-push-order.component.html',
  styleUrls: ['./red-pack-push-order.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RedPackPushOrderComponent implements OnInit {

  public PushOrderPage: Page = new Page();    //红包投放记录的数据
  public _loading = false;                    //查询时锁屏,默认关闭
  constructor() { }

  /**
   * 调用投放记录列表
   */
  ngOnInit() {
    this.qeuryPushOrderData();
  }

  /**
   * 查询红包投放记录列表
   */
  qeuryPushOrderData(){
    this._loading=true;//锁屏
    this.PushOrderPage.params = { //查询参数
      curPage: this.PushOrderPage.curPage, //目标页码
      pageSize: this.PushOrderPage.pageSize //每页条数
    };
    $.when(RedPacketService.pushOrDerList(this.PushOrderPage.params)).done(data => {
      this._loading = false ;//解除锁屏
      if(data) this.PushOrderPage = data; //赋值
    })
  };

}
