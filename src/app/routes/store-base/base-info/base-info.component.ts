import {Component, OnInit} from "@angular/core";
import {StoreBaseService} from "../store-base.service";
import {SettleStepsComponent} from "../settle-steps/settle-steps.component";
import {NzNotificationService} from "ng-zorro-antd";
import {FileUploader} from "ng2-file-upload";
import {SettingUrl} from "../../../public/setting/setting_url";
import {MainService} from "../../../public/service/main.service";
import {Setting} from "../../../public/setting/setting";
import {Util} from "../../../public/util/util";
import {AREA_LEVEL_3_JSON} from "../../../public/util/area_level_3";
import {PatternService} from "../../../public/service/pattern.service";
import {isNullOrUndefined} from "util";
declare var $: any;

@Component({
  selector: 'app-base-info',
  templateUrl: './base-info.component.html',
  styleUrls: ['./base-info.component.css']
})
export class BaseInfoComponent implements OnInit {
  _options: any;//三级联动区域数据
  validateForm: any = {};//表单
  papersTypes: any;     //证件类型
  enumStates: any = Setting.ENUMSTATE; //枚举值
  ngValidateStatus = Util.ngValidateStatus;//表单项状态
  ngValidateErrorMsg = Util.ngValidateErrorMsg;//表单项提示状态
  valitateState: any = Setting.valitateState;//表单验证状态
  localDataSave: any = {};//本地预览图片路径保存

  public organizationCodeUploader: FileUploader = new FileUploader({
    url: SettingUrl.URL.enterprise.upload,
    itemAlias: "limitFile",
    allowedFileType: ["image"]
  }); //组织机构代码电子版,初始化上传方法
  public businessLicenceUploader: FileUploader = new FileUploader({
    url: SettingUrl.URL.enterprise.upload,
    itemAlias: "limitFile",
    allowedFileType: ["image"]
  }); //电子版营业执照,初始化上传方法
  public taxRegistrationUploader: FileUploader = new FileUploader({
    url: SettingUrl.URL.enterprise.upload,
    itemAlias: "limitFile",
    allowedFileType: ["image"]
  }); //纳税登记证电子版,初始化上传方法

  constructor(public storeBaseService: StoreBaseService,
              public steps: SettleStepsComponent,
              public patternService: PatternService,
              public _notification: NzNotificationService) {
    Util.transAreas(AREA_LEVEL_3_JSON);//将地区数据转成联级组件需要的格式
    this._options = AREA_LEVEL_3_JSON;//地区数据
    this.steps.current = 1;

    /*将时间选择器值置为空*/
    this.validateForm.idcardStartTime = null;
    this.validateForm.idcardEndTime = null;
    this.validateForm.businessLicenceStart = null;
    this.validateForm.businessLicenceEnd = null;
  }

  ngOnInit() {
    const me = this;
    me.papersTypes = MainService.getEnumDataList(Setting.ENUM.papersType);       // 证件类型
    me.loadStoreData();//查询企业信息
  }

  /**
   * 查询企业信息
   * @param data
   */
  loadStoreData() {
    let me = this;
    $.when(StoreBaseService.loadStoreInfo()).done(data => {
      if (data) {
        me.validateForm = data;
        me.transInfo(); //转换信息
      } else {
        let epBaseInfo = localStorage.getItem('epBaseInfo');
        if (!isNullOrUndefined(epBaseInfo)) me.validateForm = JSON.parse(epBaseInfo), me.transInfo(); //转换信息;
      }//企业信息
    })
  }

  /**
   * 修改时转换数据
   */
  transInfo() {
    let me = this;
    if (isNullOrUndefined(me.validateForm)) return;
    if (me.validateForm.isForever == Setting.ENUMSTATE.yes) me.validateForm.isForever = true;
    else if (me.validateForm.isForever == Setting.ENUMSTATE.no) me.validateForm.isForever = false;
    if (me.validateForm.businessLicenceEnd) me.validateForm.businessLicenceIsForever = false;
    else me.validateForm.businessLicenceIsForever = true;
    if (!isNullOrUndefined(me.validateForm.idcardStartTime)) me.validateForm.idcardStartTime = new Date(me.validateForm.idcardStartTime);
    if (!isNullOrUndefined(me.validateForm.idcardEndTime)) me.validateForm.idcardEndTime = new Date(me.validateForm.idcardEndTime);
    if (!isNullOrUndefined(me.validateForm.businessLicenceStart)) me.validateForm.businessLicenceStart = new Date(me.validateForm.businessLicenceStart);
    if (!isNullOrUndefined(me.validateForm.businessLicenceEnd)) me.validateForm.businessLicenceEnd = new Date(me.validateForm.businessLicenceEnd);
    if (!isNullOrUndefined(me.validateForm.businessLicenceAreaCode)) me.validateForm.businessLicenceAreaCode = MainService.getAreaArrayByCode(me.validateForm.businessLicenceAreaCode)
  }

  /**
   * 点击下一步按钮时会提交表单，成功后跳转下一步
   * 1.先上传图片，获得图片暗码
   * 2.将图片暗码付给表单值对象
   * 3.提交表单数据
   * @param $event
   * @param value
   */
  public uploadImg() {
    let me = this, uploadedNum = 0, allUploaders = [
      this.organizationCodeUploader,
      this.businessLicenceUploader,
      this.taxRegistrationUploader
    ];
    allUploaders.forEach((uploader, i) => {
      let uuid = '';//置空暗码

      //如果该组不需要上传图片则uploadedNum+1
      //需要上传图片的则在图片上传完成后uploadedNum+1
      if (uploader.getNotUploadedItems().length == 0) uploadedNum += 1;
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
          if (uuid) me.patchValues(i, uuid,res.data);
        } else {
          me._notification.error(`上传失败`, '图片' + uploader.queue[0]._file.name + '上传失败，请重新选择图片并上传')
        }
      }
      // 上传失败
      uploader.onErrorItem = function (item, response, status, headers) {
        let res = JSON.parse(response);
        me._notification.error(`上传失败`, '图片' + uploader.queue[0]._file.name + '上传失败，请重新选择图片并上传')
      };
      // 完成上传
      uploader.onCompleteAll = function () {
        uploadedNum += 1;     // 该组上传完之后uploadedNum+1；
        if (uploadedNum == allUploaders.length) {  // 当有图片上传，并且是图片组的最后一个时
          me.submitFormData()     //整理数据并且提交
        }
      }
      // 每张图片上传结束后，判断如果是最后一组图片则发布商品，不是最后一组会进入下一个循环
      if (uploadedNum == allUploaders.length) {  // 当有图片上传，并且是图片组的最后一个时
        me.submitFormData()     //整理数据并且提交
      }
    })
  }

  /**
   * 提交表单
   */
  submitCompleteForm($event) {
    $event.preventDefault();
    let me = this, hasNewImg: boolean = false, allUploaders = [
      this.organizationCodeUploader,
      this.businessLicenceUploader,
      this.taxRegistrationUploader
    ];
    allUploaders.forEach((item) => {
      if (item.queue[0]) hasNewImg = true;
    })
    if (hasNewImg) me.uploadImg();
    else me.submitFormData();
  }

  /**
   * 提交上传图片之后的表单数据
   * @param $event
   * @param value
   */
  submitFormData = () => {
    let formValue = Object.assign({}, this.validateForm);
    //转换身份证有效期是否长期
    if (formValue.isForever) formValue.isForever = Setting.ENUMSTATE.yes, formValue.idcardEndTime = null;
    else formValue.isForever = Setting.ENUMSTATE.no;
    //转换身份证有效期是否长期
    if (formValue.businessLicenceIsForever) formValue.businessLicenceIsForever = Setting.ENUMSTATE.yes, formValue.businessLicenceEnd = null;
    else formValue.businessLicenceIsForever = Setting.ENUMSTATE.no;
    if (typeof formValue.businessLicenceAreaCode == 'object') { //如果是数组形式则取数组的第三个
      formValue.businessLicenceAreaCode = formValue.businessLicenceAreaCode[2];//取第三级编码
      //如果是修改信息，则区域信息可能是级联选择器赋值的对象数组
      if (formValue.businessLicenceAreaCode.value) formValue.businessLicenceAreaCode = formValue.businessLicenceAreaCode.value;
    }
    this.storeBaseService.enterpriseBase(formValue);
    let localData = Object.assign({},formValue, this.localDataSave);
    localStorage.setItem('epBaseInfo', JSON.stringify(localData));//每次点击提交时在本地保存表单数据，如果用户刷新页面可保证数据不丢失
  };

  /**
   * 上传图片之后给表单元素赋值
   */
  patchValues(i, uuid, src) {
    switch (i) {
      case 0:
        this.validateForm.organizationCodeElectronic = uuid;
        this.localDataSave.organizationCodeElectronicPreview = src;//将此图片全路径存到本地
        break;
      case 1:
        this.validateForm.businessLicenceNumberElectronic = uuid;
        this.localDataSave.businessLicenceNumberElectronicPreview = src;//将此图片全路径存到本地
        break;
      case 2:
        this.validateForm.taxRegistrationCertificateElectronic = uuid;
        this.localDataSave.taxRegistrationCertificateElectronicPreview = src;//将此图片全路径存到本地
        break;
    }
  }

  /**
   * 监听图片选择
   * @param $event
   */
  organizationCodeFileChangeListener() {
    // 当选择了新的图片的时候，把老图片从待上传列表中移除
    if (this.organizationCodeUploader.queue.length > 1) this.organizationCodeUploader.queue[0].remove();
  }

  businessLicenceFileChangeListener() {
    // 当选择了新的图片的时候，把老图片从待上传列表中移除
    if (this.businessLicenceUploader.queue.length > 1) this.businessLicenceUploader.queue[0].remove();
  }

  taxRegistrationFileChangeListener() {
    // 当选择了新的图片的时候，把老图片从待上传列表中移除
    if (this.taxRegistrationUploader.queue.length > 1) this.taxRegistrationUploader.queue[0].remove();
  }

  /**
   * 排除不可选的身份证有效开始日期
   * @param startValue
   * @returns {boolean}
   * @private
   */
  _disabledIdCardStartDate = (startValue) => {
    if (!startValue || !this.validateForm.idcardEndTime) return false;
    return startValue.getTime() >= this.validateForm.idcardEndTime.getTime();
  };

  /**
   * 排除不可选的身份证有效结束日期
   * @param endValue
   * @returns {boolean}
   * @private
   */
  _disabledIdCardEndDate = (endValue) => {
    if (!endValue || !this.validateForm.idcardStartTime) return false;
    return endValue.getTime() <= this.validateForm.idcardStartTime.getTime();
  };

  /**
   * 排除不可选的营业执照有效开始日期
   * @param startValue
   * @returns {boolean}
   * @private
   */
  _disabledBusinessLicenceStartDate = (startValue) => {
    if (!startValue || !this.validateForm.businessLicenceEnd) return false;
    return startValue.getTime() >= this.validateForm.businessLicenceEnd.getTime();
  };

  /**
   * 排除不可选的营业执照有效结束日期
   * @param endValue
   * @returns {boolean}
   * @private
   */
  _disabledBusinessLicenceEndDate = (endValue) => {
    if (!endValue || !this.validateForm.businessLicenceStart) return false;
    return endValue.getTime() <= this.validateForm.businessLicenceStart.getTime();
  };

}
