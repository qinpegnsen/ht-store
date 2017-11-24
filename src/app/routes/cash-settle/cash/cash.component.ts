import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {SettingUrl} from "../../../public/setting/setting_url";
import {CashSettleService} from "../cash-settle.service";
import {Page} from "../../../public/util/page";
declare var $: any;
@Component({
  selector: 'app-cash',
  templateUrl: './cash.component.html',
  styleUrls: ['./cash.component.css']
})
export class CashComponent implements OnInit {
  settlePage: Page = new Page();          //账单明细信息
  _loading = false;             //查询时锁屏
  constructor(public router: Router,) {
  }

  ngOnInit() {
   this.qeurySettleData();
  }

  /**
   * 查询提现数据
   */
  qeurySettleData(){
    let me = this;
    me._loading = true; //锁屏
    me.settlePage.params = { //查询参数
      curPage: me.settlePage.curPage, //目标页码
      pageSize: me.settlePage.pageSize, //每页条数
      agentCode:"552408454438297600" //代理商编码
    }
    $.when(CashSettleService.settleList(me.settlePage.params)).done(data => {
      me._loading = false //解除锁屏
      if(data) me.settlePage = data; //赋值
    })
  };

  /**
   * 返回上一级页面
   */
  back() {
    this.router.navigate(['/store/cashSettle/cashSettle'])
  }

}
