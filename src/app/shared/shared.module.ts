import {ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgZorroAntdModule} from "ng-zorro-antd";
import {RouterModule} from "@angular/router";

@NgModule({
  imports: [
    CommonModule,                 //核心模块，必须
    NgZorroAntdModule.forRoot()   //zorroUI库
  ],
  declarations: [],
  providers: [],
  exports: [
    RouterModule,           //路由依赖模块
    NgZorroAntdModule       //zorroUI库
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule
    };
  }
}
