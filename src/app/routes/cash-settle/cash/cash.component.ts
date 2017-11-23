import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-cash',
  templateUrl: './cash.component.html',
  styleUrls: ['./cash.component.css']
})
export class CashComponent implements OnInit {
  _dataSet = [];   //表单数据
  constructor() {
  }

  ngOnInit() {
    //表单数据
    for (let i = 0; i < 46; i++) {
      this._dataSet.push({
        key: i,
        name: `Edward King ${i}`,
        age: 32,
        address: `London, Park Lane no. ${i}`,
      });
    }
  }

  back() {

  }

}
