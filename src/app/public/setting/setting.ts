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
    },
    service:{
      refund:[
        '买家提交退款申请，选择预存款方式支付的,卖家同意并经过平台确认后会将金额以预存款的形式返还给买家。买家选择在线支付方式的，会把在线支付金额原路返回到账号上。 如果订单同时使用了在线支付方式和预存款支付方式，则会优先使用在线支付方式退款，当在线退款可退款金额为0后才会使用预存款方式退款。',
        '平台也可以不经过商家处理，直接处理退款申请，退款给买家。'
      ],
      returnGoods:[
        '买家提交退货申请，平台审核通过后买家可退货给配货方。',
        '买家将货物寄出后，平台将验收货物，验收通过则会退款给买家。',
        '选择预存款方式支付的,卖家同意并经过平台确认后会将金额以预存款的形式返还给买家。买家选择在线支付方式的，会把在线支付金额原路返回到账号上。 如果订单同时使用了在线支付方式和预存款支付方式，则会优先使用在线支付方式退款，当在线退款可退款金额为0后才会使用预存款方式退款。'
      ],
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
    shopState: 2004,   //店铺状态
    staTimeType: 1401,   //统计时间类型
    saleAfterState: 1602,  //售后单类型
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
    },
    afterService: {
      wait: 'WAIT', //申请已受理
      agree: 'AGREE',   //申请通过
      reject: 'REJECT',//申请未通过
      delivery: 'DELIVERY',//用户已发出
      checkFails: 'CHECK_FAILS',//验货不通过
      done: 'DONE',//退款完成
    },//售后服务状态
  };

  //數據字典健名
  public static SETTINGINFO:any = {
    bankTypeCode:"common_use_bank_name"
  }

  constructor() {
    const _this = this;
  }

}
