import {Component, OnInit} from '@angular/core';
import {StoreBaseService} from "../store-base.service";
import {Setting} from "../../../public/setting/setting";
import {Location} from '@angular/common';
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
  public shops:string = SettingUrl.ROUTERLINK.basic.shops; //店铺信息路由
  constructor(public location: Location) {
  }

  ngOnInit() {
    let _this = this;
    _this.queryStoreData();//查询企业信息
    _this.bankCard();//银行卡号加密
    _this.idCard();//身份证号加密
  }

  /**
   * 查询企业信息
   */
  queryStoreData() {
    let _this = this;
    _this._loading = true; //锁屏
    let data = { //查询参数
      epCode: "650849036134457344"//企业编码
    }
    $.when(StoreBaseService.loadStoreInfo(data)).done(data => {
      _this._loading = false //解除锁屏
      if (data) {
        _this.storeInfo = data;//企业信息
      }
    })
  };


  /**
   * 返回上一页
   */
  back() {
    this.location.back();
  }

  /**
   * 银行卡号加密
   */
  bankCard(){
    let _this=this;
    let card= _this.storeInfo.settlementBankCode.substr(0,3) + '***********' + _this.storeInfo.settlementBankCode.substr(14);
    $('.bankCard').text(card)
  }

  /**
   * 身份证号加密
   */
  idCard(){
    let _this=this;
    let card= _this.storeInfo.legalPersonIdcard.substr(0,3) + '***********' + _this.storeInfo.legalPersonIdcard.substr(14);
    $('.idCard').text(card)
  }

}
