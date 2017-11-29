import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup} from "@angular/forms";
import {SimplesService} from "../simples.service";
import {DreageStepsComponent} from "../dreage-steps/dreage-steps.component";
import {Util} from "../../../public/util/util";
import {AREA_LEVEL_3_JSON} from "../../../public/util/area_level_3";
import {FileUploader} from "ng2-file-upload";
import {SettingUrl} from "../../../public/setting/setting_url";

@Component({
  selector: 'app-dredge',
  templateUrl: './dredge.component.html',
  styleUrls: ['./dredge.component.css']
})
export class DredgeComponent implements OnInit {
  validateForm: FormGroup;
  _options: any;//三级联动区域数据

  public storeLabelUploader: FileUploader = new FileUploader({
    url: SettingUrl.URL.base.upload,
    itemAlias: "limitFile",
    allowedFileType: ["image"]
  }); //店铺Logo电子版,初始化上传方法

  public storeAvatarUploader: FileUploader = new FileUploader({
    url: SettingUrl.URL.base.upload,
    itemAlias: "limitFile",
    allowedFileType: ["image"]
  }); //纳税登记证电子版,初始化上传方法

  constructor(public simplesService: SimplesService,
              public steps: DreageStepsComponent,
              public fb: FormBuilder) {
    this.steps.step = 0;
    this.simplesService.routerSkip(4);
    Util.transAreas(AREA_LEVEL_3_JSON);
    this._options = AREA_LEVEL_3_JSON;

    this.validateForm = this.fb.group({
      storeName            : [ '', [ this.simplesService.validateRequired ] ],//店铺名称
      areaName             : [ '', [ this.simplesService.addressValidator ] ],//店铺所在地区
      areaCode             : [ '', [ this.simplesService.validateRequired ] ],//店铺所在区域编码
      areaFullName         : [ '', [ this.simplesService.validateRequired ] ],//店铺所在区域全称
      address              : [ '', [ this.simplesService.validateRequired ] ],//详细地址
      storeZip             : [ '', [ this.simplesService.validateRequired ] ],//邮政编码
      storeLabel           : [ '', [ this.simplesService.validateRequired ] ],//店铺logo
      storeAvatar          : [ '', [ this.simplesService.validateRequired ] ],//店铺头像
      storeQQ              : [ '', [ this.simplesService.validateRequired ] ],//QQ
      storeWW              : [ '', [ this.simplesService.validateRequired ] ],//阿里旺旺
      storePhone           : [ '', [ this.simplesService.validateRequired ] ]//商家电话
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
    for (const key in this.validateForm.controls) {
     this.validateForm.controls[ key ].markAsDirty();
     }
    console.log(value);
    console.log(this.validateForm);
  };

  /**
   * 监听图片选择
   * @param $event
   */
  storeAvatarFileChangeListener() {
    // 当选择了新的图片的时候，把老图片从待上传列表中移除
    if (this.storeAvatarUploader.queue.length > 1) this.storeAvatarUploader.queue[0].remove();
  }

  storeLabelFileChangeListener() {
    // 当选择了新的图片的时候，把老图片从待上传列表中移除
    if (this.storeLabelUploader.queue.length > 1) this.storeLabelUploader.queue[0].remove();
  }

  /**
   * 鼠标放在图片上时大图随之移动
   */
  showImg(event) {
    let target = event.target.nextElementSibling;
    target.style.display = 'block';
    target.style.top = (event.clientY + 20) + 'px';
    target.style.left = (event.clientX + 30) + 'px';
  }

  /**
   * 隐藏大图
   * @param event
   */
  hideImg(event) {
    let target = event.target.nextElementSibling;
    target.style.display = 'none';
  }

  /**
   * 回到前一步
   */
  skipTo(stepNum) {
    this.simplesService.routerSkip(stepNum);
  }

  getFormControl(name) {
    return this.validateForm.controls[name];
  }
}
