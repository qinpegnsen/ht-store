import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  validateForm: FormGroup;//重置密码的表单

  constructor(public fb: FormBuilder) {
    this.validateForm = this.fb.group({
      phone: ['', [this.phoneValidator]],//手机号的校验
      smsCode: ['', [this.samCodeValidator]],//验证码校验
    });
  }

  ngOnInit() {

  }

  submitForm = ($event, value) => {
    $event.preventDefault();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
    }
    console.log(value);
  };


  getFormControl(name) {
    return this.validateForm.controls[name];
  }


  samCodeValidator = (control: FormControl): any => {
    const SMS = /\d{6}/;
    if (!control.value) {
      return {required: true}
    } else if (!SMS.test(control.value)) {
      return {smsCode: true, error: true}
    }
  };

  phoneValidator = (control: FormControl): any => {
    const PHONE = /^1[0-9]{10}$/;
    if (!control.value) {
      return {required: true}
    } else if (!PHONE.test(control.value)) {
      return {phone: true, error: true}
    }
  };

}
