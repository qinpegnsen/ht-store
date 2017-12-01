import {Component, OnInit} from "@angular/core";
import {SimplesService} from "../simples.service";
import {DreageStepsComponent} from "../dreage-steps/dreage-steps.component";
import {ActivatedRoute} from "@angular/router";
import {Setting} from "../../../public/setting/setting";
declare var $: any;

@Component({
  selector: 'app-done',
  templateUrl: './done.component.html',
  styleUrls: ['./done.component.css']
})
export class DoneComponent implements OnInit {
  public curState: string;//当前店铺状态
  public curParam: any = null;

  constructor(public simplesService: SimplesService,
              public route: ActivatedRoute,
              public steps: DreageStepsComponent) {
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
    $.when(SimplesService.loadShopState(param)).done(data => {
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
    this.simplesService.routerSkip(stepName, this.curParam);
  }
}
