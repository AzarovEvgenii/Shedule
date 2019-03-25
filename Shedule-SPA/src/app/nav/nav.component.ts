import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_servises/Auth.service';
import { AlertifyService } from '../_servises/alertify.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { MessagesComponent } from '../messages/messages.component';
import { RegisterProblemComponent } from '../register-problem/register-problem.component';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  model: any = {};
  photoUrl: string;
  navbarOpen = false;

  constructor(public authService: AuthService, private alerify: AlertifyService,
    private router: Router, private dialog: MatDialog) { }

  ngOnInit() {
    this.authService.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  login() {
    this.authService.login(this.model).subscribe(next => {
      this.alerify.success('Logged is Successfully');
    }, error => {
      this.alerify.error(error);
    }, () => {
      this.router.navigate(['/problems']);
    });
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authService.decodedToken = null;
    this.authService.currentUser = null;
    this.alerify.message('logged out');
    this.router.navigate(['/home']);
  }

  onClick() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(RegisterProblemComponent);
  }
}
