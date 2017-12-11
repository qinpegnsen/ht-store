import {Component, OnInit} from '@angular/core';
import {PublishComponent} from "../publish.component";
import {Router} from "@angular/router";
import {SettingUrl} from "../../../../public/setting/setting_url";

@Component({
  selector: 'app-published',
  templateUrl: './published.component.html',
  styleUrls: ['./published.component.css']
})
export class PublishedComponent implements OnInit {

  constructor(public publishComponent: PublishComponent, public router: Router) {
    this.publishComponent.step = 2;
  }

  ngOnInit() {
  }

  /*重新编辑商品*/
  public editGoods() {
    this.router.navigate([SettingUrl.ROUTERLINK.store.goodsUpdate], {preserveQueryParams: true})
  }

  /*发布新商品*/
  public publishNew() {
    this.router.navigate([SettingUrl.ROUTERLINK.store.goodsPublish])
  }

  /*商品列表*/
  public goodsList() {
    this.router.navigate([SettingUrl.ROUTERLINK.store.goodsManage])
  }

}
