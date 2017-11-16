/*基本属性配置*/

export class Setting {
  public static STORE: any = {};                       //企业信息
  public static APP: any = {                           //平台信息
    name: '三楂红网络技术-企业管理系统',
    description: '企业管理系统',
    copyright:'© 2017 - 三楂红-企业管理系统',
    logo:'../../../assets/img/logo.png',
    logoDark:'../../../assets/img/logo-dark.png'
  };
  public static MENUS: Array<any> = new Array();      //平台菜单
  //定义枚举
  static ENUM: any = {
    articleState: 1005,  //eg文章状态枚举
  };

  constructor() {
    const _this = this;
  }

}
