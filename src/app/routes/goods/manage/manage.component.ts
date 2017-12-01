import {Component, OnInit} from "@angular/core";
import {Page} from "../../../public/util/page";
import {GoodsService} from "../goods.service";
import {MainService} from "../../../public/service/main.service";
import {NzMessageService, NzModalService, NzNotificationService} from "ng-zorro-antd";
import {Setting} from "../../../public/setting/setting";
import {SkuGoodsComponent} from "../sku-goods/sku-goods.component";
import {SettingUrl} from "../../../public/setting/setting_url";

declare var $: any;

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
  public goodsList: Page = new Page();
  public _loading = false;             //查询时锁屏
  public enumState = Setting.ENUMSTATE;

  public kindList;// 分类列表
  public goodsAudits: any;  // 商品审核状态列表
  public goodsState: any;  // 商品状态列表
  public isOwnPlats: any;  //是否自营列表
  public query = {
    kindId: '',
    goodsName: '',
    brandName: '',
    state: '',
    isOwnPlat: '',
    goodsAudit: '',
  }; // 查询条件

  //路由
  goodsManageAudit:string = SettingUrl.ROUTERLINK.store.goodsManageAudit;           //商品审核（此处如此写，用于路由相对进入模式）
  goodsManageEdit:string = SettingUrl.ROUTERLINK.store.goodsManageEdit;           //商品修改/编辑（此处如此写，用于路由相对进入模式）
  goodsManageEval:string = SettingUrl.ROUTERLINK.store.goodsManageEval;           //查看商品评价（此处如此写，用于路由相对进入模式）
  goodsManageDetail:string = SettingUrl.ROUTERLINK.store.goodsManageDetail;          //查看商品详情（此处如此写，用于路由相对进入模式）



  constructor(public _message: NzMessageService,
              public goodsService: GoodsService,
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
    me.isOwnPlats = MainService.getEnumDataList(Setting.ENUM.yesOrNo);  // 店铺是否自营
  }

  /**
   * 显示窗口组件，加载sku列表
   */
  showSkuList(baseCode, name) {
    this.modalService.open({
      title          : `"${name}"的所有规格`,
      content        : SkuGoodsComponent,
      footer         : false,
      componentParams: {
        baseCode: baseCode
      }
    });
  }

  /**
   * 查询列表
   * @param event
   * @param curPage
   */
  public queryGoodsList() {
    let me = this;
    me._loading = true; //锁屏
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
    $.when(GoodsService.queryGoodsList(me.goodsList.params)).done(data => {
      me._loading = false; //解除锁屏
      if (data) me.goodsList = data; //赋值
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
    let me = this, isUseCoin;
    isUseCoin = type ? 'N' : 'Y';
    $.when(me.goodsService.changeIsUseCoin(isUseCoin,baseCode)).done(data => {
      if (data.success) {
        me.queryGoodsList();
      } else {
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
    $.when(me.goodsService.changeGoodsState(type,baseCode)).done(data => {
      if (data) me.queryGoodsList();
    })
  }

  /**
   * 鼠标放在图片上时大图随之移动
   */
  showImg(event) {
    let target = event.target.nextElementSibling;
    target.style.display = 'block';
    target.style.top = (event.clientY + 20) + 'px';
    target.style.left = (event.clientX + 30) + 'px';
  }

  /**
   * 隐藏大图
   * @param event
   */
  hideImg(event) {
    let target = event.target.nextElementSibling;
    target.style.display = 'none';
  }

  _value: any[] = null;

  loadData(e: { option: any, index: number, resolve: Function, reject: Function }): void {
    if (e.index === -1) {
      e.resolve(this.goodsService.transKindsAsCascaderData());
      return;
    } else {
      e.resolve(this.goodsService.transKindsAsCascaderData(e.option.value));
    }
  }
}
