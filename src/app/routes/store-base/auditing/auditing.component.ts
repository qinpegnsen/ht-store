import {Component, OnInit} from "@angular/core";
import {StoreBaseService} from "../store-base.service";
import {SettleStepsComponent} from "../settle-steps/settle-steps.component";
import {Setting} from "../../../public/setting/setting";
import {AjaxService} from "../../../public/service/ajax.service";
import {SettingUrl} from "../../../public/setting/setting_url";
declare var $: any;

@Component({
  selector: 'app-auditing',
  templateUrl: './auditing.component.html',
  styleUrls: ['./auditing.component.css']
})
export class AuditingComponent implements OnInit {
  curState: string = 'auditing';   //当前状态
  rejectOpinion: string = '';//驳回意见

  constructor(public storeBaseService: StoreBaseService,
              public steps: SettleStepsComponent) {
    this.steps.current = 3;
  }

  ngOnInit() {
    let me = this;
    me.loadState();
  }

  /**
   * 查询企业当前状态
   */
  loadState() {
    let me = this;
    $.when(StoreBaseService.loadStoreState()).done(data => {
      if (data) {
        if (data.state == Setting.ENUMSTATE.enterState.half || data.state == Setting.ENUMSTATE.enterState.audit) {
          me.curState = 'auditing';//待审核状态
          me.logout();//待审核状态下退出登录，当刷新后需要登陆，以保证当前登录信息最新
        } else if (data.state == Setting.ENUMSTATE.enterState.normal) {
          me.curState = 'settlePass';//审核通过，入驻成功
        } else if (data.state == Setting.ENUMSTATE.enterState.reject) {
          me.curState = 'settleReject';//审核驳回
          me.loadStoreData();
        }
      }
    })
  }

  logout(){
    localStorage.clear(); //清空所有storage
    AjaxService.get({
      url: SettingUrl.URL.login.logout
    });
  }

  /**
   * 查询企业信息
   * @param data
   */
  loadStoreData() {
    let me = this;
    $.when(StoreBaseService.loadStoreInfo()).done(data => {
      if (data) me.rejectOpinion = data.opinion;//驳回意见
    })
  }

  /**
   * 组件跳转
   */
  skipTo(stepName) {
    this.storeBaseService.routerSkip(stepName);
  }

}
