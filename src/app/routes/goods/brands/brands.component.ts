import {Component, OnInit} from '@angular/core';
import {isNullOrUndefined} from "util";
import {Page} from "../../../public/util/page";
import {Setting} from "../../../public/setting/setting";
import {GoodsService} from "../goods.service";
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
  public enumState: any = Setting.ENUMSTATE;     //枚举状态
  public enums: any = Setting.ENUM;               //枚举编码
  public query: any = {};    //查询条件
  public kindList: any;      // 分类列表
  public pageMsg = Setting.PAGEMSG.goods.brands;                      //页面提示信息

  constructor(public goodsService: GoodsService) {
  }

  ngOnInit() {
    let me = this;
    me.queryBrandsList();   //查询品牌列表
    me.kindList = me.goodsService.getKindList(); //获取分类列表
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
  }
}
