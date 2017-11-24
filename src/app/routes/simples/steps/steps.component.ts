import {Component, OnInit} from "@angular/core";
import {NzMessageService} from "ng-zorro-antd";
import {Router} from "@angular/router";

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.css']
})
export class StepsComponent implements OnInit {
  current = 0;
  constructor(public router: Router,
              private _message: NzMessageService) {
  }

  ngOnInit() {
    this.router.navigate(['/simple/reg/register'], {replaceUrl: true})
    // this.router.navigate(['/simple/reg/complete'], {replaceUrl: true})
  }

  done() {
    this._message.success('done');
  }

}
