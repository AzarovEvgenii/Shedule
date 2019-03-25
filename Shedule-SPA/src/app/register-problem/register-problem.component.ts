import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../_servises/Auth.service';
import { _getComponentHostLElementNode } from '@angular/core/src/render3/instructions';
import { AlertifyService } from '../_servises/alertify.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { User } from '../_models/user';
import { Router } from '@angular/router';
import { Problem } from '../_models/problem';
import { ProblemService } from '../_servises/problem.service';

import { GooglePlaceDirective } from 'ngx-google-places-autocomplete/ngx-google-places-autocomplete.directive';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-register-problem',
  templateUrl: './register-problem.component.html',
  styleUrls: ['./register-problem.component.css']
})
export class RegisterProblemComponent implements OnInit {
  problem: Problem;
  model: any = {};
  registerForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;
  lat = -33.785809;
  lng = 151.121195;
  @ViewChild('places') places: GooglePlaceDirective;
  @ViewChild('search' ) public searchElement: ElementRef;

  public handleAddressChange(address: Address) {
      this.lng = address.geometry.location.lng();
      this.lat  = address.geometry.location.lat();
  }

  constructor(private problemService: ProblemService, private alertify: AlertifyService,
    private fb: FormBuilder, private router: Router, private authService: AuthService,
    private dilogRef: MatDialogRef<RegisterProblemComponent>) {}

  ngOnInit() {
    this.bsConfig = {
      containerClass: 'theme-red'
    },
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.fb.group({
      type: ['Broken road'],
      degree: ['', Validators.required],
      description: ['', Validators.required],
      timeHappened: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      address: ['', Validators.required],
    });
  }

  register() {
    if (this.registerForm.valid) {
      this.problem = Object.assign({}, this.registerForm.value);
      this.problem.longitude = this.lng;
      this.problem.latitude = this.lat;
      this.problemService.registerProblem(this.authService.decodedToken.nameid, this.problem).subscribe((response) => {
        this.alertify.success('Registration successful');
        this.router.navigate(['/problems']);
        this.dilogRef.close();
        console.log(response);
      }, error => {
        this.alertify.error(error);
      });
    }
  }

  cancel() {
    this.alertify.message('Registration is canceled');
    this.dilogRef.close();
  }
}
