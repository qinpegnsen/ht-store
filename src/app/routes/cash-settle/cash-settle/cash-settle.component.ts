import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {SettingUrl} from "../../../public/setting/setting_url";
import {CashSettleService} from "../cash-settle.service";

@Component({
  selector: 'app-cash-settle',
  templateUrl: './cash-settle.component.html',
  styleUrls: ['./cash-settle.component.css']
})
export class CashSettleComponent implements OnInit {
  isVisible = false;
  isConfirmLoading = false;
  validateForm: FormGroup;
  public settleData: any;                   //提现的数据
  public agentData: any;                     //企业信息
  public selectBank: any;                     //银行信息

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      // select         : [ 'China' ],
      email: [null, [Validators.email]],
      password: [null, [Validators.required]],
      nickname: [null, [Validators.required]],
      phoneNumber: [null, [Validators.required]],
      website: [null, [Validators.required]],
      agree: [false]
    });
    //表单数据
    this.qeurySettleData();//查询账单明细数据
    this.qeuryAgentData();//查询企业信息
    this.seletAllByTypeCode();//查询选择银行
  }

  /**
   * 查询账单明细数据
   */
  qeurySettleData() {
    let url = SettingUrl.URL.settle.plantSettle;
    let data = {
      curPage: 1,
    };
    this.settleData = CashSettleService.getSettle(url, data).voList;
    // console.log("█    this.settleData ►►►",     this.settleData);
  };

  /**
   * 查询企业信息
   */
  qeuryAgentData() {
    let url = SettingUrl.URL.settle.agentBalance;
    let data = {
      agentCode: "552408454438297600"
    };
    this.agentData = CashSettleService.getSettle(url, data);
    // console.log("█  this.cashData ►►►",   this.agentData);
  };

  /**
   * 选择银行
   */
  seletAllByTypeCode() {
    let url = SettingUrl.URL.settle.bankCode;
    let data = {
      typeCode: 'common_use_bank_name'
    }
    this.selectBank = CashSettleService.getSettle(url, data);
    console.log("█  this.selectBank ►►►", this.selectBank);
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
    let url = SettingUrl.URL.settle.insert;
    let data = {
      agentCode: "552408454438297600",
      drawMoney: '1',
      acct: '2',
      bank: '2',
      bacctName: '2',
    };
    CashSettleService.getInsert(url, data);
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

  // _submitForm() {
  //   for (const i in this.validateForm.controls) {
  //     this.validateForm.controls[i].markAsDirty();
  //   }
  // }

  // confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
  //   if (!control.value) {
  //     return {required: true};
  //   } else if (control.value !== this.validateForm.controls['password'].value) {
  //     return {confirm: true, error: true};
  //   }
  // };

  // updateConfirmValidator() {
  //   /** wait for refresh value */
  //   setTimeout(_ => {
  //     this.validateForm.controls['checkPassword'].updateValueAndValidity();
  //   });
  // }
}
