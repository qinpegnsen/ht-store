import {Component, OnInit} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {SimplesService} from "../simples.service";

@Component({
  selector: 'app-complete',
  templateUrl: './complete.component.html',
  styleUrls: ['./complete.component.css']
})
export class CompleteComponent implements OnInit {
  validateForm: FormGroup;
  _options: any;//三级联动区域数据

  constructor(public simplesService: SimplesService) {
    this.simplesService.current = 1;
    this.simplesService.routerSkip();
    this._options = this.simplesService.options;
    this.validateForm = this.simplesService.validateFormComplete;
  }

  ngOnInit() {
  }

  _console(value) {
    // console.log(value);
  }

  /**
   * 点击下一步按钮时会提交表单，成功后跳转下一步
   * @param $event
   * @param value
   */
  submitCompleteForm = ($event, value) => {
    $event.preventDefault();
    /*for (const key in this.validateForm.controls) {
     this.validateForm.controls[ key ].markAsDirty();
     }*/
    console.log(value);
    let formValue = value;
    this.simplesService.addSeller(formValue);
  };

  getFormControl(name) {
    return this.validateForm.controls[name];
  }
}
