import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CashSettleService} from "../cash-settle.service";
import {Page} from "../../../public/util/page";
import {Setting} from "../../../public/setting/setting";
import {SettingUrl} from "../../../public/setting/setting_url";

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
  public validateForm: FormGroup;  //提现表单
  public _loading: boolean = false;  //查询时锁屏
  public settlePage: Page = new Page();  //结算信息
  public storeInfo: any = {};  //企业信息
  public insertData: any = {};  //申请提现时传入的信息
  public query:any = {};    // 查询条件
  public _startDate:any;
  public _endDate:any;
  public settleFormula: any = Setting.PAGEMSG.settleFormula; //结算公式
  public cachUrl: string = SettingUrl.ROUTERLINK.store.cach; //提现页面

  constructor(private fb: FormBuilder, public cashSettleService: CashSettleService) {
    this.validateForm = this.fb.group({ //表单数据
      acct: [null, [Validators.email]],//申请提现金额
      bacctName: [null, [Validators.required]],//收款人姓名
      bank: [null, [Validators.required]],//账号开户行
      balance: [null, [Validators.required]],//银行卡号
      a: [null, [Validators.required]]//银行卡号
    });
  }

  ngOnInit() {
    let me = this;
    me.qeuryCashData();//查询账单明细数据
    me.qeuryAgentData();//查询企业信息
  }

  /**
   * 查询账单明细数据
   */
  qeuryCashData() {
    let me = this;
    me._loading = true; //锁屏
    me.settlePage.params = { //查询参数
      curPage: me.settlePage.curPage, //目标页码
      pageSize: me.settlePage.pageSize, //每页条数
      ordno:me.query.ordno//订单编号
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
    let data = { //查询参数
      agentCode: "552408454438297600"
    }
    $.when(CashSettleService.storeData(data)).done(data => {
      me._loading = false; //解除锁屏
      if (data) {
        me.storeInfo = data;
        me.validateForm.patchValue(me.storeInfo);//回显提现信息
        me.bankCard();//银行卡号加密
      }
    })
  };


  /**
   * 提现申请弹窗显示
   */
  showModal = () => {
    this.isVisible = true;
  }

  /**
   * 确认提现---确认关闭提现弹窗
   * @param e
   */
  handleOk = (e) => {
    let me = this;
    me.insertData = me.validateForm.value;
    me.insertData.agentCode = "552408454438297600";
    me.cashSettleService.insertList(me.insertData);
    me.isConfirmLoading = true;//点击确认按钮加载小圈
    setTimeout(() => {
      me.isVisible = false;
      me.isConfirmLoading = false;
    }, 1000);
  }

  /**
   * 取消关闭提现弹窗
   * @param e
   */
  handleCancel = (e) => {
    this.isVisible = false;
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
   * 银行卡号加密
   */
  bankCard() {
    let me = this, bank = me.validateForm.controls["balance"].value;
    let bankCard = String(bank).substring(0, 2) + "*" + String(bank).substring(3);
    me.validateForm.patchValue({balance: bankCard});
  }

  show(){
    let acct=this.validateForm.controls["acct"].value
    this.validateForm.patchValue({a:acct})
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
