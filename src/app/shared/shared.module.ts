import {ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgZorroAntdModule} from "ng-zorro-antd";
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AngularEchartsModule} from "ngx-echarts";

@NgModule({
  imports: [
    CommonModule,                 //核心模块，必须
    FormsModule,                  //表单支持
    ReactiveFormsModule,          //表单支持
    AngularEchartsModule,         //百度echarts图表插件
    NgZorroAntdModule.forRoot()   //zorroUI库
  ],
  declarations: [],
  providers: [],
  exports: [
    CommonModule,           //核心模块，必须
    RouterModule,           //路由依赖模块
    FormsModule,            //表单支持
    ReactiveFormsModule,    //表单支持
    AngularEchartsModule,   //百度echarts图表插件
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
