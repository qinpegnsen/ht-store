import {Component, OnInit} from "@angular/core";
import {StoreBaseService} from "../store-base.service";
import {OpenStepsComponent} from "../open-steps/open-steps.component";
import {ActivatedRoute} from "@angular/router";
import {Setting} from "../../../public/setting/setting";
import {SettingUrl} from "../../../public/setting/setting_url";
declare var $: any;

@Component({
  selector: 'app-done',
  templateUrl: './done.component.html',
  styleUrls: ['./done.component.css']
})
export class DoneComponent implements OnInit {
  public curState: string = 'pending';//当前店铺状态
  public curParam: any = null;
  public routerHome:string = SettingUrl.ROUTERLINK.store.home;

  constructor(public storeBaseService: StoreBaseService,
              public route: ActivatedRoute,
              public steps: OpenStepsComponent) {
    this.steps.step = 1;
  }

  ngOnInit() {
    let me = this;
    me.loadState();// 加载店铺状态
  }

  /**
   * 查询企业当前状态
   */
  loadState() {
    let me = this;
    $.when(StoreBaseService.loadShopState()).done(data => {
      if (data) {
        me.curParam = {storeCode: data.storeCode};
        if (data.state == Setting.ENUMSTATE.shopState.pending) {
          me.curState = 'pending';
        } else if (data.state == Setting.ENUMSTATE.shopState.reject) {
          me.curState = 'reject';
        } else if (data.state == Setting.ENUMSTATE.shopState.normal) {
          me.curState = 'normal';
        }
      }
    })
  }

  /**
   * 组件跳转
   */
  skipTo(stepName) {
    this.storeBaseService.routerSkip(stepName, this.curParam);
  }
}
