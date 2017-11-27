import {Component, Input, OnInit} from "@angular/core";
import {GoodsService} from "../goods.service";
declare var $: any;

@Component({
  selector: 'app-sku-goods',
  templateUrl: './sku-goods.component.html',
  styleUrls: ['./sku-goods.component.css']
})
export class SkuGoodsComponent implements OnInit {
  currentData = []; //当前商品sku数据
  _baseCode;

  set baseCode(value: string) {
    this._baseCode = value;
    let me = this;
    $.when(this.goodsService.loadSkuGoods(this._baseCode)).done(data => {
      if (data) me.currentData = data; //赋值
    })
  }

  constructor(public goodsService: GoodsService) {
  }

  ngOnInit() {

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

}
