const bb = 'http://192.168.10.178:';  //伯白
const br = 'http://192.168.10.110:';  //伯融
const sz = 'http://192.168.10.112:';  //尚泽
const sg = 'http://192.168.10.111:';  //善谷
const zyg = 'http://192.168.10.167:'; //张阳光
const gh = 'http://192.168.10.109:';  //高辉
const wp = 'http://192.168.10.182:';  //万鹏
const csj = 'http://192.168.10.221:';  //测试机
const ly = 'http://192.168.10.101:';  //柳阳

/**
 * 配置代理
 * @type {[null,null]}
 */
const PROXY_CONFIG = [
  {
    context: [
      "/seller", //企业注册
      "/sms",    //验证码
      "/enterprise", //企业入驻
      "/login", //登录
      "/goodsEdit", //商品发布
      "/goodsKind", //商品分类
      "/goodsBrand", //品牌信息
      "/goodsQuery", //商品查询
      "/expressTpl", //运费模板
      "/stores",     //店铺
      "/rpStatistics", //红包统计
      "/rpAccountRec", //企业投红包记录
      "/after", //售后
      "/finaceStoreDraw", //提现
      "/settle", //结算
      "/ord", //订单
      "/statistical", //统计信息
      "/datadict" //平台信息
    ],
    target: csj + "8087",   //拦截 context配置路径，经过此地址
    secure: false
  },
  {
    context: [
      "/res", //枚举信息
      "/basicExpress", //物流
      "/upload" //上传
    ],
    target: csj + "8082",   //拦截 context配置路径，经过此地址
    secure: false
  }
];

module.exports = PROXY_CONFIG;
