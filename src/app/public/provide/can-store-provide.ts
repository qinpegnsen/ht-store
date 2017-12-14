import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {Setting} from "../setting/setting";

@Injectable()
export class CanStoreProvide implements CanActivate {
  constructor() {
  }
  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    return new Observable((observer) => {
      //如果企业认证信息已经全部通过，开启路由
      if (Setting.ENTERPTISE.flowState == Setting.ENUMSTATE.loginState.storenormal) {
        observer.next(true);
        observer.complete();
        return;
      }
      observer.next(false);
      observer.complete();
    });
  }

}
