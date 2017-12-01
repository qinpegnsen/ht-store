import {Component, OnInit} from '@angular/core';
import {SimplesService} from "../simples.service";
declare var $: any;
@Component({
  selector: 'app-store-info',
  templateUrl: './store-info.component.html',
  styleUrls: ['./store-info.component.css']
})
export class StoreInfoComponent implements OnInit {
  public storeInfo: any;//企业信息存储

  constructor() {
  }

  _loading: boolean = false;             //查询时锁屏
  ngOnInit() {
    this.qeuryAgentData();//查询企业信息
  }

  /**
   * 查询企业信息
   */
  qeuryAgentData() {
    let me = this;
    me._loading = true; //锁屏
    let data = { //查询参数
      epCode: "648357645864706048"
    }
    $.when(SimplesService.cashSettleList(data)).done(data => {
      me._loading = false //解除锁屏
      if (data) {
        me.storeInfo = data;//企业信息
        // console.log("█  me.storeInfo ►►►",   me.storeInfo);
      }
    })
  };

}
