import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Problem } from 'src/app/_models/problem';

@Component({
  selector: 'app-problem-card',
  templateUrl: './problem-card.component.html',
  styleUrls: ['./problem-card.component.css']
})
export class ProblemCardComponent implements OnInit {

  @Input() problem: Problem;
  @Output() focusOnProblem = new EventEmitter();
  @Output() unfocusOnProblem = new EventEmitter();
  colorCode10 = '#FF0000';

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
