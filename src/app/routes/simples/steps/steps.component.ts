import {Component, OnInit} from "@angular/core";
import {NzMessageService} from "ng-zorro-antd";
import {SimplesService} from "../simples.service";

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.css']
})
export class StepsComponent implements OnInit {
  public current = 0;

  constructor(public simplesService: SimplesService,
              public _message: NzMessageService) {
  }

  ngOnInit() {
    const _this = this;
    _this.simplesService.routerSkip(_this.current);
  }

  done() {
    this._message.success('done');
  }

}
