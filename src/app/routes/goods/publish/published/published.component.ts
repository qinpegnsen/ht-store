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

  public editGoods() {
    this.router.navigate([SettingUrl.ROUTERLINK.store.goodsManageEdit], {preserveQueryParams: true})
  }

  public publishNew() {
    this.router.navigate([SettingUrl.ROUTERLINK.store.goodsPublish])
  }

  public goodsList() {
    this.router.navigate([SettingUrl.ROUTERLINK.store.goodsManage])
  }

}
