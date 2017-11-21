import {Component, OnInit} from "@angular/core";
import {SimplesService} from "../simples.service";

@Component({
  selector: 'app-done',
  templateUrl: './done.component.html',
  styleUrls: ['./done.component.css']
})
export class DoneComponent implements OnInit {

  constructor(public simplesService: SimplesService) {
    this.simplesService.current = 3;
    this.simplesService.routerSkip();
  }

  ngOnInit() {
  }
}
