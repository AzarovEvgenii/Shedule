import { Component, OnInit } from '@angular/core';
import { Problem } from 'src/app/_models/problem';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/_servises/user.service';
import { AlertifyService } from 'src/app/_servises/alertify.service';
import { User } from 'src/app/_models/user';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { Pagination, PaginatedResult } from 'src/app/_models/pagination';
import { ProblemService } from 'src/app/_servises/problem.service';
import { AuthService } from 'src/app/_servises/Auth.service';

declare const google: any;

@Component({
  selector: 'app-problem-list',
  templateUrl: './problem-list.component.html',
  styleUrls: ['./problem-list.component.css']
})
export class ProblemListComponent implements OnInit {
  problems: Problem[];
  isMy: boolean;
  zoomNum = 3;
  latitude: number;
  longitude: number;
  pagination: Pagination;

  constructor(
    private route: ActivatedRoute,
    private problemService: ProblemService,
    private alertify: AlertifyService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.problems = data['problems'].result;
      this.isMy = data['isMy'];
      this.pagination = data['problems'].pagination;
    });

    this.latitude = this.problems[0].latitude * 1.01;
    this.longitude = this.problems[0].longitude * 1.01;
  }

  focusOnProblem(problem: any) {
    this.longitude = problem.longitude;
    this.latitude = problem.latitude;
    this.zoomNum = 13;
  }

  unfocusOnProblem() {
    this.longitude = this.problems[0].longitude * 1.01;
    this.latitude = this.problems[0].latitude * 1.01;
    this.zoomNum = 3;
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadProblems();
  }

  loadProblems() {
      this.problemService
        .getProblems(this.pagination.currentPage, this.pagination.itemsPerPage, this.isMy)
        .subscribe(
          (res: PaginatedResult<Problem[]>) => {
            this.problems = res.result;
            this.pagination = res.pagination;
          },
          error => {
            this.alertify.error(error);
          }
        );
  }
}
