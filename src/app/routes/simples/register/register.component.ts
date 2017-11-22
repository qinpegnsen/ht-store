import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {SimplesService} from "../simples.service";
import {StepsComponent} from "../steps/steps.component";
import {PatternService} from "../../../public/service/pattern.service";

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

  constructor(public simplesService: SimplesService,
              public steps: StepsComponent,
              public fb: FormBuilder,
              public patterns: PatternService) {
    this.steps.current = 0;
    this.simplesService.routerSkip(this.steps.current);
    //企业注册表单项校验
    this.validateForm = this.fb.group({
      phone               : [ '', [ Validators.required ], [ this.simplesService.phoneValidator ] ],
      code             : [ '', [ Validators.required ], [ this.simplesService.smsCodeValidator ] ],
      sellerPwd           : [ '', [ this.pwdValidator] ],
      rePwd               : [ '', [ this.passwordConfirmationValidator ] ],
      // email               : [ '', [ this.emailValidator ] ],
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
      this.validateForm.controls[ key ].markAsDirty();
    }
    console.log(value);
    let formValue = value;
    if(value.isBoss) formValue.isBoss = 'Y';
    if(!value.isBoss) formValue.isBoss = 'N';
    this.simplesService.addSeller(formValue);
  };

  /**
   * 密码异步校验
   * @param control
   * @returns {any}
   */
  pwdValidator = (control: FormControl): any => {
    if (!control.value) {
      return { required: true }
    } else if (!this.patterns.PWD_REGEXP.test(control.value)) {
      return { pwd: true, error: true }
    }
  };

  /**
   * 密码异步校验
   * @param control
   * @returns {any}
   */
  passwordConfirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls[ 'sellerPwd' ].value) {
      return { confirm: true, error: true };
    }
  };

  /**
   * 输入确认密码时校验
   */
  validateConfirmPassword() {
    setTimeout(_ => {
      this.validateForm.controls[ 'rePwd' ].updateValueAndValidity();
    })
  }

  getFormControl(name) {
    return this.validateForm.controls[ name ];
  }

  /**
   * 企业注册获取验证码
   * @param requestDate
   */
  getCaptcha(){
    let me = this, phone = me.validateForm.controls[ 'phone' ].value;
    if(!me.isSending && me.patterns.PHONE_REGEXP.test(phone)){
      let res = me.simplesService.getSmsCode(phone);
      if(res){
        me.isSending = true;
        let second = 60;
        let timer = setInterval(() => {
          if(second >= 1) {
            second -= 1;
            me.msgText = `已发送${second}秒`;
          }
          if(second < 1) {
            me.msgText = `重新获取`;
            me.isSending = false;
            clearInterval(timer);
          }
        },1000);
      }
    }else if(phone == ''){
      me.phoneState = 'empty';
    }else{
      me.phoneState = 'error';
    }
  }


}
