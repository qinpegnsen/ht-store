/*接口访问路径配置*/

export class SettingUrl {
  static URL: any = {
    /**
     * 基础路径配置
     */
    base: {
      enum: '/res/enum/',            //获取枚举接口
      upload: '/upload/basic/upload',  //上传图片
      uuid: '/upload/basic/uid',      //获取上传图片的编码
      getRegSms: '/sms/registerSms'   //企业注册获取短信验证码
    },
    /**
     * 企业入驻
     */
    enterpris: {
      getStore: '/enterpris/load',//企业入驻查询
      query: '/enterpris/query',//企业查询
      save: '/enterpris/save',//保存或修改企业信息
      auditPass: '/enterpris/updateToNormal',//企业审核--通过
      auditReject: '/enterpris/updateToReject',//企业审核--驳回
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
     * 平台对红包账户企业投资记录的操作
     */
    rpAccountRec:{
      queryRec: '/rpAccountRec/queryRpAccountRecAdmin',//查询企业投资记录列表
      querySta: '/rpStatistics/queryRpStatisticsStore',//查询企业红包统计
    },
    /**
     * 售后接口
     */
    after:{
      RefundOrd: '/after/queryAfterGoodsReqPages',//查询退款订单
    },
    /**
     * 统计接口
     */
    statistical:{
      getWeekList: '/statistical/getWeekList',//获取某年某月的“周起始日~周结束日”的列表
    },
    /**
     * 商品管理
     */
    goods:{
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
      commnetGoods:" /commentGoods/queryCommnetGoodsAdmin",//(get)查询商品评价
      expressTpl:" /expressTpl/queryByStoreCode",//(get)查询运费模板/模板值列表
    },
    /**
     * 提现与账单明细
     */
    settle:{
      query: '/finaceDraw/query',//查询企业提现列表
      plantSettle:'/ord/queryAgentSettle',//查询企业结算列表
      agentBalance:'/finaceDraw/loadAgentBalance',//查询企业信息
      insert:'/finaceDraw/insert',//申请提现
      bankCode:'/datadict/queryAllByTypeCode',//查询银行
    },
    /**
     * 订单管理
     */
    order:{
      queryOrdAdmin: '/agentOrd/queryAgentOrdAdmin',//(get)查询订单管理中的待发货订单
      getKeywords: '/basicExpress/queryBasicExpressIsUseList',//(get)查询物流公司列表
    }
  };
}
