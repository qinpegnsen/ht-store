import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {SettingUrl} from "../../../public/setting/setting_url";
import {CashSettleService} from "../cash-settle.service";
import {Page} from "../../../public/util/page";
import {Setting} from "../../../public/setting/setting";

declare var $: any;

@Component({
  selector: 'app-cash-settle',
  templateUrl: './cash-settle.component.html',
  styleUrls: ['./cash-settle.component.css']
})
export class CashSettleComponent implements OnInit {
  isVisible = false;
  isConfirmLoading = false;
  validateForm: FormGroup;
  _loading = false;             //查询时锁屏
  cashPage: Page = new Page();  //结算信息
  agentPage:any={};  //企业信息
  bankData:any={};  //银行信息
  insertData:any={};  //申请提现信息
  settleFormula:any = Setting.PAGEMSG.settleFormula; //结算公式

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      code: [['全部']],
      email: [null, [Validators.email]],
      password: [null, [Validators.required]],
      nickname: [null, [Validators.required]],
      phoneNumber: [null, [Validators.required]],
      website: [null, [Validators.required]],
      agree: [false]
    });
    // //表单数据
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
    })
  };

  /**
   * 选择银行
   */
  seletAllByTypeCode() {
    let me = this;
    me._loading = true; //锁屏
    me.bankData= { //查询参数
      typeCode: 'common_use_bank_name'
    }
    $.when(CashSettleService.bankList(me.bankData)).done(data => {
      me._loading = false //解除锁屏
      if (data) me.bankData = data; //赋值
    })
  }

  /**
   * 遮罩层显示
   */
  showModal = () => {
    this.isVisible = true;
  }

  /**
   * 确认关闭遮罩层
   * @param e
   */
  handleOk = (e) => {
    let me = this;
    me._loading = true; //锁屏
    me.insertData= { //查询参数
      agentCode: "552408454438297600",
      drawMoney: '1',
      acct: '2',
      bank: '2',
      bacctName: '2'
    }
    $.when(CashSettleService.insertList(me.insertData)).done(data => {
      me._loading = false //解除锁屏
      // if (data) me.insertData = data; //赋值
    })
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

}
