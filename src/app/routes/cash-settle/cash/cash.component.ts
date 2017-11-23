import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {SettingUrl} from "../../../public/setting/setting_url";
import {CashSettleService} from "../cash-settle.service";

@Component({
  selector: 'app-cash',
  templateUrl: './cash.component.html',
  styleUrls: ['./cash.component.css']
})
export class CashComponent implements OnInit {
  public cashData:any ;                  //账单明细数据

  constructor(public router: Router,) {
  }

  ngOnInit() {
   this.qeurySettleData();
  }

  /**
   * 查询提现数据
   */
  qeurySettleData(){
    let url = SettingUrl.URL.settle.query;
    let data={
      curPage: 1,
      agentCode:"552408454438297600"
    };
    this.cashData = CashSettleService.getSettle(url,data).voList;
    console.log("█  this.cashData ►►►",   this.cashData);
  };

  /**
   * 返回上一级页面
   */
  back() {
    this.router.navigate(['/store/cash-settle/cash-settle'])
  }

}
