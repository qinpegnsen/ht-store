/*基本属性配置*/

export class Setting {
  public static STORE: any = {};                       //企业信息
  public static APP: any = {                           //平台信息
    name: '三楂红网络技术-企业管理系统',
    description: '企业管理系统',
    copyright: '© 2017 - 三楂红-企业管理系统',
    logo: '../../../assets/img/logo.png',
    logoDark: '../../../assets/img/logo-dark.png',
    defaultImg: '../../../assets/img/dummy.png'
  };
  public static MENUS: Array<any> = new Array();      //平台菜单
  public static PAGEMSG: any = {                        //平台信息提示（公式、提示、引导等等...）
    settleFormula: {
      one: "入账 =（订单总额 - 订单退款）× 10%",
      two: "结算 =（订单总额 - 订单退款）×（1-10%）= 订单总额 - 订单退款 - 入账"
    }
  }
  //定义枚举
  public static ENUM: any = {
    yesOrNo: 1001,  // 是否
    goodsState: 1006,  //商品状态列表
    goodsAudits: 1006,  //商品审核状态列表
    enterpriseState: 2001, //企业入驻状态
    papersType: 2002, //证件类型
    stepsState: 2003, //企业入驻流程状态
    shopState: 2004   //店铺状态
  }
  ;

//定义枚举状态名
  public static ENUMSTATE: any = {
    yes: 'Y',
    no: 'N',
    goodsState: {
      normal: 'NORMAL', //已上架
      down: 'DOWN', //下架
      stop: 'STOP' //禁售
    },
    auditState: {
      audit: 'AUDIT', //待审核
      pass: 'PASS',   //审核通过
      unPass: 'UNPASS',//审核未通过
      reject: 'REJECT',//彻底驳回
    },
    papersType: {
      normal: 'NORMAL', //普通营业执照
      unity: 'UNITY'    //多证合一营业执照
    }
  };

  //數據字典健名
  public static SETTINGINFO:any = {
    bankTypeCode:"common_use_bank_name"
  }

  constructor() {
    const _this = this;
  }

}
