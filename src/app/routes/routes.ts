import {MainComponent} from "../layout/main/main.component";
import {SimpleComponent} from "../layout/simple/simple.component";
import {PageComponent} from "../layout/page/page.component";

export const routes = [
  {
    path: 'store',
    component: MainComponent,
    children: [
      {path: '', redirectTo: '/store/home', pathMatch: 'full'},
      {path: 'home', loadChildren: './home/home.module#HomeModule'},
      {path: 'redPacket', loadChildren: './red-packet/red-packet.module#RedPacketModule'},
    ]
  },
  {
    path: 'simple',
    component: SimpleComponent,
    children: [
      {path: '', redirectTo: '/simple/reg', pathMatch: 'full'},
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
  {path: '**', redirectTo: '/store/home'}
];
