import {Component, OnInit} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {SimplesService} from "../simples.service";

@Component({
  selector: 'app-dredge',
  templateUrl: './dredge.component.html',
  styleUrls: ['./dredge.component.css']
})
export class DredgeComponent implements OnInit {
  validateForm: FormGroup;
  _options: any;//三级联动区域数据
  constructor(public simplesService: SimplesService) {
    this.simplesService.current = 2;
    this.simplesService.routerSkip();
    this._options = this.simplesService.options;
    this.validateForm = this.simplesService.validateFormDredge;
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
  submitForm = ($event, value) => {
    $event.preventDefault();
    /*for (const key in this.validateForm.controls) {
     this.validateForm.controls[ key ].markAsDirty();
     }*/
    console.log(value);
    console.log(this.validateForm);
  };

  getFormControl(name) {
    return this.validateForm.controls[name];
  }
}
