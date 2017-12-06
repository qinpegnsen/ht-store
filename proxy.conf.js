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
      "/seller",
      "/sms",
      "/rpAccountRec",
      "/rpStatistics",
      "/enterprise",
      "/login",
      "/stores",
      "/ord",
    ],
    target: wp + "8087",   //拦截 context配置路径，经过此地址
    secure: false
  },
  {
    context: [
      "/finaceDraw",
      "/rpAccountRec",
      "/datadict"
    ],
    target: wp + "8085",   //拦截 context配置路径，经过此地址
    secure: false
  },
  {
    context: [
      "/goodsKind",
      "/goodsEdit",
      "/goodsQuery",
      "/goodsAudit",
      "/agentOrd",
      "/rpAccountRec",
      "/expressTpl",
      "/storeExpressTpl",
      "/after"
    ],
    target: csj + "8084",   //拦截 context配置路径，经过此地址
    secure: false
  },
  {
    context: [
      "/res",
      "/basicExpress",
      "/upload"
    ],
    target: bb + "8082",   //拦截 context配置路径，经过此地址
    secure: false
  },
];

module.exports = PROXY_CONFIG;
