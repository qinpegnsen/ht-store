import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CashSettleService} from "../cash-settle.service";
import {Page} from "../../../public/util/page";
import {Setting} from "../../../public/setting/setting";

declare var $: any;

@Component({
  selector: 'app-cash-settle',
  templateUrl: './cash-settle.component.html',
  styleUrls: ['./cash-settle.component.css'],
  providers:[CashSettleService]
})
export class CashSettleComponent implements OnInit {
  isVisible = false;
  isConfirmLoading = false;
  validateForm: FormGroup;
  _loading = false;             //查询时锁屏
  cashPage: Page = new Page();  //结算信息
  agentPage: any = {};  //企业信息
  bankData: any = {};  //银行传参
  bankDataList=[];  //银行信息
  insertData: any = {};  //申请提现信息
  settleFormula: any = Setting.PAGEMSG.settleFormula; //结算公式

  constructor(private fb: FormBuilder,public cashSettleService:CashSettleService ) {
    this.validateForm = this.fb.group({ //表单数据
      acct: [null, [Validators.email]],
      email: ['', [this.emailValidator]],
      nickname: [null, [Validators.required]],
      bank: [null, [Validators.required]],
      balance: [null, [Validators.required]],
    });
  }

  ngOnInit() {
    this.qeuryCashData();//查询账单明细数据
    this.qeuryAgentData();//查询企业信息
    this.seletAllByTypeCode();//查询选择银行
  }

  /**
   * 查询账单明细数据
   */
  qeuryCashData() {
    let me = this;
    me._loading = true; //锁屏
    me.cashPage.params = { //查询参数
      curPage: me.cashPage.curPage, //目标页码
      pageSize: me.cashPage.pageSize //每页条数
    }
    $.when(CashSettleService.cashSettleList(me.cashPage.params)).done(data => {
      me._loading = false //解除锁屏
      if (data) me.cashPage = data; //赋值
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
    $.when(CashSettleService.agentData(data)).done(data => {
      me._loading = false //解除锁屏
      if (data) me.agentPage = data; //赋值
      this.validateForm.patchValue({email: this.agentPage.acct});//获取收款人账号
      this.validateForm.patchValue({nickname: this.agentPage.bacctName});//获取收款人名字
      this.validateForm.patchValue({balance: this.agentPage.balance});//获取收款人账户余额
      this.validateForm.patchValue({bank: this.agentPage.bank});//获取收款人名字
    })
  };

  /**
   * 选择银行
   */
  seletAllByTypeCode() {
    let me = this;
    me._loading = true; //锁屏
    me.bankData.typeCode = 'common_use_bank_name';
    $.when(CashSettleService.bankList(me.bankData)).done(data => {
      me._loading = false //解除锁屏
      if (data) me.bankDataList = data; //赋值
    })
  }

  /**
   * 遮罩层显示
   */
  showModal = () => {
    this.isVisible = true;
  }

  /**
   * 确认提现---确认关闭遮罩层
   * @param e
   */
  handleOk = (e) => {
    let me = this;
    me.insertData = me.validateForm.value;
    me.insertData.agentCode = "552408454438297600";
    me.cashSettleService.insertList(me.insertData);
    this.isConfirmLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isConfirmLoading = false;
    }, 1000);
  }

  /**
   * 取消关闭遮罩层
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
   * 邮箱验证
   * @param control
   * @returns {any}
   */
  emailValidator = (control: FormControl): { [s: string]: boolean } => {
    const EMAIL_REGEXP = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
    if (!control.value) {
      return {required: true}
    } else if (!EMAIL_REGEXP.test(control.value)) {
      return {error: true, email: true};
    }
  };
}
