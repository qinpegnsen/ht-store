import { Component, OnInit } from '@angular/core';
import {isUndefined} from "util";
import {Page} from "../../../public/util/page";
import {OrderPendingShipmentService} from "./order-pending-shipment.service";

@Component({
  selector: 'app-order-pending-shipment',
  templateUrl: './order-pending-shipment.component.html',
  styleUrls: ['./order-pending-shipment.component.css']
})
export class OrderPendingShipmentComponent implements OnInit {
  agentAcct;//代理商账号
  agentOrdno;//订单号
  public goodsList: Page = new Page();//分页

  constructor(public orderPendingShipmentService:OrderPendingShipmentService) { }

  ngOnInit() {
  }

  /**
   * 查询待发货订单列表
   * @param event
   * @param curPage
   */
  public queryAgentOrdAdmin(curPage, event?) {

    let _this = this, activePage = 1;
    if (typeof event !== 'undefined') {
      activePage = event.activePage;
    } else if (!isUndefined(curPage)) {
      activePage = curPage;
    }
    let url = '/agentOrd/queryAgentOrdAdmin';

    let data = {
      curPage: activePage,
      pageSize: 10,
      sortColumns: '',
      agentAcct: _this.agentAcct,
      ordno: _this.agentOrdno
    };
    _this.goodsList = new Page(_this.orderPendingShipmentService.queryData(url, data));
  }
}
