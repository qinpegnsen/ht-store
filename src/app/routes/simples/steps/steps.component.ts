import {Component, OnInit} from "@angular/core";
import {NzMessageService} from "ng-zorro-antd";
import {SimplesService} from "../simples.service";

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.css']
})
export class StepsComponent implements OnInit {
  current = 1;

  constructor(public simplesService: SimplesService,
              private _message: NzMessageService) {
  }

  ngOnInit() {
    const _this = this;
    _this.simplesService.routerSkip(_this.current);
  }

  /**
   * 回到前一步
   */
  pre() {
    this.current -= 1;
    this.simplesService.routerSkip(this.current);
  }

  /**
   * 下一步
   */
  next() {
    this.current += 1;
    this.simplesService.routerSkip(this.current);
  }

  done() {
    this._message.success('done');
  }

}
