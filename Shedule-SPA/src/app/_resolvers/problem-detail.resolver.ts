import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AlertifyService } from '../_servises/alertify.service';
import { UserService } from '../_servises/user.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Problem } from '../_models/problem';
import { ProblemService } from '../_servises/problem.service';

@Injectable()
export class ProblemDetailResolver implements Resolve<Problem> {
    constructor(private problemService: ProblemService,
         private router: Router, private alertify: AlertifyService ) {}

         resolve(route: ActivatedRouteSnapshot): Observable<Problem> {
             return this.problemService.getProblem(route.params['id']).pipe(
                catchError(error => {
                    this.alertify.error('Problem retrieving data');
                    this.router.navigate(['/problems']);
                    return of(null);
                })
             );
         }
}
