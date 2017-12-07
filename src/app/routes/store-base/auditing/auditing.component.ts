import {Component, OnInit} from '@angular/core';
import {StoreBaseService} from "../store-base.service";
import {SettleStepsComponent} from "../settle-steps/settle-steps.component";
import {ActivatedRoute} from "@angular/router";
import {Setting} from "../../../public/setting/setting";
declare var $: any;

@Component({
  selector: 'app-auditing',
  templateUrl: './auditing.component.html',
  styleUrls: ['./auditing.component.css']
})
export class AuditingComponent implements OnInit {
  public curState: string;   //当前状态
  public curParam: any = null;   //当前状态下可以跳转的路由所需参数

  constructor(public storeBaseService: StoreBaseService,
              public route: ActivatedRoute,
              public steps: SettleStepsComponent) {
    this.steps.current = 3;
  }

  ngOnInit() {
    let me = this;
    let epCode = me.route.snapshot.queryParams['epCode'];
    if (epCode) me.loadState(epCode);
  }

  /**
   * 查询企业当前状态
   */
  loadState(epCode){
    let me = this,param = {epCode:epCode};
    $.when(StoreBaseService.loadStoreState(param)).done(data => {
      if (data) {
        if(data.state == Setting.ENUMSTATE.enterState.half || data.state == Setting.ENUMSTATE.enterState.audit){
          me.curState = 'auditing';
        }else if(data.state == Setting.ENUMSTATE.enterState.normal){
          me.curState = 'settlePass';
          me.curParam = {epCode:data.epCode,sellerCode:data.sellerCode};//开通店铺所需参数
        }else if(data.state == Setting.ENUMSTATE.enterState.reject) {
          me.curState = 'settleReject';
          me.curParam = {epCode:data.epCode};//修改信息所需参数
        }
      }
    })
  }

    /**
     * 组件跳转
     */
    skipTo(stepName){
      this.storeBaseService.routerSkip(stepName,this.curParam);
    }

  }
