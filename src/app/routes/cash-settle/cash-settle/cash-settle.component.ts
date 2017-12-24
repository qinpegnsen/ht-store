import {Component, OnInit} from "@angular/core";
import {CashSettleService} from "../cash-settle.service";
import {Page} from "../../../public/util/page";
import {Setting} from "../../../public/setting/setting";
import {SettingUrl} from "../../../public/setting/setting_url";
import {Util} from "../../../public/util/util";
import {NzModalService, NzModalSubject, NzNotificationService} from "ng-zorro-antd";
import {PatternService} from "../../../public/service/pattern.service";

declare var $: any;

@Component({
  selector: 'app-cash-settle',
  templateUrl: './cash-settle.component.html',
  styleUrls: ['./cash-settle.component.css'],
  providers: [CashSettleService]
})
export class CashSettleComponent implements OnInit {
  public isVisible: boolean = false;//提现弹窗默认不可见
  public isConfirmLoading: boolean = false;//提现确认按钮的加载小圈默认不可见
  public _loading: boolean = false;  //查询时锁屏
  public settlePage: Page = new Page();  //结算信息
  public insertData: any = {};  //申请提现时传入的信息
  public query: any = {};    // 查询条件
  public _startDate: Date = new Date();//查询条件的开始时间
  public _endDate: Date = new Date();//查询条件的结束时间
  public settleFormula: any = Setting.PAGEMSG.settleFormula; //结算公式
  public cachUrl: string = SettingUrl.ROUTERLINK.store.cach; //提现页面

  public bankDataList: Array<any> = new Array();  //银行信息
  public ngValidateStatus = Util.ngValidateStatus;//表单项状态
  public ngValidateErrorMsg = Util.ngValidateErrorMsg;//表单项提示状态
  public valitateState: any = Setting.valitateState;//表单验证状态
  public validateForm: any = {};//表单
  public drawMoney: any;//提现金额（余额）
  public currentModal: any;//弹窗默认不显示
  public info: any = Setting.PAGEMSG;//引导语

  constructor(public _notification: NzNotificationService,
              public patternService: PatternService,
              public cashSettleService: CashSettleService,
              private modalService: NzModalService,) {
  }

  ngOnInit() {
    let me = this;
    me.qeuryCashData();//查询账单明细数据
    me.qeuryAgentData();//查询企业信息
  }

  /**
   * 重置搜索条件
   */
  resetSearch() {
    let me = this;
    me.query = {};
    me.settlePage = new Page();
    me.qeuryCashData();
  }

  /**
   * 查询账单明细数据
   */
  qeuryCashData() {
    let me = this;
    let startDate = Util.dataFormat(me._startDate, "yyyy-MM-dd");//查询条件的开始时间
    let endDate = Util.dataFormat(me._endDate, "yyyy-MM-dd");//查询条件的结束时间
    me._loading = true; //锁屏
    me.settlePage.params = { //查询参数
      curPage: me.settlePage.curPage, //目标页码
      pageSize: me.settlePage.pageSize, //每页条数
      ordno: me.query.ordno,//订单编号
      startTime: startDate,//开始时间
      endTime: endDate//结束时间
    }
    $.when(CashSettleService.cashSettleList(me.settlePage.params)).done(data => {
      me._loading = false //解除锁屏
      if (data) me.settlePage = data; //赋值
    })
  };

  /**
   * 查询企业信息
   */
  qeuryAgentData() {
    let me = this;
    me._loading = true; //锁屏
    $.when(CashSettleService.storeData()).done(data => {
      if (data) {
        me.validateForm = data;//企业信息
      }
    })
  };

  /**
   * 点击提现申请，弹窗出现
   * @param titleTpl  弹窗标题
   * @param contentTpl  弹窗内容
   * @param footerTpl   弹窗底部
   */
  showModalForTemplate(titleTpl, contentTpl, footerTpl) {
    let me = this;
    me.currentModal = this.modalService.open({
      title: titleTpl,
      content: contentTpl,
      footer: footerTpl,
      maskClosable: false,
    });
    me.seletAllByTypeCode();//查询银行
  }

  /**
   * 确认提现---确认关闭提现弹窗
   * @param e
   */
  handleOk = (e) => {
    let me = this;
    if (me.validateForm.balance == 0) {
      return;
    }
    me.insertData = me.validateForm;
    me.isConfirmLoading = true;//点击确认按钮加载小圈
    $.when(me.cashSettleService.insertList(me.insertData)).done(data => {
      me._loading = false; //解除锁屏
      if (data.success) {
        this.currentModal.destroy('onCancel');//关闭弹窗
        me.isConfirmLoading = false;
        me.validateForm.drawMoney = null;//成功后清空余额
        me._notification.success('提现成功', data.info);
       me.qeuryAgentData();//刷新企业余额
      } else {
        me.isConfirmLoading = false;
        me._notification.error('提现失败', data.info)
      }
    })
  }

  /**
   * 取消关闭提现弹窗
   * @param e
   */
  handleCancel = (e) => {
    let me = this;
    me.validateForm.drawMoney = null;//关闭弹窗时清空余额
    me.currentModal.destroy('onCancel');//关闭弹窗
    me.isConfirmLoading = false;//点击确认按钮加载小圈
  }


  /**
   * 正则验证
   * @param name
   * @returns {AbstractControl}
   */
  getFormControl(name) {
    return this.validateForm.controls[name];
  }


  /**
   * 全部提现
   */
  showDrawMoney() {
    let me = this;
    let money = me.validateForm.balance;
    me.validateForm.drawMoney = money;
  }

  /**
   * 选择银行
   */
  seletAllByTypeCode() {
    let me = this, bankData: any = {typeCode: Setting.SETTINGINFO.bankTypeCode};  //查詢銀行信息時傳入的參數
    me._loading = true; //锁屏
    $.when(CashSettleService.bankList(bankData)).done(data => {
      me._loading = false //解除锁屏
      if (data) me.bankDataList = data; //赋值
    })
  }

  /**
   * 排除不可选的身份证有效开始日期
   * @param startValue
   * @returns {boolean}
   * @private
   */
  _disabledIdCardStartDate = (startValue) => {
    if (!startValue || !this._endDate) return false;
    return startValue.getTime() >= this._endDate.getTime();
  };

  /**
   * 排除不可选的身份证有效结束日期
   * @param endValue
   * @returns {boolean}
   * @private
   */
  _disabledIdCardEndDate = (endValue) => {
    if (!endValue || !this._startDate) return false;
    return endValue.getTime() <= this._startDate.getTime();
  };

}
