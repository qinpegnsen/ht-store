import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-publish',
  templateUrl: './publish.component.html',
  styleUrls: ['./publish.component.css']
})
export class PublishComponent implements OnInit {
  public step: number = 0;

  constructor() {
  }

  ngOnInit() {
  }

}
