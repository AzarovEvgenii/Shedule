import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  BsDropdownModule,
  TabsModule,
  BsDatepickerModule,
  PaginationModule,
  ButtonsModule
} from 'ngx-bootstrap';
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
import { NgxGalleryModule } from 'ngx-gallery';
import { FileUploadModule } from 'ng2-file-upload';
import { AgmCoreModule } from '@agm/core';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';

import { AppComponent } from './app.component';
import { HttpClient } from 'selenium-webdriver/http';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { AuthService } from './_servises/Auth.service';
import { ErrorInterceptorProvider } from './_servises/error.interceptor';
import { AlertifyService } from './_servises/alertify.service';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { appRoutes } from './routes';
import { AuthGuard } from './_guards/auth.guard';
import { MemberCardComponent } from './members/member-card/member-card.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { UserService } from './_servises/user.service';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { MemberListResolver } from './_resolvers/member-list.resolver';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberEditResolver } from './_resolvers/member-edit.resolver';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import { PhotoEditorComponent } from './members/photo-editor/photo-editor.component';
import { ProblemListResolver } from './_resolvers/problems-list.resolver';
import { ProblemListComponent } from './problems/problem-list/problem-list.component';
import { ProblemCardComponent } from './problems/problem-card/problem-card.component';
import { ProblemDetailComponent } from './problems/problem-detail/problem-detail.component';
import { ProblemDetailResolver } from './_resolvers/problem-detail.resolver';
import { ProblemEditComponent } from './problems/problem-edit/problem-edit.component';
import { MyProblemCardComponent } from './problems/my-problem-card/my-problem-card.component';
import { ProblemEditResolver } from './_resolvers/problem-edit.resolver';
import { PreventUnsavedChangesProblem } from './_guards/prevent-unsaved-changes-problem.guard';
import { ProblemPhotoEditorComponent } from './members/problem-photo-editor/problem-photo-editor.component';
import { RegisterProblemComponent } from './register-problem/register-problem.component';
import { LayoutModule } from '@angular/cdk/layout';
import {
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatCheckboxModule,
  MatDialogModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './footer/footer.component';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      HomeComponent,
      RegisterComponent,
      ListsComponent,
      MessagesComponent,
      MemberListComponent,
      MemberCardComponent,
      MemberDetailComponent,
      MemberEditComponent,
      PhotoEditorComponent,
      ProblemListComponent,
      ProblemCardComponent,
      ProblemDetailComponent,
      ProblemEditComponent,
      MyProblemCardComponent,
      ProblemPhotoEditorComponent,
      RegisterProblemComponent,
      FooterComponent,
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      BsDropdownModule.forRoot(),
      BsDatepickerModule.forRoot(),
      TabsModule.forRoot(),
      RouterModule.forRoot(appRoutes),
      PaginationModule.forRoot(),
      ButtonsModule.forRoot(),
      NgxGalleryModule,
      FileUploadModule,
      JwtModule.forRoot({
        config: {
          tokenGetter: tokenGetter,
          whitelistedDomains: ['localhost:5000'],
          blacklistedRoutes: ['localhost:5000/api/auth']
        }
      }),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDkF-vWNRqJ2RoVD5VUcpA3fB1sxBbBPUk',
      libraries: ['places']
    }),
    AgmSnazzyInfoWindowModule,
    GooglePlaceModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule
  ],
  providers: [
    AuthService,
    ErrorInterceptorProvider,
    AlertifyService,
    AuthGuard,
    UserService,
    MemberDetailResolver,
    MemberListResolver,
    MemberEditResolver,
    ProblemListResolver,
    ProblemDetailResolver,
    ProblemEditResolver,
    PreventUnsavedChanges,
    PreventUnsavedChangesProblem
  ],
  bootstrap: [AppComponent],
  entryComponents: [MessagesComponent, RegisterProblemComponent]
})
export class AppModule {}
