import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";

@Component({
  selector: 'app-settle-steps',
  templateUrl: './settle-steps.component.html',
  styleUrls: ['./settle-steps.component.css']
})
export class SettleStepsComponent implements OnInit {
  current = 0;
  constructor(public router: Router) {
  }

  ngOnInit() {
  }

}
