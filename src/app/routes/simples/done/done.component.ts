import { Component, OnInit } from '@angular/core';
import {SimplesService} from "../simples.service";
import {StepsComponent} from "../steps/steps.component";

@Component({
  selector: 'app-done',
  templateUrl: './done.component.html',
  styleUrls: ['./done.component.css']
})
export class DoneComponent implements OnInit {

  constructor(public simplesService: SimplesService,
              public steps: StepsComponent,) {
    this.steps.current = 3;
  }

  ngOnInit() {
  }

  /**
   * 回到前一步
   */
  pre() {
    this.steps.current -= 1;
    this.simplesService.routerSkip(this.steps.current);
  }
}
