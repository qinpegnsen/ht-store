import {Injectable, OnInit} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, NavigationEnd, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {Setting} from "../setting/setting";
import {SettingUrl} from "../setting/setting_url";
import {NzNotificationService} from "ng-zorro-antd";

@Injectable()
export class CanStoreProvide implements CanActivate, OnInit {
  public menus: Array<any> = new Array(); //菜单信息
  public allMenuLinks: Array<any> = new Array(); //单独的菜单路由集合

  constructor(public router: Router,
              public _notification: NzNotificationService) {
  }

  ngOnInit(): void {
    const _this = this;
    _this.menus = Setting.MENUS; //菜单信息
    //设置消息通知
    //监听路由变化，反选menu信息
    this.router.events.filter(event => event instanceof NavigationEnd).subscribe((event) => {
      _this.selMenu(_this.menus, event["url"]);
      if (_this.isPermission(event["url"])) {
        _this.router.navigate([SettingUrl.ROUTERLINK.store.home]);
        _this._notification.error(Setting.PAGEMSG.noAuthTip, '');
      }
    });
  }


  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    let me = this;
    return new Observable((observer) => {
      //如果企业认证信息已经全部通过，开启路由
      if (Setting.ENTERPTISE.flowState != Setting.ENUMSTATE.loginState.storenormal) {
        observer.next(false);
        observer.complete();
        me.router.navigate([SettingUrl.ROUTERLINK.pass.login]); //去登录页面
      }else if(me.isPermission(state.url)){
        observer.next(true);
        observer.complete();
        return;
      }else{
        observer.next(false);
        observer.complete();
        me._notification.error(Setting.PAGEMSG.noAuthTip, '');
        me.router.navigate([SettingUrl.ROUTERLINK.store.home]); //去首页
      }
    });
  }

  /**
   * 取到所有菜单的link，组成新的数组
   * @returns {Array}
   */
  public getAllRouters() {
    let menuUrls = [];
    this.menus.forEach((menu) => {
      if (menu.subMenuList) {
        menu.subMenuList.forEach((submenuTwo) => {
          if (submenuTwo.subMenuList) {
            let submenu2 = submenuTwo.subMenuList;
            submenu2.forEach((submenuThree) => {
              menuUrls.push(submenuThree.menuUrl)
            })
          }
          menuUrls.push(submenuTwo.menuUrl)
        })
      } else {
        menuUrls.push(menu.menuUrl);
      }
    });
    return menuUrls;
  }

  /**
   * 反选中menu
   * @param {string} url
   */
  selMenu(menuList: Array<any>, url: string) {
    let _this = this;
    menuList.forEach(ret => {
      if ((url).indexOf(ret.menuUrl) == 0) ret.isSel = true;
      else ret.isSel = false;
      if (ret.subMenuList && ret.subMenuList.length > 0) {
        _this.selMenu(ret.subMenuList, url);
      }
    })
  }

  /**
   * 权限匹配，当前路由与权限菜单中路由匹配（相等或包含当前路由，或当前路由包含权限菜单中的某一菜单）则有权限
   */
  public isPermission(path) {
    let me = this;
    if (this.allMenuLinks.length == 0) me.allMenuLinks = me.getAllRouters();//取到所有菜单的link；
    //┭┮﹏┭┮，当前路由可能比菜单中配置的路径少一级（比如模块中的空路由重定向），也可能比菜单路径多几级（比如子菜单们），所以可能是反向包含关系
    if (path.indexOf('page/login') < 0 && path.indexOf('basic') < 0) {//不是注册或登录页时
      if (path.indexOf(SettingUrl.ROUTERLINK.store.home) < 0) {//当路由不为home时
        for (let i = 0; i < this.allMenuLinks.length; i++) {
          if (this.allMenuLinks[i].indexOf(path) != -1 || path.indexOf(this.allMenuLinks[i]) != -1) return true;
        }
        return false;
      }
    }
    return true;
  }

}
