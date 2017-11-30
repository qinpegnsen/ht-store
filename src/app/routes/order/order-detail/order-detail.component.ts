import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  current = 0;//步骤条

  constructor(public router: Router) { }

  ngOnInit() {
  }
  /**
   * 返回上一级页面
   */
  backOrderList() {
    this.router.navigate(['/store/order/pendingShipment'])
  }
}
