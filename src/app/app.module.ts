import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {SharedModule} from "./shared/shared.module";
import {PublicModule} from "./public/public.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MainComponent} from './layout/main/main.component';
import {RoutesModule} from "./routes/routes.module";
import {SimpleComponent} from './layout/simple/simple.component';
import {PageComponent} from './layout/page/page.component';
declare var $: any;

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    SimpleComponent,
    PageComponent
  ],
  imports: [
    BrowserAnimationsModule,//浏览器动画模块
    BrowserModule, //浏览器支持
    PublicModule, // 核心模块，该模块注入了项目必须的服务
    RoutesModule, // 路由模块
    SharedModule.forRoot() // 公用模块
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    //解决页面底部溢出15px问题
    setTimeout(() => {
      console.log($("#trans-tooltip").parent().css("margin-top", "-15px"));
    });
  }
}
