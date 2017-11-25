/*基本属性配置*/

export class Setting {
  public static STORE: any = {};                       //企业信息
  public static APP: any = {                           //平台信息
    name: '三楂红网络技术-企业管理系统',
    description: '企业管理系统',
    copyright: '© 2017 - 三楂红-企业管理系统',
    logo: '../../../assets/img/logo.png',
    logoDark: '../../../assets/img/logo-dark.png'
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
    articleState: 1005,  //eg文章状态枚举
  };

  //定义枚举状态名
  public static ENUMSTATE: any = {
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
