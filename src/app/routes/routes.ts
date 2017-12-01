import {MainComponent} from "../layout/main/main.component";
import {SimpleComponent} from "../layout/simple/simple.component";
import {PageComponent} from "../layout/page/page.component";
import {SettingUrl} from "../public/setting/setting_url";

export const routes = [
  {
    path: 'store',
    component: MainComponent,
    children: [
      {path: '', redirectTo: SettingUrl.ROUTERLINK.store.home, pathMatch: 'full'},
      {path: 'home', loadChildren: './home/home.module#HomeModule'},
      {path: 'redPacket', loadChildren: './red-packet/red-packet.module#RedPacketModule'},
      {path: 'afterSale', loadChildren: './after-sale/after-sale.module#AfterSaleModule'},
      {path: 'cashSettle', loadChildren: './cash-settle/cash-settle.module#CashSettleModule'},
      {path: 'order', loadChildren: './order/order.module#OrderModule'},
      {path: 'goods', loadChildren: './goods/goods.module#GoodsModule'}
    ]
  },
  {
    path: 'basic',
    component: SimpleComponent,
    children: [
      {path: '', redirectTo: '/basic/reg', pathMatch: 'full'},
      {path: 'reg', loadChildren: './simples/simples.module#SimplesModule'},
    ]
  },
  {
    path: 'page',
    component: PageComponent,
    children: [
      {path: '', redirectTo: '/page/login', pathMatch: 'full'},
      {path: 'login', loadChildren: './login/login.module#LoginModule'},
    ]
  },
  // 路由指向找不到时，指向这里
  {path: '**', redirectTo: SettingUrl.ROUTERLINK.store.home}
];
