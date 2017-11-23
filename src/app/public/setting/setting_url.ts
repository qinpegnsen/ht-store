/*接口访问路径配置*/

export class SettingUrl {
  static URL: any = {
    /**
     * 基础路径配置
     */
    base: {
      enum: '/res/enum/',            //获取枚举接口
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
      add: '/seller/addSeller',//注册商户
      load: '/seller/loadSellerById',//加载基本商户信息
      queryAccount: '/seller/querySellerBySellerAcc',//判断账户是否已存在
      queryAllSellers: '/seller/querySellersByShopCode',//根据店铺编码查询店铺下所有商家账户
      update: '/seller/updateSellerCommon',//修改商家账户基本信息
      updatePwd: '/seller/updateSellerPwd',//修改商家账户密码
    },
    /**
     * 平台对红包账户企业投资记录的操作
     */
    rp:{
      query: '/rpAccountRec/queryRpAccountRecAdmin',//查询企业投资记录列表
    },
    /**
     * 订单管理
     */
    order:{
      queryOrdAdmin: '/agentOrd/queryAgentOrdAdmin',//查询订单管理中的待发货订单
    }
  };
}
