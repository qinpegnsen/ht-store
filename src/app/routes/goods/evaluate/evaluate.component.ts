import {Component, OnInit} from "@angular/core";
import {Page} from "../../../public/util/page";
import {GoodsService} from "../goods.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SettingUrl} from "../../../public/setting/setting_url";
import {Setting} from "../../../public/setting/setting";
declare var $: any;
@Component({
  selector: 'app-evaluate',
  templateUrl: './evaluate.component.html',
  styleUrls: ['./evaluate.component.css']
})
export class EvaluateComponent implements OnInit {
  public evalPage: Page = new Page();   //提现信息
  public _loading: boolean = false;    //查询时锁屏
  public goodsName: string;     //评价的商品名称
  public enumState = Setting.ENUMSTATE;//获取枚举状态名 如（是否是追加评论的图片:Y，N）
  constructor(public router: Router, public routeInfo: ActivatedRoute) {
  }

  ngOnInit() {
    let me = this;
    me.goodsName = me.routeInfo.snapshot.queryParams['goodsName'];//评价的商品名称
    me.qeuryEvalData();//查询评价信息
  }

  /**
   * 查询评价信息
   */
  qeuryEvalData() {
    let me = this;
    me._loading = true; //锁屏
    me.evalPage.params = { //查询参数
      curPage: me.evalPage.curPage, //目标页码
      pageSize: me.evalPage.pageSize, //每页条数
    }
    $.when(GoodsService.commnetGoodsList(me.evalPage.params)).done(data => {
      me._loading = false //解除锁屏
      if (data) me.evalPage = data; //赋值
    })
  };

  /**
   * 返回上一级页面
   */
  back() {
    let me = this;
    me.router.navigate([SettingUrl.ROUTERLINK.store.goodsManage])
  }


}
