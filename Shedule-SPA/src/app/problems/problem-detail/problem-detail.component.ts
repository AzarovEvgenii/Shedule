import { Component, OnInit } from '@angular/core';
import { Problem } from 'src/app/_models/problem';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import { UserService } from 'src/app/_servises/user.service';
import { AlertifyService } from 'src/app/_servises/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-problem-detail',
  templateUrl: './problem-detail.component.html',
  styleUrls: ['./problem-detail.component.css']
})
export class ProblemDetailComponent implements OnInit {
  problem: Problem;
  user: User;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(private userService: UserService, private alertify: AlertifyService,
     private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.problem = data['problem'];
    });
    this.userService.getUser(this.problem.userId).subscribe(
      data => this.user = data
    );
    this.galleryOptions = [
      {
        width: '320px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false
      }
    ];
    this.galleryImages = this.getImages();
  }

  getImages() {
    const imageUrls = [];
    for (let i = 0; i < this.problem.photos.length; i++) {
      imageUrls.push({
        small: this.problem.photos[i].url,
        medium: this.problem.photos[i].url,
        big: this.problem.photos[i].url,
        description: this.problem.photos[i].description
      });
    }
    return imageUrls;
  }
}
