import {Component, OnInit} from '@angular/core';
import {Page} from "../../../public/util/page";
import {GoodsService} from "../goods.service";
import {ActivatedRoute, Router} from "@angular/router";
declare var $: any;
@Component({
  selector: 'app-evaluate',
  templateUrl: './evaluate.component.html',
  styleUrls: ['./evaluate.component.css']
})
export class EvaluateComponent implements OnInit {
  public detail = [];
  evalPage: Page = new Page();          //提现信息
  _loading = false;             //查询时锁屏
  public goodsName: string;     //评价的商品名称
  constructor(public router: Router, public routeInfo: ActivatedRoute) {
  }

  ngOnInit() {
    let _this = this;
    _this.goodsName = _this.routeInfo.snapshot.queryParams['goodsName'];//评价的商品名称
    _this.qeuryEvalData();//查询评价信息
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
    $.when(GoodsService.settleList(me.evalPage.params)).done(data => {
      me._loading = false //解除锁屏
      if (data) me.evalPage = data; //赋值
      console.log("█ me.evalPage ►►►", me.evalPage);
    })
  };

  /**
   * 返回上一级页面
   */
  back() {
    this.router.navigate(['/store/goods/manage'])
  }

  /**
   * 点击鼠标出现大图
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

}
