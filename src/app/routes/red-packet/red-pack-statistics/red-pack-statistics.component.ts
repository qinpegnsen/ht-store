import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {SettingUrl} from "../../../public/setting/setting_url";
import {RedPacketService} from "../red-packet.service";
import {MainService} from "../../../public/service/main.service";
import {Util} from "../../../public/util/util";
import {isNullOrUndefined} from "util";

@Component({
  selector: 'app-red-pack-statistics',
  templateUrl: './red-pack-statistics.component.html',
  styleUrls: ['./red-pack-statistics.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RedPackStatisticsComponent implements OnInit {

  public redPackStatic: any;                    //红包统计
  public staType: any = 'DAY';                  //统计时间的类型，默认是按天统计
  public queryTime: string;//查询的时间
  public staTypes=MainService.getEnumDataList('1401'); //枚举所有统计时间的类型
  public showType: any = {DAY: true, WEEK: false, MONTH: false}; //展示不同的统计条件的组合
  public nowDate :Date = new Date();      //当前的日期
  public select: any = {
    'year':'',
    'month':'',
    'week':'',
  }; //选择的年份、月份、周信息

  public now: any;
  public prev: any;
  public optionPrev:any;                        //统计图的配置
  constructor() { }

  ngOnInit() {
    this.getStaByQueryTime()
  }

  /**
   * 根据查询条件查询出统计图
   */
  getStaByQueryTime() {
    // let me = this;
    // let url = SettingUrl.URL.rpAccountRec.querySta;
    // let data = {
    // }
    // // let result = RedPacketService.getNoTip(url,data).voList;
    // if(result){
    //   me.redPackStatic = result;
    //   me.now = me.redPackStatic.agentAllOrdList;
    //   me.prev = me.redPackStatic.agentDealOrdList;
    //   me.optionPrevInfo();
    // }
  }

  /**
   * 改变统计类型的状态
   */
  changeStaType(){
    if (this.staType == "MONTH") this.showType = {DAY: false, WEEK: false, MONTH: true};
    else if (this.staType == "WEEK") this.showType = {DAY: false, WEEK: true, MONTH: false};
    else if (this.staType == "DAY") this.showType = {DAY: true, WEEK: false, MONTH: false};
  }

  /**
   * 根据搜索条件搜索相应的统计图
   */
  goSearch(){
    let  type = this.staType;
    switch (type) {
      case 'DAY':
        this.queryTime = Util.dataFormat(new Date(this.nowDate), "yyyy-MM-dd");
        break;
      case 'MONTH':
        this.queryTime = this.select.year + "-" + this.select.month;
        break;
      case 'WEEK':
        this.queryTime = this.select.week;
        break;
    };
    this.getStaByQueryTime()
  }

  /**
   * 绘制图表（私有）
   */
  private optionPrevInfo() {
    let _this = this;
    _this.optionPrev = {
      title: {
        text: '一月点击数统计',
        left:"46%"
      },
      legend: {
        data: ['派单', '接单'],
        align: 'left',
        left:"46%",
        top:"10%",
        bottom:"10%"
      },
      color: ['#3398DB', '#42DBB1'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      toolbox: {
        show: true,
        right:"3%",
        feature: {
          magicType: {show: true, type: ['line', 'bar']},
          restore: {show: true},
          saveAsImage: {show: true}
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: _this.now.keys,
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '派单',
          type: 'bar',
          barWidth: '30%',
          data: _this.now.yaxis
        },
        {
          name:'接单' ,
          type: 'bar',
          barWidth: '30%',
          data: _this.prev.yaxis
        }
      ]
    };
  }

}
