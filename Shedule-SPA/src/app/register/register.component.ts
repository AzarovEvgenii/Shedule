import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../_servises/Auth.service';
import { _getComponentHostLElementNode } from '@angular/core/src/render3/instructions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  @Output()
  cancelRegister = new EventEmitter();
  model: any = {};

  constructor(private authService: AuthService) {}

  ngOnInit() {
  }

  register() {
    this.authService.register(this.model).subscribe(
      () => {
        console.log('Registration successful');
      },
      error => {
        console.log(error);
      }
    );
  }

  cancel() {
    this.cancelRegister.emit(false);
    console.log('cancelled');
  }
}
