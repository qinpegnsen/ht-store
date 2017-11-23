import { Injectable } from '@angular/core';
import {AjaxService} from "../../../public/service/ajax.service";
import {SettingUrl} from "../../../public/setting/setting_url";
import {NzNotificationService} from "ng-zorro-antd";

@Injectable()
export class OrderPendingShipmentService {

  constructor(public _notification: NzNotificationService) { }

  queryData(url, data) {
    const me = this;
    let _success: boolean = false;
    AjaxService.get({
      url: SettingUrl.URL.order.queryOrdAdmin,
      data: {},
      async: false,
      success: (res) => {
        if (res.success) {
          _success = true;
        } else {
          me._notification.error(`出错了`, '接口出错了接口出错了接口出错了')
        }
      },
      error: (res) => {
        me._notification.error(`接口出错了`, '接口出错了接口出错了接口出错了')
      }
    });
    return _success;
  }

}
