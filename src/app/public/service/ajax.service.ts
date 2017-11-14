import {Injectable} from '@angular/core';
import {Util} from "../util/util";

declare var $: any;

@Injectable()
export class AjaxService {
  constructor() {
  }

  //get方式提交，一般用于查询
  public static get(config) {
    if (!config) {
      console.log('ajax调用参数不能为空');
      return;
    }
    config.method = 'get';  //设定提交方式为get
    this.post(config);   //执行ajax
  };

  //post方式提交，一般用于新增对象
  public static post(config) {
    let _this = this;
    if (!config) {
      console.log('ajax调用参数不能为空');
      return;
    }
    var async = true, method = 'post', dataType = 'json';
    if (!config.hasOwnProperty('async')) config.async = async;
    if (!config.method) config.method = method;
    if (!config.dataType) config.dataType = dataType;


    //提交前显示遮罩层
    config.beforeSend = function (xhr) {
      if (config.mask === true) Util.showMask();//显示遮罩层
    };

    //设置全局ajax登录拦截
    var success = config.success;
    config.success = function (result, status, xhr) {
      if (config.mask === true) Util.hideMask();//隐藏遮罩层
      //过滤登录
      if (xhr.getResponseHeader("serverError") || xhr.getResponseHeader("serverError") === "sessionOut") {
        //TODO 修改过滤后路由跳转路径
        // _this.route.navigate(['/pages/login'], {replaceUrl: true}); //路由跳转
      } else {
        if (typeof success === "function") {
          success(result, status, xhr);
        }
      }
    };
    var error = config.error;
    config.error = function (result, status, xhr) {
      if (config.mask === true) Util.hideMask(); //隐藏遮罩层
      //回调
      if (typeof error === 'function') {
        error(result, status, xhr);
      }
    };
    $.ajax(config);
  };

  //put方式提交，一般用于更新，会返回更新的所有信息
  public static put(config) {
    if (!config) {
      console.log('ajax调用参数不能为空');
      return;
    }
    if (!config.data) {
      console.log('更新数据不能为空');
    }
    config.data._method = "put";
    this.post(config);   //执行ajax
  };

  //delete方式提交，用于删除
  public static del(config) {
    if (!config) {
      console.log("ajax调用参数不能为空");
      return;
    }
    config.data._method = "delete";
    // config.method = "delete";
    this.post(config);   //执行ajax
  };

  //patch方式提交，一般用于更新，会返回更新的部分信息
  public static patch(config) {
    if (!config) {
      console.log("ajax调用参数不能为空");
      return;
    }
    config.data._method = "patch";
    this.post(config);   //执行ajax
  };
}
