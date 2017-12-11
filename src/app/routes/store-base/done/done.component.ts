import {Component, OnInit} from "@angular/core";
import {StoreBaseService} from "../store-base.service";
import {OpenStepsComponent} from "../open-steps/open-steps.component";
import {ActivatedRoute} from "@angular/router";
import {Setting} from "../../../public/setting/setting";
declare var $: any;

@Component({
  selector: 'app-done',
  templateUrl: './done.component.html',
  styleUrls: ['./done.component.css']
})
export class DoneComponent implements OnInit {
  curState: string;//当前店铺状态
  curParam: any = null;

  constructor(public storeBaseService: StoreBaseService,
              public route: ActivatedRoute,
              public steps: OpenStepsComponent) {
    this.steps.step = 1;
  }

  ngOnInit() {
    let me = this;
    let storeCode = me.route.snapshot.queryParams['storeCode'];
    if (storeCode) {
      me.curParam = {storeCode: storeCode};
      me.loadState(storeCode);// 加载店铺状态
    }
  }

  /**
   * 查询企业当前状态
   */
  loadState(storeCode){
    let me = this,param = {storeCode:storeCode};
    $.when(StoreBaseService.loadShopState(param)).done(data => {
      if (data) {
        if(data.state == Setting.ENUMSTATE.shopState.pending){
          me.curState = 'pending';
        }else if(data.state == Setting.ENUMSTATE.shopState.reject) {
          me.curState = 'reject';
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
