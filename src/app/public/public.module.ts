import {NgModule, Optional, SkipSelf} from '@angular/core';
import {AjaxService} from "./service/ajax.service";
import {MainService} from "./service/main.service";
import {PatternService} from "./service/pattern.service";
import {TableService} from "./service/table.service";
import {throwIfAlreadyLoaded} from "./module-import-guard";
import {Setting} from "./setting/setting";
import { StateNamePipe } from './pipes/state-name.pipe';

@NgModule({
  //导入模块
  imports: [],
  //提供服务
  providers: [
    AjaxService,          //ajax服务
    PatternService,       //正则
    TableService,         //表格
    Setting               //基本属�StateNamePipe�配置
  ],
  //声明
  declarations: []
})
export class PublicModule {
  constructor(@Optional() @SkipSelf() parentModule: PublicModule) {
    throwIfAlreadyLoaded(parentModule, 'PublicModule');
  }
}
