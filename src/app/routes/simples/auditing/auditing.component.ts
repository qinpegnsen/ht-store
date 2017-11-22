import { Component, OnInit } from '@angular/core';
import {SimplesService} from "../simples.service";
import {StepsComponent} from "../steps/steps.component";

@Component({
  selector: 'app-auditing',
  templateUrl: './auditing.component.html',
  styleUrls: ['./auditing.component.css']
})
export class AuditingComponent implements OnInit {

  constructor(public simplesService: SimplesService,
              public steps: StepsComponent) {
    this.steps.current = 1.5;
    this.simplesService.routerSkip(this.steps.current);
  }

  ngOnInit() {
  }

  /**
   * 回到前一步
   */
  pre() {
    this.steps.current = 1;
    this.simplesService.routerSkip(this.steps.current);
  }

}
