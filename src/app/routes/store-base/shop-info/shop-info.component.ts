import {Component, OnInit} from "@angular/core";
import {Setting} from "../../../public/setting/setting";
import {StoreBaseService} from "../store-base.service";
import {SettingUrl} from "../../../public/setting/setting_url";
import {Location} from "@angular/common";
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
  public editShop:string = SettingUrl.ROUTERLINK.basic.editShop; //修改店铺信息路由
  public storeCode: any;//店铺编码
  constructor(public location: Location) {
  }

  ngOnInit() {
    let me=this;
    me.queryShopsData();//查询店铺信息
  }

  /**
   * 查询店铺信息
   */
  queryShopsData() {
    let me = this;
    me._loading = true; //锁屏
    $.when(StoreBaseService.loadShopInfo()).done(data => {
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
    let me=this;
    me.location.back();
  }
}
