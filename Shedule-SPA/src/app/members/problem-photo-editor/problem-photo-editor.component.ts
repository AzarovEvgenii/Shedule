import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProblemPhoto } from 'src/app/_models/problemPhoto';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/_servises/Auth.service';
import { UserService } from 'src/app/_servises/user.service';
import { AlertifyService } from 'src/app/_servises/alertify.service';
import { Problem } from 'src/app/_models/problem';
import { ProblemService } from 'src/app/_servises/problem.service';

@Component({
  selector: 'app-problem-photo-editor',
  templateUrl: './problem-photo-editor.component.html',
  styleUrls: ['./problem-photo-editor.component.css']
})
export class ProblemPhotoEditorComponent implements OnInit {
  @Input() photos: ProblemPhoto[];
  @Input() problem: Problem;
  @Output() getMemberPhotoChange = new EventEmitter<string>();
  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl;
  currentMain: ProblemPhoto;

  constructor(
    private authService: AuthService,
    private problemService: ProblemService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    this.initializeUploader();
  }

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url:
        this.baseUrl +
        'problems/' +
        this.problem.id +
        '/photos',
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });

    this.uploader.onAfterAddingFile = file => {
      file.withCredentials = false;
    };

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const res: ProblemPhoto = JSON.parse(response);
        const photo = {
          id: res.id,
          url: res.url,
          description: res.description,
          dateAdded: res.dateAdded,
          isMain: res.isMain
        };
        this.photos.push(photo);
        if (photo.isMain) {
          this.getMemberPhotoChange.emit(photo.url);
          // this.authService.changeMemberPhoto(photo.url); // this's only for User
          // this.authService.currentUser.photoUrl = photo.url; // this's only for User because User hasn't main problem photo field
          // localStorage.setItem(
          //   'user',
          //   JSON.stringify(this.authService.currentUser)
          // ); // explanation above
        }
      }
    };
  }

  setMainPhoto(photo: ProblemPhoto) {
    this.problemService
      .setMainPhoto(this.problem.id, photo.id)
      .subscribe(
        () => {
          this.currentMain = this.photos.filter(p => p.isMain === true)[0];
          this.currentMain.isMain = false;
          photo.isMain = true;
          this.getMemberPhotoChange.emit(photo.url);
          // this.authService.changeMemberPhoto(photo.url);
          // this.authService.currentUser.photoUrl = photo.url;
          // localStorage.setItem(
          //   'user',
          //   JSON.stringify(this.authService.currentUser)
          // );
        },
        error => {
          this.alertify.error(error);
        }
      );
  }

  deletePhoto(id: number) {
    this.alertify.confirm('Are your sure you want to delete this photo?', () => {
    this.problemService.deletePhoto(this.problem.id, id).subscribe(() => {
      this.photos.splice(this.photos.findIndex(p => p.id === id), 1);
      this.alertify.success('Фото было успешно удалено');
    }, error => {
      this.alertify.error('Ошибка при удалении фото');
    });
  });
  }
}
