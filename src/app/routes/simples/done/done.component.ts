import {Component, OnInit} from "@angular/core";
import {SimplesService} from "../simples.service";
import {DreageStepsComponent} from "../dreage-steps/dreage-steps.component";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-done',
  templateUrl: './done.component.html',
  styleUrls: ['./done.component.css']
})
export class DoneComponent implements OnInit {
  public path: string;//当前路由

  constructor(public simplesService: SimplesService,
              public route: ActivatedRoute,
              public steps: DreageStepsComponent,) {
    this.steps.step = 1;
  }

  ngOnInit() {
    let me = this;
    //获取当前路由
    me.route.url.subscribe(urls => {
      me.path = urls[0].path;
      switch (me.path) {
        case 'done':
          this.simplesService.routerSkip(5);
          break;
        case 'dredgeReject':
          this.simplesService.routerSkip(5.1);
          break;
      }
    })
  }

  /**
   * 组件跳转
   */
  skipTo(stepNum: number) {
    this.simplesService.routerSkip(stepNum);
  }
}
