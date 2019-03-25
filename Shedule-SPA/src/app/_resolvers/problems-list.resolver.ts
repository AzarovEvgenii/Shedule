import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AlertifyService } from '../_servises/alertify.service';
import { ProblemService } from '../_servises/problem.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Problem } from '../_models/problem';
import { AuthService } from '../_servises/Auth.service';

@Injectable()
export class ProblemListResolver implements Resolve<Problem[]> {
    pageNumber = 1;
    pageSize = 6;

    constructor(private problemService: ProblemService,
         private router: Router, private alertify: AlertifyService, private authService: AuthService ) {}

         resolve(route: ActivatedRouteSnapshot): Observable<Problem[]> {
            if (this.authService.currentUser != null) {
                return this.problemService.getProblems(this.pageNumber, this.pageSize, route.data['isMy']).pipe(
                    catchError(error => {
                        this.alertify.error('Problem retrieving data');
                        this.router.navigate(['/home']);
                        return of(null);
                    })
                 );
            } else {
            return this.problemService.getProblemsUnauth(this.pageNumber, this.pageSize).pipe(
                catchError(error => {
                    this.alertify.error('Problem retrieving data');
                    this.router.navigate(['/home']);
                    return of(null);
                })
            );
            }
         }

}
