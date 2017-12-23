import {Component, OnInit} from "@angular/core";
import {GoodsService} from "../goods.service";
import {Setting} from "../../../public/setting/setting";
import {SettingUrl} from "../../../public/setting/setting_url";
import {NzNotificationService} from "ng-zorro-antd";
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
  addTemplate: string = SettingUrl.ROUTERLINK.store.addTemplate; //添加运费模板路由
  public params: any;//删除传的参数

  constructor( public _notification: NzNotificationService) {
  }

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
   * 删除按钮的取消按钮
   */
  cancel = function () {
  };


  /**
   * 查询模板/模板值列表
   * @param event
   * @param curPage
   */
  public queryTplList() {
    let me = this;
    me._loading = true; //锁屏
    me.tplList.params = { }//查询参数
    $.when(GoodsService.freightList(me.tplList.params)).done(data => {
      me._loading = false //解除锁屏
      if (data) me.tplList = data; //赋值
    })
  }

  /**
   * 删除模板--确认删除
   * @param brandApplyCode
   */
  delete = (id) => {
    let me = this;
    me._loading = true; //锁屏
    me.params = { //查询参数
      id: id, //品牌编码
    }
    $.when(GoodsService.delFreight(me.params)).done(data => {
      me._loading = false //解除锁屏
      me._notification.success('删除成功', data.info);
      me.queryTplList();//刷新查询品牌列表
    })
  };

}
