import { Injectable } from '@angular/core';
import {Router} from "@angular/router";

@Injectable()
export class SimplesService {

  constructor(public router: Router,) { }

  /**
   * 根据入驻步骤跳到相应页面
   * @param current （当前步骤）
   */
  routerSkip(current){
    const _this = this;
    switch (current) {
      case 0 :
        _this.router.navigate(['/simple/reg/register'], {replaceUrl: true})
        break;
      case 1 :
        _this.router.navigate(['/simple/reg/complete'], {replaceUrl: true})
        break;
      case 2 :
        _this.router.navigate(['/simple/reg/done'], {replaceUrl: true})
        break;
    }
  }

}
