/*接口访问路径配置*/

export class SettingUrl {
  // 接口通讯url集合
  static URL: any = {
    /**
     * 首页统计
     */
    home: {
      storeOrdCustomerStatistics: '/statistical/storeOrdCustomerStatistics', //首页呼吸孔信息统计
      storeStatistics: '/statistical/storeStatistics', //首页总体信息统计
      storeTreeGraphStatistics: '/statistical/storeTreeGraphStatistics' //首页图表信息
    },
    /**
     * 基础路径配置
     */
    base: {
      enum: '/res/enum/',            //获取枚举接口
      upload: '/upload/basic/upload',  //上传图片
      uploadHttpURL: '/upload/basic/uploadHttpURL',  //上传图片 返回完整URL，带有HTTP
      uuid: '/upload/basic/uid',      //获取上传图片的编码
      getRegSms: '/sms/registerSms'   //企业注册获取短信验证码
    },
    /**
     * 登录接口
     */
    login: {
      storeLogin: ' /login/login',//登录接口
      logout: "/login/logout", //（get）退出登录登录
      getSms: ' /sms/forgetPasswordSMS',//（put）获取验证码
      resetPassword: ' /seller/resetPassword',//（post）忘记密码
      updateSellerPwd: ' /seller/updateSellerPwd',//（post）修改密码
    },
    /**
     * 企业入驻
     * 企业入驻及相关信息查询
     */
    enterprise: {
      query: '/enterprise/query',//企业查询
      save: '/enterprise/save',//保存或修改企业基本信息
      save2: '/enterprise/save2',//保存或修改企业银行账户信息
      load: '/enterprise/loadByEpCode', //(post)查询企业信息
      loadState: '/enterprise/loadState',//(get)查询企业状态
      upload: "/upload/basic/enterpriseUpload"    //上传图片,需要uuid，返回全路径
    },
    /**
     * 商家
     */
    seller: {
      add: '/seller/addSeller',//(post)注册商户
      load: '/seller/loadSellerById',//加载基本商户信息
      queryAccount: '/seller/querySellerBySellerAcc',//判断账户是否已存在
      queryAllSellers: '/seller/querySellersByShopCode',//根据店铺编码查询店铺下所有商家账户
      update: '/seller/updateSellerCommon',//修改商家账户基本信息
      updatePwd: '/seller/updateSellerPwd',//修改商家账户密码
    },
    /**
     * 企业红包账户投资记录的操作
     */
    rpAccountRec: {
      queryRec: '/rpAccountRec/queryRpAccountRecStore',//查询企业投资记录列表
      querySta: '/statistical/queryRpStatisticsStore',//查询企业红包统计
    },
    /**
     * 售后接口
     */
    after: {
      RefundOrd: '/after/queryAfterGoodsReqPages',//查询退款退货订单列表
      loadAfterTail: '/after/loadAfterTail',//根据售后编号查询物流信息
      loadReqByAfterNo: '/after/loadReqByAfterNo',//根据售后编码查询详情
      loadAfterTailList: '/after/loadAfterTailList',//根据售后编号查询物流信息
      agreeRefundMoney: '/after/agreeRefundMoney',//平台处理用户的退款申请(同意/驳回)
      dealReturnGoods: '/after/dealReturnGoods',//平台处理用户的退货申请(同意/驳回)
      checkRefundGoods: '/after/checkRefundGoods',//平台验收用户退货(通过/驳回)
    },
    /**
     * 统计接口
     */
    statistical: {
      getWeekList: '/statistical/getWeekList',//获取某年某月的“周起始日~周结束日”的列表
    },
    /**
     * 商品管理
     */
    goods: {
      goodsQuery: "/goodsQuery/query",//(get)商品管理列表
      loadSkuGoods: "/goodsQuery/load", //(get)查看所有商品规格
      pageDataAdd: "/goodsQuery/pageDataAdd", //(get)发布商品之前获取基础数据
      pageDataEdit: "/goodsQuery/pageDataEdit", //(get)修改商品之前获取基础数据
      geneSku: "/goodsEdit/genesku", //(post)根据所选商品规格获得规格组合
      getGoodsKinds: "/goodsKind/queryGoodsByParentId",//(get)商品分类
      putAwayGoods: "/goodsEdit/appleToNormal",//(put)商品上架
      downGoods: "/goodsEdit/updateStateToDown",//(put)商品下架
      stopGoods: "/goodsEdit/updateStateToStop",//(put)商品禁售
      relieveGoods: "/goodsEdit/updateStateToNomal",//(put)解除商品禁售
      updateIsUseCoin: "/goodsEdit/updateIsUseCoin",//(put)更改是否可用重消币
      commnetGoods: "/commentGoods/queryCommnetGoodsStore",//(get)查询商品评价
      expressTpl: " /expressTpl/queryByStoreCode",//(get)查询运费模板/模板值列表
      goodsSave: "/goodsEdit/save",      //(post)保存商品数据（发布/修改）
      brandsList: "/goodsBrand/queryMyBrandPage", //(get)查询店铺的品牌列表
      addBrand: "/goodsBrand/addBrand",     //(post)添加品牌
      upBrand: "/goodsBrand/updateBrand",     //(put)修改品牌
      loadBrand: "/goodsBrand/loadBrandById",     //(get)品牌详情
      goodsUpload: "upload/basic/goodsUpload",//商品，需要暗码 返回URL，带HTTP
      goodsUploadRetHttpURL: "upload/basic/goodsUploadRetHttpURL",//商品 返回URL，带HTTP
      goodsUploadRetUrl: "upload/basic/goodsUploadRetUrl" //商品 返回URL，不带HTTP
    }
    ,
    /**
     * 提现与账单明细
     */
    settle: {
      query: '/finaceDraw/query',//查询企业提现列表
      storeSettle: '/settle/queryStoreSettle',//查询企业结算列表
      agentBalance: '/finaceDraw/loadAgentBalance',//查询企业信息
      insert: '/finaceDraw/insert',//申请提现
      bankCode: '/datadict/queryAllByTypeCode',//查询银行
    }
    ,
    /**
     * 订单管理
     */
    order: {
      queryOrdAdmin: '/ord/queryStoreOrd',//(get)查询订单管理中的订单列表
      getKeywords: '/basicExpress/queryBasicExpressIsUseList',//(get)查询物流公司列表
      storeDelivery: '/ord/storeDelivery',//(put)设置发货
      loadStoreOrd: '/ord/loadStoreOrdByOrdno',//(get)查询订单的详细信息
    }
    ,
    /**
     *查询店铺信息
     */
    store: {
      saveStore: "/stores/saveStore",//(post)保存或修改企业店铺信息
      loadShop: "/stores/loadByStoreCode", //(get)查询店铺基本信息
      loadState: "/stores/loadState" //(get)查询店铺状态
    }

  }
  ;
// 路由链接信息
  static ROUTERLINK: any = {
      store: {
      home: "/store/home", //首页
      goodsManage: "/store/goods/manage", //管理商品
      goodsManageEdit: "edit",           //商品修改/编辑（此处如此写，用于路由相对进入模式）
      goodsManageUpdate: "update",           //商品修改/编辑（此处如此写，用于路由相对进入模式）
      goodsManagePublish: "../publish",       //商品发布（此处如此写，用于路由相对进入模式）
      goodsManageEval: "eval",           //查看商品评价（此处如此写，用于路由相对进入模式）
      goodsManageDetail: "detail",           //查看商品详情（此处如此写，用于路由相对进入模式）
      goodsPublish: "/store/goods/publish/chooseKind", //商品发布
      goodsEdit: "/store/goods/publish/edit",  //商品发布编辑
      goodsUpdate: "/store/goods/manage/update",  //商品修改
      goodsPublished: "/store/goods/publish/published",  //商品发布完成
      goodsFreightTemplate: "/store/goods/freightTemplate", //运费模板
      brands: "/store/goods/brands",//品牌管理
      addBrand: "addBrand",//申请添加品牌
      editBrand: "edit",//修改品牌
      brandDetail: "detail",//品牌详情
      addTemplate: "addTemplate",  //添加运费模板
      orderPayment: "/store/order/orderPayment", //待付款订单
      orderPendingShipment: "/store/order/pendingShipment", //待发货订单
      orderBeenShipped: "/store/order/beenShipped", //待付款订单
      orderComplete: "/store/order/complete", //已完成订单
      orderCancel: "/store/order/cancel", //已取消订单
      orderDetailSimple: "orderDetail", //订单详情页（此处如此写，用于路由相对进入模式）
      serviceRefund: "/store/afterSale/refund", //退款
      serviceReturnGoods: "/store/afterSale/returnGoods", //退货
      afterDetail: "afterDetail", //退款、退货信息详情
      redPacketPushOrder: "/store/redPacket/pushOrder", //红包投放记录
      redPacketStatistics: "/store/redPacket/statistics", //红包统计
      cashSettle: "/store/cashSettle/cashSettle", //提现与结算
      cach: "../cash", //提现页面（此处如此写，用于路由相对进入模式）
      staff: "/store/staff" //员工管理页面
    },
    basic: {
      reg: "/basic/reg", //企业注册
      company: "/basic/company", //企业信息
      shops: "/basic/shops", //店铺信息
      editShop: "/basic/editShop", //修改店铺信息
      register: "/basic/reg/register", //注册
      baseInfo: "/basic/reg/baseInfo", //基础信息
      accountInfo: "/basic/reg/accountInfo", //企业账户信息
      auditing: "/basic/reg/auditing", //审核
      openShop: "/basic/shop/openShop", //开通店铺
      done: "/basic/shop/done" //完成
    },
    pass: {
      login: "/page/login", //登录
      resetPwd: "/page/login/forgetPwd/resetPwd", //找回密码-重置密码
      newPwd: "/page/login/forgetPwd/newPwd",  //找回密码-密码
      accountPwd: "/page/login/forgetPwd/accountPwd", //重置密码完成
      updateSellerPwd: "/page/login/changePassword" //重置密码完成
    },
    goods: {
      addTpl: "/store/goods/freightTemplate/addTemplate?linkType=addArticle", //添加运费模板
      lookTpl: "/store/goods/freightTemplate"   //查看运费模板
    }
  }
}
