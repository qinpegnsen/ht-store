import {Component, OnInit} from '@angular/core';
import {GoodsService} from "../../goods.service";
import {PublishComponent} from "../publish.component";
declare var $: any;

@Component({
  selector: 'app-one',
  templateUrl: './one.component.html',
  styleUrls: ['./one.component.css']
})
export class OneComponent implements OnInit {
  public firstList;// 一级分类列表
  public secondList;// 二级分类列表
  public thirdList;// 三级分类列表
  public choosedKindId: string;// 选择的分类ID
  public choosedKindStr: string = '';// 已经选择的分类

  constructor(public goodsService: GoodsService,
              public publishComponent: PublishComponent) {
    this.publishComponent.step = 0;
  }

  ngOnInit() {
    const me = this;
    this.getKinds();
    setTimeout(_ => {
      $(document).on('click', '.step-one li', function () {
        $(this).addClass('current').siblings().removeClass('current');
        me.choosedKindStr = '';
        for (let i = 0; i < $('.step-one .current').length; i++) {
          me.choosedKindStr += $('.step-one .current')[i].innerText + ' > ';
        }
        me.choosedKindStr = me.choosedKindStr.substring(0, me.choosedKindStr.length - 3)
      })
    }, 0)
  }


  getKinds(id?, level?) {
    let me = this;
    switch (level) {
      case 1:
        me.secondList = me.goodsService.getKindList(id);
        me.thirdList = [];
        me.choosedKindId = null;
        break;
      case 2 :
        me.thirdList = me.goodsService.getKindList(id);
        me.choosedKindId = null;
        break;
      case 3:
        me.choosedKindId = id;
        break;
      default:
        me.firstList = me.goodsService.getKindList();
    }
  }

}
