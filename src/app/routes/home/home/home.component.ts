import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Setting} from "../../../public/setting/setting";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  defaultImg: string = Setting.APP.defaultImg; //默认显示的图片
  chartOption: any = {}; //订单流量图表配置项
  contactUs:Array<any> = new Array(); //联系我们的信息内容
  commonFunctions:Array<any> = new Array(); //常见功能的信息内容
  storeCount:Array<any> = new Array(); //统计信息内容

  constructor() {
    const _this = this;
    //设置联系我们的信息内容
    _this.contactUs = [
      {
        icon:"anticon anticon-phone color-pink",
        info:"电话：0371-XXXXXXXX"
      },
      {
        icon:"icon icon-weixin color-success",
        info:"微信：XXXXXXXXXX"
      },
      {
        icon:"icon icon-qq color-blue",
        info:"QQ：XXXXXXXXXX"
      },
      {
        icon:"icon icon-email color-blue",
        info:"Email：XXXXXXXXX@XX.XXX"
      }
    ];
  }

  ngOnInit() {
    let _this = this;
    //设置统计信息内容
    _this.storeCount = [
      {
        num:15,
        info:"商品数"
      },
      {
        num:99,
        info:"待发货订单"
      },
      {
        num:321,
        info:"已完成订单"
      },
      {
        num:3,
        info:"红包发放次数"
      },
      {
        num:21560,
        info:"红包推广量"
      },
      {
        num:6,
        info:"员工数"
      }
    ];
    //设置联系我们的信息内容
    _this.commonFunctions = [
      {
        icon:"anticon anticon-plus-square-o color-pink",
        info:"发布商品",
        url:"",
        isShow:true
      },
      {
        icon:"anticon anticon-appstore-o color-orange",
        info:"管理商品",
        url:"",
        isShow:true
      },
      {
        icon:"anticon anticon-tool color-blue",
        info:"运费模板",
        url:"",
        isShow:true
      },
      {
        icon:"anticon anticon-shopping-cart color-purple",
        info:"去发货",
        url:"",
        isShow:true
      },
      {
        icon:"anticon anticon-bank color-red",
        info:"收入/提现",
        url:"",
        isShow:true
      },
      {
        icon:"anticon anticon-edit color-blue",
        info:"处理退款",
        url:"",
        isShow:true
      },
      {
        icon:"anticon anticon-inbox color-blue",
        info:"处理退货",
        url:"",
        isShow:true
      },
      {
        icon:"anticon anticon-red-envelope color-pink",
        info:"红包统计",
        url:"",
        isShow:true
      },
      {
        icon:"anticon anticon-usergroup-add color-orange",
        info:"设置员工",
        url:"",
        isShow:true
      }
    ];
    //绘制订单浏览的图表
    setTimeout(() => {
      _this.chartOption = {
        backgroundColor: "#f8f8f8",
        grid:{
          left:"5%",
          right:"5%"
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        toolbox: {
          top: 10,
          right: 10,
          feature: {
            dataView: {show: true, readOnly: false},
            magicType: {show: true, type: ['line', 'bar']},
            restore: {show: true},
            saveAsImage: {show: true}
          }
        },
        legend: {
          top: 10,
          data: ['已完成', '退款', '退货']
        },
        xAxis: [
          {
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            axisPointer: {
              type: 'shadow'
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '单数',
            min: 0,
            axisLabel: {
              formatter: '{value} 单'
            }
          }
        ],
        series: [
          {
            name: '已完成',
            type: 'bar',
            itemStyle: {
              normal: {
                opacity: 0.8
              }
            },
            data: [32, 42, 45, 51, 39, 56, 39, 44, 55, 49, 38, 29]
          },
          {
            name: '退款',
            type: 'bar',
            itemStyle: {
              normal: {
                opacity: 0.8
              }
            },
            data: [5, 7, 3, 5, 2, 0, 8, 12, 5, 5, 0, 2]
          },
          {
            name: '退货',
            type: 'bar',
            itemStyle: {
              normal: {
                opacity: 0.8
              }
            },
            data: [2, 4, 3, 2, 0, 0, 3, 7, 2, 0, 1, 4]
          }
        ]
      };
    });
  }

}
