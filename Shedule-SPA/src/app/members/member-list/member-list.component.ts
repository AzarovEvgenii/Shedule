import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_servises/user.service';
import { AlertifyService } from '../../_servises/alertify.service';
import { User } from '../../_models/user';
import { ActivatedRoute } from '@angular/router';
import { google } from '@agm/core/services/google-maps-types';
import { latinMap } from 'ngx-bootstrap/typeahead/latin-map';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  users: User[];

  constructor(private userService: UserService, private alertify: AlertifyService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.users = data['users'];
    });
  }

}
