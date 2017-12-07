import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-open-steps',
  templateUrl: './open-steps.component.html',
  styleUrls: ['./open-steps.component.css']
})
export class OpenStepsComponent implements OnInit {
  step:number = 0;
  constructor() { }

  ngOnInit() {
  }

}
