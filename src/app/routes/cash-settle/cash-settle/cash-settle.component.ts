import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-cash-settle',
  templateUrl: './cash-settle.component.html',
  styleUrls: ['./cash-settle.component.css']
})
export class CashSettleComponent implements OnInit {
  _dataSet = [];   //表单数据
  isVisible = false;
  isConfirmLoading = false;

  //遮罩层显示
  showModal = () => {
    this.isVisible = true;
  }

  //确认关闭遮罩层
  handleOk = (e) => {
    this.isConfirmLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isConfirmLoading = false;
    }, 1000);
  }

  //取消关闭遮罩层
  handleCancel = (e) => {
    this.isVisible = false;
  }

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

}
