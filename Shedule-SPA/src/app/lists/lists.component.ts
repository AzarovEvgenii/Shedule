import { Component, OnInit } from '@angular/core';
import { Problem } from 'src/app/_models/problem';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/_models/user';
import { Pagination, PaginatedResult } from '../_models/pagination';
import { ProblemService } from '../_servises/problem.service';
import { AlertifyService } from '../_servises/alertify.service';


@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  problems: Problem[];
  isMy: boolean;
  typeList = [{value: 'Fire', display: 'Fire'}, {value: 'Broken road', display: 'Broken road'}];
  problemParams: any = {};
  pagination: Pagination;

  constructor(
    private route: ActivatedRoute, private problemService: ProblemService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.problems = data[ 'problems'].result;
      this.isMy = data[ 'isMy'];
      this.pagination = data['problems'].pagination;
    });

    if (this.isMy) {
      const user: User = JSON.parse(localStorage.getItem( 'user'));
      this.problems = this.problems.filter(p => p.userId === user.id);
    }

    this.problemParams.type = 'none';
    this.problemParams.minDegree = 1;
    this.problemParams.maxDegree = 10;
    this.problemParams.orderBy = 'timeHappened';
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadProblems();
  }

  resetFilters() {
    this.problemParams.type = 'none';
    this.problemParams.minDegree = 1;
    this.problemParams.maxDegree = 10;
    this.loadProblems();
  }

  loadProblems() {
    this.problemService
    .getProblems(this.pagination.currentPage, this.pagination.itemsPerPage, false, this.problemParams)
      .subscribe((res: PaginatedResult<Problem[]>) => {
        this.problems = res.result;
        this.pagination = res.pagination;
    }, error => {
      this.alertify.error(error);
    });
  }
}
