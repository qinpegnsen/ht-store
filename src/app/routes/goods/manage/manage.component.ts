import {Component, OnInit} from "@angular/core";
import {Page} from "../../../public/util/page";
import {isUndefined} from "util";
import {GoodsService} from "../goods.service";
import {MainService} from "../../../public/service/main.service";
import {SettingUrl} from "../../../public/setting/setting_url";
import {AjaxService} from "../../../public/service/ajax.service";
import {NzMessageService, NzNotificationService} from "ng-zorro-antd";
import {Setting} from "../../../public/setting/setting";

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
  public curBaseCode: string;  // 当前商品基本编号
  public curName: string;    // 当前商品名称
  public query = {
    kindId: '',
    goodsName: '',
    brandName: '',
    state: '',
    isOwnPlat: '',
    goodsAudit: '',
  }; // 查询条件
  constructor(public _message: NzMessageService,
              public goodsService: GoodsService,
              public _notification: NzNotificationService) {
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
    this.curBaseCode = baseCode;
    this.curName = name;
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
  changeIsUseCoin(type, baseCode, curPage) {
    let me = this, isUseCoin, requestData;
    isUseCoin = type ? 'N' : 'Y';
    requestData = {
      goodsBaseCode: baseCode,
      isUseCoin: isUseCoin
    };
    AjaxService.get({
      url: SettingUrl.URL.goods.updateIsUseCoin,
      data: requestData,
      async: false,
      success: (res) => {
        if (res.success) {
          me._message.success(res.info)
        } else {
          me._notification.error(res.info, res.info)
        }
      },
      error: (res) => {
        me._notification.error(res.status, res.statusText)
      }
    })
    this.queryGoodsList();
  }

  /**
   * 修改商品状态
   * @param type  状态类型
   * @param baseCode   商品基本编码
   * @param pPage  当前页码
   */
  changeState(type: string, baseCode: string, pPage: number) {
    let me = this;
    if (isUndefined(pPage)) pPage = 1;
    let res = me.goodsService.changeGoodsState(type, baseCode);
    if (res) me.queryGoodsList();// 刷新当前页数据
  }

  /**
   * 确认窗口确认事件
   */
  confirm = (type: string, baseCode: string, pPage: number) => {
    this.changeState(type, baseCode, pPage);
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
