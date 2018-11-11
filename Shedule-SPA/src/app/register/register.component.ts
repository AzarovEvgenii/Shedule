import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../_servises/Auth.service';
import { _getComponentHostLElementNode } from '@angular/core/src/render3/instructions';
import { AlertifyService } from '../_servises/alertify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  @Output()
  cancelRegister = new EventEmitter();
  model: any = {};

  constructor(private authService: AuthService, private alertify: AlertifyService) {}

  ngOnInit() {
  }

  register() {
    this.authService.register(this.model).subscribe(
      () => {
        this.alertify.success('Registration successful');
      },
      error => {
        this.alertify.error(error);
      }
    );
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
