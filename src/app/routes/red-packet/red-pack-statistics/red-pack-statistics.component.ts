import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {RedPacketService} from "../red-packet.service";
import {MainService} from "../../../public/service/main.service";
import {Util} from "../../../public/util/util";
import {Setting} from "../../../public/setting/setting";
import {isNullOrUndefined} from "util";
declare var $: any;

@Component({
  selector: 'app-red-pack-statistics',
  templateUrl: './red-pack-statistics.component.html',
  styleUrls: ['./red-pack-statistics.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RedPackStatisticsComponent implements OnInit {

  public redPackStatic: any;                        //红包统计数据
  public staType: String = "DAY";                   //统计时间的类型，默认是按天统计
  public queryTime: any = new Date();               //查询的时间
  public staTypes: any;                              //枚举所有统计时间的类型
  public showType: any = {DAY: true, WEEK: false, MONTH: false}; //展示不同的统计条件的组合
  public yearInfo: any = Util.tenYear();            //获取最近十年年份信息
  public month: any = Util.getMonth();              //获取月份信息
  public nowDate: Date = new Date();                //当前的日期
  public weekForMonth: Array<string> = new Array(); //指定年月下的日期; //当前的日期
  public setOption: any;                            //统计图的配置
  public select: any = {
    'year': '',
    'month': '',
    'week': '',
  }; //选择的年份、月份、周信息

  constructor(public redPacketService:RedPacketService) {
  }

  /**
   * 1.获取统计时间的类型
   * 2.格式化默认的日期
   * 3.根据搜索条件进行查询
   */
  ngOnInit() {
    this.staTypes = MainService.getEnumDataList(Setting.ENUM.staTimeType);//枚举所有统计时间的类型
    this.queryTime=Util.dataFormat(this.queryTime,'yyyy-MM-dd');//获取格式化话默认的日期
    this.getStaByQueryTime();
  }

  /**
   * 根据指定年月获取周列表
   */
  getWeekListByMonth() {
    let _this = this, time = _this.select.year + "-" + _this.select.month;
    let queryData = {
      queryYear: time.split("-")[0],
      queryMonth: time.split("-")[1]
    };
    $.when(MainService.getWeekListByMonth(queryData)).done(data => {
      if (data) _this.weekForMonth = data; //赋值获取周列表
      _this.weekForMonth.forEach(ele => {//为了默认显示当前日期所在的周
        let start = new Date(ele.split('~')[0]).getDate();
        let end = new Date(ele.split('~')[1]).getDate();
        let now = new Date().getDate();
        if (now > start && now < end) {
          _this.select.week = ele;//获取默认周
        } else if (now == start || now == end) {
          _this.select.week = ele;//获取默认周
        } else if ((start<now&&now>end)&&(Math.abs(start-end)!=6)) {//两个月的交界处 28  29  3
          _this.select.week = ele;//获取默认周
        }else if(start>now&&now<end&&(Math.abs(start-end)!=6)){//两个月的交界处 28 3 2
          _this.select.week = ele;//获取默认周
        }
      });
    });
  }

  /**
   * 根据查询条件查询出统计图
   */
  getStaByQueryTime() {
    let me = this;
    let queryparams = { //查询参数
      queryType: this.staType, //查询的类型
      queryTime: this.queryTime //查询的时间
    };
    $.when(this.redPacketService.rpStatistics(queryparams)).always(data => {
      if (data) {
        this.redPackStatic = data;
      } else{
        if(isNullOrUndefined(data)){
          me.redPackStatic=null;
        }
      }//赋值
      me.optionPrevInfo();
    })
  }

  /**
   * 改变统计类型的状态
   */
  changeStaType() {
    this.select.year = new Date().getFullYear().toString();//获取默认年
    this.select.month = '0'+(new Date().getMonth() + 1);//获取默认月
    this.getWeekListByMonth();
    if (this.staType == "MONTH") this.showType = {DAY: false, WEEK: false, MONTH: true};
    else if (this.staType == "WEEK") this.showType = {DAY: false, WEEK: true, MONTH: false};
    else if (this.staType == "DAY") this.showType = {DAY: true, WEEK: false, MONTH: false};
  }

  /**
   * 根据搜索条件搜索相应的统计图
   */
  goSearch() {
    let type = this.staType;
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
    }
    ;
    this.getStaByQueryTime()
  }

  /**
   * 绘制图表（私有）
   */
  private optionPrevInfo() {
    let _this = this;
    _this.setOption = {
      backgroundColor: "#f8f8f8",
      title: {
        text: '红包击数统计',
        left: "center",
        top:'1%'
      },
      legend: {
        data: ['点击数'],
        align: 'left',
        left: "center",
        top: "8%",
      },
      color: ['#C23531'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'cross',
          crossStyle: {
            color: '#999'
          }
        }
      },
      toolbox: {
        show: true,
        right: "3%",
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
          data: _this.redPackStatic?_this.redPackStatic[_this.queryTime].keys:[''],
          axisTick: {
            alignWithLabel: true
          },
          axisPointer: {
            type: 'shadow'
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
          name: '点击数',
          type: 'bar',
          barWidth: '30%',
          data: _this.redPackStatic?_this.redPackStatic[_this.queryTime].yaxis:[0]
        }
      ]
    };
  }
}
