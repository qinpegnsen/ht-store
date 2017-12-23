import {Component, OnInit} from "@angular/core";
import {Page} from "../../../public/util/page";
import {GoodsService} from "../goods.service";
import {MainService} from "../../../public/service/main.service";
import {NzModalService, NzNotificationService} from "ng-zorro-antd";
import {Setting} from "../../../public/setting/setting";
import {SkuGoodsComponent} from "../sku-goods/sku-goods.component";
import {SettingUrl} from "../../../public/setting/setting_url";
import {isNullOrUndefined} from "util";

declare var $: any;

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
  public goodsList: Page = new Page();
  public _loading: boolean = false;             //查询时锁屏
  public showList: boolean = true;             //是否显示列表页
  public enumState: any = Setting.ENUMSTATE;     //枚举状态
  public enums: any = Setting.ENUM;               //枚举编码

  public kindList: any;      // 分类列表
  public goodsAudits: any;  // 商品审核状态列表
  public goodsState: any;  // 商品状态列表
  public query: any = {};    // 查询条件
  public pageMsg = Setting.PAGEMSG;                      //页面提示信息
  public curKinds;

  //路由
  public goodsManagePublish: string = SettingUrl.ROUTERLINK.store.goodsManagePublish;    //商品发布（此处如此写，用于路由相对进入模式）
  public goodsManageUpdate: string = SettingUrl.ROUTERLINK.store.goodsManageUpdate;           //商品修改/编辑（此处如此写，用于路由相对进入模式）
  public goodsManageEval: string = SettingUrl.ROUTERLINK.store.goodsManageEval;           //查看商品评价（此处如此写，用于路由相对进入模式）

  constructor(public goodsService: GoodsService,
              public modalService: NzModalService,
              public _notification: NzNotificationService) {
    this.goodsList.pageSize = 10
  }

  ngOnInit() {
    let me = this;
    me.queryGoodsList(); //查询商品列表
    me.kindList = me.goodsService.getKindList(); //获取分类列表
    me.goodsAudits = MainService.getEnumDataList(Setting.ENUM.goodsAudits);  // 商品审核状态列表
    me.goodsState = MainService.getEnumDataList(Setting.ENUM.goodsState);  // 商品状态列表
  }

  /**
   * 显示窗口组件，加载sku列表
   */
  showSkuList(baseCode, name) {
    this.modalService.open({
      title: `“${name}”的所有规格`,          //弹窗标题
      content: SkuGoodsComponent,                 //弹窗内容组件
      footer: false,                             //弹窗页脚，false表示不显示
      width: 600,                                //弹窗宽度
      componentParams: {                                  //传参数
        baseCode: baseCode
      }
    });
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
    this.queryGoodsList();//如果子页面有修改则返回时刷新列表
  }

  /**
   * 重置搜索条件
   */
  resetQuery() {
    let me = this;
    me.query = {};
    me.goodsList = new Page();
    me.curKinds = null;
    me.queryGoodsList();
  }

  /**
   * 查询列表
   * @param event
   * @param curPage
   */
  public queryGoodsList(curPage?: number) {
    let me = this;
    me._loading = true; //锁屏
    if (!isNullOrUndefined(curPage)) me.goodsList.curPage = curPage;//当有页码时，查询该页数据
    me.goodsList.params = { //查询参数
      curPage: me.goodsList.curPage, //目标页码
      pageSize: me.goodsList.pageSize, //每页条数
      kindId: me.query.kindId, //商品分类
      goodsName: me.query.goodsName, //商品名称
      brandName: me.query.brandName, //品牌名称
      state: me.query.state, //商品状态
      isOwnPlat: me.query.isOwnPlat,//是否自营
      goodsAudit: me.query.goodsAudit//审核状态
    }
    $.when(GoodsService.queryGoodsList(me.goodsList.params)).done(res => {
      me._loading = false; //解除锁屏
      if (res.success) me.goodsList = res.data; //赋值
    })
  }

  /**
   * 选择分类
   * @param data  选择分类组件输出数据
   */
  getKind(data) {
    this.query.kindId = data[data.length - 1];
    this.queryGoodsList()
  }

  /**
   *更改商品是否可用重消币
   * @param type
   * @param baseCode
   * @param curPage
   */
  changeIsUseCoin(type, baseCode) {
    let me = this, isUseCoin, requestData;
    isUseCoin = type ? 'N' : 'Y';
    requestData = {
      goodsBaseCode: baseCode,
      isUseCoin: isUseCoin
    };
    $.when(me.goodsService.changeIsUseCoin(requestData)).done(data => {
      if (!data.success) {
        me.queryGoodsList();
        me._notification.error(data.info, data.info)
      }
    })
  }

  /**
   * 修改商品状态
   * @param type  状态类型
   * @param baseCode   商品基本编码
   */
  changeState(type: string, baseCode: string) {
    let me = this;
    $.when(me.goodsService.changeGoodsState(type, baseCode)).done(data => {
      if (data) me.queryGoodsList();
    })
  }

  /**
   * load商品分类数据
   */
  loadData(e: { option: any, index: number, resolve: Function, reject: Function }): void {
    if (e.index === -1) {
      e.resolve(this.goodsService.transKindsAsCascaderData());
      return;
    } else {
      e.resolve(this.goodsService.transKindsAsCascaderData(e.option.value));
    }
  }
}
