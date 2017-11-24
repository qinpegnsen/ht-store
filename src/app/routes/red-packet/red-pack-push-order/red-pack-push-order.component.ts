import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {RedPacketService} from "../red-packet.service";
import {SettingUrl} from "../../../public/setting/setting_url";

@Component({
  selector: 'app-red-pack-push-order',
  templateUrl: './red-pack-push-order.component.html',
  styleUrls: ['./red-pack-push-order.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RedPackPushOrderComponent implements OnInit {

  public redPackPushData:any ;                  //红包投放记录的数据

  constructor() { }

  ngOnInit() {
    this.qeuryListData();
  }

  /**
   * 查询红包投放记录列表的数据
   */
  qeuryListData(){
    let url = SettingUrl.URL.rpAccountRec.queryRec;
    console.log("█ url  ►►►",  url );
    let data={
      curPage: 1
    };
    this.redPackPushData = RedPacketService.getNoTip(url,data).voList;
  };

}
