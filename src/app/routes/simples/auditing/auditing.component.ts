import {Component, OnInit} from '@angular/core';
import {SimplesService} from "../simples.service";
import {StepsComponent} from "../settle-steps/steps.component";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-auditing',
  templateUrl: './auditing.component.html',
  styleUrls: ['./auditing.component.css']
})
export class AuditingComponent implements OnInit {
  public path: string;   //当前路由

  constructor(public simplesService: SimplesService,
              public route: ActivatedRoute,
              public steps: StepsComponent) {
    this.steps.current = 3;
  }

  ngOnInit() {
    let me = this;
    //获取当前路由
    me.route.url.subscribe(urls => {
      me.path = urls[0].path;
    })
  }

    /**
     * 组件跳转
     */
    skipTo(stepNum:number){
      this.simplesService.routerSkip(stepNum);
    }

  }
