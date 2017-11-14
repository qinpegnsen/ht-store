/*接口访问路径配置*/

export class SettingUrl {
  static URL: any = {
    /**
     * 基础路径配置
     */
    base: {
      enum: '/res/enum/',            //获取枚举接口
      uuid: '/upload/basic/uid'    //获取上传图片的编码
    },
    /**
     * 企业模块
     */
    store: {
      getStore: ''//获取店铺信息
    }
  };
}
