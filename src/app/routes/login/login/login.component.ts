import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Setting} from "../../../public/setting/setting";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  array = [ '../../../assets/img/bak/1.jpg' ];//广告banner
  validateForm: FormGroup;//登录的表单
  app = Setting.APP; //平台基本信息

  //用于登录时的表单
  _submitForm() {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[ i ].markAsDirty();
    }
  }

  constructor(public fb: FormBuilder) { }

  ngOnInit() {
    let _this = this;
    /**
     *广告banner定时器
     */
    setTimeout(_ => {
      _this.array = [ '../../../assets/img/bak/1.jpg', '../../../assets/img/bak/2.png' ];
    }, 500);


    /**
     * 用于登录时的表单验证
     * @type {FormGroup}
     */
    _this.validateForm = this.fb.group({
      userName: [ null, [ Validators.required ] ],
      password: [ null, [ Validators.required ] ],
      remember: [ true ],
    });
  }

}
