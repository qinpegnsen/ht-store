/*基本属性配置*/

export class Setting {
  public static STORE: any = {};                       //企业信息
  public static APP: any = {                           //平台信息
    name: '三楂红网络技术-企业管理系统',
    description: '企业管理系统',
    copyright: '© 2017 - 三楂红-企业管理系统',
    logo: '../../../assets/img/logo.png',
    logoDark: '../../../assets/img/logo-dark.png',
    defaultImg: '../../../assets/img/dummy.png',
    userDefaultImg: '../../../assets/img/user-default.png'
  };
  public static MENUS: Array<any> = new Array();      //平台菜单
  public static PAGEMSG: any = {                        //平台信息提示（公式、提示、引导等等...）
    tipTitle: "操作提示",
    settleFormula: {
      one: "入账 =（订单总额 - 订单退款）× 10%",
      two: "结算 =（订单总额 - 订单退款）×（1-10%）= 订单总额 - 订单退款 - 入账"
    },
    service: {
      refund: [
        '支付宝和微信支付的，原路返回。',
        '红包返回到红包账户。',
        '支付宝或微信+红包支付的，支付宝和微信部分原路返回，红包退还到红包账户。'
      ],
      returnGoods: [
        '买家提交退货申请，平台审核通过后买家可退货给配货方。',
        '买家将货物寄出后，平台将验收货物，验收通过则会退款给买家。',
        '支付宝和微信支付的，原路返回。',
        '红包返回到红包账户。',
        '支付宝或微信+红包支付的，支付宝和微信部分原路返回，红包退还到红包账户。'
      ],
    },
    freightTemplate: {
      one: "温馨提示",
      two: "如果商品选择使用了配送规则，则该商品只售卖配送规则中指定的地区，运费为指定地区的运费",
      three: "正在被商品使用的配送规则不允许删除"
    },
    goods: {
      chooseKind: "请慎重选择商品分类，商品发布后将不可修改。"
    },
    staff: {
      msgOne: "为了更好的让企业管理自己的员工，员工管理及其权限管理作为了一个单独的管理平台进行运营",
      msgTwo: "使用当前登录账号（密码默认为手机号码），登录权限管理系统，对员工及其权限进行管理",
      msgThree: "点击下方按钮，进入权限平台"
    }
  }
  //定义枚举
  public static ENUM: any = {
    yesOrNo: 1001,  // 是否
    goodsState: 1006,  //商品状态列表
    goodsAudits: 1014,  //商品审核状态列表
    enterpriseState: 2001, //企业入驻状态
    papersType: 2002, //证件类型
    stepsState: 2003, //企业入驻流程状态
    shopState: 2004,   //店铺状态
    staTimeType: 1401,   //统计时间类型
    saleAfterState: 1602,  //售后单状态
    saleAfterTyte: 1601,  //售后单类型
    saleAfterTrace: 1701,  //售后单跟踪类型
    cashState: 1802,  //提现详情状态
    orderState: 1019,  //订单状态类型
    orderPayState: 1017,  //订单付款类型
  }
  ;

//定义枚举状态名
  public static ENUMSTATE: any = {
    yes: 'Y',
    no: 'N',
    //商品状态
    goodsState: {
      normal: 'NORMAL', //已上架
      down: 'DOWN', //下架
      stop: 'STOP' //禁售
    },
    //商品审核状态
    auditState: {
      audit: 'AUDIT', //待审核
      pass: 'PASS',   //审核通过
      unPass: 'UNPASS',//审核未通过
      reject: 'REJECT',//彻底驳回
    },
    //营业执照类型
    papersType: {
      normal: 'NORMAL', //普通营业执照
      unity: 'UNITY'    //多证合一营业执照
    },
    //售后服务状态
    afterService: {
      wait: 'WAIT', //申请已受理
      agree: 'AGREE',   //申请通过
      reject: 'REJECT',//申请未通过
      delivery: 'DELIVERY',//用户已发出
      checkFails: 'CHECK_FAILS',//验货不通过
      done: 'DONE',//退款完成
    },
    //售后搜索方式
    afterSearchType: {
      ordno: 'order', //订单编号
      afterNo: 'afterNo',//退单单号
      phone: 'phone',//用户手机号
    },
    //售后服务类型
    afterType: {
      refund: 'REFUND',   //仅退款
      return: 'RETURN', //退货退款
    },
    //订单的状态
    ordState: {
      take: 'TAKE',   //可自提
      success: 'SUCCESS', //交易完成
      prepare: 'PREPARE', //待发货
      assigned: 'ASSIGNED', //已派单
      paid: 'PAID', //待配货
      close: 'CLOSE', //订单关闭
      cr: 'CR', //待付款
      delivery: 'DELIVERY', //待收货
    },
    //企业入驻状态
    enterState: {
      half: 'HALF',  //入驻待审核
      audit: 'AUDIT',   //入驻审核中
      reject: 'REJECT',//入驻驳回
      black: 'BLACK',//黑名单
      normal: 'NORMAL',//店铺已正常
    },
    //企业开通店铺流程状态
    shopState: {
      reject: 'REJECT',//驳回
      pending: 'PENDING',//店铺审核中
      close: 'CLOSE',//店铺关闭
      normal: 'NORMAL'//店铺正常
    },
    //运费类型
    freightType: {
      fixed: 'FIXED', //固定运费
      tpl: 'TPL'  //运费模板
    },
    //运费模板计费类型
    valuationType: {
      volume: "VOLUME",    //按体积
      weight: "WEIGHT",   //按重量
      num: "NUM"          //按件数
    }
  };

  /**
   * 表单校验的状态，配合Util.ngValidateErrorMsg方法使用，此状态一般用来判断显示表单提示信息
   * eg1:<div nz-form-explain *ngIf="ngValidateErrorMsg(ngPhone) == Setting.valitateState.empty">请输入手机号！</div>
   * eg2:<div nz-form-explain *ngIf="ngValidateErrorMsg(ngPhone) == Setting.valitateState.error">请输入正确的手机号！</div>
   */
  public static valitateState: any = {
    empty: "empty",
    error: "error"
  }

  //数据字典键名
  public static SETTINGINFO: any = {
    bankTypeCode: "common_use_bank_name"
  }

  //权限系统路径
  public static JURISDICTIONURL: string = "http://192.168.10.221"; //TODO上线时，修改为正确路径

  constructor() {
    const _this = this;
  }

}
