import { Injectable } from '@angular/core';
import { User } from '../_models/user';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AlertifyService } from '../_servises/alertify.service';
import { UserService } from '../_servises/user.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../_servises/Auth.service';

@Injectable()
export class MemberEditResolver implements Resolve<User> {
    constructor(private userService: UserService, private authService: AuthService,
         private router: Router, private alertify: AlertifyService ) {}

         resolve(route: ActivatedRouteSnapshot): Observable<User> {
             return this.userService.getUser(this.authService.decodedToken.nameid).pipe(
                catchError(error => {
                    this.alertify.error('Problem retrieving your data');
                    this.router.navigate(['/members']);
                    return of(null);
                })
             );
         }
}
