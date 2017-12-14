import {MainComponent} from "../layout/main/main.component";
import {SimpleComponent} from "../layout/simple/simple.component";
import {PageComponent} from "../layout/page/page.component";
import {SettingUrl} from "../public/setting/setting_url";
import {CanStoreProvide} from "../public/provide/can-store-provide";

export const routes = [
  {
    path: 'store',
    component: MainComponent,
    canActivate: [CanStoreProvide], //路由守卫：只有在企业认证信息全部通过时，才能访问
    children: [
      {path: '', redirectTo: SettingUrl.ROUTERLINK.store.home, pathMatch: 'full'},
      {path: 'home', loadChildren: './home/home.module#HomeModule'}, //首页
      {path: 'redPacket', loadChildren: './red-packet/red-packet.module#RedPacketModule'}, //红包模块
      {path: 'afterSale', loadChildren: './after-sale/after-sale.module#AfterSaleModule'}, //售前售后
      {path: 'cashSettle', loadChildren: './cash-settle/cash-settle.module#CashSettleModule'}, //现金结算
      {path: 'order', loadChildren: './order/order.module#OrderModule'}, //订单
      {path: 'goods', loadChildren: './goods/goods.module#GoodsModule'}, //商品管理
      {path: 'staff', loadChildren: './staff/staff.module#StaffModule'} //员工管理
    ]
  },
  {
    path: 'basic',
    component: SimpleComponent,
    children: [
      {path: '', loadChildren: './store-base/store-base.module#StoreBaseModule'}
    ]
  },
  {
    path: 'page',
    component: PageComponent,
    children: [
      {path: '', redirectTo: SettingUrl.ROUTERLINK.pass.login, pathMatch: 'full'},
      {path: 'login', loadChildren: './login/login.module#LoginModule'}
    ]
  },
  // 路由指向找不到时，指向这里
  {path: '**', redirectTo: SettingUrl.ROUTERLINK.pass.login}
];
