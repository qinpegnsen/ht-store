import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup} from "@angular/forms";
import {SimplesService} from "../simples.service";
import {StepsComponent} from "../steps/steps.component";

@Component({
  selector: 'app-complete',
  templateUrl: './complete.component.html',
  styleUrls: ['./complete.component.css']
})
export class CompleteComponent implements OnInit {
  validateForm: FormGroup;
  _options:any;//三级联动区域数据

  constructor(public simplesService: SimplesService,
              public steps: StepsComponent,
              public fb: FormBuilder) {
    this.steps.current = 1;
    this._options = this.simplesService.options;
    this.validateForm = this.simplesService.validateFormComplete;
  }
  ngOnInit() {
  }

  _value: any[] = null;

  _console(value) {
    console.log(value);
  }

  /**
   * 回到前一步
   */
  pre() {
    this.steps.current -= 1;
    this.simplesService.routerSkip(this.steps.current);
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
    // console.log(this.validateForm);
    this.steps.current += 1;
    this.simplesService.routerSkip(this.steps.current);
  };

  getFormControl(name) {
    return this.validateForm.controls[ name ];
  }
}
