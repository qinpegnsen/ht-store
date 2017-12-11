import {Component, OnInit} from "@angular/core";
import {StoreBaseService} from "../store-base.service";
import {Setting} from "../../../public/setting/setting";
import {Location} from "@angular/common";
import {SettingUrl} from "../../../public/setting/setting_url";
declare var $: any;
@Component({
  selector: 'app-store-info',
  templateUrl: './store-info.component.html',
  styleUrls: ['./store-info.component.css']
})
export class StoreInfoComponent implements OnInit {
  public _loading: boolean = false; //查询时锁屏
  public storeInfo: any = {};//企业信息存储
  public enumState: any = Setting.ENUMSTATE;//获取枚举状态名
  public enum: any = Setting.ENUM;//获取枚举状态名
  public shops: string = SettingUrl.ROUTERLINK.basic.shops; //店铺信息路由
  constructor(public location: Location) {
  }

  ngOnInit() {
    let me = this;
    me.queryStoreData();//查询企业信息
    me.bankCard();//银行卡号加密
    me.idCard();//身份证号加密
  }

  /**
   * 查询企业信息
   */
  queryStoreData() {
    let me = this;
    me._loading = true; //锁屏
    let data = { //查询参数
      epCode: "649255483008294912"//企业编码
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
    let me=this;
    me.location.back();
  }

  /**
   * 银行卡号加密
   */
  bankCard() {
    let me = this, bank = me.storeInfo.bankAccountNumber;
    let bankcard = String(bank).substr(0, 3) + '***********' + String(bank).substr(14);
    $('.bankCard').text(bankcard)
  }

  /**
   * 身份证号加密
   */
  idCard() {
    let me = this, card = me.storeInfo.legalPersonIdcard;
    let idcard = String(card).substr(0, 3) + '***********' + String(card).substr(14);
    $('.idCard').text(idcard)
  }

}
