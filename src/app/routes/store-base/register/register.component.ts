import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {StoreBaseService} from "../store-base.service";
import {SettleStepsComponent} from "../settle-steps/settle-steps.component";
import {PatternService} from "../../../public/service/pattern.service";
import {Util} from "../../../public/util/util";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  validateForm: FormGroup;
  msgText: string = '获取验证码';
  phoneState: string;
  isSending: boolean = false;
  valitate: any = Util.validate; //表单验证

  constructor(public storeBaseService: StoreBaseService,
              public steps: SettleStepsComponent,
              public fb: FormBuilder) {
    this.steps.current = 0;
    //企业注册表单项校验
    this.validateForm = this.fb.group({
      phone: ['', [Validators.required], [Util.requiredPhoneValidator]],
      code: ['', [Validators.required], [Util.smsCodeValidator]],
      sellerPwd: ['', [Util.pwdValidator]],
      rePwd: ['', [this.passwordConfirmationValidator]]
    });
  }

  ngOnInit() {
  }

  /**
   * 点击下一步按钮时会提交表单，成功后跳转下一步
   * @param $event
   * @param value
   */

  submitRegisterForm = ($event, value) => {
    $event.preventDefault();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
    }
    let formValue = value;
    this.storeBaseService.addSeller(formValue);
  };

  /**
   * 密码异步校验
   * @param control
   * @returns {any}
   */
  passwordConfirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return {required: true};
    } else if (control.value !== this.validateForm.controls['sellerPwd'].value) {
      return {confirm: true, error: true};
    }
  };

  /**
   * 输入确认密码时校验
   */
  validateConfirmPassword() {
    setTimeout(_ => {
      this.validateForm.controls['rePwd'].updateValueAndValidity();
    })
  }

  getFormControl(name) {
    return this.validateForm.controls[name];
  }

  /**
   * 企业注册获取验证码
   * @param requestDate
   */
  getCaptcha() {
    let me = this, phone = me.validateForm.controls['phone'].value;
    if (!me.isSending && PatternService.PHONE_REGEXP.test(phone)) {
      let res = me.storeBaseService.getSmsCode(phone);
      if (res) {
        me.isSending = true;
        let second = 60;
        let timer = setInterval(() => {
          if (second >= 1) {
            second -= 1;
            me.msgText = `已发送${second}秒`;
          }
          if (second < 1) {
            me.msgText = `重新获取`;
            me.isSending = false;
            clearInterval(timer);
          }
        }, 1000);
      }
    } else if (phone == '') {
      me.phoneState = 'empty';
    } else {
      me.phoneState = 'error';
    }
  }


}
