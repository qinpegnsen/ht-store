import { Component, OnInit } from '@angular/core';
import {PublishComponent} from "../publish.component";

@Component({
  selector: 'app-three',
  templateUrl: './three.component.html',
  styleUrls: ['./three.component.css']
})
export class ThreeComponent implements OnInit {

  constructor(public publishComponent: PublishComponent) {
    this.publishComponent.step = 2;
  }

  ngOnInit() {
  }

}
