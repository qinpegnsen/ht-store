import {Component, OnInit} from '@angular/core';
import {StoreBaseService} from "../store-base.service";
import {Setting} from "../../../public/setting/setting";
declare var $: any;
@Component({
  selector: 'app-store-info',
  templateUrl: './store-info.component.html',
  styleUrls: ['./store-info.component.css']
})
export class StoreInfoComponent implements OnInit {
  _loading: boolean = false; //查询时锁屏
  public storeInfo: any = {};//企业信息存储

  public enumState = Setting.ENUMSTATE;//获取枚举状态名
  constructor() {
  }

  ngOnInit() {
    this.queryStoreData();//查询企业信息
  }

  /**
   * 查询企业信息
   */
  queryStoreData() {
    let me = this;
    me._loading = true; //锁屏
    let data = { //查询参数
      epCode: "650849036134457344"//企业编码
    }
    $.when(StoreBaseService.loadStoreInfo(data)).done(data => {
      me._loading = false //解除锁屏
      if (data) {
        me.storeInfo = data;//企业信息
      }
    })
  };


  /**
   * 返回上一页
   */
  back() {
    window.history.go(-1);
  }

}
