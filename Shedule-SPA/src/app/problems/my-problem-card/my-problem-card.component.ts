import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Problem } from 'src/app/_models/problem';

@Component({
  selector: 'app-my-problem-card',
  templateUrl: './my-problem-card.component.html',
  styleUrls: ['./my-problem-card.component.css']
})
export class MyProblemCardComponent implements OnInit {
  @Input() problem: Problem;
  @Output() focusOnProblem = new EventEmitter();
  @Output() unfocusOnProblem = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onFocus() {
    this.focusOnProblem.emit(this.problem);
  }

  noFocus() {
    this.unfocusOnProblem.emit();
  }

}
