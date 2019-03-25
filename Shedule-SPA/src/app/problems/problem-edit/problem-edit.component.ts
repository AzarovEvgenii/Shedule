import { Component, OnInit, ViewChild, HostListener, ElementRef } from '@angular/core';
import { User } from 'src/app/_models/user';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_servises/alertify.service';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/_servises/user.service';
import { AuthService } from 'src/app/_servises/Auth.service';
import { Problem } from 'src/app/_models/problem';
import { ProblemService } from 'src/app/_servises/problem.service';
import { BsDatepickerConfig } from 'ngx-bootstrap';

import { GooglePlaceDirective } from 'ngx-google-places-autocomplete/ngx-google-places-autocomplete.directive';
import { Address } from 'ngx-google-places-autocomplete/objects/address';

@Component({
  selector: 'app-problem-edit',
  templateUrl: './problem-edit.component.html',
  styleUrls: ['./problem-edit.component.css']
})
export class ProblemEditComponent implements OnInit {
  @ViewChild('places') places: GooglePlaceDirective;
  @ViewChild('search' ) public searchElement: ElementRef;
  @ViewChild('editForm') editForm: NgForm;
  addressChanged = false;
  problem: Problem;
  photoUrl: string;
  bsConfig: Partial<BsDatepickerConfig>;
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  public handleAddressChange(address: Address) {
      this.problem.address = address.formatted_address;
      this.problem.longitude = address.geometry.location.lng();
      this.problem.latitude = address.geometry.location.lat();
      this.addressChanged = true;

  }

  constructor(
    private route: ActivatedRoute,
    private alertify: AlertifyService,
    private problemService: ProblemService,
  ) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.problem = data['problem'];
    });
    this.bsConfig = {
      containerClass: 'theme-red'
    };
  }

  updateProblem() {
    this.problemService.updateProblem(this.problem.id, this.problem).subscribe(
      next => {
        this.alertify.success('Профиль обновлен успешно');
        this.addressChanged = false;
        this.editForm.reset(this.problem);
      },
      error => {
        this.alertify.error(error);
      },
    );
  }

  updateMainPhoto(photoUrl) {
    this.problem.photoUrl = photoUrl;
  }
}
