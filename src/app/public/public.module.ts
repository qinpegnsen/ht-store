import {NgModule, Optional, SkipSelf} from '@angular/core';
import {AjaxService} from "./service/ajax.service";
import {PatternService} from "./service/pattern.service";
import {throwIfAlreadyLoaded} from "./module-import-guard";
import {Setting} from "./setting/setting";
import {Page} from "./util/page";
import { StrJsonPipe } from './pipes/str-json.pipe';

@NgModule({
  //导入模块
  imports: [],
  //提供服务
  providers: [
    AjaxService,          //ajax服务
    PatternService,       //正则
    Page,                 //分页信息
    Setting               //基本�StrJsonPipe��性配置
  ],
  //声明
  declarations: []
})
export class PublicModule {
  constructor(@Optional() @SkipSelf() parentModule: PublicModule) {
    throwIfAlreadyLoaded(parentModule, 'PublicModule');
  }
}
