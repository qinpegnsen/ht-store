import {Component, OnInit} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {SimplesService} from "../simples.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  validateForm: FormGroup;

  constructor(public simplesService: SimplesService) {
    this.validateForm = this.simplesService.validateForm;
    this.simplesService.current = 0;
  }
  ngOnInit() {
    this.simplesService.routerSkip();
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

  getFormControl(name) {
    return this.validateForm.controls[ name ];
  }

  getCaptcha(event){
    console.log("█ $event ►►►",  event);
    alert('你点击了获取验证码')
  }


}
