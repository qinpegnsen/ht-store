import {Component, OnInit} from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {
  ckeditorContent: any; //文本编辑器内容

  constructor() {
  }

  ngOnInit() {
  }

  ceshi() {
    console.log("ckeditorContent---", this.ckeditorContent);
  }
}
