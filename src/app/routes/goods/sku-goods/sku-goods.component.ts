import {Component, OnInit} from "@angular/core";
import {GoodsService} from "../goods.service";
declare var $: any;

@Component({
  selector: 'app-sku-goods',
  templateUrl: './sku-goods.component.html',
  styleUrls: ['./sku-goods.component.css']
})
export class SkuGoodsComponent implements OnInit {
  currentData: Array<any> = new Array(); //当前商品sku数据
  _baseCode: string;  //基本编码

  set baseCode(value: string) {
    let me = this;
    me._baseCode = value;
    $.when(this.goodsService.loadSkuGoods(this._baseCode)).done(data => {
      if (data) me.currentData = data; //赋值
    })
  }

  constructor(public goodsService: GoodsService) {
  }

  ngOnInit() {

  }

}
