import {Component, OnInit} from '@angular/core';
import {GoodsService} from "../../goods.service";
import {PublishComponent} from "../publish.component";
import {SettingUrl} from "../../../../public/setting/setting_url";
import {Setting} from "../../../../public/setting/setting";
declare var $: any;

@Component({
  selector: 'app-choose-kind',
  templateUrl: './choose-kind.component.html',
  styleUrls: ['./choose-kind.component.css']
})
export class ChooseKindComponent implements OnInit {
  public firstList: Array<any> = new Array();   // 一级分类列表
  public secondList: Array<any> = new Array();  // 二级分类列表
  public thirdList: Array<any> = new Array();   // 三级分类列表
  public choosedKindId: string;                 // 选择的分类ID
  public choosedKindStr: string = '';           // 已经选择的分类
  public pageMsg = Setting.PAGEMSG;                      //页面提示信息
  public goodsEdit: string = SettingUrl.ROUTERLINK.store.goodsEdit;           //商品修改/编辑（此处如此写，用于路由相对进入模式）

  constructor(public goodsService: GoodsService,
              public publishComponent: PublishComponent) {
    this.publishComponent.step = 0;
  }

  ngOnInit() {
    const me = this;
    this.getKinds();//获取分类数据
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


  getKinds(id?, level?: number) {
    let me = this;
    switch (level) {
      case 1:
        me.secondList = me.goodsService.getKindList(id);
        me.thirdList = new Array();
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
