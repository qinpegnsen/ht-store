import { Component, OnInit } from '@angular/core';
import {PublishComponent} from "../publish.component";

@Component({
  selector: 'app-published',
  templateUrl: './published.component.html',
  styleUrls: ['./published.component.css']
})
export class PublishedComponent implements OnInit {

  constructor(public publishComponent: PublishComponent) {
    this.publishComponent.step = 2;
  }

  ngOnInit() {
  }

}
