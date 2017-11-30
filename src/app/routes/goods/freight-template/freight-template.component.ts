import { Component, OnInit } from '@angular/core';
import {Page} from "../../../public/util/page";
import {GoodsService} from "../goods.service";
import {MainService} from "../../../public/service/main.service";
import {Setting} from "../../../public/setting/setting";
declare var $: any;

@Component({
  selector: 'app-freight-template',
  templateUrl: './freight-template.component.html',
  styleUrls: ['./freight-template.component.css']
})
export class FreightTemplateComponent implements OnInit {
  _loading = false;             //查询时锁屏
  tplList: any = [];  //模板/模板值信息
  prompt: any = Setting.PAGEMSG.freightTemplate; //提示信息
  showFreightList: boolean = true;//判断子组件的显示/隐藏



  constructor() { }

  ngOnInit() {
    let me = this;
    me.queryTplList()              //查询模板/模板值列表

  }

  /**
   * 子组件加载时
   * @param event
   */
  isactivate(event) {
    this.showFreightList = false;
  }

  /**
   * 子组件注销时
   * @param event
   */
  isDeactivate(event) {
    this.showFreightList = true;
  }

  /**
   * 查询模板/模板值列表
   * @param event
   * @param curPage
   */
  public queryTplList() {
    let me = this;
    me._loading = true; //锁屏
    me.tplList.params = { //查询参数
      storeCode:'SZH_PLAT_SELF_STORE',//传参
    }
    $.when(GoodsService.freightList(me.tplList.params)).done(data => {
      me._loading = false //解除锁屏
      if(data) me.tplList = data; //赋值
    })
  }

}
