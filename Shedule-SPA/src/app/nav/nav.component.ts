import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_servises/Auth.service';
import { AlertifyService } from '../_servises/alertify.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = {};


  constructor(public authService: AuthService, private alerify: AlertifyService) { }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.model).subscribe(next => {
      this.alerify.success('Logged is Successfully');
    }, error => {
      this.alerify.error(error);
    });
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  logout() {
    localStorage.removeItem('token');
    this.alerify.message('logged out');
  }

}
