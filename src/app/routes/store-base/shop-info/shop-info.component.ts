import {Component, OnInit} from '@angular/core';
import {Setting} from "../../../public/setting/setting";
import {StoreBaseService} from "../store-base.service";
declare var $: any;
@Component({
  selector: 'app-shop-info',
  templateUrl: './shop-info.component.html',
  styleUrls: ['./shop-info.component.css']
})
export class ShopInfoComponent implements OnInit {
  public _loading: boolean = false; //查询时锁屏
  public shopsInfo: any = {};//店铺信息存储
  public enumState: any = Setting.ENUMSTATE;//获取枚举状态名
  constructor() {
  }

  ngOnInit() {
    this.queryShopsData();//查询店铺信息
  }

  /**
   * 查询企业信息
   */
  queryShopsData() {
    let me = this;
    me._loading = true; //锁屏
    let data = { //查询参数
      storeCode: "649518214747807744"//店铺编码
    }
    $.when(StoreBaseService.loadShopInfo(data)).done(data => {
      me._loading = false //解除锁屏
      if (data) {
        me.shopsInfo = data;//店铺信息
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
