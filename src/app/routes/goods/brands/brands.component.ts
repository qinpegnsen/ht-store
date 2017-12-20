import {Component, OnInit} from "@angular/core";
import {isNullOrUndefined} from "util";
import {Page} from "../../../public/util/page";
import {Setting} from "../../../public/setting/setting";
import {GoodsService} from "../goods.service";
import {SettingUrl} from "../../../public/setting/setting_url";
import {MainService} from "../../../public/service/main.service";
import {NzNotificationService} from "ng-zorro-antd";
declare var $: any;

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {
  public brandsList: Page = new Page();           //查询品牌列表
  public _loading: boolean = false;             //查询时锁屏
  public showList: boolean = true;             //是否显示列表页
  public pageTitle: string = '品牌管理';       //页面标题
  public enumState: any = Setting.ENUMSTATE;     //枚举状态
  public enums: any = Setting.ENUM;               //枚举编码
  public query: any = {};    //查询条件
  public pageMsg: any = Setting.PAGEMSG;           //页面提示信息
  public enumStates: any = Setting.ENUMSTATE;                     //枚举状态
  public params: any;//品牌删除传的参数

  //路由
  public addBrand: string = SettingUrl.ROUTERLINK.store.addBrand;    //商品发布（此处如此写，用于路由相对进入模式）
  public editBrand: string = SettingUrl.ROUTERLINK.store.editBrand;    //商品发布（此处如此写，用于路由相对进入模式）
  public brandDetail: string = SettingUrl.ROUTERLINK.store.brandDetail;    //商品发布（此处如此写，用于路由相对进入模式）

  constructor(public goodsService: GoodsService, public _notification: NzNotificationService) {
  }

  ngOnInit() {
    let me = this;
    me.queryBrandsList();   //查询品牌列表
  }


  /**
   * 重置搜索条件
   */
  resetQuery() {
    let me = this;
    me.query = {};
    me.brandsList = new Page();
    me.queryBrandsList();
  }

  /**
   * 查询列表
   * @param event
   * @param curPage
   */
  queryBrandsList(curPage?) {
    let me = this;
    me._loading = true; //锁屏
    if (!isNullOrUndefined(curPage)) me.brandsList.curPage = curPage;//当有页码时，查询该页数据
    me.brandsList.params = { //查询参数
      curPage: me.brandsList.curPage, //目标页码
      pageSize: me.brandsList.pageSize, //每页条数
      brandName: me.query.brandName, //品牌名称
    }
    $.when(GoodsService.queryBrandsList(me.brandsList.params)).done(res => {
      me._loading = false; //解除锁屏
      if (res.success) me.brandsList = res.data; //赋值
    })
  }

  /**
   * 子组件加载时
   * @param event
   */
  activate(event) {
    this.showList = false;
  }

  /**
   * 子组件注销时
   * @param event
   */
  onDeactivate(event) {
    this.showList = true;
    this.pageTitle = '品牌管理';
  }

  /**
   * 品牌删除--取消按钮
   */
  cancel = function () {
  };

  /**
   * 品牌删除--确认删除
   * @param brandApplyCode
   */
  confirm = (brandApplyCode) => {
    let me = this;
    me._loading = true; //锁屏
    me.params = { //查询参数
      applyCode: brandApplyCode, //品牌编码
    }
    $.when(GoodsService.delBrand(me.params)).done(data => {
      me._loading = false //解除锁屏
      me._notification.success('删除成功', data.info);
      me.queryBrandsList();//刷新查询品牌列表
    })
  };

}
