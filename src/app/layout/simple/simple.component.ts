import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {Setting} from "../../public/setting/setting";

@Component({
  selector: 'app-simple',
  templateUrl: './simple.component.html',
  styleUrls: ['./simple.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SimpleComponent implements OnInit {
  public copyright = Setting.APP.copyright; //平台copyright

  constructor() { }

  ngOnInit() {
  }

}
