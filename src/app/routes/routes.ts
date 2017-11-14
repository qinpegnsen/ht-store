import {MainComponent} from "../layout/main/main.component";
import {SimpleComponent} from "../layout/simple/simple.component";

export const routes = [
  {
    path: 'store',
    component: MainComponent,
    children: [
      {path: '', redirectTo: '/store/home', pathMatch: 'full'},
      {path: 'home', loadChildren: './home/home.module#HomeModule'},
    ]
  },
  {
    path: 'simple',
    component: SimpleComponent,
    children: [
      {path: '', redirectTo: '/simple/home', pathMatch: 'full'},
      {path: 'home', loadChildren: './home/home.module#HomeModule'},
    ]
  },
  // 路由指向找不到时，指向这里
  {path: '**', redirectTo: '/store/home'}
];
