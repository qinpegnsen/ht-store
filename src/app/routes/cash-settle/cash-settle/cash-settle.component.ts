import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
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
  isVisible: boolean = false;//提现弹窗默认不可见
  isConfirmLoading: boolean = false;//提现确认按钮的加载小圈默认不可见
  validateForm: FormGroup;
  _loading: boolean = false;         //查询时锁屏
  settlePage: Page = new Page();  //结算信息
  storeInfo: any = {};  //企业信息
  insertData: any = {};  //申请提现时传入的信息
  settleFormula: any = Setting.PAGEMSG.settleFormula; //结算公式
  cachUrl: string = SettingUrl.ROUTERLINK.store.cach; //提现页面

  constructor(private fb: FormBuilder, public cashSettleService: CashSettleService) {
    this.validateForm = this.fb.group({ //表单数据
      acct: [null, [Validators.email]],
      bacctName: [null, [Validators.required]],
      bank: [null, [Validators.required]],
      balance: [null, [Validators.required]]
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
      pageSize: me.settlePage.pageSize //每页条数
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
    this.isConfirmLoading = true;//点击确认按钮加载小圈
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

}
