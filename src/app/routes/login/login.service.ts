import { Injectable } from '@angular/core';
import {Router} from "@angular/router";

@Injectable()
export class LoginService {

  constructor(public router: Router,) { }

  /**
   * 根据操作步骤跳到相应页面
   * @param current （当前步骤）
   */
  routerSkip(current){
    const _this = this;
    switch (current) {
      case 0 :
        _this.router.navigate(['/page/login/forget-password/reset-password'], {replaceUrl: true})
        break;
      case 1 :
        _this.router.navigate(['/page/login/forget-password/new-password'], {replaceUrl: true})
        break;
      case 2 :
        _this.router.navigate(['/page/login/forget-password/complete-password'], {replaceUrl: true})
        break;
    }
  }
}
