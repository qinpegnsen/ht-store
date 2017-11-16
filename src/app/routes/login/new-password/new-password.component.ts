import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css']
})
export class NewPasswordComponent implements OnInit {

  validateForm: FormGroup;//新密码的表单

  constructor(public fb: FormBuilder) {
    this.validateForm = this.fb.group({
      password: ['', [Validators.required]],//密码的校验
      passwordConfirmation: ['', [this.passwordConfirmationValidator]],//再次输入密码的校验
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

  validateConfirmPassword() {
    setTimeout(_ => {
      this.validateForm.controls['passwordConfirmation'].updateValueAndValidity();
    })
  }

  getFormControl(name) {
    return this.validateForm.controls[name];
  }

  passwordConfirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return {required: true};
    } else if (control.value !== this.validateForm.controls['password'].value) {
      return {confirm: true, error: true};
    }
  };

}
