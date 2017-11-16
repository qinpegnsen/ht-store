import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {Setting} from "../../public/setting/setting";

@Component({
  selector: 'app-simple',
  templateUrl: './simple.component.html',
  styleUrls: ['./simple.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SimpleComponent implements OnInit {
  public app = Setting.APP; //平台信息

  constructor() { }

  ngOnInit() {
  }

}
