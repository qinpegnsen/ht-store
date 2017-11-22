import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup} from "@angular/forms";
import {SimplesService} from "../simples.service";
import {StepsComponent} from "../steps/steps.component";

@Component({
  selector: 'app-dredge',
  templateUrl: './dredge.component.html',
  styleUrls: ['./dredge.component.css']
})
export class DredgeComponent implements OnInit {
  validateForm: FormGroup;
  _options: any;//三级联动区域数据
  constructor(public simplesService: SimplesService,
              public steps: StepsComponent,
              public fb: FormBuilder) {
    this.steps.current = 2;
    this.simplesService.routerSkip(this.steps.current);
    this._options = this.simplesService.options;
    this.validateForm = this.fb.group({
      storeName            : [ '', [ this.simplesService.stringValidator ] ],//店铺名称
      areaName             : [ '', [ this.simplesService.addressValidator ] ],//店铺所在地区
      areaCode             : [ '', [ this.simplesService.stringValidator ] ],//店铺所在区域编码
      areaFullName         : [ '', [ this.simplesService.stringValidator ] ],//店铺所在区域全称
      address              : [ '', [ this.simplesService.stringValidator ] ],//详细地址
      storeZip             : [ '', [ this.simplesService.stringValidator ] ],//邮政编码
      storeLabel           : [ '', [ this.simplesService.stringValidator ] ],//店铺logo
      storeAvatar          : [ '', [ this.simplesService.stringValidator ] ],//店铺头像
      storeQQ              : [ '', [ this.simplesService.stringValidator ] ],//QQ
      storeWW              : [ '', [ this.simplesService.stringValidator ] ],//阿里旺旺
      storePhone           : [ '', [ this.simplesService.stringValidator ] ]//商家电话
    });
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


  /**
   * 表单提交成功之后执行的方法
   */
  afterSubmit(){
    this.steps.current += 1;
    this.simplesService.routerSkip(this.steps.current);
  }

  /**
   * 回到前一步
   */
  pre() {
    this.steps.current -= 1;
    this.simplesService.routerSkip(this.steps.current);
  }

  getFormControl(name) {
    return this.validateForm.controls[name];
  }
}
