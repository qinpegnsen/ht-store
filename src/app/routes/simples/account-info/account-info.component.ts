import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SimplesService} from "../simples.service";
import {StepsComponent} from "../settle-steps/steps.component";
import {FileUploader} from "ng2-file-upload";
import {SettingUrl} from "../../../public/setting/setting_url";
import {MainService} from "../../../public/service/main.service";
import {NzNotificationService} from "ng-zorro-antd";
import {Util} from "../../../public/util/util";
import {AREA_LEVEL_3_JSON} from "../../../public/util/area_level_3";

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.css']
})
export class AccountInfoComponent implements OnInit {
  validateForm: FormGroup;
  _options: any;//三级联动区域数据
  public bankLicenceUploader: FileUploader = new FileUploader({
    url: SettingUrl.URL.base.upload,
    itemAlias: "limitFile",
    allowedFileType: ["image"]
  }); //银行开户许可证电子版,初始化上传方法

  constructor(public simplesService: SimplesService,
              public steps: StepsComponent,
              public _notification: NzNotificationService,
              public fb: FormBuilder) {
    this.steps.current = 2;
    this.simplesService.routerSkip(this.steps.current);
    Util.transAreas(AREA_LEVEL_3_JSON);
    this._options = AREA_LEVEL_3_JSON;
    this.validateForm = this.fb.group({
      bankAccountName                     : ['', [this.simplesService.validateRequired]],//银行开户名
      bankAccountNumber                   : ['', [this.simplesService.validateRequired]],//公司银行账号
      bankName                            : ['', [this.simplesService.validateRequired]],//开户行支行名称
      bankCode                            : ['', [this.simplesService.validateRequired]],//开户支行联行号
      bankAddress                         : [null, [this.simplesService.addressValidator]],//开户银行地址
      isSettlementAccount                 : [true, [this.simplesService.validateRequired]],//是否为结算账户
      settlementBankAccountName           : ['', [this.simplesService.validateRequired]],//结算银行开户名
      settlementBankAccountNumber         : ['', [this.simplesService.validateRequired]],//结算银行账号
      settlementBankName                  : ['', [this.simplesService.validateRequired]],//结算账户开户行支行名称
      settlementBankCode                  : ['', [this.simplesService.validateRequired]],//结算账户开户行支行联行号
      settlementBankAddress               : [null, [this.simplesService.addressValidator]],//结算账户开户行所在地
      bankLicenceElectronic               : [null, [this.simplesService.validateRequired]],//开户银行许可证电子版
    });
  }

  ngOnInit() {


  }

  /**
   * 监听图片选择
   * @param $event
   */
  bankLicenceFileChangeListener() {
    // 当选择了新的图片的时候，把老图片从待上传列表中移除
    if (this.bankLicenceUploader.queue.length > 1) this.bankLicenceUploader.queue[0].remove();
  }

  /**
   * 点击下一步按钮时会提交表单，成功后跳转下一步
   * 1.先上传图片，获得图片暗码
   * 2.将图片暗码付给表单值对象
   * 3.提交表单数据
   * @param $event
   * @param value
   */
  public submitCompleteForm($event) {
    $event.preventDefault();
    let me = this, uploadedNum = 0, allUploaders = [
      this.bankLicenceUploader
    ];
    allUploaders.forEach((uploader, i) => {
      let uuid = '';//置空暗码

      //如果该组不需要上传图片则uploadedNum+1
      //需要上传图片的则在图片上传完成后uploadedNum+1
      if(uploader.getNotUploadedItems().length == 0) uploadedNum += 1;
      //上传之前，获取暗码
      uploader.onBuildItemForm = function (fileItem, form) {
        uuid = MainService.uploadUid();
        form.append('uuid', uuid);
      };
      uploader.uploadAll();//执行上传
      // 上传成功
      uploader.onSuccessItem = function (item, response, status, headers) {
        let res = JSON.parse(response);
        if (res.success) {
          if (uuid) me.patchValues(i, uuid);
        } else {
          me._notification.error(`上传失败`, '图片' + item._file.name + res.info)
        }
      }
      // 上传失败
      uploader.onErrorItem = function (item, response, status, headers) {
        let res = JSON.parse(response);
        me._notification.error(`上传失败`, '图片' + uploader.queue[0]._file.name + res.info)
      };
      // 完成上传
      uploader.onCompleteAll = function () {
        uploadedNum += 1;     // 该组上传完之后uploadedNum+1；
        if (uploadedNum == allUploaders.length) {  // 当有图片上传，并且是图片组的最后一个时
          me.submitFormData()     //整理数据并且发布商品
        }
      }
      // 每张图片上传结束后，判断如果是最后一组图片则发布商品，不是最后一组会进入下一个循环
      if (uploadedNum == allUploaders.length) {  // 当有图片上传，并且是图片组的最后一个时
        me.submitFormData()     //整理数据并且发布商品
      }
    })
  }

  /**
   * 提交上传图片之后的表单数据
   * @param $event
   * @param value
   */
  submitFormData = () => {
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
    }
    console.log("█ this.validateForm ►►►",  this.validateForm);
    let formValue = this.validateForm.value;
    //转换地址格式
   /* formValue.businessLicenceAddress = formValue.businessLicenceAddress[2];
    formValue.bankAddress = formValue.bankAddress[2];
    formValue.settlementBankAddress = formValue.settlementBankAddress[2];*/
    console.log(formValue);
    // this.simplesService.enterpris(formValue);
  };


  /**
   * 上传图片之后给表单元素赋值
   */
  patchValues(i, uuid) {
    switch (i) {
      case 0:
        this.validateForm.patchValue({bankLicenceElectronic: uuid});
        break;
    }
  }
  _console(value) {
    // console.log(value);
  }

  /**
   * 跳转页面
   */
  skipTo(stepNum) {
    this.simplesService.routerSkip(stepNum);
  }

  getFormControl(name) {
    return this.validateForm.controls[name];
  }

}
