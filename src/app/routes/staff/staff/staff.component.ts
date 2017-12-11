import {Component, OnInit} from '@angular/core';
import {Setting} from "../../../public/setting/setting";

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {
  msg: any = Setting.PAGEMSG.staff; //员工管理信息提示

  constructor() {
  }

  ngOnInit() {
  }

  /**
   * 前往权限平台
   */
  goJurisdiction() {
    window.open(Setting.JURISDICTIONURL);
  }
}
