import { Injectable } from '@angular/core';
import { User } from '../_models/user';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AlertifyService } from '../_servises/alertify.service';
import { UserService } from '../_servises/user.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../_servises/Auth.service';
import { ProblemService } from '../_servises/problem.service';
import { Problem } from '../_models/problem';

@Injectable()
export class ProblemEditResolver implements Resolve<Problem> {
    constructor(private problemService: ProblemService, private authService: AuthService,
         private router: Router, private alertify: AlertifyService ) {}

         resolve(route: ActivatedRouteSnapshot): Observable<Problem> {
             return this.problemService.getProblem(route.params['id']).pipe(
                catchError(error => {
                    this.alertify.error('Problem retrieving your data');
                    this.router.navigate(['/members']);
                    return of(null);
                })
             );
         }
}
