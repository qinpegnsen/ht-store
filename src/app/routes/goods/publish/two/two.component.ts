import { Component, OnInit } from '@angular/core';
import {PublishComponent} from "../publish.component";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {FormBuilder, FormGroup} from "@angular/forms";
import {GoodsService} from "../../goods.service";

@Component({
  selector: 'app-two',
  templateUrl: './two.component.html',
  styleUrls: ['./two.component.css']
})
export class TwoComponent implements OnInit {
  public validateForm: FormGroup;
  public path: string;           // 当前路径
  public kindId: string;         //商品分类id
  public unitList: any;           // 计量单位列表
  public baseAttrList: any;      // 商品基本属性列表
  public goodsBaseCode: string;  //商品基本编码
  public publishData: any = {};  //商品发布的数据

  constructor(public publishComponent: PublishComponent,
              public location: Location,
              public goodsService: GoodsService,
              public route: ActivatedRoute,
              public router: Router,
              public fb: FormBuilder) {
    this.publishComponent.step = 1;
    this.validateForm = this.fb.group({
      goodsName:[''],
      goodsJingle: [''],
      brandCode: ['']
    })
  }

  ngOnInit() {
    const me = this;
    me.route.url.subscribe(paths => {
      me.path = paths[0].path;
    })
    me.kindId = me.route.snapshot.queryParams['kindId'];
    if(me.kindId) me.getPageData();
    else me.location.back();
  }

  getFormControl(name) {
    return this.validateForm.controls[name];
  }


  /**
   * 获取发布页面所需数据
   */
  public getPageData() {
    let me = this, pageData;
    if(me.path == 'two'){
      let pageData = me.goodsService.getPageDataAdd(me.kindId);
      if(pageData) me.publishData = pageData;
      me.validateForm.patchValue(me.publishData);
    }else if(me.path == 'edit'){
      me.goodsService.getPageDataEdit('');
    }
  }

}
