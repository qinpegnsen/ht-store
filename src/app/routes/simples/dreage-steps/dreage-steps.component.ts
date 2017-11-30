import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dreage-steps',
  templateUrl: './dreage-steps.component.html',
  styleUrls: ['./dreage-steps.component.css']
})
export class DreageStepsComponent implements OnInit {
  step:number = 0;
  constructor() { }

  ngOnInit() {
  }

}
