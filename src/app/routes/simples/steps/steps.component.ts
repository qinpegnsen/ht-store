import {Component, OnInit} from "@angular/core";
import {NzMessageService} from "ng-zorro-antd";
import {SimplesService} from "../simples.service";

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.css']
})
export class StepsComponent implements OnInit {

  constructor(public simplesService: SimplesService,
              private _message: NzMessageService) {
  }

  ngOnInit() {
    this.simplesService.routerSkip();
  }

  done() {
    this._message.success('done');
  }

}
