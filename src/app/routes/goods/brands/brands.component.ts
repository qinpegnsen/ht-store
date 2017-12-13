import {Component, OnInit} from '@angular/core';
import {isNullOrUndefined} from "util";
import {Page} from "../../../public/util/page";
import {Setting} from "../../../public/setting/setting";
import {GoodsService} from "../goods.service";
import {SettingUrl} from "../../../public/setting/setting_url";
import {MainService} from "../../../public/service/main.service";
declare var $: any;

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {
  public brandsList: Page = new Page();
  public _loading: boolean = false;             //查询时锁屏
  public showList: boolean = true;             //是否显示列表页
  public pageTitle: string = '品牌管理';       //页面标题
  public enumState: any = Setting.ENUMSTATE;     //枚举状态
  public enums: any = Setting.ENUM;               //枚举编码
  public query: any = {};    //查询条件
  public kindList: any;      // 分类列表
  public showTypes: any;     // 品牌展示类型
  public applyStates: any;     // 品牌申请审核状态
  public brandRecommends: any;     // 品牌申请审核状态
  public pageMsg: any = Setting.PAGEMSG.goods.brands;           //页面提示信息
  public enumStates: any = Setting.ENUMSTATE;                     //枚举状态
  //路由
  public addBrand: string = SettingUrl.ROUTERLINK.store.addBrand;    //商品发布（此处如此写，用于路由相对进入模式）
  public editBrand: string = SettingUrl.ROUTERLINK.store.editBrand;    //商品发布（此处如此写，用于路由相对进入模式）
  public brandDetail: string = SettingUrl.ROUTERLINK.store.brandDetail;    //商品发布（此处如此写，用于路由相对进入模式）

  constructor(public goodsService: GoodsService) {
  }

  ngOnInit() {
    let me = this;
    me.queryBrandsList();   //查询品牌列表
    me.kindList = me.goodsService.getKindList(); //获取分类列表
    me.showTypes = MainService.getEnumDataList(Setting.ENUM.showType);  // 品牌展示类型
    me.applyStates = MainService.getEnumDataList(Setting.ENUM.brandsApplyState);  // 品牌审核状态
    me.brandRecommends = MainService.getEnumDataList(Setting.ENUM.yesOrNo);  // 是否推荐
  }

  /**
   * 选择分类
   * @param data  选择分类组件输出数据
   */
  getKind(data) {
    this.query.kindId = data[data.length - 1];
    this.queryBrandsList()
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
  public queryBrandsList(curPage?) {
    let me = this;
    me._loading = true; //锁屏
    if (!isNullOrUndefined(curPage)) me.brandsList.curPage = curPage;//当有页码时，查询该页数据
    me.brandsList.params = { //查询参数
      curPage: me.brandsList.curPage, //目标页码
      pageSize: me.brandsList.pageSize, //每页条数
      kindId: me.query.kindId, //商品分类
      brandInitial: me.query.brandInitial, //商品名称
      brandName: me.query.brandName, //品牌名称
      brandRecommend: me.query.brandRecommend,  //是否推荐
      applyState: me.query.applyState,    //申请状态
      showType: me.query.showType       //展示类型
    }
    $.when(GoodsService.queryBrandsList(me.brandsList.params)).done(data => {
      me._loading = false; //解除锁屏
      if (data) me.brandsList = data; //赋值
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
}
