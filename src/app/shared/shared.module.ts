import {ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgZorroAntdModule} from "ng-zorro-antd";
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AngularEchartsModule} from "ngx-echarts";
import {StateNamePipe} from "../public/pipes/state-name.pipe";
import {ImgPreviewPipe} from "../public/pipes/img-preview.pipe";
import {ImgSizePipe} from "../public/pipes/img-size.pipe";
import {Level2AreaNamePipe} from "../public/pipes/level-2-area-name.pipe";
import {GetWeekPipe} from "../public/pipes/get-week.pipe";
import {ImgErrPipe} from "../public/pipes/img-err.pipe";

@NgModule({
  imports: [
    CommonModule,                 //核心模块，必须
    FormsModule,                  //表单支持
    ReactiveFormsModule,          //表单支持
    AngularEchartsModule,         //百度echarts图表插件
    NgZorroAntdModule.forRoot()   //zorroUI库
  ],
  declarations: [
    StateNamePipe,          //将状态值转为对应状态名得管道
    ImgPreviewPipe,          //本地图片上传预览管道
    ImgSizePipe,             //设置图片大小
    Level2AreaNamePipe,       //12位地区编码转化地区名称管道
    GetWeekPipe,               //根据日期获取周几的管道
    ImgErrPipe               //图片加载失败时，加载默认图片
  ],
  providers: [],
  exports: [
    CommonModule,           //核心模块，必须
    RouterModule,           //路由依赖模块
    FormsModule,            //表单支持
    ReactiveFormsModule,    //表单支持
    AngularEchartsModule,   //百度echarts图表插件
    NgZorroAntdModule,      //zorroUI库
    StateNamePipe,          //将状态值转为对应状态名得管道
    ImgPreviewPipe,         //本地图片上传预览管道
    ImgSizePipe,            //设置图片大小
    Level2AreaNamePipe,      //12位地区编码转化地区名称管道
    GetWeekPipe,               //根据日期获取周几的管道
    ImgErrPipe               //图片加载失败时，加载默认图片
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule
    };
  }
}
